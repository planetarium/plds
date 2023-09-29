const { pascalCase } = require('change-case')
const fs = require('fs/promises')
const { rimraf } = require('rimraf')

const outputPath = './dist'

async function indexFileContent(format, includeExtension = true) {
  let content = ''
  const extension = includeExtension ? '.js' : ''
  const outDir = `${outputPath}/${format}`

  const files = await fs.readdir(`./dist/${format}`, 'utf-8')

  files.map((fileName) => {
    const componentName = `${pascalCase(fileName.replace(/.js/, ''))}`
    const directoryString = `'./${componentName}${extension}'`
    content +=
      format === 'esm'
        ? `export { default as ${componentName} } from ${directoryString};\n`
        : `module.exports.${componentName} = require(${directoryString});\n`
  })

  await fs.writeFile(`${outDir}/index.js`, content, 'utf-8')

  if (format === 'esm') {
    await fs.writeFile(`${outputPath}/types/index.d.ts`, content, 'utf-8')
  }

  return content
}

async function indexTypeDefinitionFileContent() {
  let content = ''
  const extension = '.d.ts'
  const outDir = `${outputPath}/types`

  const files = await fs.readdir(`./dist/esm`, 'utf-8')

  files.forEach((fileName) => {
    if (fileName.includes('index')) return

    const componentName = `${pascalCase(fileName.replace(/.js/, ''))}`
    const directoryString = `'./${componentName}${extension}'`
    content += `export { default as ${componentName} } from ${directoryString};\n`
  })

  await fs.writeFile(`${outDir}/index.d.ts`, content, 'utf-8')
}

;(function main() {
  console.log('🌈 Creating an index.js...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([indexFileContent('cjs'), indexFileContent('esm')]))
    .then(() => Promise.resolve(indexTypeDefinitionFileContent()))
    .then(() => console.log('✅ Finished creating an index file.'))
})()
