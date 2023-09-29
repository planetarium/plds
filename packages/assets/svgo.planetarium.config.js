module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'sortAttrs',
    'removeScriptElement',
    'removeDoctype',
    'removeEmptyText',
    {
      name: 'removeAttrs',
      params: {
        attrs: 'mask',
      },
    },
  ],
}
