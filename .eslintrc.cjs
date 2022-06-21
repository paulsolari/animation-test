/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
	],
	env: {
		'vue/setup-compiler-macros': true,
	},
	rules: {
		'prettier/prettier': [
			'warn',
			{
				tabWidth: 2,
				useTabs: true,
				singleQuote: true,
				endOfLine: 'auto',
				singleAttributePerLine: false,
				htmlWhitespaceSensitivity: 'ignore',
			},
		],
	},
};
