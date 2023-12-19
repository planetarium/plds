const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const babel = require('@babel/core')
const formatter = require('../helpers')

const outputPath = './dist'
const outputTypePath = './dist/types'

async function mergeIconsToJSX(format) {
  let outDir = outputPath

  if (format === 'esm') {
    outDir = `${outputPath}/esm`
  } else {
    outDir = `${outputPath}/cjs`
  }

  await fs.mkdir(outDir, { recursive: true })
  await fs.mkdir(outputTypePath, { recursive: true })

  const iconTypes = ['NCG', 'WNCG']

  for (const icon of iconTypes) {
    const content = `
      import * as React from "react";

      import Icon24 from '../../src/${format}/${icon}24Icon';
      import Icon32 from '../../src/${format}/${icon}32Icon';
      import Icon40 from '../../src/${format}/${icon}40Icon';
      import Icon48 from '../../src/${format}/${icon}48Icon';
      import Icon64 from '../../src/${format}/${icon}64Icon';
      import Icon120 from '../../src/${format}/${icon}120Icon';
      import Icon160 from '../../src/${format}/${icon}160Icon';
      import Icon200 from '../../src/${format}/${icon}200Icon';
      
      const ${icon}Icon = ({ size, ...props }) => {
        switch (size) {
          case 24:
            return <Icon24 {...props} />;
          case 32:
            return <Icon32 {...props} />;
          case 40:
            return <Icon40 {...props} />;
          case 48:
            return <Icon48 {...props} />;
          case 64:
            return <Icon64 {...props} />;
          case 120:
            return <Icon120 {...props} />;
          case 160:
            return <Icon160 {...props} />;
          case 200:
            return <Icon200 {...props} />;
          default:
            return <Icon24 {...props} />;
        }
      };

      export default ${icon}Icon;
    `

    const { code: data } = await babel.transformAsync(content, {
      presets: [
        [
          '@babel/preset-react',
          {
            throwIfNamespace: false,
          },
        ],
      ],
      minified: true,
    })

    const code = formatter(format, data)
    await fs.writeFile(`${outDir}/${icon}Icon.js`, code, 'utf-8')
  }

  for (const icon of iconTypes) {
    const types = `
      import * as React from 'react';
      declare function ${icon}Icon(props: React.SVGProps<SVGSVGElement> & {
        size?: 16 | 24 | 32 | 40 | 48 | 64 | 120 | 160 | 200
      }): JSX.Element;
      export default ${icon}Icon;
    `

    await fs.writeFile(`${outputTypePath}/${icon}Icon.d.ts`, types, 'utf-8')
  }
}

;(function main() {
  console.log('🏗 Building icon package...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([mergeIconsToJSX('cjs'), mergeIconsToJSX('esm')]))
    .then(() => console.log('✅ Finished building package.'))
})()
