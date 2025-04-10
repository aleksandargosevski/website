// @ts-check

/** @type {import('stylelint').Config} */
export default {
  plugins: ['@stylistic/stylelint-plugin'],
  extends: [
    'stylelint-config-standard',
    '@stylistic/stylelint-config',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    // Disable rule because of false positives with nested selectors
    'no-descending-specificity': null,

    // Boilerplate rules
    'block-no-empty': null,
    'no-empty-source': null,

    // Relax rule to support BEM-like modifier syntax with "--"
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(((-|--)[a-z0-9]+))*$',
      {
        message: 'Expected selector class pattern to be kebab-case (or kebab--case).',
      },
    ],
  },
}
