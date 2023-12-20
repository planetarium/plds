const Button = {
  sizes: {
    sm: { minWidth: '107px', height: '32px', fontSize: '13px' },
    md: { minWidth: '200px', height: '48px', fontSize: '16px' },
    lg: { minWidth: '320px', height: '72px', fontSize: '20px' },
  },
  variants: {
    primary: {
      color: 'white',
      backgroundColor: 'primary.500',
      borderRadius: 'xs',
      _hover: {
        bgGradient: 'linear(90deg, primary.400 0%, primary.600 100%)',
        _disabled: {
          background: 'rgba(250, 241, 237, 0.10)',
        },
      },
      _disabled: {
        background: 'rgba(250, 241, 237, 0.10)',
        color: 'whiteAlpha.500',
        opacity: 1,
      },
    },
    secondary: {
      color: 'primary.600',
      backgroundColor: 'primary.50',
      borderRadius: 'xs',
      _hover: {
        bgGradient: 'linear(90deg, primary.50 0%, primary.200 100%)',
        _disabled: {
          background: '#EAF0F6',
        },
      },
      _disabled: {
        background: '#EAF0F6',
        color: 'gray.500',
        opacity: 1,
        _hover: {
          bgGradient: 'none',
        },
      },
    },
    opacity: {
      color: 'white',
      backgroundColor: 'whiteAlpha.100',
      borderRadius: 'xs',
      _hover: {
        bgGradient: 'linear(270deg, whiteAlpha.300 0%, whiteAlpha.100 100%)',
        _disabled: {
          background: 'whiteAlpha.100',
        },
      },
      _disabled: {
        background: 'whiteAlpha.100',
        color: 'whiteAlpha.500',
        opacity: 1,
      },
    },
    outline: {
      border: '1px solid',
      borderColor: 'primary.400',
      color: 'primary.300',
      backgroundColor: 'transparent',
      borderRadius: 'xs',
      _hover: {
        background: 'whiteAlpha.100',
        textOpacity: 0.9,
        _disabled: {
          background: 'transparent',
          color: 'white',
          textOpacity: 1,
        },
      },
      _disabled: {
        background: 'transparent',
        borderColor: 'white',
        color: 'white',
        opacity: 0.5,
      },
    },
  },
}
export default Button
