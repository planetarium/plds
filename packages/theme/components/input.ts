import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/react'
import { getColorVar, mode } from '@chakra-ui/theme-tools'

const $height = cssVar('input-height')
const $fontSize = cssVar('input-font-size')
const $padding = cssVar('input-padding')
const $borderRadius = cssVar('input-border-radius')

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  addon: {
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
  },
  field: {
    width: '100%',
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

const size = {
  sm: defineStyle({
    [$fontSize.variable]: 'fontSizes.sm',
    [$padding.variable]: 'space.5',
    [$borderRadius.variable]: 'radii.xs',
    [$height.variable]: 'space.16',
  }),
  md: defineStyle({
    [$fontSize.variable]: 'fontSizes.base',
    [$padding.variable]: 'space.6',
    [$borderRadius.variable]: 'radii.xs',
    [$height.variable]: 'space.18',
  }),
  lg: defineStyle({
    [$fontSize.variable]: 'fontSizes.md',
    [$padding.variable]: 'space.6',
    [$borderRadius.variable]: 'radii.xs',
    [$height.variable]: 'space.20',
  }),
}

const sizes = {
  sm: definePartsStyle({
    field: size.sm,
    group: size.sm,
  }),
  md: definePartsStyle({
    field: size.md,
    group: size.md,
  }),
  lg: definePartsStyle({
    field: size.lg,
    group: size.lg,
  }),
}

function getDefaults(props: Record<string, any>) {
  const { color: c, focusBorderColor: fc, errorBorderColor: ec } = props

  return {
    color: c || mode('gray.900', 'white')(props),
    focusBorderColor: fc || mode('primary.500', 'white')(props),
    errorBorderColor: ec || 'error.600',
  }
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props
  const {
    color: c,
    focusBorderColor: fc,
    errorBorderColor: ec,
  } = getDefaults(props)

  return {
    field: {
      border: '1.5px solid',
      borderColor: mode('gray.400', 'whiteAlpha.800')(props),
      bg: 'inherit',
      boxShadow: 'none !important',
      color: getColorVar(theme, c),
      _hover: {
        borderColor: mode('gray.300', 'whiteAlpha.700')(props),
      },
      _readOnly: {
        userSelect: 'all',
      },
      _invalid: {
        borderColor: getColorVar(theme, ec),
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColorVar(theme, fc),
      },
    },
    addon: {
      border: '1.5px solid',
      borderColor: mode('gray.400', 'whiteAlpha.800')(props),
      bg: mode('white', 'whiteAlpha.300')(props),
    },
  }
})

const variantUnstyled = definePartsStyle({
  field: {
    bg: 'transparent',
    px: '0',
    height: 'auto',
  },
  addon: {
    bg: 'transparent',
    px: '0',
    height: 'auto',
  },
})

const variants = {
  outline: variantOutline,
  unstyled: variantUnstyled,
}

const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}) as any

export default inputTheme
