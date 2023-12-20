# Input

To use this Input component, follow the same approach as you would with Chakra UI's Input.

**Integration:**

Utilize the Input component in your application just like you would with Chakra UI's Input. Place the `<Input>` tag in the desired location within your JSX.

```tsx
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@plds/ui'

const YourComponent = () => {
  return (
    <div>
      <Input width="50%" placeholder="A basic input" />

      {/* You can customize focusBorderColor */}
      <Input
        mt="3"
        size="lg"
        placeholder="An input with custom focusBorderColor"
        focusBorderColor="green.500"
      />

      {/*
        You can add InputLeftElement.
        But don't forget to wrap it in InputGroup and add extra padding on the left (pl="16")
      */}
      <InputGroup size="sm" mt="3">
        <InputLeftElement
          pointerEvents="none"
          color="primary.500"
          fontSize="1.2em"
          children="$"
        />
        <Input pl="16" placeholder="An input with a left element" />
      </InputGroup>

      {/* Input with error */}
      <Box mt="3">
        <Input isInvalid placeholder="An input with error message" />

        <Text mt="2" textStyle="sm" color="error.400">
          This is an error message
        </Text>
      </Box>
    </div>
  )
}

export default YourComponent
```

For more in-depth information and detailed documentation on using the Input component, please visit Chakra UI's official website: [Chakra UI Input Documentation](https://chakra-ui.com/docs/components/input).
