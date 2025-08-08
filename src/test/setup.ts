import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3002';

// Setup MSW server for API mocking
export const server = setupServer(
  // Add default handlers here if needed
);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
