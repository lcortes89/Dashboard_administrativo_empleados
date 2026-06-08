import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword } from '../assets/js/validators.js';

describe('Validaciones de Login', () => {

    describe('validateEmail', () => {
        it('debería retornar true para un email válido', () => {
            expect(validateEmail('test@ejemplo.com')).toBe(true);
        });

        it('debería retornar false para un email sin @', () => {
            expect(validateEmail('testejemplo.com')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('debería retornar true para password de 8 chars con dígito', () => {
            expect(validatePassword('pass1234')).toBe(true);
        });

        it('debería retornar false si tiene menos de 8 chars', () => {
            expect(validatePassword('p1')).toBe(false);
        });

        it('debería retornar false si no tiene ningún dígito', () => {
            expect(validatePassword('password')).toBe(false);
        });
    });
});