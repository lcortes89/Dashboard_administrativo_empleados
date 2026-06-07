const SESSION_KEY = 'coexito_session';
 
/**
 * Guarda la sesión del usuario en localStorage.
 * Escenario 1: Login exitoso
 * @param {{ email: string }} userData
 */
export function saveSession(userData) {
  const session = {
    active: true,
    email: userData.email,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
 
/**
 * Obtiene la sesión activa del localStorage.
 * @returns {{ active: boolean, email: string, timestamp: string } | null}
 */
export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
 
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
 
/**
 * Verifica si hay sesión activa.
 * Escenario 3: Acceso sin sesión — redirige al login.
 * Usado en login.html: si ya hay sesión, va al dashboard.
 */
export function checkSession() {
  const session = getSession();
 
  const isLoginPage = window.location.pathname.includes('index.html')
    || window.location.pathname === '/'
    || window.location.pathname.endsWith('/');
 
  if (isLoginPage && session?.active) {
    // Ya tiene sesión, redirige al dashboard
    window.location.href = 'dashboard.html';
  }
 
  if (!isLoginPage && !session?.active) {
    // Sin sesión en ruta protegida, redirige al login
    window.location.href = 'index.html';
  }
}
 
/**
 * Cierra la sesión eliminando los datos del localStorage.
 * Escenario 5: Logout
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}