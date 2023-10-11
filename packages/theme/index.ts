import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

import foundations from './foundations'

const theme = extendTheme({
  config: {
    cssVarPrefix: 'plds',
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  sizes: baseTheme.sizes,
  space: baseTheme.space,
  direction: baseTheme.direction,
  transition: baseTheme.transition,
  zIndices: baseTheme.zIndices,
  ...foundations,
})

export default theme
