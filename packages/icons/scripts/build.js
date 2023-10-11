const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const { transform } = require('@svgr/core')
const _camelcase = import('camelcase')
const babel = require('@babel/core')
const jsx = require('@svgr/plugin-jsx')
const svgo = require('@svgr/plugin-svgo')
const prettier = require('@svgr/plugin-prettier')

const outputPath = './dist'

async function transformSVGtoJSX(file, componentName, format) {
  const content = await fs.readFile(`./optimized/${file}`, 'utf-8')
  const svgReactContent = await transform(
    content,
    {
      replaceAttrValues: { '#00497A': 'currentColor' },
      plugins: [svgo, jsx, prettier],
    },
    {
      componentName,
    }
  )

  const { code } = await babel.transformAsync(svgReactContent, {
    presets: [
      [
        '@babel/preset-react',
        {
          throwIfNamespace: false, // defaults to true
        },
      ],
    ],
    minified: true,
  })

  if (format === 'esm') {
    return code
  }

  const replaceESM = code
    .replace(
      'import * as React from "react";',
      'const React = require("react");'
    )
    .replace('export default', 'module.exports =')
  return replaceESM
}

async function indexFileContent(files, format, includeExtension = true) {
  let content = ''
  const extension = includeExtension ? '.js' : ''
  const camelcase = (await _camelcase).default

  files.map((fileName) => {
    const componentName = `${camelcase(fileName.replace(/.svg/, ''), {
      pascalCase: true,
    })}Icon`
    const directoryString = `'./${componentName}${extension}'`
    content +=
      format === 'esm'
        ? `export { default as ${componentName} } from ${directoryString};\n`
        : `module.exports.${componentName} = require(${directoryString});\n`
  })
  return content
}

async function buildIcons(format = 'esm') {
  let outDir = outputPath
  if (format === 'esm') {
    outDir = `${outputPath}/esm`
  } else {
    outDir = `${outputPath}/cjs`
  }

  await fs.mkdir(outDir, { recursive: true })

  const files = await fs.readdir('./optimized', 'utf-8')

  await Promise.all(
    files.flatMap(async (fileName) => {
      const camelcase = (await _camelcase).default
      const componentName = `${camelcase(fileName.replace(/.svg/, ''), {
        pascalCase: true,
      })}Icon`
      const content = await transformSVGtoJSX(fileName, componentName, format)
      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`

      // console.log(`- Creating file: ${componentName}.js`);
      await fs.writeFile(`${outDir}/${componentName}.js`, content, 'utf-8')
      await fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf-8')
    })
  )

  console.log('- Creating file: index.js')

  const svgFiles = await indexFileContent(files, format)

  await fs.writeFile(
    `${outDir}/index.js`,
    // indexFileContent(files, format),
    svgFiles,
    'utf-8'
  )

  const svgEsmFiles = await indexFileContent(files, 'esm', false)

  await fs.writeFile(
    `${outDir}/index.d.ts`,
    // indexFileContent(files, 'esm', false),
    svgEsmFiles,
    'utf-8'
  )
}

;(function main() {
  console.log('🏗 Building icon package...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([buildIcons('cjs'), buildIcons('esm')]))
    .then(() => console.log('✅ Finished building package.'))
})()
