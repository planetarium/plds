'use client'

import { BoxProps, Center, chakra } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { scale } from './transition'

const MotionDiv = chakra(motion.div)

type BadgeDotProps = BoxProps & {
  showBadge?: boolean
  size?: string
}

const BadgeDot = (props: BadgeDotProps) => {
  const {
    showBadge,
    size = '8px',
    borderRadius = 'full',
    bg,
    bgColor,
    backgroundColor,
    background,
    ...rest
  } = props

  const badgeBg = bg ?? bgColor ?? backgroundColor ?? background ?? 'error.500'

  return (
    <Center maxW="max-content" {...rest}>
      <AnimatePresence>
        {showBadge && (
          <MotionDiv
            variants={scale}
            initial="exit"
            animate="enter"
            exit="exit"
            w={size}
            h={size}
            bg={badgeBg}
            borderRadius={borderRadius}
          />
        )}
      </AnimatePresence>
    </Center>
  )
}

export { BadgeDot }
export { type BadgeDotProps }
