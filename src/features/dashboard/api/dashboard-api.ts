import { client } from '@/server/rpc';
import type { User } from "@/shared/types/auth";

export interface DashboardStats {
  totalChallenges: number;
  completedChallenges: number;
  totalStudents?: number;
  averageScore: number;
}

export interface RecentActivity {
  id: string;
  type: "challenge_completed" | "challenge_started" | "class_created";
  title: string;
  description: string;
  timestamp: string;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return client.api.dashboard.stats.$get.arguments().query();
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    return client.api.dashboard.activity.$get.arguments().query();
  },

  getCurrentUser: async (): Promise<User> => {
    return client.api.auth.session.$get.arguments().query();
  },
};
