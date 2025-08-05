module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['./jest.setup.mjs'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true,  }],
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
};
