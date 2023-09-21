module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    { name: 'preset-default' },
    'sortAttrs',
    'removeScriptElement',
    'removeDimensions',
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
