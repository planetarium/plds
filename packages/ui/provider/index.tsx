import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/700.css'

import { type PropsWithChildren } from 'react'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from '@plds/theme'

const PldsProvider = ({ children }: PropsWithChildren) => {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}

export default PldsProvider
