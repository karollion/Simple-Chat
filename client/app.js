'use strict'

// References to HTML
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';
// initial new socket client
const socket = io();
// event listener to server events
socket.on('message', ({ author, content }) => addMessage(author, content));

// Login
const login = function (e) {
	e.preventDefault();
	if (!userNameInput.value) {
		alert('Please add user name');
	} else {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
    socket.emit('login', userName );
    return userName;
	}
};

loginForm.addEventListener('submit', login);

// Send message
function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', sendMessage);

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content ${author === 'Chat Bot' ? 'message__bot' : null }">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}