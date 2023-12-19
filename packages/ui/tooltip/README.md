# Tooltip

To use `Tooltip` component, follow the same approach as you would with Chakra UI's Tooltip.

**Integration:**

Utilize the Tooltip component in your application just like you would with Chakra UI's Tooltip. Place the `<Tooltip>` tag in the desired location within your JSX.

```tsx
import React from 'react'
import { Tooltip } from '@plds/ui'

const YourComponent = () => {
  return (
    <div>
      <Tooltip label="A basic tooltip">Toggle 1</Tooltip>

      <Tooltip
        label="Hover me for a surprise!"
        hasArrow
        placement="left"
        mt="3"
      >
        <Box
          width="200px"
          mt={4}
          background="primary.400"
          color="white"
          textStyle="sm:bold"
        >
          Toggle 2
        </Box>
      </Tooltip>

      <Tooltip label="Always open" hasArrow isOpen>
        <Box
          width="200px"
          mt={4}
          background="blue.400"
          color="white"
          textStyle="sm:bold"
        >
          Toggle 3
        </Box>
      </Tooltip>
    </>
      {/* Other components and content */}
    </div>
  )
}

export default YourComponent
```

For more in-depth information and detailed documentation on using the Skeleton component, please visit Chakra UI's official website: [Chakra UI Skeleton Documentation](https://chakra-ui.com/docs/components/skeleton).
