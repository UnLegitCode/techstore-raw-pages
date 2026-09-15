import {
    attachEmailValidation,
    bindNavigation
} from './auth.js';

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const loginBtn = document.getElementById('loginBtn');

attachEmailValidation(emailInput, emailError);

bindNavigation(loginBtn, 'login.html');