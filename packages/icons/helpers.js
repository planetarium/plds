module.exports = function formatter(format, source) {
  if (format === 'esm') {
    return source
  }

  return source
    .replace(
      'import * as React from "react";',
      'const React = require("react");'
    )
    .replace('export default', 'module.exports =')
}
