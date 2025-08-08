// Mobile-compatible API client
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-api-domain.com' // Replace with your production API URL
  : 'http://localhost:3002';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || API_BASE_URL;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Challenge methods
  async getChallenges() {
    return this.request('/challenges');
  }

  async getChallenge(id: string) {
    return this.request(`/challenges/${id}`);
  }

  async submitSolution(challengeId: string, solution: string) {
    return this.request(`/challenges/${challengeId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ solution }),
    });
  }

  // Class methods
  async getClasses() {
    return this.request('/classes');
  }

  async createClass(data: { name: string; description: string }) {
    return this.request('/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addStudentToClass(classId: string, studentId: string) {
    return this.request(`/classes/${classId}/students`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  }

  // User progress methods
  async getUserProgress() {
    return this.request('/user/progress');
  }
}

export const apiClient = new ApiClient(); 