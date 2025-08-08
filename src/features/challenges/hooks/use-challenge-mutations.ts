import { useMutation, useQueryClient } from '@tanstack/react-query';
import { challengesApi } from '../api/challenges-api';

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: challengesApi.createChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: challengesApi.updateChallenge,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenge', data.id] });
    },
  });
};

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: challengesApi.deleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
};

export const useSubmitChallenge = () => {
  return useMutation({
    mutationFn: challengesApi.submitChallenge,
  });
};

export const useRunTests = () => {
  return useMutation({
    mutationFn: challengesApi.runTests,
  });
};
