import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth-api";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.setQueryData(["auth"], data.user);
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      console.error("Sign in error:", error);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      console.log("Sign up success:", data);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.setQueryData(["auth"], data.user);
      router.push("/auth/signin?message=Account created successfully");
    },
    onError: (error: unknown) => {
      console.error("Sign up error:", error);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      // Clear auth data
      queryClient.setQueryData(["auth"], null);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/auth/signin");
    },
    onError: (error: unknown) => {
      console.error("Sign out error:", error);
    },
  });
};
