import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/libs/prisma'

export async function GET() {
  // DELETE ALL data
  await prisma.user.deleteMany()

  // Crear usuarios de prueba
  await prisma.user.createMany({
    data: [
      {
        id: '218da11a-3790-4040-b1f0-d5e6de9d5250',
        email: 'admin@mail.com',
        name: 'Administrador',
        password: bcrypt.hashSync('admin123'),
        roles: 'admin'
      },
      {
        id: '618c01ea-fc81-4ac3-a6b3-bf07d87e607e',
        email: 'user1@mail.com',
        name: 'Usuario 1',
        password: bcrypt.hashSync('user01')
      }
    ]
  }
  )

  revalidatePath('/')
  redirect('/')
}
