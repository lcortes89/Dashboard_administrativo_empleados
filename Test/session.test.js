import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveSession, getSession, clearSession } from '../assets/js/session.js';

describe('Gestión de sesión', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('location', { href: '' });
  });

  it('saveSession debería guardar la sesión en localStorage', () => {
    saveSession({ email: 'admin@test.com' });
    const raw = localStorage.getItem('coexito_session');
    expect(raw).not.toBeNull();
  });

  it('getSession debería retornar la sesión guardada', () => {
    saveSession({ email: 'admin@test.com' });
    const session = getSession();
    expect(session).not.toBeNull();
    expect(session.active).toBe(true);
    expect(session.email).toBe('admin@test.com');
    expect(session).toHaveProperty('timestamp');
  });

  it('getSession debería retornar null si no hay sesión', () => {
    const session = getSession();
    expect(session).toBeNull();
  });

  it('clearSession debería eliminar la sesión del localStorage', () => {
    saveSession({ email: 'admin@test.com' });
    clearSession();
    const raw = localStorage.getItem('coexito_session');
    expect(raw).toBeNull();
  });
});