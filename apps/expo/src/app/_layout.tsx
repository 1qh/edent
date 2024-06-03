import '@bacons/text-decoder/install'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

import { TRPCProvider } from '~/utils/api'

import '../styles.css'

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme()
  return (
    <TRPCProvider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorScheme == 'dark' ? '#000000' : '#FFFFFF'
          },
          contentStyle: {
            backgroundColor: colorScheme == 'dark' ? '#000000' : '#FFFFFF'
          }
        }}
      />
      <StatusBar />
    </TRPCProvider>
  )
}
