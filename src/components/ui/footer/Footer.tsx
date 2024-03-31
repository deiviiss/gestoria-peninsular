import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>Auth </span>
        <span>| Starter</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link
        href={'/'}
        className='mx-3'
      >
        Política de Privacidad
      </Link>

      <Link
        href={'/'}
        className='mx-3'
      >
        Acerca de
      </Link>

    </div>
  )
}
