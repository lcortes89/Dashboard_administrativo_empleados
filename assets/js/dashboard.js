// =============================================
// dashboard.js
// Módulo principal del dashboard Coéxito
// =============================================
 
import { getEmployees } from './api.js';
import { checkSession, clearSession } from './session.js';
 
// --- Selección de elementos del DOM ---
const logoutBtn      = document.getElementById('logoutBtn');
const filterButtons  = document.querySelector('.filter-buttons');
const employeesBody  = document.getElementById('employeesBody');
const loadingMsg     = document.getElementById('loading-msg');
const errorMsg       = document.getElementById('error-msg');
const emptyMsg       = document.getElementById('empty-msg');
const tableWrapper   = document.querySelector('.table-wrapper');
 
// --- Estado global ---
let allEmployees = [];
let activeFilter = 'TODOS';
 
// =============================================
// GUARD: Verificar sesión activa
// =============================================
checkSession();
 
// =============================================
// FUNCIÓN: Mostrar/ocultar secciones
// =============================================
function showLoading() {
  loadingMsg.style.display  = 'block';
  errorMsg.style.display    = 'none';
  emptyMsg.style.display    = 'none';
  tableWrapper.style.display = 'none';
}
 
function showError() {
  loadingMsg.style.display  = 'none';
  errorMsg.style.display    = 'block';
  emptyMsg.style.display    = 'none';
  tableWrapper.style.display = 'none';
}
 
function showEmpty() {
  loadingMsg.style.display  = 'none';
  errorMsg.style.display    = 'none';
  emptyMsg.style.display    = 'block';
  tableWrapper.style.display = 'none';
}
 
function showTable() {
  loadingMsg.style.display  = 'none';
  errorMsg.style.display    = 'none';
  emptyMsg.style.display    = 'none';
  tableWrapper.style.display = 'block';
}
 
// =============================================
// FUNCIÓN: Valor por defecto si campo vacío
// =============================================
function valueOrDefault(value) {
  if (!value || value.toString().trim() === '') {
    return '<span class="td-empty">N/D</span>';
  }
  return value;
}
 
// =============================================
// FUNCIÓN: Renderizar filas de la tabla
// =============================================
function renderEmployees(employees) {
  employeesBody.innerHTML = '';
 
  if (employees.length === 0) {
    showEmpty();
    return;
  }
 
  employees.forEach((emp) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${valueOrDefault(emp.name)}</td>
      <td>${valueOrDefault(emp.email)}</td>
      <td>${valueOrDefault(emp.address?.street)}</td>
      <td>${valueOrDefault(emp.address?.suite)}</td>
      <td>${valueOrDefault(emp.address?.city)}</td>
      <td>${valueOrDefault(emp.address?.zipcode)}</td>
    `;
    employeesBody.appendChild(row);
  });
 
  showTable();
}
 
// =============================================
// FUNCIÓN: Filtrar empleados por inicial
// =============================================
function filterByLetter(letter) {
  if (letter === 'TODOS') {
    renderEmployees(allEmployees);
    return;
  }
 
  const filtered = allEmployees.filter((emp) =>
    emp.name.toUpperCase().startsWith(letter)
  );
 
  renderEmployees(filtered);
}
 
// =============================================
// FUNCIÓN: Generar botones A-Z
// =============================================
function generateFilterButtons() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
 
  letters.forEach((letter) => {
    const btn = document.createElement('button');
    btn.classList.add('btn-filter');
    btn.dataset.letter = letter;
    btn.textContent = letter;
    btn.setAttribute('aria-pressed', 'false');
    filterButtons.appendChild(btn);
  });
}
 
// =============================================
// FUNCIÓN: Actualizar botón activo
// =============================================
function setActiveButton(letter) {
  const allBtns = filterButtons.querySelectorAll('.btn-filter');
  allBtns.forEach((btn) => {
    const isActive = btn.dataset.letter === letter;
    btn.classList.toggle('btn-filter--active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  activeFilter = letter;
}
 
// =============================================
// EVENTO: Clic en botones de filtro
// =============================================
filterButtons.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn-filter');
  if (!btn) return;
 
  const letter = btn.dataset.letter;
  setActiveButton(letter);
  filterByLetter(letter);
});
 
// =============================================
// EVENTO: Logout
// =============================================
logoutBtn.addEventListener('click', () => {
  clearSession();
});
 
// =============================================
// INICIO: Cargar empleados desde la API
// =============================================
async function init() {
  showLoading();
  generateFilterButtons();
 
  try {
    allEmployees = await getEmployees();
    renderEmployees(allEmployees);
  } catch (error) {
    console.error('Error al cargar empleados:', error);
    showError();
  }
}
 
init();