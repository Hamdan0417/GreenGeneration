import nextJest from 'next/jest';
import type {Config} from 'jest';

const createJestConfig = nextJest({dir: './'});

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/tests/**/*.test.ts?(x)']
};

export default createJestConfig(config);
