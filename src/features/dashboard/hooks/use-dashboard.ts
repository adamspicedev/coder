import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard-api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: dashboardApi.getRecentActivity,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: dashboardApi.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
