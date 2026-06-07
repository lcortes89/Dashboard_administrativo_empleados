export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
 
/**
 * Valida que la contraseña no esté vacía.
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  return password.trim().length > 0;
}