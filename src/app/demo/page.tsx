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
  testCases: [
    {
      input: "helloWorld()",
      expectedOutput: "Hello, World!",
      description: "Should return 'Hello, World!'",
    },
  ],
};

export default function DemoPage() {
  return <ChallengeEditor challenge={mockChallenge} />;
} 