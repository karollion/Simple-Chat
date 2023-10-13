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
	e.preventDefault()
	if (!userNameInput.value) {
		alert('Please add user name')
	} else {
		userName = userNameInput.value
		loginForm.classList.remove('show')
		messagesSection.classList.add('show')
    return userName;
	}
}

loginForm.addEventListener('submit', login)