// Imports
const express = require('express');
const path = require('path')
const db = require('./db');
const socket = require('socket.io');

const app = express();

// middleware to share files in client folder
app.use(express.static(path.join(__dirname, '/client')))
// return client application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(3030, () => {
  console.log('Server is running on Port:', 3030)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  // Listener to event message
  socket.on('message', (message) => {
    db.messages.push(message);
    socket.broadcast.emit('message', message);
  });

  // Listener to event login
  socket.on('login', (user) => {
    db.users.push({ name: user, id: socket.id });

    socket.broadcast.emit('message', {
      author: 'Chat Bot', 
      content: `${user} has joined the conversation!`
    });
  });


  // Listener to event disconnect
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    let userLeft = db.users.find(user => user.id === socket.id)
    
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
			content: `${userLeft.name} has left the conversation... :(`,
		}) 

    db.users = db.users.filter(user => user.id !== socket.id)
  });
});

