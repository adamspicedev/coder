'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface ChallengeEditorProps {
  challenge: Challenge;
  onSubmit: (code: string) => Promise<{ passed: boolean; results: any[] }>;
}

export function ChallengeEditor({ challenge, onSubmit }: ChallengeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [passed, setPassed] = useState<boolean | null>(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const testResults = await onSubmit(code);
      setResults(testResults.results);
      setPassed(testResults.passed);
    } catch (error) {
      console.error('Error running tests:', error);
      setResults([{ error: 'Failed to run tests' }]);
      setPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setResults([]);
    setPassed(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="text-sm text-gray-600">{challenge.category}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleReset} disabled={isRunning}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleRunTests} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Tests'}
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
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Test Results */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
          {passed !== null && (
            <div className="mt-2 flex items-center space-x-2">
              {passed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'All tests passed!' : 'Some tests failed'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto p-6">
          {results.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Play className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Click "Run Tests" to see your results</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Test {index + 1}</CardTitle>
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {result.error ? (
                      <p className="text-sm text-red-600">{result.error}</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Input:</span> {result.input}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Expected:</span> {result.expected}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Output:</span> {result.output}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 