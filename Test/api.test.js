import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getEmployees } from '../assets/js/api.js';

describe('getEmployees', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería retornar un array de empleados con la estructura esperada', async () => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
        },
      },
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockEmployees,
    }));

    const result = await getEmployees();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('email');
    expect(result[0].address).toHaveProperty('street');
    expect(result[0].address).toHaveProperty('suite');
    expect(result[0].address).toHaveProperty('city');
    expect(result[0].address).toHaveProperty('zipcode');
  });

  it('debería lanzar un error si la API falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(getEmployees()).rejects.toThrow('Error al conectar con la API: 500');
  });
});