import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@modules(.*)$': '<rootDir>/modules$1',
    '^@type(.*)$': '<rootDir>/type$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
}

export default config

// module.exports = {
//   roots: ['<rootDir>'],
//   testEnvironment: 'jsdom',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
//   testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
//   transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'babel-jest',
//   },
//   watchPlugins: [
//     'jest-watch-typeahead/filename',
//     'jest-watch-typeahead/testname',
//   ],
//   moduleNameMapper: {
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
//   },
// }
