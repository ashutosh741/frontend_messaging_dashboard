module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ['react-app'],
        plugins: ['@babel/plugin-proposal-private-property-in-object'],
      },
    },
    extends: ['react-app'],
    rules: {
      // Your ESLint rules
    },
  };
  