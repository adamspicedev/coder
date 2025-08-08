import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import type { Challenge } from '../api/challenges-api';
import { useChallenges } from '../hooks/use-challenges';

interface ChallengeListProps {
  classId?: string;
  onChallengeSelect?: (challenge: Challenge) => void;
  onCreateNew?: () => void;
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

type DifficultyFilter = 'easy' | 'medium' | 'hard' | 'all';

export const ChallengeList: React.FC<ChallengeListProps> = ({
  classId,
  onChallengeSelect,
  onCreateNew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: challenges, isLoading, error } = useChallenges({
    classId,
    isActive: true,
  });

  const filteredChallenges = challenges?.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = [...new Set(challenges?.map(c => c.category) || [])];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="mb-4">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-600">Error loading challenges: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Challenges</h2>
        {onCreateNew && (
          <Button onClick={onCreateNew}>
            Create Challenge
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search challenges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <div className="space-y-4">
        {filteredChallenges?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center">No challenges found</p>
            </CardContent>
          </Card>
        ) : (
          filteredChallenges?.map((challenge) => (
            <Card 
              key={challenge.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onChallengeSelect?.(challenge)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <div className="flex gap-2">
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
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{challenge.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Category: {challenge.category}</span>
                  <span>Order: {challenge.order}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
