import { validateEmail, validatePassword } from './validators.js';
import { saveSession, checkSession } from './session.js';
 
async function getCredentials() {
  const response = await fetch('./db/user.json');
  const users = await response.json();
  return users[0];
}
 
// --- Selección de elementos del DOM ---
const loginForm    = document.getElementById('loginForm');
const emailInput   = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn    = document.getElementById('submitBtn');
const emailError   = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const generalError = document.getElementById('general-error');
 
checkSession();
 
function showError(element, message) {
  element.textContent = message;
  element.classList.add('visible');
}
 
function clearError(element) {
  element.textContent = '';
  element.classList.remove('visible');
}
 
function setInputState(input, isValid) {
  input.classList.toggle('input--error', !isValid);
  input.classList.toggle('input--valid', isValid);
}
 
function updateSubmitButton() {
  const emailVal    = emailInput.value.trim();
  const passwordVal = passwordInput.value.trim();
 
  const isReady = validateEmail(emailVal) && validatePassword(passwordVal);
 
  submitBtn.disabled    = !isReady;
  submitBtn.setAttribute('aria-disabled', String(!isReady));
}
 
emailInput.addEventListener('input', () => {
  const value = emailInput.value.trim();
 
  if (value === '') {
    clearError(emailError);
    setInputState(emailInput, false);
  } else if (!validateEmail(value)) {
    showError(emailError, 'Ingresa un correo electrónico válido (ejemplo@dominio.com)');
    setInputState(emailInput, false);
  } else {
    clearError(emailError);
    setInputState(emailInput, true);
  }
 
  updateSubmitButton();
});
 
passwordInput.addEventListener('input', () => {
  const value = passwordInput.value.trim();
 
  if (value === '') {
    clearError(passwordError);
    setInputState(passwordInput, false);
  } else if (!validatePassword(value)) {
    showError(passwordError, 'La contraseña no puede estar vacía');
    setInputState(passwordInput, false);
  } else {
    clearError(passwordError);
    setInputState(passwordInput, true);
  }
 
  updateSubmitButton();
});
 
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailVal    = emailInput.value.trim();
  const passwordVal = passwordInput.value.trim();

  // Obtener credenciales del JSON
  const credentials = await getCredentials();

  const emailMatch    = emailVal === credentials.email;
  const passwordMatch = passwordVal === credentials.password;

  if (emailMatch && passwordMatch) {
    saveSession({ email: emailVal });
    window.location.href = 'dashboard.html';
  } else {
    generalError.textContent = 'Correo o contraseña incorrectos.';
    generalError.classList.add('visible');
    setInputState(emailInput, false);
    setInputState(passwordInput, false);
  }
});