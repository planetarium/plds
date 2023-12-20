const Button = {
  sizes: {
    sm:  {minWidth: '107px', height: '32px', fontSize: '13px'},
    md:  {minWidth: '200px', height: '48px', fontSize: '16px'},
    lg: {minWidth: '320px', height: '72px', fontSize: '20px'}
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
        }
      },
      _disabled: {
        background: 'rgba(250, 241, 237, 0.10)',
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      }
    },
    secondary: {
      color: 'primary.600',
      backgroundColor: 'primary.50',
      borderRadius: 'xs',
      _hover: {
        bgGradient: 'linear(90deg, primary.50 0%, primary.200 100%)',
        _disabled: {
          background: '#EAF0F6',
        }
      },
      _disabled: {
        background: '#EAF0F6',
        color: '!gray.500',
        opacity: 1,
        _hover: {
          bgGradient: 'none'
        }
      }
    },
    opacity: {
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 'xs',
      _hover: {
        bgGradient: 'linear(270deg, #FFFFFF4D 0%, #FFFFFF1A 100%)',
        _disabled: {
          background: 'rgba(255, 255, 255, .1)'
        }
      },
      _disabled: {
        background: 'rgba(255, 255, 255, .1)',
        color: 'rgba(255, 255, 255, .5)',
        opacity: 1
      }
    },
    outline: {
      border: '1px solid',
      borderColor: 'primary.400',
      color: 'primary.300',
      backgroundColor: 'transparent',
      borderRadius: 'xs',
      _hover: {
        background: 'rgba(255, 255, 255, 0.10)',
        textOpacity: .9,
        _disabled: {
          background: 'transparent',
          color: '#fff',
          textOpacity: 1,
        }
      },
      _disabled: {
        background: 'transparent',
        borderColor: '#fff',
        color: '#fff',
        opacity: .5
      }
    },
  }

}
export default Button
