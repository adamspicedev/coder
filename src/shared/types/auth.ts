export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

export interface AuthResponse {
  user: User;
  token: string;
}
