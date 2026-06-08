// =============================================
// api.js
// Módulo de consumo de API de empleados
// =============================================

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Obtiene la lista de empleados desde la API.
 * @returns {Promise<Array>} Lista de empleados
 */
export async function getEmployees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error al conectar con la API: ${response.status}`);
  }

  const employees = await response.json();
  return employees;
}