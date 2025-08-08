"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Play, RotateCcw, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useRunTests, useSubmitChallenge } from '../hooks/use-challenge-mutations';
import { useChallenge } from '../hooks/use-challenges';

interface ChallengeSolverProps {
  challengeId: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
} as const;

const languageColors = {
  javascript: 'bg-yellow-100 text-yellow-800',
  python: 'bg-blue-100 text-blue-800',
  java: 'bg-orange-100 text-orange-800',
  cpp: 'bg-purple-100 text-purple-800',
} as const;

export const ChallengeSolver: React.FC<ChallengeSolverProps> = ({ challengeId }) => {
  const [code, setCode] = useState('');
  const { data: challenge, isLoading, error } = useChallenge({ id: challengeId });
  const submitChallenge = useSubmitChallenge();
  const runTests = useRunTests();

  React.useEffect(() => {
    if (challenge?.starterCode) {
      setCode(challenge.starterCode);
    }
  }, [challenge]);

  const handleRunTests = async () => {
    if (!challenge?.tests) return;
    
    try {
      await runTests.mutateAsync({
        code,
        tests: challenge.tests,
      });
    } catch (error) {
      console.error('Error running tests:', error);
    }
  };

  const handleSubmit = async () => {
    if (!challenge) return;
    
    try {
      await submitChallenge.mutateAsync({
        challengeId: challenge.id,
        code,
      });
    } catch (error) {
      console.error('Error submitting challenge:', error);
    }
  };

  const handleReset = () => {
    if (challenge?.starterCode) {
      setCode(challenge.starterCode);
    }
    submitChallenge.reset();
    runTests.reset();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-600">Error loading challenge: {error?.message || 'Challenge not found'}</p>
        </CardContent>
      </Card>
    );
  }

  const getTestResults = () => {
    return runTests.data || submitChallenge.data;
  };

  const testResults = getTestResults();
  const allPassed = testResults?.success;

  return (
    <div className="h-screen flex">
      {/* Left Panel - Challenge Info & Editor */}
      <div className="flex-1 flex flex-col">
        {/* Challenge Header */}
        <div className="border-b bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className={difficultyColors[challenge.difficulty]}>
                  {challenge.difficulty}
                </Badge>
                <Badge className={languageColors[challenge.language as keyof typeof languageColors] || 'bg-gray-100 text-gray-800'}>
                  {challenge.language}
                </Badge>
                <Badge variant="outline">
                  {challenge.points} pts
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleReset} disabled={submitChallenge.isPending || runTests.isPending}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleRunTests} disabled={runTests.isPending}>
                <Play className="h-4 w-4 mr-2" />
                {runTests.isPending ? "Running..." : "Run Tests"}
              </Button>
              <Button onClick={handleSubmit} disabled={submitChallenge.isPending}>
                <Play className="h-4 w-4 mr-2" />
                {submitChallenge.isPending ? "Submitting..." : "Submit Solution"}
              </Button>
            </div>
          </div>
          <p className="text-gray-600">{challenge.description}</p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-6 border-b">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{challenge.instructions}</p>
        </div>

        {/* Code Editor */}
        <div className="flex-1 bg-gray-900 p-6">
          <div className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Code Editor</h3>
              <div className="text-xs text-gray-400">{challenge.language}</div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-800 text-green-400 font-mono text-sm p-4 rounded border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Write your code here..."
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Test Results */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>

          {(runTests.isPending || submitChallenge.isPending) && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Running tests...</p>
            </div>
          )}

          {(runTests.error || submitChallenge.error) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">Failed to run tests</span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                {(runTests.error || submitChallenge.error)?.message || "An error occurred while running tests"}
              </p>
            </div>
          )}

          {testResults && (
            <div className="space-y-4">
              {/* Overall Result */}
              <div
                className={`p-4 rounded-md ${
                  allPassed
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center">
                  {allPassed ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span
                    className={`font-semibold ${
                      allPassed ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {allPassed ? "All Tests Passed!" : "Some Tests Failed"}
                  </span>
                </div>
              </div>

              {/* Individual Test Results */}
              <div className="space-y-3">
                {testResults.results?.map((result, index) => (
                  <Card key={index} className="border-l-4 border-l-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{result.name}</span>
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                      )}
                      {!result.passed && result.error && (
                        <div className="text-xs text-red-600">
                          <span className="font-medium">Error:</span> {result.error}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!testResults && !runTests.isPending && !submitChallenge.isPending && !runTests.error && !submitChallenge.error && (
            <div className="text-center text-gray-500 py-8">
              <Play className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Click "Run Tests" to execute your code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
