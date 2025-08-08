import { describe, expect, it } from 'vitest';
import { authApi } from '../auth-api';

describe('Auth API', () => {
  describe('signIn', () => {
    it('should have the correct function signature', () => {
      expect(typeof authApi.signIn).toBe('function');
    });
  });

  describe('signUp', () => {
    it('should have the correct function signature', () => {
      expect(typeof authApi.signUp).toBe('function');
    });
  });

  describe('getCurrentUser', () => {
    it('should have the correct function signature', () => {
      expect(typeof authApi.getCurrentUser).toBe('function');
    });
  });

  describe('signOut', () => {
    it('should have the correct function signature', () => {
      expect(typeof authApi.signOut).toBe('function');
    });
  });
});
