const { pascalCase } = require('change-case')
const fs = require('fs/promises')
const { rimraf } = require('rimraf')
const { cli } = require('create-chakra-icons')

const outputPath = './src'

async function transformSVGtoJSX(file, componentName, outDir) {

  cli.main({
    name: componentName,
    input: `./optimized/${file}`,
    output: `${outDir}/${componentName}.tsx`,
    typescript: true,
    T: 'C',
    useFilename: false,
  })
}

async function transpileIcons(format = 'esm') {
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
      await transformSVGtoJSX(fileName, componentName, outDir)
      const types = `import * from 'react/jsx-runtime';\nimport { IconProps, Icon } from "@chakra-ui/icon";\ndeclare function ${componentName}(props: IconProps & { size: 12 | 16 | 24 | 32 | 40 }): ;\nexport default ${componentName};\n`

      await fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf-8')
    })
  )
}

;(function main() {
  console.log('🏗 Transpiling SVG icons...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([transpileIcons('cjs'), transpileIcons('esm')]))
    .then(() => console.log('✅ Finished transpiling SVG to JSX components.'))
})()
