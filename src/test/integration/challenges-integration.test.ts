import { Hono } from 'hono';
import { beforeAll, describe, expect, it } from 'vitest';

// Import the actual server routes
import challengesRoutes from '@/features/challenges/server/route';

describe('Challenges Integration Tests', () => {
  let app: Hono;

  beforeAll(async () => {
    app = new Hono();
    app.route('/challenges', challengesRoutes);
  });

  describe('GET /challenges', () => {
    it('should get all challenges', async () => {
      const response = await app.request('/challenges', {
        method: 'GET',
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should get challenges with filters', async () => {
      const response = await app.request('/challenges?difficulty=easy&category=javascript', {
        method: 'GET',
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('GET /challenges/:id', () => {
    it('should handle challenge not found', async () => {
      const response = await app.request('/challenges/550e8400-e29b-41d4-a716-446655440001', {
        method: 'GET',
      });

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toBe('Challenge not found');
    });
  });

  describe('POST /challenges', () => {
    it('should create a new challenge', async () => {
      const newChallenge = {
        title: 'Test Challenge',
        description: 'A test challenge',
        instructions: 'Complete this challenge',
        starterCode: 'function test() { return true; }',
        solution: 'function test() { return true; }',
        tests: [
          {
            name: 'Test 1',
            test: 'test()',
            description: 'Should return true',
          },
        ],
        category: 'javascript',
        difficulty: 'easy',
        language: 'javascript',
        timeLimit: 30,
        points: 10,
        order: 1,
        isActive: true,
        createdBy: '550e8400-e29b-41d4-a716-446655440000',
      };

      const response = await app.request('/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChallenge),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('title', newChallenge.title);
    });
  });



  describe('POST /challenges/run-tests', () => {
    it('should run tests without saving submission', async () => {
      const testData = {
        code: 'function test() { return true; }',
        tests: [
          {
            name: 'Test 1',
            test: 'test()',
            description: 'Should return true',
          },
        ],
      };

      const response = await app.request('/challenges/run-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
      }

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('results');
      expect(Array.isArray(data.results)).toBe(true);
    });
  });
});
