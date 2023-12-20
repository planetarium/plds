# Button

To use this Button component, follow the same approach as you would with Chakra UI's Button.

**Integration:**

Utilize the Button component in your application just like you would with Chakra UI's Button. Place the `<Button>` tag in the desired location within your JSX.
Added `variant` props `primary`, `secondary`, `opacity`, `outline`

```tsx
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@plds/ui'

const YourComponent = () => {
  return (
    <Stack padding={'20px'} direction={'column'} spacing={2} backgroundColor={'#121212'} alignItems={'start'}>
      <Button size={'lg'} variant={'primary'}>primary - lg</Button>
      <Button size={'lg'} variant={'primary'} isDisabled leftIcon={<InfoIcon size={24} />}>primary - lg - icon - disabled</Button>
      <Button size={'md'} variant={'primary'}>primary - md</Button>
      <Button size={'sm'} variant={'primary'}>primary - sm</Button>
      <Button size={'lg'} variant={'secondary'}>secondary - lg</Button>
      <Button size={'lg'} variant={'secondary'} isDisabled>secondary - lg - disabled</Button>
      <Button size={'lg'} variant={'opacity'}>opacity - lg</Button>
      <Button size={'lg'} variant={'opacity'} isDisabled>opacity - lg - disabled</Button>
      <Button size={'lg'} variant={'outline'}>outline - lg</Button>
      <Button size={'lg'} variant={'outline'} isDisabled>outline - lg - disabled</Button>
    </Stack>
  )
}

export default YourComponent
```

For more in-depth information and detailed documentation on using the Input component, please visit Chakra UI's official website: [Chakra UI Input Documentation](https://chakra-ui.com/docs/components/input).