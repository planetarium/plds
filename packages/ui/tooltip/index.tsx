import {
  Box,
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

type TooltipProps = ChakraTooltipProps

const Tooltip = (props: TooltipProps) => {
  const { children, label, ...rest } = props

  return (
    <ChakraTooltip
      backgroundColor="blueGray.400"
      borderRadius="2xs"
      boxShadow="none"
      color="white"
      px="4"
      py="3"
      label={
        <Box as={rest.as ?? 'p'} textStyle="xs:bold" lineHeight={1.25}>
          {label}
        </Box>
      }
      {...rest}
    >
      {children}
    </ChakraTooltip>
  )
}

export { Tooltip }
export type { TooltipProps }
