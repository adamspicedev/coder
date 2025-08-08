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

// Mock API client for testing
const mockApiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    // This will be mocked by MSW in tests
    const response = await fetch(`${MOCK_API_BASE_URL}${endpoint}`);
    return response.json();
  },
  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    // This will be mocked by MSW in tests
    const response = await fetch(`${MOCK_API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async <T>(endpoint: string, data: unknown): Promise<T> => {
    // This will be mocked by MSW in tests
    const response = await fetch(`http://localhost:3002${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    // This will be mocked by MSW in tests
    const response = await fetch(`http://localhost:3002${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

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
    const endpoint = query ? `/challenges?${query}` : '/challenges';
    
    return mockApiClient.get<Challenge[]>(endpoint);
  },

  // Get a specific challenge
  getChallenge: async (params: GetChallengeInput): Promise<Challenge> => {
    return mockApiClient.get<Challenge>(`/challenges/${params.id}`);
  },

  // Create a new challenge
  createChallenge: async (data: CreateChallengeInput): Promise<Challenge> => {
    return mockApiClient.post<Challenge>('/challenges', data);
  },

  // Update a challenge
  updateChallenge: async (data: UpdateChallengeInput): Promise<Challenge> => {
    return mockApiClient.put<Challenge>(`/challenges/${data.id}`, data);
  },

  // Delete a challenge
  deleteChallenge: async (params: DeleteChallengeInput): Promise<{ message: string }> => {
    return mockApiClient.delete<{ message: string }>(`/challenges/${params.id}`);
  },

  // Submit a solution
  submitChallenge: async (data: SubmitChallengeInput): Promise<SubmissionResult> => {
    return mockApiClient.post<SubmissionResult>(`/challenges/${data.challengeId}/submit`, data);
  },

  // Run tests without saving submission
  runTests: async (data: RunTestsInput): Promise<{ success: boolean; results: TestResult[] }> => {
    return mockApiClient.post<{ success: boolean; results: TestResult[] }>('/challenges/run-tests', data);
  },
};
