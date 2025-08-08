'use client';

import { ChallengeEditor } from "@/features/challenges";

// Mock challenge data for demo
const mockChallenge = {
  id: "demo-1",
  title: "Hello World Function",
  description: "Create a function that returns 'Hello, World!'",
  instructions: "Write a function called 'helloWorld' that returns the string 'Hello, World!' when called.",
  starterCode: `function helloWorld() {
  // Write your code here
}`,
  difficulty: "easy" as const,
  category: "JavaScript Basics",
  language: "javascript",
  points: 10,
  timeLimit: 30,
  order: 1,
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  createdBy: "demo-user",
  tests: [
    {
      name: "Test 1",
      test: "helloWorld()",
      description: "Should return 'Hello, World!'",
    },
  ],
};

export default function DemoPage() {
  return <ChallengeEditor challenge={mockChallenge} />;
} 