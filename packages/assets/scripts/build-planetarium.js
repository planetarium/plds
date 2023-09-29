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

  const files = await fs.readdir('./optimized/planetarium', 'utf-8')

  const content = `
    import * as React from "react";

    import Horizontal from '../../src/${format}/PlanetariumHorizontalIcon';
    import Symbol from '../../src/${format}/PlanetariumSymbolIcon';
    import Vertical from '../../src/${format}/PlanetariumVerticalIcon';
    import Wordmark from '../../src/${format}/PlanetariumWordmarkIcon';
    
    const PlanetariumIcon = ({ type, ...props }) => {
      switch (type) {
        case 'horizontal':
          return <Horizontal {...props} />;
        case 'symbol':
          return <Symbol {...props} />;
        case 'vertical':
          return <Vertical {...props} />;
        case 'wordmark':
          return <Wordmark {...props} />;
        default:
          return <Horizontal {...props} />;
      }
    };

    export default PlanetariumIcon;
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
  await fs.writeFile(`${outDir}/PlanetariumIcon.js`, code, 'utf-8')

  const types = `
    import * as React from 'react';
    declare function PlanetariumIcon(props: React.SVGProps<SVGSVGElement> & {
      type?: 'horizontal' | 'symbol' | 'vertical' | 'wordmark'
    }): JSX.Element;
    export default PlanetariumIcon;
  `

  await fs.writeFile(`${outputTypePath}/PlanetariumIcon.d.ts`, types, 'utf-8')
}

;(function main() {
  console.log('🏗 Building icon package...')
  new Promise((resolve) => {
    resolve(rimraf(`${outputPath}/*`))
  })
    .then(() => Promise.all([mergeIconsToJSX('cjs'), mergeIconsToJSX('esm')]))
    .then(() => console.log('✅ Finished building package.'))
})()
