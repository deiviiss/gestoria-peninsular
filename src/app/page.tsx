import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-center w-full h-screen p-2' >
      <h1 className='text-3xl p-10'>Página de inicio</h1>

      <div className="flex flex-col gap-5">
        <Link href="/auth/login" className='p-2 rounded bg-blue-500 hover:bg-blue-300'>
          Iniciar sesión
        </Link>

        <Link href="/api/seed" className='p-2 rounded bg-red-500 hover:bg-red-300'>
          Ejecutar seed
        </Link>
      </div>

    </main>
  )
}
