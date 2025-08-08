"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import type { Challenge, TestSchema } from '../api/challenges-api';
import { useCreateChallenge, useUpdateChallenge } from '../hooks/use-challenge-mutations';

interface ChallengeEditorProps {
  challenge?: Challenge;
  onSave?: (challenge: Challenge) => void;
  onCancel?: () => void;
}

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
] as const;

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
] as const;

export const ChallengeEditor: React.FC<ChallengeEditorProps> = ({
  challenge,
  onSave,
  onCancel,
}) => {
  const isEditing = !!challenge;
  const createMutation = useCreateChallenge();
  const updateMutation = useUpdateChallenge();
  
  const [tests, setTests] = useState<TestSchema[]>(
    challenge?.tests || [{ name: '', test: '', description: '' }]
  );

  const form = useForm({
    defaultValues: {
      title: challenge?.title || '',
      description: challenge?.description || '',
      instructions: challenge?.instructions || '',
      starterCode: challenge?.starterCode || '',
      solution: '',
      difficulty: challenge?.difficulty || 'easy',
      category: challenge?.category || '',
      language: challenge?.language || 'javascript',
      points: challenge?.points || 10,
      order: challenge?.order || 1,
    },
    onSubmitInvalid: ({ value }) => {
      console.log('Invalid form submission:', value);
    },
    onSubmit: async ({ value }) => {
      try {
        const challengeData = {
          ...value,
          tests,
        };

        if (isEditing) {
          const result = await updateMutation.mutateAsync({
            ...challengeData,
            id: challenge!.id,
          });
          onSave?.(result);
        } else {
          const result = await createMutation.mutateAsync(challengeData);
          onSave?.(result);
        }
      } catch (error) {
        console.error('Error saving challenge:', error);
      }
    },
  });

  const addTest = () => {
    setTests([...tests, { name: '', test: '', description: '' }]);
  };

  const removeTest = (index: number) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const updateTest = (index: number, field: keyof TestSchema, value: string) => {
    const newTests = [...tests];
    newTests[index] = { ...newTests[index], [field]: value };
    setTests(newTests);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Challenge' : 'Create New Challenge'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
                             <form.Field
                 name="title"
                 validators={{
                   onChange: ({ value }) => {
                     if (!value) return 'Title is required';
                     if (value.length > 100) return 'Title must be less than 100 characters';
                     return undefined;
                   },
                 }}
               >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Challenge title"
                    className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                  />
                )}
              </form.Field>
              <form.Field name="title">
                {(field) => 
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                  ) : null
                }
              </form.Field>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
                             <form.Field
                 name="category"
                 validators={{
                   onChange: ({ value }) => {
                     if (!value) return 'Category is required';
                     return undefined;
                   },
                 }}
               >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Variables, Functions, Arrays"
                    className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                  />
                )}
              </form.Field>
              <form.Field name="category">
                {(field) => 
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                  ) : null
                }
              </form.Field>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
                               <form.Field name="difficulty">
                   {(field) => (
                     <select
                       value={field.state.value}
                       onChange={(e) => field.handleChange(e.target.value as 'easy' | 'medium' | 'hard')}
                       className="w-full border rounded-md px-3 py-2"
                     >
                       {difficultyOptions.map((option) => (
                         <option key={option.value} value={option.value}>
                           {option.label}
                         </option>
                       ))}
                     </select>
                   )}
                 </form.Field>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <form.Field name="language">
                {(field) => (
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </form.Field>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Points</label>
                             <form.Field
                 name="points"
                 validators={{
                   onChange: ({ value }) => {
                     if (value < 1 || value > 100) return 'Points must be between 1 and 100';
                     return undefined;
                   },
                 }}
               >
                {(field) => (
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    type="number"
                    min="1"
                    max="100"
                    className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                  />
                )}
              </form.Field>
              <form.Field name="points">
                {(field) => 
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                  ) : null
                }
              </form.Field>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
                         <form.Field
               name="description"
               validators={{
                 onChange: ({ value }) => {
                   if (!value) return 'Description is required';
                   if (value.length > 500) return 'Description must be less than 500 characters';
                   return undefined;
                 },
               }}
             >
              {(field) => (
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Brief description of the challenge"
                  rows={3}
                  className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => 
                field.state.meta.errors.length > 0 ? (
                  <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                ) : null
              }
            </form.Field>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Instructions</label>
                         <form.Field
               name="instructions"
               validators={{
                 onChange: ({ value }) => {
                   if (!value) return 'Instructions are required';
                   return undefined;
                 },
               }}
             >
              {(field) => (
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Detailed instructions for the challenge"
                  rows={4}
                  className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                />
              )}
            </form.Field>
            <form.Field name="instructions">
              {(field) => 
                field.state.meta.errors.length > 0 ? (
                  <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                ) : null
              }
            </form.Field>
          </div>

          {/* Code Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Starter Code</label>
                               <form.Field
                   name="starterCode"
                   validators={{
                     onChange: ({ value }) => {
                       if (!value) return 'Starter code is required';
                       return undefined;
                     },
                   }}
                 >
                {(field) => (
                  <Textarea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="function solution() {\n  // Your code here\n}"
                    rows={8}
                    className="font-mono text-sm"
                  />
                )}
              </form.Field>
              <form.Field name="starterCode">
                {(field) => 
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                  ) : null
                }
              </form.Field>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Solution</label>
                               <form.Field
                   name="solution"
                   validators={{
                     onChange: ({ value }) => {
                       if (!value) return 'Solution is required';
                       return undefined;
                     },
                   }}
                 >
                {(field) => (
                  <Textarea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="function solution() {\n  return true;\n}"
                    rows={8}
                    className="font-mono text-sm"
                  />
                )}
              </form.Field>
              <form.Field name="solution">
                {(field) => 
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                  ) : null
                }
              </form.Field>
            </div>
          </div>

          {/* Tests Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Tests</label>
              <Button type="button" onClick={addTest} variant="outline" size="sm">
                Add Test
              </Button>
            </div>

            <div className="space-y-4">
              {tests.map((test, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Name</label>
                      <Input
                        value={test.name}
                        onChange={(e) => updateTest(index, 'name', e.target.value)}
                        placeholder="should return correct result"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Code</label>
                      <Input
                        value={test.test}
                        onChange={(e) => updateTest(index, 'test', e.target.value)}
                        placeholder="solution() === true"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                    <Input
                      value={test.description || ''}
                      onChange={(e) => updateTest(index, 'description', e.target.value)}
                      placeholder="What this test checks"
                    />
                  </div>
                  {tests.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeTest(index)}
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                    >
                      Remove Test
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
                         <form.Field
               name="order"
               validators={{
                 onChange: ({ value }) => {
                   if (value < 1) return 'Order must be a positive number';
                   return undefined;
                 },
               }}
             >
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  type="number"
                  min="1"
                  placeholder="1"
                  className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
                />
              )}
            </form.Field>
            <form.Field name="order">
              {(field) => 
                field.state.meta.errors.length > 0 ? (
                  <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
                ) : null
              }
            </form.Field>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEditing ? 'Update Challenge' : 'Create Challenge')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
