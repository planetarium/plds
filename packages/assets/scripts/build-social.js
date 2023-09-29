const { pascalCase } = require('change-case')
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

  const files = await fs.readdir('./optimized/social', 'utf-8')

  const iconTypes = [
    ...new Set(
      files.map((fileName) => {
        return `${pascalCase(
          fileName
            .replace(/.svg/, '')
            .replace('original', '')
            .replace('solid', '')
            .replace('circle', '')
        )}`
      })
    ),
  ]

  for (const icon of iconTypes) {
    const content = `
      import * as React from "react";

      import CircleIcon from '../../src/${format}/${icon}CircleIcon';
      import OriginalIcon from '../../src/${format}/${icon}OriginalIcon';
      import SolidIcon from '../../src/${format}/${icon}SolidIcon';
      import SolidCircleIcon from '../../src/${format}/${icon}SolidCircleIcon';
      
      const ${icon}Icon = ({ solid, circle, ...props }) => {
        switch (solid) {
          case false:
            return circle ? <CircleIcon {...props} /> : <OriginalIcon {...props} />;
          case true:
            return circle ? <SolidCircleIcon {...props} /> : <SolidIcon {...props} />;
          default:
            return circle ? <CircleIcon {...props} /> : <OriginalIcon {...props} />;
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
        solid?: boolean;
        circled?: boolean
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
