const { pascalCase } = require('change-case')
const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const babel = require('@babel/core')
const { transform } = require('@svgr/core')
const jsx = require('@svgr/plugin-jsx')
const prettier = require('@svgr/plugin-prettier')
const svgo = require('@svgr/plugin-svgo')
const formatter = require('../helpers')

const outputPath = './src'

async function transformSVGtoJSX(directory, file, componentName, format) {
  const content = await fs.readFile(`./optimized/${directory}/${file}`, 'utf-8')
  const svgReactContent = await transform(
    content,
    {
      plugins: [svgo, jsx, prettier],
      svgo: false,
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
          throwIfNamespace: false,
        },
      ],
    ],
    minified: true,
  })

  return formatter(format, code)
}

async function transpileIcons(format = 'esm', directory = 'brand') {
  let outDir = outputPath

  if (format === 'esm') {
    outDir = `${outputPath}/esm`
  } else {
    outDir = `${outputPath}/cjs`
  }

  await fs.mkdir(outDir, { recursive: true })

  const files = await fs.readdir(`./optimized/${directory}`, 'utf-8')

  await Promise.all(
    files.flatMap(async (fileName) => {
      const componentName = `${pascalCase(fileName.replace(/.svg/, '')).replace(
        '_',
        ''
      )}Icon`
      const content = await transformSVGtoJSX(
        directory,
        fileName,
        componentName,
        format
      )
      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`

      await fs.writeFile(`${outDir}/${componentName}.js`, content, 'utf-8')
    })
  )
}

;(function main() {
  console.log('🏗 Transpiling SVG icons...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/**/*`))
  })
    .then(() =>
      Promise.all([
        transpileIcons('cjs'),
        transpileIcons('cjs', 'social'),
        transpileIcons('cjs', 'token'),
        transpileIcons('esm'),
        transpileIcons('esm', 'social'),
        transpileIcons('esm', 'token'),
      ])
    )
    .then(() => console.log('✅ Finished transpiling SVG to JSX components.'))
})()
