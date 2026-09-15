import {
    initPasswordToggles,
    attachEmailValidation,
    attachPasswordValidation,
    bindNavigation
} from './auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const registerBtn = document.getElementById('registerBtn');
const recoverBtn = document.getElementById('recoverBtn');

initPasswordToggles();

attachEmailValidation(emailInput, emailError);

attachPasswordValidation(passwordInput, passwordError);

bindNavigation(registerBtn, 'register.html');
bindNavigation(recoverBtn, 'recover.html');