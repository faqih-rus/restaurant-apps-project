import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  daStyle,
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', 'public/**',
      'webpack.common.js', 'webpack.dev.js', 'webpack.prod.js', 'jest.config.js',
      'steps_file.js', 'e2e/**', 'codecept.conf.js', '**/sharp.js'],
  }
];