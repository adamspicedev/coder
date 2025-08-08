import { db } from '@/db';
import { challenges, submissions, users } from '@/db/schema';
import { and, asc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import {
  createChallengeSchema,
  deleteChallengeSchema,
  getChallengeSchema,
  getChallengesSchema,
  runTestsSchema,
  submitChallengeSchema,
  updateChallengeSchema
} from '../schemas/challenge-schemas';

const app = new Hono().get('/', async (c) => {
  // GET /challenges - Get all challenges with filtering
  try {
    const query = c.req.query();
    const validatedQuery = getChallengesSchema.parse(query);
    
    const conditions = [];
    
    if (validatedQuery.classId) {
      conditions.push(eq(challenges.classId, validatedQuery.classId));
    }
    
    if (validatedQuery.difficulty) {
      conditions.push(eq(challenges.difficulty, validatedQuery.difficulty));
    }
    
    if (validatedQuery.category) {
      conditions.push(eq(challenges.category, validatedQuery.category));
    }
    
    if (validatedQuery.language) {
      conditions.push(eq(challenges.language, validatedQuery.language));
    }
    
    if (validatedQuery.isActive !== undefined) {
      conditions.push(eq(challenges.isActive, validatedQuery.isActive));
    }
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    const result = await db
      .select({
        id: challenges.id,
        title: challenges.title,
        description: challenges.description,
        difficulty: challenges.difficulty,
        category: challenges.category,
        language: challenges.language,
        points: challenges.points,
        timeLimit: challenges.timeLimit,
        order: challenges.order,
        isActive: challenges.isActive,
        createdAt: challenges.createdAt,
        updatedAt: challenges.updatedAt,
        createdBy: users.name,
      })
      .from(challenges)
      .leftJoin(users, eq(challenges.createdBy, users.id))
      .where(whereClause)
      .orderBy(asc(challenges.order))
      .limit(validatedQuery.limit || 50)
      .offset(validatedQuery.offset || 0);
    
    return c.json(result);
  } catch (error) {
    return handleError(error, c);
  }
}).get('/:id', async (c) => {
  // GET /challenges/:id - Get a specific challenge
  try {
    const id = c.req.param('id');
    const validatedId = getChallengeSchema.parse({ id });
    
    const result = await db
      .select({
        id: challenges.id,
        title: challenges.title,
        description: challenges.description,
        instructions: challenges.instructions,
        starterCode: challenges.starterCode,
        tests: challenges.tests,
        difficulty: challenges.difficulty,
        category: challenges.category,
        language: challenges.language,
        points: challenges.points,
        timeLimit: challenges.timeLimit,
        order: challenges.order,
        isActive: challenges.isActive,
        createdAt: challenges.createdAt,
        updatedAt: challenges.updatedAt,
        createdBy: users.name,
      })
      .from(challenges)
      .leftJoin(users, eq(challenges.createdBy, users.id))
      .where(eq(challenges.id, validatedId.id))
      .limit(1);
    
    if (result.length === 0) {
      return c.json({ error: 'Challenge not found' }, 404);
    }
    
    return c.json(result[0]);
  } catch (error) {
    return handleError(error, c);
  }
}).post('/', async (c) => {
  // POST /challenges - Create a new challenge
  try {
    const body = await c.req.json();
    const validatedData = createChallengeSchema.parse(body);
    
    // TODO: Get current user from auth context
    const currentUserId = '41bfb891-4a06-401c-a959-35e75faf5cbf'; // Default admin user
    
    const result = await db
      .insert(challenges)
      .values({
        ...validatedData,
        createdBy: currentUserId,
      })
      .returning();
    
    return c.json(result[0], 201);
  } catch (error) {
    return handleError(error, c);
  }
}).put('/:id', async (c) => {
  // PUT /challenges/:id - Update a challenge
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = updateChallengeSchema.parse({ ...body, id });
    
    const result = await db
      .update(challenges)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(challenges.id, validatedData.id))
      .returning();
    
    if (result.length === 0) {
      return c.json({ error: 'Challenge not found' }, 404);
    }
    
    return c.json(result[0]);
  } catch (error) {
    return handleError(error, c);
  }
}).delete('/:id', async (c) => {
    // DELETE /challenges/:id - Delete a challenge
  try {
    const id = c.req.param('id');
    const validatedId = deleteChallengeSchema.parse({ id });
    
    const result = await db
      .delete(challenges)
      .where(eq(challenges.id, validatedId.id))
      .returning();
    
    if (result.length === 0) {
      return c.json({ error: 'Challenge not found' }, 404);
    }
    
    return c.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    return handleError(error, c);
  }
}).post('/:id/submit', async (c) => {
    // POST /challenges/:id/submit - Submit a solution
  try {
    const challengeId = c.req.param('id');
    const body = await c.req.json();
    const validatedData = submitChallengeSchema.parse({ ...body, challengeId });
    
    // Get the challenge and its tests
    const challenge = await db
      .select({
        id: challenges.id,
        tests: challenges.tests,
      })
      .from(challenges)
      .where(eq(challenges.id, validatedData.challengeId))
      .limit(1);
    
    if (challenge.length === 0) {
      return c.json({ error: 'Challenge not found' }, 404);
    }
    
    // Run tests
    const testResults = runTests(validatedData.code, challenge[0].tests as unknown[]);
    const allPassed = testResults.every(result => result.passed);
    
    // TODO: Get current user from auth context
    const currentUserId = '41bfb891-4a06-401c-a959-35e75faf5cbf'; // Default admin user
    
    // Save submission
    const submission = await db
      .insert(submissions)
      .values({
        challengeId: validatedData.challengeId,
        studentId: currentUserId,
        code: validatedData.code,
        status: allPassed ? 'passed' : 'failed',
        testResults,
      })
      .returning();
    
    return c.json({
      success: allPassed,
      results: testResults,
      submission: submission[0],
    });
  } catch (error) {
    return handleError(error, c);
  }
}).post('/run-tests', async (c) => {
    // POST /challenges/run-tests - Run tests without saving submission
  try {
    const body = await c.req.json();
    const validatedData = runTestsSchema.parse(body);
    
    const testResults = runTests(validatedData.code, validatedData.tests);
    const allPassed = testResults.every(result => result.passed);
    
    return c.json({
      success: allPassed,
      results: testResults,
    });
  } catch (error) {
    return handleError(error, c);
  }
});

export default app;

// Helper function to run tests safely
function runTests(code: string, tests: unknown[]): Array<{
  name: string;
  passed: boolean;
  error: string | null;
  description?: string;
}> {
  return tests.map((test: unknown) => {
    try {
      // Create a safe evaluation context
      const testObj = test as { test: string; name: string; description?: string };
      const testFunction = new Function('solution', `return ${testObj.test}`);
      const result = testFunction(code);
      return {
        name: testObj.name,
        passed: result === true,
        error: null,
        description: testObj.description
      };
    } catch (error) {
      const testObj = test as { name: string; description?: string };
      return {
        name: testObj.name,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        description: testObj.description
      };
    }
  });
}

// Helper function to handle errors consistently
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: unknown, c: any) {
  if (error instanceof Error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json({ error: 'Internal server error' }, 500);
}