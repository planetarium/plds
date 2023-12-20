import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    control: {
        border: "1px solid",
        borderRadius: "2px",
        borderColor: mode('gray.300', 'gray.25'),
        background: mode('gray.25', 'transparent'),
        _checked: {
            color: mode('primary.100', 'transparent'),
            bg: 'primary.500',
            _hover: {
                bg: mode("primary.400", "primary.800")
            }
        },
        _hover: {
            borderColor: mode('primary.500', 'gray.25'),
        }
    },
    label: {
        color: mode('gray.800', "gray.25")
    }
})

const Checkbox = defineMultiStyleConfig({ baseStyle })
export default Checkbox