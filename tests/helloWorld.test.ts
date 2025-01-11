jest.config.js
{
  "testEnvironment": "node",
  "testMatch": ["**/tests/**/*.test.ts"],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}

tests/helloWorld.test.ts
describe('helloWorld', () => {
  test('returns hello world', () => {
    expect('hello world').toBe('hello world');
  });
});