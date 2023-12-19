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
            .replace('solid', '')
        )}`
      })
    ),
  ]

  for (const icon of iconTypes) {
    const content = `
      import * as React from "react";

      import Horizontal from '../../src/${format}/${icon}HorizontalIcon';
      import HorizontalSolid from '../../src/${format}/${icon}HorizontalSolidIcon';
      ${
        hasMultiline.includes(icon)
          ? `
            import Multiline from '../../src/${format}/${icon}MultilineIcon';
            import MultilineSolid from '../../src/${format}/${icon}MultilineIcon';
          `
          : ''
      }
      import Symbol from '../../src/${format}/${icon}SymbolIcon';
      import SymbolSolid from '../../src/${format}/${icon}SymbolSolidIcon';
      import Vertical from '../../src/${format}/${icon}VerticalIcon';
      import VerticalSolid from '../../src/${format}/${icon}VerticalSolidIcon';
      import Wordmark from '../../src/${format}/${icon}WordmarkIcon';
      import WordmarkSolid from '../../src/${format}/${icon}WordmarkSolidIcon';
      
      const ${icon}Icon = ({ type, theme, style = {}, solid = false, ...props }) => {
        theme = theme ?? 'light'
        const color = theme === 'light' ? '#000' : '#fff'

        switch (type) {
          case 'horizontal':
            if (solid) return <HorizontalSolid {...props} style={{ color, ...style }} />;
            return <Horizontal {...props} style={{ color, ...style }} />;
          case 'multiline':
            if (solid) return <MultilineSolid {...props} style={{ color, ...style }} />;
            return <Multiline {...props} style={{ color, ...style }} />;
          case 'symbol':
            if (solid) return <SymbolSolid {...props} style={{ color, ...style }} />;
            return <Symbol {...props} style={{ color, ...style }} />;
          case 'vertical':
            if (solid) return <VerticalSolid {...props} style={{ color, ...style }} />;
            return <Vertical {...props} style={{ color, ...style }} />;
          case 'wordmark':
            if (solid) return <WordmarkSolid {...props} style={{ color, ...style }} />;
            return <Wordmark {...props} style={{ color, ...style }} />;
          default:
            if (solid) return <HorizontalSolid {...props} style={{ color, ...style }} />;
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
        solid?: booleand
        theme?: 'light' | 'dark'
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
