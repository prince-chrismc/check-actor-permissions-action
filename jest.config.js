export default {
  clearMocks: true,
  testMatch: ['**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // 1. Treats test source files as native ES Modules
  extensionsToTreatAsEsm: ['.ts'],

  // 2. FORCE Jest to match external libraries and strip local compiler extension paths
  moduleNameMapper: {
    // Map individual CommonJS vendor packages directly to their primary main files
    '^@actions/core$': '<rootDir>/node_modules/@actions/core/lib/core.js',
    '^@actions/github$': '<rootDir>/node_modules/@actions/github/lib/github.js',
    
    // Smoothly handles relative extension-less routing for your compiled local modules
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    // 3. Configure ts-jest compilation targets
    '^.+\\.tsx?$': [
      'ts-jest',
      { 
        useESM: true,
        tsconfig: './__tests__/tsconfig.json'
      }
    ],
  },
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
