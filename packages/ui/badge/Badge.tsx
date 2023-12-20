'use client'

import { BoxProps, Center } from '@chakra-ui/react'

type BadgeProps = BoxProps & {
  label?: string
}

const Badge = (props: BadgeProps) => {
  const { label, ...rest } = props

  if (!label) {
    return null
  }

  return (
    <Center
      display="inline-flex"
      minW="24px"
      h="24px"
      px={1.5}
      py={0.5}
      backgroundColor="error.500"
      borderRadius="full"
      color="white"
      textAlign="center"
      textStyle="xs"
      whiteSpace="nowrap"
      {...rest}
    >
      {label}
    </Center>
  )
}

export { Badge }
export { type BadgeProps }
