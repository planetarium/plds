import { type PropsWithChildren } from 'react'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from '@plds/theme'

const PldsProvider = ({ children }: PropsWithChildren) => {
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}

export default PldsProvider
