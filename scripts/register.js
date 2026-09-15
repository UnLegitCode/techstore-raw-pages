import {
    initPasswordToggles,
    attachEmailValidation,
    attachPasswordValidation,
    bindNavigation
} from './auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const loginBtn = document.getElementById('loginBtn');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');

const bars = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3')
];
const strengthText = document.getElementById('strengthText');

initPasswordToggles();

function checkStrength(value) {
    let score = 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    bars.forEach(b => b.className = 'strength-bar');

    if (!value) {
        strengthText.textContent = '';
        return;
    }

    if (score <= 2) {
        bars[0].classList.add('weak');
        strengthText.textContent = 'Слабый пароль';
        strengthText.style.color = '#dc2626';
    } else if (score <= 3) {
        bars[0].classList.add('medium');
        bars[1].classList.add('medium');
        strengthText.textContent = 'Средний пароль';
        strengthText.style.color = '#f59e0b';
    } else {
        bars[0].classList.add('strong');
        bars[1].classList.add('strong');
        bars[2].classList.add('strong');
        strengthText.textContent = 'Надёжный пароль';
        strengthText.style.color = '#16a34a';
    }
}

function validateConfirm() {
    if (!confirmInput.value) {
        confirmInput.classList.remove('error', 'valid');
        confirmError.classList.remove('show');
        return false;
    }
    if (confirmInput.value === passwordInput.value) {
        confirmInput.classList.remove('error');
        confirmInput.classList.add('valid');
        confirmError.classList.remove('show');
        return true;
    } else {
        confirmInput.classList.add('error');
        confirmInput.classList.remove('valid');
        confirmError.classList.add('show');
        return false;
    }
}

attachEmailValidation(emailInput, emailError);

attachPasswordValidation(passwordInput, passwordError, {
    onInput: checkStrength,
    onValid: () => {
        if (confirmInput.value) {
            validateConfirm();
        }
    }
});

confirmInput.addEventListener('input', validateConfirm);

bindNavigation(loginBtn, 'login.html');