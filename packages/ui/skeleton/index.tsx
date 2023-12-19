'use client'

import {
  Skeleton as ChakraSkeleton,
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonText as ChakraSkeletonText,
  SkeletonProps as ChakraSkeletonProps,
  useColorMode,
} from '@chakra-ui/react'
import type { Radii } from '@plds/theme/foundations/radii'

import { getDefaultSkeletonOptions } from './utils'

type SkeletonProps = ChakraSkeletonProps & {
  borderRadius?: Radii
}

const Skeleton = (props: SkeletonProps) => {
  const { colorMode } = useColorMode()

  return (
    <ChakraSkeleton
      {...getDefaultSkeletonOptions(colorMode)}
      borderRadius="2xs"
      {...props}
    />
  )
}

const SkeletonCircle = (props: Omit<SkeletonProps, 'borderRadius'>) => {
  const { colorMode } = useColorMode()

  return (
    <ChakraSkeletonCircle
      {...getDefaultSkeletonOptions(colorMode)}
      {...props}
    />
  )
}

const SkeletonText = (props: SkeletonProps) => {
  const { colorMode } = useColorMode()

  return (
    <ChakraSkeletonText
      {...getDefaultSkeletonOptions(colorMode)}
      borderRadius="2xs"
      {...props}
    />
  )
}

export { Skeleton, SkeletonCircle, SkeletonText }
export type { SkeletonProps }
