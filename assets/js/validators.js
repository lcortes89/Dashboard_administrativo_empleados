export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que la contraseña tenga al menos 8 caracteres y un dígito.
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  return password.length >= 8 && /\d/.test(password);
}