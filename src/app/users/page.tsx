import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth'
import prisma from '@/libs/prisma'
import { UsersGrid } from '@/users'

export const metadata: Metadata = {
  title: 'Pagina de usuarios',
  description: 'Contiene la lista de usuarios de la aplicacion'
}

export default async function UsersPage() {
  const user = await getUserSessionServer()
  const isAdmin = user?.roles.includes('admin')

  if (!user) redirect('/auth/login')
  if (!isAdmin) redirect('/')

  const users = await prisma.user.findMany()

  return (
    <div>
      <UsersGrid users={users} />
    </div>
  )
}
