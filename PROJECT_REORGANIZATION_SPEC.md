# Project Reorganization Specification

## Overview

This document outlines the reorganization of the Coder SaaS project to follow a feature-based architecture inspired by the [task-forge repository](https://github.com/adamspicedev/task-forge). The new structure will incorporate TanStack Query for server state management and TanStack Form for form handling, while maintaining the existing tech stack and mobile capabilities.

## Current State Analysis

### Existing Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── demo/             # Demo pages
├── components/            # Shared components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
├── server/               # Hono server
├── db/                   # Database schema and config
└── auth/                 # Auth configuration
```

### Current Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Hono server with PostgreSQL
- **Database**: Drizzle ORM
- **Authentication**: Better Auth
- **Mobile**: Capacitor for iOS/Android
- **Package Manager**: Bun

## Proposed New Architecture

### 1. Feature-Based Directory Structure

```
src/
├── app/                          # Next.js App Router (pages only)
│   ├── (auth)/                  # Auth route group
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/             # Dashboard route group
│   │   ├── challenges/
│   │   ├── profile/
│   │   └── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── features/                    # Feature-based modules
│   ├── auth/                   # Authentication feature
│   │   ├── components/         # Feature-specific components
│   │   │   ├── signin-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── auth-layout.tsx
│   │   ├── hooks/             # Feature-specific hooks
│   │   │   ├── use-auth.ts
│   │   │   └── use-auth-mutations.ts
│   │   ├── api/               # Feature-specific API calls
│   │   │   ├── auth-api.ts
│   │   │   └── auth-types.ts
│   │   ├── schemas/           # Feature-specific schemas
│   │   │   └── auth-schemas.ts
│   │   └── index.ts           # Feature exports
│   ├── challenges/            # Challenges feature
│   │   ├── components/
│   │   │   ├── challenge-card.tsx
│   │   │   ├── challenge-editor.tsx
│   │   │   ├── challenge-list.tsx
│   │   │   └── challenge-form.tsx
│   │   ├── hooks/
│   │   │   ├── use-challenges.ts
│   │   │   ├── use-challenge.ts
│   │   │   └── use-challenge-mutations.ts
│   │   ├── api/
│   │   │   ├── challenges-api.ts
│   │   │   └── challenge-types.ts
│   │   ├── schemas/
│   │   │   └── challenge-schemas.ts
│   │   └── index.ts
│   ├── dashboard/             # Dashboard feature
│   │   ├── components/
│   │   │   ├── dashboard-stats.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   └── quick-actions.tsx
│   │   ├── hooks/
│   │   │   └── use-dashboard.ts
│   │   ├── api/
│   │   │   └── dashboard-api.ts
│   │   └── index.ts
│   └── profile/              # User profile feature
│       ├── components/
│       │   ├── profile-form.tsx
│       │   └── profile-card.tsx
│       ├── hooks/
│       │   └── use-profile.ts
│       ├── api/
│       │   └── profile-api.ts
│       └── index.ts
├── shared/                   # Shared resources
│   ├── components/           # Shared UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   └── common/          # Common components
│   │       ├── loading.tsx
│   │       ├── error-boundary.tsx
│   │       └── toast.tsx
│   ├── hooks/               # Shared hooks
│   │   ├── use-query-client.ts
│   │   ├── use-form-client.ts
│   │   └── use-api-error.ts
│   ├── utils/               # Utility functions
│   │   ├── api.ts           # API utilities
│   │   ├── validation.ts    # Validation utilities
│   │   ├── formatting.ts    # Formatting utilities
│   │   └── constants.ts     # Constants
│   ├── types/               # Shared TypeScript types
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── common.ts
│   └── lib/                 # Third-party library configs
│       ├── query-client.ts  # TanStack Query config
│       ├── form-client.ts   # TanStack Form config
│       └── auth.ts          # Auth configuration
├── server/                  # Backend server (unchanged)
│   ├── index.ts
│   └── server.ts
├── db/                      # Database (unchanged)
│   ├── index.ts
│   └── schema.ts
└── scripts/                 # Build scripts (unchanged)
    └── seed.ts
```

### 2. Technology Additions

#### TanStack Query Integration

```typescript
// shared/lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

#### TanStack Form Integration

```typescript
// shared/lib/form-client.ts
import { createFormFactory } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

export const createForm = createFormFactory({
  defaultValues: {},
  validatorAdapter: zodValidator,
});
```

### 3. Feature Module Structure

Each feature module follows this consistent structure:

#### Example: Auth Feature

```typescript
// features/auth/index.ts
export * from './components'
export * from './hooks'
export * from './api'
export * from './schemas'

// features/auth/api/auth-api.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi } from '@/shared/utils/api'

export const useSignIn = () => {
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      // Handle success
    },
  })
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      // Handle success
    },
  })
}

// features/auth/hooks/use-auth.ts
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth-api'

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: authApi.getCurrentUser,
  })
}

// features/auth/components/signin-form.tsx
import { createForm } from '@/shared/lib/form-client'
import { signInSchema } from '../schemas/auth-schemas'
import { useSignIn } from '../hooks/use-auth-mutations'

export const SignInForm = () => {
  const signIn = useSignIn()

  const form = createForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await signIn.mutateAsync(value)
    },
  })

  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="email"
          validators={{
            onChange: signInSchema.shape.email,
          }}
        >
          {(field) => (
            <div>
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email"
              />
              {field.state.meta.errors && (
                <span>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: signInSchema.shape.password,
          }}
        >
          {(field) => (
            <div>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
              />
              {field.state.meta.errors && (
                <span>{field.state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        </form.Field>

        <button type="submit" disabled={signIn.isPending}>
          {signIn.isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </form.Provider>
  )
}
```

### 4. Migration Strategy

#### Phase 1: Setup New Dependencies

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-form": "^1.0.0",
    "@tanstack/zod-form-adapter": "^1.0.0"
  }
}
```

#### Phase 2: Create Shared Infrastructure

1. Set up TanStack Query client
2. Set up TanStack Form client
3. Create shared API utilities
4. Create shared type definitions

#### Phase 3: Migrate Features One by One

1. **Auth Feature** (highest priority)
   - Move auth components to feature structure
   - Implement TanStack Form for signin/signup
   - Implement TanStack Query for auth state
2. **Dashboard Feature**
   - Move dashboard components
   - Implement data fetching with TanStack Query
3. **Challenges Feature**
   - Move challenge components
   - Implement CRUD operations with TanStack Query
   - Implement forms with TanStack Form

#### Phase 4: Update Pages

- Update all pages to use new feature imports
- Remove old component imports
- Update routing if necessary

### 5. Benefits of New Architecture

#### Maintainability

- **Feature Isolation**: Each feature is self-contained
- **Clear Dependencies**: Easy to understand what each feature needs
- **Scalability**: New features can be added without affecting existing ones

#### Developer Experience

- **Type Safety**: Better TypeScript integration with TanStack Form
- **Form Validation**: Built-in Zod validation with TanStack Form
- **Server State Management**: Efficient caching and synchronization with TanStack Query
- **Code Organization**: Clear separation of concerns

#### Performance

- **Optimistic Updates**: TanStack Query provides optimistic updates
- **Background Refetching**: Automatic data synchronization
- **Request Deduplication**: Multiple components can share the same query
- **Cache Management**: Intelligent cache invalidation

### 6. Implementation Guidelines

#### Naming Conventions

- Feature folders: kebab-case (`auth`, `challenge-management`)
- Component files: kebab-case (`signin-form.tsx`)
- Hook files: camelCase with `use` prefix (`useAuth.ts`)
- API files: kebab-case (`auth-api.ts`)

#### Import Structure

```typescript
// Good - feature-specific imports
import { SignInForm } from '@/features/auth'
import { useAuth } from '@/features/auth'

