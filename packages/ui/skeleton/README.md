# Skeleton

To use this Skeleton component, follow the same approach as you would with Chakra UI's Skeleton.

**Integration:**

Utilize the Skeleton component in your application just like you would with Chakra UI's Skeleton. Place the `<Skeleton>` tag in the desired location within your JSX.

```tsx
import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@plds/ui'

const YourComponent = () => {
  return (
    <div>
      <h1>Your Content</h1>
      <Skeleton width="300px" height="20px" />
      <SkeletonCircle size="40px" />
      <SkeletonText height="16px" borderRadius="sm" />
      {/* Other components and content */}
    </div>
  )
}

export default YourComponent
```

For more in-depth information and detailed documentation on using the Skeleton component, please visit Chakra UI's official website: [Chakra UI Skeleton Documentation](https://chakra-ui.com/docs/components/skeleton).
