export function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (!target) return;
            target.type = target.type === 'password' ? 'text' : 'password';
            btn.style.color = target.type === 'text' ? '#2563eb' : '#94a3b8';
        });
    });
}

export function attachEmailValidation(input, errorEl) {
    input.addEventListener('input', () => {
        if (!input.value) {
            input.classList.remove('error', 'valid');
            errorEl.classList.remove('show');
            return;
        }
        if (validateEmail(input.value)) {
            input.classList.remove('error');
            input.classList.add('valid');
            errorEl.classList.remove('show');
        } else {
            input.classList.add('error');
            input.classList.remove('valid');
            errorEl.classList.add('show');
        }
    });
}

export function attachPasswordValidation(input, errorEl, options = {}) {
    const {minLength = 6, onInput, onValid} = options;

    input.addEventListener('input', () => {
        if (typeof onInput === 'function') {
            onInput(input.value);
        }

        if (!input.value) {
            input.classList.remove('error', 'valid');
            errorEl.classList.remove('show');
            return;
        }

        if (input.value.length >= minLength) {
            input.classList.remove('error');
            input.classList.add('valid');
            errorEl.classList.remove('show');
            if (typeof onValid === 'function') onValid();
        } else {
            input.classList.add('error');
            input.classList.remove('valid');
            errorEl.classList.add('show');
            errorEl.textContent = `Пароль должен содержать минимум ${minLength} символов`;
        }
    });
}

export function bindNavigation(el, url, preventDefault = false) {
    if (!el) return;
    el.addEventListener('click', (e) => {
        if (preventDefault) e.preventDefault();
        window.location.href = url;
    });
}