// Good - shared imports
import { Button } from '@/shared/components/ui/button'
import { useQueryClient } from '@/shared/hooks/use-query-client'

// Avoid - direct component imports
import { SignInForm } from '@/features/auth/components/signin-form'
```

#### Error Handling

```typescript
// features/auth/hooks/use-auth-mutations.ts
export const useSignIn = () => {
  return useMutation({
    mutationFn: authApi.signIn,
    onError: (error) => {
      // Handle error with toast or other UI feedback
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // Handle success
      toast.success("Signed in successfully");
      router.push("/dashboard");
    },
  });
};
```

### 7. Mobile Considerations

The new architecture maintains mobile compatibility:

- TanStack Query works seamlessly with Capacitor
- TanStack Form provides better form handling for mobile
- Feature-based structure makes mobile-specific components easier to manage

### 8. Testing Strategy

#### Unit Tests

- Test each feature module independently
- Mock TanStack Query and Form in tests
- Test form validation and submission

#### Integration Tests

- Test API integration with TanStack Query
- Test form submission flows
- Test error handling scenarios

### 9. Migration Checklist

- [ ] Install TanStack Query and TanStack Form
- [ ] Set up shared infrastructure (query client, form client)
- [ ] Create feature directory structure
- [ ] Migrate auth feature
- [ ] Migrate dashboard feature
- [ ] Migrate challenges feature
- [ ] Update all pages to use new imports
- [ ] Remove old component files
- [ ] Update documentation
- [ ] Test all functionality
- [ ] Test mobile compatibility

### 10. Rollback Plan

If issues arise during migration:

1. Keep old structure in parallel during migration
2. Use feature flags to switch between old and new implementations
3. Maintain separate branches for old and new architectures
4. Document any breaking changes

This reorganization will significantly improve the project's maintainability, developer experience, and performance while maintaining all existing functionality and mobile capabilities.
