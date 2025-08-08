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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (client.api as any).dashboard.stats.$get();
    return response.json();
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (client.api as any).dashboard.activity.$get();
    return response.json();
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await client.api.auth.session.$get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await response.json() as any;
    return data.user;
  },
};
