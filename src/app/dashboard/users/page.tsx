import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { Title, UsersGrid } from '@/components'
import prisma from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Pagina de usuarios',
  description: 'Contiene la lista de usuarios de la aplicacion'
}

export default async function UsersPage() {
  const user = await getUserSessionServer()
  const isAdmin = user?.role.includes('admin')

  if (!user) redirect('/auth/login')
  if (!isAdmin) redirect('/')

  const users = await prisma.user.findMany()

  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3'>
      <Title title='Página de Usuarios' subtitle='Muestra todos los usuarios' />
      <UsersGrid users={users} />
    </div>
  )
}
