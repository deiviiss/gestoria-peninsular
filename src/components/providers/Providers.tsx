'use client'

import { SessionProvider } from 'next-auth/react'
// import { ThemeProvider } from './theme-provider'

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <SessionProvider >
      {/* <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      > */}
      {children}
      {/* </ThemeProvider> */}
    </SessionProvider>
  )
}
