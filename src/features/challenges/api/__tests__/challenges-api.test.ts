import { describe, expect, it } from 'vitest';
import { challengesApi } from '../challenges-api';

describe('Challenges API', () => {
  describe('getChallenges', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.getChallenges).toBe('function');
    });
  });

  describe('getChallenge', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.getChallenge).toBe('function');
    });
  });

  describe('createChallenge', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.createChallenge).toBe('function');
    });
  });

  describe('updateChallenge', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.updateChallenge).toBe('function');
    });
  });

  describe('deleteChallenge', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.deleteChallenge).toBe('function');
    });
  });

  describe('submitChallenge', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.submitChallenge).toBe('function');
    });
  });

  describe('runTests', () => {
    it('should have the correct function signature', () => {
      expect(typeof challengesApi.runTests).toBe('function');
    });
  });
});
