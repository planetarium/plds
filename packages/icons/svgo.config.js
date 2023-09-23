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
          removeUselessDefs: false,
          cleanupIds: false,
          removeViewBox: false,
        },
      },
    },
    'sortAttrs',
    'removeScriptElement',
    'removeDoctype',
    'removeEmptyText',
    {
      name: 'removeElementsByAttr',
      params: {
        id: 'a',
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: 'mask',
      },
    },
  ],
}
