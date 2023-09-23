const { pascalCase } = require('change-case')
const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const babel = require('@babel/core')
const { transform } = require('@svgr/core')
const jsx = require('@svgr/plugin-jsx')
const prettier = require('@svgr/plugin-prettier')
const svgo = require('@svgr/plugin-svgo')

const outputPath = './dist'

async function transformSVGtoJSX(file, componentName, format) {
  const content = await fs.readFile(`./optimized/${file}`, 'utf-8')
  const svgReactContent = await transform(
    content,
    {
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
          throwIfNamespace: false,
        },
      ],
    ],
    minified: true,
  })

  return formatter(format, code)
}

async function mergeIconsToJSX(format) {
  let outDir = outputPath

  if (format === 'esm') {
    outDir = `${outputPath}/esm`
  } else {
    outDir = `${outputPath}/cjs`
  }

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

      import Icon12 from './${icon}12Icon';
      import Icon16 from './${icon}16Icon';
      import Icon24 from './${icon}24Icon';
      import Icon32 from './${icon}32Icon';
      import Icon40 from './${icon}40Icon';
      
      const ${icon}Icon = ({ className, size }) => {
        switch (size) {
          case 12:
            return <Icon12 className={className} />;
          case 16:
            return <Icon16 className={className} />;
          case 24:
            return <Icon24 className={className} />;
          case 32:
            return <Icon32 className={className} />;
          case 40:
            return <Icon40 className={className} />;
          default:
            return null;
        }
      };

      export default ${icon}Icon;
    `

    const { code } = await babel.transformAsync(content, {
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

    const result = formatter(format, code)

    const types = `
      import * as React from 'react';
      declare type ${icon}IconProps = {
        className?: string
        size: 12 | 16 | 24 | 32 | 40
      } & React.SVGProps<SVGSVGElement>
      declare function ${icon}Icon(props: ${icon}IconProps): JSX.Element;
      export default ${icon}Icon;
    `

    await fs.writeFile(`${outDir}/${icon}Icon.js`, result, 'utf-8')
    await fs.writeFile(`${outDir}/${icon}Icon.d.ts`, types, 'utf-8')
  }

  console.log('- Creating file: index.js')

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
      const componentName = `${pascalCase(fileName.replace(/.svg/, '')).replace(
        '_',
        ''
      )}Icon`
      const content = await transformSVGtoJSX(fileName, componentName, format)
      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`

      await fs.writeFile(`${outDir}/${componentName}.js`, content, 'utf-8')
      await fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf-8')
    })
  )
}

;(function main() {
  console.log('🏗 Building icon package...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([buildIcons('cjs'), buildIcons('esm')]))
    .then(() => Promise.all([mergeIconsToJSX('cjs'), mergeIconsToJSX('esm')]))
    .then(() => console.log('✅ Finished building package.'))
})()
