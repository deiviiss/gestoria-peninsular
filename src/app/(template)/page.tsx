import { Title } from '@/components'

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <Title title='Página de inicio' subtitle='Landing page del sitio' className='text-2xl' />

      {/* <div className="flex flex-col gap-5">
        <Link href="/auth/login" className='p-2 rounded bg-blue-500 hover:bg-blue-300'>
          Iniciar sesión
        </Link>

        <Link href="/api/seed" className='p-2 rounded bg-red-500 hover:bg-red-300'>
          Ejecutar seed
        </Link>
      </div> */}

    </main>
  )
}
