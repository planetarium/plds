import {
  Box,
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

type TooltipProps = ChakraTooltipProps

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    label,

    // NOTE: We're not using the margin props in Tooltip because it causes unexpected behavior on tooltip alignment
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginX,
    marginY,

    ...rest
  } = props

  return (
    <ChakraTooltip
      backgroundColor="blueGray.400"
      borderRadius="2xs"
      boxShadow="none"
      color="white"
      px="4"
      py="3"
      {...rest}
      label={
        <Box as={rest.as ?? 'p'} textStyle="xs:bold" lineHeight={1.25}>
          {label}
        </Box>
      }
    >
      {children}
    </ChakraTooltip>
  )
}

export { Tooltip }
export type { TooltipProps }
