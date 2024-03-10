import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagina para crear una nueva cuenta',
  description: 'Contiene el formulario para crear una nueva cuenta.'
}

export default async function NewAccountPage() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='p-10 text-3xl'>Pagina para crear una nueva cuenta</h1>
      <Link href="/auth/login" className='p-2 rounded bg-blue-500 hover:bg-blue-300'>
        Iniciar sesión
      </Link>
    </div>
  )
}
