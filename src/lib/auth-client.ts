// Simple auth client for mobile compatibility
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com' // Replace with your production API URL
  : 'http://localhost:3002';

export interface AuthClient {
  signIn: {
    email: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  };
  signOut: () => Promise<void>;
}

export const authClient: AuthClient = {
  signIn: {
    email: async ({ email, password }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          return { error: undefined };
        } else {
          return { error: data.error || 'Authentication failed' };
        }
      } catch (error) {
        return { error: 'Network error' };
      }
    },
  },
  signOut: async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/signout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },
};

// Export specific methods for easier use
export const { signIn, signOut } = authClient; 