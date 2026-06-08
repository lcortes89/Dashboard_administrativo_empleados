import { describe, it, expect } from 'vitest';

function filterByLetter(employees, letter) {
  if (letter === 'TODOS') return employees;
  return employees.filter((emp) =>
    emp.name.toUpperCase().startsWith(letter)
  );
}

const mockEmployees = [
  { name: 'Leanne Graham' },
  { name: 'Ervin Howell' },
  { name: 'Luisa Cortes' },
  { name: 'Antonio López' },
];

describe('filterByLetter', () => {
  it('debería retornar todos los empleados si la letra es TODOS', () => {
    const result = filterByLetter(mockEmployees, 'TODOS');
    expect(result.length).toBe(4);
  });

  it('debería retornar solo empleados cuyo nombre empiece por L', () => {
    const result = filterByLetter(mockEmployees, 'L');
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Leanne Graham');
    expect(result[1].name).toBe('Luisa Cortes');
  });

  it('debería retornar un array vacío si no hay coincidencias', () => {
    const result = filterByLetter(mockEmployees, 'Z');
    expect(result).toEqual([]);
  });

  it('debería ser insensible a mayúsculas/minúsculas', () => {
    const result = filterByLetter(mockEmployees, 'A');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Antonio López');
  });
});