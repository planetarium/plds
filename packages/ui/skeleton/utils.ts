export const SKELETON_OPTIONS = {
  light: {
    startColor: 'gray.50',
    endColor: 'gray.200',
  },
  dark: {
    startColor: 'gray.700',
    endColor: 'gray.900',
  },
}

export const getDefaultSkeletonOptions = (colorMode: 'light' | 'dark') => {
  return SKELETON_OPTIONS[colorMode]
}
