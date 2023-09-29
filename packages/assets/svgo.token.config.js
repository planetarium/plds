module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    'sortAttrs',
    'removeScriptElement',
    'removeDoctype',
    'removeEmptyText',
    'removeUselessDefs',
  ],
}
