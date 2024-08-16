module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // Disable the rule globally
    'react-native/no-inline-styles': 'off', // Disable the rule globally
    'react/react-in-jsx-scope': 'off', // Disable the rule globally
  },
};
