import type { User } from "@/shared/types/auth";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth-api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (): User | null => {
  const { data: user } = useAuth();
  return user || null;
};

export const useIsAuthenticated = (): boolean => {
  const { data: user } = useAuth();
  return !!user;
};
