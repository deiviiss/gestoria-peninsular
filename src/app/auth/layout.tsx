import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()

  if (user) redirect('/')

  return (
    <main>
      {children}
    </main>
  )
}
