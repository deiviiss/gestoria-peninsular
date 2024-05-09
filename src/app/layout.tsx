import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { Providers } from '@/components'
import './globals.css'
import { fontSans } from '@/config/fonts'
import { cn } from '@/libs/utils'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Gestoria Peninsular',
    default: 'Gestoria Peninsular'
  },
  description: 'Gestoría Peninsular es una empresa especializada en brindar servicios de asesoramiento y trámites de pensión y retiro por desempleo. ¡Haz una cita con nosotros y simplifica tus trámites!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" >
      <Providers>
        <body className={
          // `${fontSans.className} bg-gradient-body`
          cn(
            'min-h-screen bg-gradient-body font-sans antialiased',
            fontSans.variable
          )
        }>
          {children}
        </body>
      </Providers>
    </html>
  )
}
