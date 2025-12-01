import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock process-error-handle to avoid importing store during tests
vi.mock('./services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));
