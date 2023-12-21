import { render, screen } from '@testing-library/react'
import { useColorMode } from '@chakra-ui/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getDefaultSkeletonOptions } from './utils'
import { Skeleton } from './index'

vi.mock('@chakra-ui/react', () => {
  const actual = vi.importActual('@chakra-ui/react') as any
  return {
    ...actual,
    useColorMode: vi.fn(),
    // If Skeleton is part of the actual exports, ensure it's included here
    Skeleton: actual.Skeleton,
  }
})

vi.mock('./utils')

describe('Skeleton Component', () => {
  beforeEach(() => {
    ;(useColorMode as any as typeof vi.fn).mockReturnValue({
      colorMode: 'light',
    })
    ;(getDefaultSkeletonOptions as any as typeof vi.fn).mockReturnValue({})
  })

  it('renders correctly', () => {
    render(<Skeleton />)
    // You need a way to identify the ChakraSkeleton, such as a test ID
    expect(screen.getByTestId('chakra-skeleton')).toBeInTheDocument()
  })

  it('applies default borderRadius', () => {
    render(<Skeleton />)
    expect(screen.getByTestId('chakra-skeleton')).toHaveStyle(
      'borderRadius: 2xs'
    )
  })
})
