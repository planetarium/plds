import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
    track: {
        bg: 'gray.500',
        _checked: {
            bg: 'primary.500',
        },
    },
})

const Switch = defineMultiStyleConfig({ baseStyle })
export default Switch