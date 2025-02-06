module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "\\.[jt]sx?$": "esbuild-jest",
    },
  };
  