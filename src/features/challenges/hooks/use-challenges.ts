import { useQuery } from '@tanstack/react-query';
import { challengesApi } from '../api/challenges-api';
import type { GetChallengeInput, GetChallengesInput } from '../schemas/challenge-schemas';

export const useChallenges = (params?: GetChallengesInput) => {
  return useQuery({
    queryKey: ['challenges', params],
    queryFn: () => challengesApi.getChallenges(params),
  });
};

export const useChallenge = (params: GetChallengeInput) => {
  return useQuery({
    queryKey: ['challenge', params.id],
    queryFn: () => challengesApi.getChallenge(params),
    enabled: !!params.id,
  });
};

export const useChallengesByClass = (classId: string) => {
  return useChallenges({ classId, isActive: true });
};

export const useChallengesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return useChallenges({ difficulty, isActive: true });
};

export const useChallengesByCategory = (category: string) => {
  return useChallenges({ category, isActive: true });
};
