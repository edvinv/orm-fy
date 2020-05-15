module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  },
  testPathIgnorePatterns: [
    "<rootDir>/test/.vscode/",
    "<rootDir>/test/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/test/environments/",
  ],
  watchPathIgnorePatterns:[
    "<rootDir>/test/.vscode/",
    "<rootDir>/test/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/test/environments/",
  ]
};