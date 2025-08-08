import { client } from '@/server/rpc';
import type { AuthResponse, SignInCredentials, SignUpCredentials, User } from "@/shared/types/auth";

export const authApi = {
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    return client.api.auth.signin.$post.arguments(credentials).query();
  },

  signUp: async (credentials: SignUpCredentials): Promise<AuthResponse> => {
    return client.api.auth.signup.$post.arguments(credentials).query();
  },

  getCurrentUser: async (): Promise<User> => {
    return client.api.auth.session.$get.arguments().query();
  },

  signOut: async (): Promise<void> => {
    return client.api.auth.signout.$post.arguments({}).query();
  },
};
