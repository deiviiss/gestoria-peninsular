import { Audiowide, Inter as FontSans, Raleway } from 'next/font/google'

export const textLogo = Audiowide({ weight: '400', subsets: ['latin'] })

export const textFont = Raleway({ subsets: ['latin'] })

export const titleFont = FontSans({
  subsets: ['latin'],
  weight: ['500', '700']
})

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})
