import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@a/ui'
import { Toaster } from '@a/ui/sonner'
import { ThemeProvider, ThemeToggle } from '@a/ui/theme'

import { TRPCReactProvider } from '~/trpc/react'

import '~/app/globals.css'

import { env } from '~/env'

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === 'production' ? 'https://turbo.t3.gg' : 'http://localhost:3000'
  ),
  title: '',
  description: 'Simple monorepo with shared backend for web & mobile apps',
  openGraph: {
    title: '',
    description: 'Simple monorepo with shared backend for web & mobile apps',
    url: 'https://create-t3-turbo.vercel.app',
    siteName: ''
  },
  twitter: {
    card: 'summary_large_image',
    site: '@x',
    creator: '@x'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <ThemeToggle className='absolute bottom-3 right-3' />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
