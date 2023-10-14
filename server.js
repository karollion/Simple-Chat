// Imports
const express = require('express');
const path = require('path')
const db = require('./db');

const app = express();

// middleware to share files in client folder
app.use(express.static(path.join(__dirname, '/client')))
// return client application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(process.env.PORT || 3030, () => {
  console.log('Server is running on port: 3030');
});