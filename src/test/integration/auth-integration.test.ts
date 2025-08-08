import { Hono } from 'hono';
import { beforeAll, describe, expect, it } from 'vitest';

// Import the actual server routes
import authRoutes from '@/features/auth/server/route';

describe('Auth Integration Tests', () => {
  let app: Hono;

  beforeAll(async () => {
    app = new Hono();
    app.route('/auth', authRoutes);
  });

  describe('POST /auth/signin', () => {
    it('should sign in user with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await app.request('/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token');
    });

    it('should reject signin with missing credentials', async () => {
      const response = await app.request('/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          // Missing password
        }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing email or password');
    });
  });

  describe('POST /auth/signup', () => {
    it('should sign up new user successfully', async () => {
      const credentials = {
        name: 'New User',
        email: `newuser-${Date.now()}@example.com`,
        password: 'password123',
        role: 'student',
      };

      const response = await app.request('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token');
    });

    it('should reject signup with missing required fields', async () => {
      const response = await app.request('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New User',
          // Missing email and password
        }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing required fields');
    });
  });

  describe('GET /auth/session', () => {
    it('should return mock session data', async () => {
      const response = await app.request('/auth/session', {
        method: 'GET',
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('id');
      expect(data.user).toHaveProperty('name');
      expect(data.user).toHaveProperty('email');
      expect(data.user).toHaveProperty('role');
    });
  });

  describe('POST /auth/signout', () => {
    it('should sign out successfully', async () => {
      const response = await app.request('/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });
});
