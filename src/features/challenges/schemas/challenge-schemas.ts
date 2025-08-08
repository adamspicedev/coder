import { z } from 'zod';

export const testSchema = z.object({
  name: z.string().min(1, 'Test name is required'),
  test: z.string().min(1, 'Test code is required'),
  description: z.string().optional(),
});

export const createChallengeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  instructions: z.string().min(1, 'Instructions are required'),
  starterCode: z.string().min(1, 'Starter code is required'),
  solution: z.string().min(1, 'Solution is required'),
  tests: z.array(testSchema).min(1, 'At least one test is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.string().min(1, 'Category is required'),
  language: z.string().min(1, 'Language is required').default('javascript'),
  timeLimit: z.number().positive().optional(),
  points: z.number().positive().default(10),
  order: z.number().int().positive(),
  classId: z.string().uuid().optional(),
});

export const updateChallengeSchema = createChallengeSchema.partial().extend({
  id: z.string().uuid(),
  isActive: z.boolean().optional(),
});

export const getChallengesSchema = z.object({
  classId: z.string().uuid().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  category: z.string().optional(),
  language: z.string().optional(),
  isActive: z.boolean().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const getChallengeSchema = z.object({
  id: z.string().uuid(),
});

export const deleteChallengeSchema = z.object({
  id: z.string().uuid(),
});

export const submitChallengeSchema = z.object({
  challengeId: z.string().uuid(),
  code: z.string().min(1, 'Code is required'),
});

export const runTestsSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  tests: z.array(testSchema),
});

// Type exports
export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeInput = z.infer<typeof updateChallengeSchema>;
export type GetChallengesInput = z.infer<typeof getChallengesSchema>;
export type GetChallengeInput = z.infer<typeof getChallengeSchema>;
export type DeleteChallengeInput = z.infer<typeof deleteChallengeSchema>;
export type SubmitChallengeInput = z.infer<typeof submitChallengeSchema>;
export type RunTestsInput = z.infer<typeof runTestsSchema>;
export type TestSchema = z.infer<typeof testSchema>;
