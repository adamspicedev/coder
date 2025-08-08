import { http } from 'msw';
import { server } from '../setup';

export const createMockChallenge = (overrides = {}) => ({
  id: '1',
  title: 'Test Challenge',
  description: 'A test challenge',
  instructions: 'Complete this challenge',
  starterCode: 'function test() { return true; }',
  solution: 'function test() { return true; }',
  tests: [
    {
      id: '1',
      name: 'Test 1',
      input: 'test()',
      expectedOutput: 'true',
      isHidden: false,
    },
  ],
  category: 'javascript',
  difficulty: 'easy',
  language: 'javascript',
  timeLimit: 30,
  points: 10,
  order: 1,
  isActive: true,
  createdBy: '41bfb891-4a06-401c-a959-35e75faf5cbf',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '41bfb891-4a06-401c-a959-35e75faf5cbf',
  name: 'Test User',
  email: 'test@example.com',
  role: 'student',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockSubmission = (overrides = {}) => ({
  id: '1',
  challengeId: '1',
  userId: '41bfb891-4a06-401c-a959-35e75faf5cbf',
  solution: 'function test() { return true; }',
  isCorrect: true,
  score: 10,
  submittedAt: new Date().toISOString(),
  ...overrides,
});

export const setupAuthHandlers = () => {
  server.use(
    http.post('*/auth/signin', () => {
      return Response.json({
        user: createMockUser(),
        token: 'mock-jwt-token',
      });
    }),
    http.post('*/auth/signup', () => {
      return Response.json({
        user: createMockUser(),
        token: 'mock-jwt-token',
      });
    }),
    http.get('*/auth/session', () => {
      return Response.json({ user: createMockUser() });
    }),
    http.post('*/auth/signout', () => {
      return Response.json({ success: true });
    })
  );
};

export const setupChallengeHandlers = () => {
  server.use(
    http.get('*/challenges', () => {
      return Response.json([createMockChallenge()]);
    }),
    http.get('*/challenges/:id', ({ params }) => {
      const { id } = params;
      return Response.json(createMockChallenge({ id: id as string }));
    }),
    http.post('*/challenges', () => {
      return Response.json(createMockChallenge());
    }),
    http.put('*/challenges/:id', ({ params }) => {
      const { id } = params;
      return Response.json(createMockChallenge({ id: id as string }));
    }),
    http.delete('*/challenges/:id', () => {
      return Response.json({ success: true });
    }),
    http.post('*/challenges/:id/submit', () => {
      return Response.json({
        id: '1',
        challengeId: '1',
        success: true,
        results: [
          {
            testId: '1',
            name: 'Test 1',
            passed: true,
            output: 'true',
            expectedOutput: 'true',
          },
        ],
        allPassed: true,
      });
    }),
    http.post('*/challenges/run-tests', () => {
      return Response.json({
        success: true,
        results: [
          {
            testId: '1',
            name: 'Test 1',
            passed: true,
            output: 'true',
            expectedOutput: 'true',
          },
        ],
        allPassed: true,
      });
    })
  );
};

export const setupDashboardHandlers = () => {
  server.use(
    http.get('*/dashboard/stats', () => {
      return Response.json({
        totalChallenges: 10,
        completedChallenges: 5,
        totalStudents: 20,
        averageScore: 85,
      });
    }),
    http.get('*/dashboard/activity', () => {
      return Response.json([
        {
          id: '1',
          type: 'challenge_completed',
          title: 'Challenge Completed',
          description: 'User completed a challenge',
          timestamp: new Date().toISOString(),
        },
      ]);
    })
  );
};
