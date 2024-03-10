import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProviderAuth } from '@/auth'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'nextjs-tailwindcss-typescript-starter',
  description: 'Next.js + Tailwind CSS + TypeScript starter'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <ProviderAuth>
        <body className={`${inter.className} bg-slate-600 text-white`}>
          {children}
        </body>
      </ProviderAuth>
    </html>
  )
}
