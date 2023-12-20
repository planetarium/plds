# Badge

To use `Badge` component, follow the same approach as below.

```tsx
import React from 'react'
import { Badge } from '@plds/ui'

const YourComponent = () => {
  return (
    <div>
      <Badge label="5" />
      <Badge label="NEW" bg="blue.400" />

      {/* ▼ This will not be rendered */}
      <Badge label="" />

      <Box
        position="relative"
        px="3"
        py="3"
        as="button"
        bg="primary.500"
        color="white"
        textStyle="base:bold"
        borderRadius="md"
      >
        Notification
        <BadgeDot position="absolute" top="0" right="0" showBadge />
      </Box>
      {/* Other components and content */}
    </div>
  )
}

export default YourComponent
```
