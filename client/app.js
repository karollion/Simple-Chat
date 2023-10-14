'use strict'

// References to HTML
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

// Login
const login = function (e) {
	e.preventDefault();
	if (!userNameInput.value) {
		alert('Please add user name');
	} else {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
    return userName;
	}
};

loginForm.addEventListener('submit', login);

// Send message
const sendMessage = function (e) {
	e.preventDefault();
	if (!messageContentInput.value) {
		alert('Enter message');
	} else {
		addMessage(userName, messageContentInput.value);
		messageContentInput = '';
	}
};

addMessageForm.addEventListener('submit', sendMessage);

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}