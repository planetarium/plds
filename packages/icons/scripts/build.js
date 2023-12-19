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

  const files = await fs.readdir('./optimized', 'utf-8')

  const iconTypes = [
    ...new Set(
      files.map((fileName) => {
        return `${pascalCase(
          fileName.replace(/.svg/, '').replace(/[0-9]/g, '')
        )}`
      })
    ),
  ]

  for (const icon of iconTypes) {
    const content = `
      import * as React from "react";

      import Icon12 from '../../src/${format}/${icon}12Icon';
      import Icon16 from '../../src/${format}/${icon}16Icon';
      import Icon24 from '../../src/${format}/${icon}24Icon';
      import Icon32 from '../../src/${format}/${icon}32Icon';
      import Icon40 from '../../src/${format}/${icon}40Icon';
      
      const ${icon}Icon = ({ size, ...props }) => {
        switch (size) {
          case 12:
            return <Icon12 {...props} />;
          case 16:
            return <Icon16 {...props} />;
          case 24:
            return <Icon24 {...props} />;
          case 32:
            return <Icon32 {...props} />;
          case 40:
            return <Icon40 {...props} />;
          default:
            return null;
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
        size: 12 | 16 | 24 | 32 | 40
      }): JSX.Element;
      export default ${icon}Icon;
    `

    await fs.writeFile(`${outputTypePath}/${icon}Icon.d.ts`, types, 'utf-8')
  }

  console.log('🌈 Creating file: index.js')

  const svgFiles = await indexFileContent(iconTypes, format)
  await fs.writeFile(`${outDir}/index.js`, svgFiles, 'utf-8')
  const svgEsmFiles = await indexFileContent(iconTypes, 'esm', false)
  await fs.writeFile(`${outDir}/index.d.ts`, svgEsmFiles, 'utf-8')
}

async function indexFileContent(files, format, includeExtension = true) {
  let content = ''
  const extension = includeExtension ? '.js' : ''

  files.map((fileName) => {
    const componentName = `${pascalCase(fileName.replace(/.svg/, ''))}Icon`
    const directoryString = `'./${componentName}${extension}'`
    content +=
      format === 'esm'
        ? `export { default as ${componentName} } from ${directoryString};\n`
        : `module.exports.${componentName} = require(${directoryString});\n`
  })

  return content
}

;(function main() {
  console.log('🏗 Building icon package...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([mergeIconsToJSX('cjs'), mergeIconsToJSX('esm')]))
    .then(() => console.log('✅ Finished building package.'))
})()
