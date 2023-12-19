'use client'

import * as React from 'react'
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import clsx from 'clsx'

export interface DividerProps extends BoxProps {
  level?: 1 | 2 | 3
  className?: string
  style?: React.CSSProperties
}

const Divider = ({
  className,
  level = 1,
  style = {},
  mt,
  mb,
  my = 4,
  ...restProps
}: DividerProps) => {
  const hierarchy1Bg = useColorModeValue('gray.300', 'gray.500')
  const hierarchy2Bg = useColorModeValue('gray.200', 'gray.600')
  const hierarchy3Bg = useColorModeValue('gray.100', 'gray.700')

  const memoizedBg = React.useMemo(() => {
    switch (level) {
      case 1:
        return hierarchy1Bg
      case 2:
        return hierarchy2Bg
      case 3:
        return hierarchy3Bg
      default:
        return hierarchy1Bg
    }
  }, [])

  const memoizedMy = React.useMemo(() => {
    return !mt && !mb && !my ? 4 : my
  }, [])

  return (
    <Box
      className={clsx('plds-divider', className)}
      height="px"
      borderRadius="xs"
      backgroundColor={memoizedBg}
      style={{ ...style }}
      my={memoizedMy}
      {...restProps}
    />
  )
}

export default Divider
