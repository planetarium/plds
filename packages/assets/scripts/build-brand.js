const { pascalCase } = require('change-case')
const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const babel = require('@babel/core')
const formatter = require('../helpers')

const outputPath = './dist'
const outputTypePath = './dist/types'

const hasMultiline = [
  'NineCorporation',
  'PlanetariumLabs',
  'PlanetariumLabsKorea',
]

async function mergeIconsToJSX(format) {
  let outDir = outputPath

  if (format === 'esm') {
    outDir = `${outputPath}/esm`
  } else {
    outDir = `${outputPath}/cjs`
  }

  await fs.mkdir(outDir, { recursive: true })
  await fs.mkdir(outputTypePath, { recursive: true })

  const files = await fs.readdir('./optimized/brand', 'utf-8')

  const iconTypes = [
    ...new Set(
      files.map((fileName) => {
        return `${pascalCase(
          fileName
            .replace(/.svg/, '')
            .replace('horizontal', '')
            .replace('multiline', '')
            .replace('symbol', '')
            .replace('vertical', '')
            .replace('wordmark', '')
        )}`
      })
    ),
  ]

  for (const icon of iconTypes) {
    const content = `
      import * as React from "react";

      import Horizontal from '../../src/${format}/${icon}HorizontalIcon';
      ${
        hasMultiline.includes(icon)
          ? `import Multiline from '../../src/${format}/${icon}MultilineIcon';`
          : ''
      }
      import Symbol from '../../src/${format}/${icon}SymbolIcon';
      import Vertical from '../../src/${format}/${icon}VerticalIcon';
      import Wordmark from '../../src/${format}/${icon}WordmarkIcon';
      
      const ${icon}Icon = ({ type, theme, style = {}, ...props }) => {
        theme = theme ?? 'light'
        const color = theme === 'light' ? '#000' : '#fff'

        switch (type) {
          case 'horizontal':
            return <Horizontal {...props} style={{ color, ...style }} />;
          case 'multiline':
            return <Multiline {...props} style={{ color, ...style }} />;
          case 'symbol':
            return <Symbol {...props} style={{ color, ...style }} />;
          case 'vertical':
            return <Vertical {...props} style={{ color, ...style }} />;
          case 'wordmark':
            return <Wordmark {...props} style={{ color, ...style }} />;
          default:
            return <Horizontal {...props} style={{ color, ...style }} />;
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
        type?: 'horizontal' | 'symbol' | 'vertical' | 'wordmark' ${
          hasMultiline.includes(icon) ? "| 'multiline'" : ''
        }
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
