import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    control: {
        border: '1px solid',
        borderColor: mode('gray.300', 'gray.25'),
        background: mode('gray.25', 'transparent'),
        _checked: {
            _before: {
                w: "65%",
                h: "65%",
            },
            color: 'primary.500',
            bg: mode('primary.100', 'transparent'),
            _hover: {
                bg: mode("primary.100", "primary.800")
            }
        },
        _hover: {
            bg: mode('primary.100', "transparent")
        }
    },
    label: {
        color: mode('gray.800', "gray.25")
    }
})

const Radio = defineMultiStyleConfig({ baseStyle })
export default Radio