# Challenges Feature

This document describes the comprehensive challenges feature implementation with full CRUD operations.

## Overview

The challenges feature provides a complete system for creating, managing, and solving programming challenges. It includes:

- **Challenge Management**: Create, read, update, and delete challenges
- **Code Editor**: Integrated code editor with syntax highlighting
- **Test Execution**: Real-time test execution and validation
- **Submission Tracking**: Track student submissions and results
- **Filtering & Search**: Advanced filtering by difficulty, category, language, etc.

## Database Schema

### Challenges Table

```sql
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  solution TEXT NOT NULL,
  tests JSONB NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'javascript',
  time_limit INTEGER,
  points INTEGER DEFAULT 10,
  "order" INTEGER NOT NULL,
  class_id UUID REFERENCES classes(id),
  created_by UUID NOT NULL REFERENCES users(id),
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);
```

### Submissions Table

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id),
  student_id UUID NOT NULL REFERENCES users(id),
  code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed')),
  test_results JSONB,
  submitted_at TIMESTAMP DEFAULT now() NOT NULL
);
```

## API Endpoints

### Challenges

- `GET /api/challenges` - Get all challenges with filtering
- `GET /api/challenges/:id` - Get specific challenge
- `POST /api/challenges` - Create new challenge
- `PUT /api/challenges/:id` - Update challenge
- `DELETE /api/challenges/:id` - Delete challenge

### Submissions

- `POST /api/challenges/:id/submit` - Submit solution
- `POST /api/challenges/run-tests` - Run tests without saving

## Components

### ChallengeList

Displays a list of challenges with filtering and search capabilities.

**Features:**

- Search by title/description
- Filter by difficulty, category, language
- Sort by various criteria
- Pagination support

### ChallengeEditor

Form for creating and editing challenges.

**Features:**

- Comprehensive form validation
- Test case management
- Code editor for starter code and solution
- Real-time validation feedback

### ChallengeSolver

Integrated development environment for solving challenges.

**Features:**

- Code editor with syntax highlighting
- Real-time test execution
- Test results display
- Reset functionality
- Submit solution

## Usage Examples

### Creating a Challenge

```typescript
const challengeData = {
  title: "Hello World",
  description: 'Write a function that returns "Hello, World!"',
  instructions:
    'Create a function called helloWorld that returns the string "Hello, World!"',
  starterCode: "function helloWorld() {\n  // Your code here\n}",
  solution: 'function helloWorld() {\n  return "Hello, World!";\n}',
  tests: [
    {
      name: 'should return "Hello, World!"',
      test: 'helloWorld() === "Hello, World!"',
      description: "Basic functionality test",
    },
  ],
  difficulty: "easy",
  category: "Functions",
  language: "javascript",
  points: 10,
  order: 1,
};
```

### Running Tests

```typescript
const testResults = await challengesApi.runTests({
  code: 'function helloWorld() { return "Hello, World!"; }',
  tests: [
    {
      name: 'should return "Hello, World!"',
      test: 'helloWorld() === "Hello, World!"',
    },
  ],
});
```

### Submitting a Solution

```typescript
const submission = await challengesApi.submitChallenge({
  challengeId: "challenge-id",
  code: 'function helloWorld() { return "Hello, World!"; }',
});
```

## File Structure

```
src/features/challenges/
├── api/
│   └── challenges-api.ts          # API client
├── components/
│   ├── challenge-list.tsx         # Challenge list component
│   ├── challenge-editor.tsx       # Challenge editor form
│   └── challenge-solver.tsx       # Challenge solver IDE
├── hooks/
│   ├── use-challenges.ts          # Query hooks
│   └── use-challenge-mutations.ts # Mutation hooks
├── schemas/
│   └── challenge-schemas.ts       # Zod validation schemas
├── server/
│   └── route.ts                   # API routes
└── index.ts                       # Feature exports
```

## Validation

All challenge operations use Zod schemas for validation:

- `createChallengeSchema` - For creating challenges
- `updateChallengeSchema` - For updating challenges
- `getChallengesSchema` - For filtering challenges
- `submitChallengeSchema` - For submitting solutions
- `runTestsSchema` - For running tests

## Security

- Input validation on all endpoints
- SQL injection protection via Drizzle ORM
- Safe test execution environment
- User authentication (to be implemented)

## Testing

The feature includes comprehensive test coverage:

- Database operations
- API endpoints
- Form validation
- Test execution
- UI components

## Future Enhancements

- [ ] User authentication integration
- [ ] Real-time collaboration
- [ ] Code execution in sandboxed environment
- [ ] Multiple language support
- [ ] Advanced test frameworks
- [ ] Performance metrics
- [ ] Leaderboards
- [ ] Challenge templates
- [ ] Import/export functionality

## Getting Started

1. Ensure the database is migrated:

   ```bash
   bun run drizzle-kit migrate
   ```

2. Create a default user (if not exists):

   ```bash
   bun run src/scripts/create-default-user.ts
   ```

3. Test the functionality:

   ```bash
   bun run src/scripts/test-challenges.ts
   ```

4. Access the challenges page at `/challenges`

## Dependencies

- `@tanstack/react-form` - Form management
- `@tanstack/react-query` - Data fetching
- `drizzle-orm` - Database ORM
- `zod` - Schema validation
- `hono` - API framework
- `lucide-react` - Icons
- `tailwindcss` - Styling
