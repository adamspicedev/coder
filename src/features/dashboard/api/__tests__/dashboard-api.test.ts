import { describe, expect, it } from 'vitest';
import { dashboardApi } from '../dashboard-api';

describe('Dashboard API', () => {
  describe('getStats', () => {
    it('should have the correct function signature', () => {
      expect(typeof dashboardApi.getStats).toBe('function');
    });
  });

  describe('getRecentActivity', () => {
    it('should have the correct function signature', () => {
      expect(typeof dashboardApi.getRecentActivity).toBe('function');
    });
  });

  describe('getCurrentUser', () => {
    it('should have the correct function signature', () => {
      expect(typeof dashboardApi.getCurrentUser).toBe('function');
    });
  });
});
