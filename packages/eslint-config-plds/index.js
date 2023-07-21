export default {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    'react-refresh/only-export-components': 'warn',
    'react/jsx-no-target-blank': [
      0,
      {
        allowReferrer: true,
      },
    ],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
