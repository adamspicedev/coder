"use client";

import { Button } from '@/components/ui/button';
import type { Challenge } from '@/features/challenges/api/challenges-api';
import { ChallengeEditor } from '@/features/challenges/components/challenge-editor';
import { ChallengeList } from '@/features/challenges/components/challenge-list';
import { ChallengeSolver } from '@/features/challenges/components/challenge-solver';
import { ArrowLeft, Edit, Play, Plus } from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'list' | 'create' | 'edit' | 'solve';

export default function ChallengesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setViewMode('solve');
  };

  const handleCreateNew = () => {
    setSelectedChallenge(null);
    setViewMode('create');
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setViewMode('edit');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveChallenge = (_challenge: Challenge) => {
    setSelectedChallenge(null);
    setViewMode('list');
  };

  const handleCancel = () => {
    setSelectedChallenge(null);
    setViewMode('list');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'list':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Challenges</h1>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create Challenge
              </Button>
            </div>
            <ChallengeList
              onChallengeSelect={handleChallengeSelect}
              onCreateNew={handleCreateNew}
            />
          </div>
        );

      case 'create':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Button>
              <h1 className="text-3xl font-bold">Create New Challenge</h1>
            </div>
            <ChallengeEditor
              onSave={handleSaveChallenge}
              onCancel={handleCancel}
            />
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Button>
              <h1 className="text-3xl font-bold">Edit Challenge</h1>
            </div>
            <ChallengeEditor
              challenge={selectedChallenge!}
              onSave={handleSaveChallenge}
              onCancel={handleCancel}
            />
          </div>
        );

      case 'solve':
        return (
          <div className="h-screen">
            <div className="flex items-center space-x-4 p-6 border-b bg-white">
              <Button variant="outline" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{selectedChallenge?.title}</h1>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditChallenge(selectedChallenge!)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={() => setViewMode('solve')}>
                  <Play className="h-4 w-4 mr-2" />
                  Solve
                </Button>
              </div>
            </div>
            <ChallengeSolver challengeId={selectedChallenge!.id} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderContent()}
    </div>
  );
}
