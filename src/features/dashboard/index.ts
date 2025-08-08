// Components
export { DashboardContent } from "./components/dashboard-content";
export { DashboardStats } from "./components/dashboard-stats";
export { RecentActivity } from "./components/recent-activity";

// Hooks
export { useCurrentUser, useDashboardStats, useRecentActivity } from "./hooks/use-dashboard";

// API
export { dashboardApi } from "./api/dashboard-api";
export type { DashboardStats as DashboardStatsType, RecentActivity as RecentActivityType } from "./api/dashboard-api";

