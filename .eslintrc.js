module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',

    // RESET recommended rules
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // Ensures that the return value is assigned to a variable of the correct type
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    // We can't use this yet because of this issue in typescript-eslint-plugin:
    // https://github.com/typescript-eslint/typescript-eslint/issues/541
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],

    // This give us an error when we don't use prop-types, but since we are using types maybe we don't need it
    'react/prop-types': 'off',

    // Forbids use of target-blank in jsx if you don't use some a11y best-practices
    'react/jsx-no-target-blank': 'off',

    // Forbid variables that are declared and not used anywhere in the code
    // we must disable the base rule as it can report incorrect errors
    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'none',
      },
    ],
    // The typescript rule does not consider a react component to be an 'used var' so this rule below fixes it
    // https://github.com/eslint/eslint/issues/8226#issuecomment-285683085
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',

    // Enforce camelcase variable naming
    // But we need to turn it off because of the types we get from GW right now
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
    '@typescript-eslint/camelcase': [
      'off',
      {
        properties: 'always',
        ignoreDestructuring: true,
      },
    ],

    '@typescript-eslint/no-parameter-properties': 'off',

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // temporarily turn flags off for debug
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};