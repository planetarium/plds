'use client'

import { PldsProvider } from '@plds/ui'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PldsProvider>{children}</PldsProvider>
      </body>
    </html>
  )
}
