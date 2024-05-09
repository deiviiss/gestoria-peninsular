import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const FooterDashboard = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-6 mt-6">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>Gestoría Peninsular </span> | <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link
        href={'/'}
        className='mx-3'
      >
        Privacidad & Legal
      </Link>

      <Link
        href={'/'}
        className='mx-3'
      >
        Ubicaciones
      </Link>

    </div>
  )
}
