import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env['NODE_ENV'] = 'test';

// Mock AWS SDK for testing
jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn().mockImplementation(() => ({
      get: jest.fn().mockReturnValue({ promise: jest.fn() }),
      put: jest.fn().mockReturnValue({ promise: jest.fn() }),
      update: jest.fn().mockReturnValue({ promise: jest.fn() }),
      delete: jest.fn().mockReturnValue({ promise: jest.fn() }),
      query: jest.fn().mockReturnValue({ promise: jest.fn() }),
      scan: jest.fn().mockReturnValue({ promise: jest.fn() }),
    })),
  },
}));

// Global test timeout
jest.setTimeout(10000);

// Suppress console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 