// Components
export { ChallengeEditor } from './components/challenge-editor';
export { ChallengeList } from './components/challenge-list';
export { ChallengeSolver } from './components/challenge-solver';

// Hooks
export { useCreateChallenge, useDeleteChallenge, useRunTests, useSubmitChallenge, useUpdateChallenge } from './hooks/use-challenge-mutations';
export { useChallenge, useChallenges, useChallengesByCategory, useChallengesByClass, useChallengesByDifficulty } from './hooks/use-challenges';

// API
export { challengesApi } from './api/challenges-api';
export type { Challenge, SubmissionResult, TestResult } from './api/challenges-api';

// Schemas
export * from './schemas/challenge-schemas';

