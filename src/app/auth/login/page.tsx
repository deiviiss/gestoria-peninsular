import type { Metadata } from 'next'
import { LoginForm } from './ui/LoginForm'

export const metadata: Metadata = {
  title: 'Pagina para iniciar sesión',
  description: 'Contiene el formulario para iniciar sesión en la aplicación.'
}

export default async function LoginPage() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl p-10'>Página de inicio de sesión</h1>
      <div className='w-64'>
        <LoginForm />
      </div>
    </div>
  )
}
