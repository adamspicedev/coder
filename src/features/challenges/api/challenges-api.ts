import { client } from '@/server/rpc';
import type {
  CreateChallengeInput,
  DeleteChallengeInput,
  GetChallengeInput,
  GetChallengesInput,
  RunTestsInput,
  SubmitChallengeInput,
  UpdateChallengeInput
} from '../schemas/challenge-schemas';

export interface TestSchema {
  name: string;
  test: string;
  description?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  starterCode?: string;
  tests?: TestSchema[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language: string;
  points: number;
  timeLimit?: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface TestResult {
  name: string;
  passed: boolean;
  error: string | null;
  description?: string;
}

export interface SubmissionResult {
  success: boolean;
  results: TestResult[];
  submission?: {
    id: string;
    status: 'pending' | 'passed' | 'failed';
    submittedAt: string;
  };
}

export const challengesApi = {
  // Get all challenges with filtering
  getChallenges: async (params?: GetChallengesInput): Promise<Challenge[]> => {
    const searchParams = new URLSearchParams();
    
    if (params?.classId) searchParams.append('classId', params.classId);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.language) searchParams.append('language', params.language);
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    
    const query = searchParams.toString();
    const url = query ? `/challenges?${query}` : '/challenges';
    
    return client.api.challenges.$get.arguments(url).query();
  },

  // Get a specific challenge
  getChallenge: async (params: GetChallengeInput): Promise<Challenge> => {
    return client.api.challenges[':id'].$get.arguments(params.id).query();
  },

  // Create a new challenge
  createChallenge: async (data: CreateChallengeInput): Promise<Challenge> => {
    return client.api.challenges.$post.arguments(data).query();
  },

  // Update a challenge
  updateChallenge: async (data: UpdateChallengeInput): Promise<Challenge> => {
    return client.api.challenges[':id'].$put.arguments(data).query();
  },

  // Delete a challenge
  deleteChallenge: async (params: DeleteChallengeInput): Promise<{ message: string }> => {
    return client.api.challenges[':id'].$delete.arguments(params.id).query();
  },

  // Submit a solution
  submitChallenge: async (data: SubmitChallengeInput): Promise<SubmissionResult> => {
    return client.api.challenges[':id'].submit.$post.arguments(data).query();
  },

  // Run tests without saving submission
  runTests: async (data: RunTestsInput): Promise<{ success: boolean; results: TestResult[] }> => {
    return client.api.challenges['run-tests'].$post.arguments(data).query();
  },
};
