import { client } from '@/server/rpc';
import type { AuthResponse, SignInCredentials, SignUpCredentials, User } from "@/shared/types/auth";

export const authApi = {
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    const response = await client.api.auth.signin.$post({ json: credentials });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.json() as any;
  },

  signUp: async (credentials: SignUpCredentials): Promise<AuthResponse> => {
    const response = await client.api.auth.signup.$post({ json: credentials });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.json() as any;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await client.api.auth.session.$get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await response.json() as any;
    return data.user;
  },

  signOut: async (): Promise<void> => {
    await client.api.auth.signout.$post({ json: {} });
  },
};
