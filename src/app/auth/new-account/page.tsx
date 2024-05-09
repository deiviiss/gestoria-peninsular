import type { Metadata } from 'next'
import Link from 'next/link'
import { Title } from '@/components'

export const metadata: Metadata = {
  title: 'Pagina para crear una nueva cuenta',
  description: 'Contiene el formulario para crear una nueva cuenta.'
}

const email = 'david.hilera@mail.com'

export default async function NewAccountPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <Title title='Cuenta nueva' subtitle={`Solicita tu cuenta a: ${email}`} className='text-center' />
      <Link href="/auth/login" className='bg-primary hover:opacity-90 text-white py-2 px-4 rounded transition-all'>
        Iniciar sesión
      </Link>
    </div>
  )
}
