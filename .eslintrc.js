module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
		browser: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['eqeqeq-fix', 'import', 'react', '@typescript-eslint', 'prettier', 'jest', 'jsx-a11y'],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			parser: '@typescript-eslint/parser',
			rules: {
				'no-undef': 'off',
			},
		},
	],
	rules: {
		'react/jsx-props-no-spreading': 'off',
		'react/static-property-placement': 'off',
		'no-case-declarations': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{ selector: 'default', format: ['camelCase'] },
			{ selector: 'typeLike', format: ['PascalCase'] },
			{ selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
			{
				selector: 'parameter',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'variable',
				modifiers: ['const'],
				format: ['PascalCase', 'camelCase'],
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: /^T([A-Z][a-zA-Z]+)$|^[A-Z]$/u.toString().slice(1, -2),
					match: true,
				},
			},
			{
				selector: 'interface',
				format: ['PascalCase'], // disallow prefixing interfaces with "I"
				custom: { regex: '^I[A-Z]', match: false },
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: null,
				// leadingUnderscore: 'require',
			},
			{
				selector: 'memberLike',
				modifiers: ['protected'],
				format: null,
				// leadingUnderscore: 'require',
			},
			{
				selector: 'memberLike',
				modifiers: ['public'],
				format: ['camelCase', 'PascalCase'],
			},
			{
				selector: 'property',
				modifiers: ['public'],
				format: ['camelCase', 'PascalCase', 'snake_case'],
			},
			{
				selector: 'enumMember',
				format: ['PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'classMethod',
				modifiers: ['public'],
				format: ['camelCase'],
			},
		],
		'@typescript-eslint/no-shadow': 'off',
		'no-shadow': 'off',
		'default-param-last': 'off',
		'no-param-reassign': 'off',
		'react/prefer-stateless-function': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		'no-console': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
		'@typescript-eslint/explicit-function-return-type': 'warn', // Consider using explicit annotations for object literals and function return types even when they can be inferred.
		'no-empty': 'warn',
		'react/prop-types': 'off',
	},
};
