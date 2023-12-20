import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    control: {
        border: '1px solid',
        borderColor: 'gray.300',
        background: "gray.25",
        _checked: {
            _before: {
                w: "65%",
                h: "65%",
            },
            color: 'primary.500',
            bg: "gray.25",
            borderColor: 'gray.300',
            _hover: {
                bg: "primary.300",
                borderColor: "primary.300"
            }
        },
        _dark: {
            borderColor: "purple.200",
            bg: "primary.100",
            _hover: {
                bg: "purple.400",
                borderColor: "purple.400"
            }
        },
        _hover: {
            bg: "primary.100",
            borderColor: "primary.500"
        }
    },
})

const radio = defineMultiStyleConfig({ baseStyle })
export default radio