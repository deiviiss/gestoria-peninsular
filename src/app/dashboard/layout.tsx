import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { FooterDashboard, Sidebar, TopMenu } from '@/components'

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className='px-1 sm:px-10 py-0 sm:py-5  mx-auto'>
        {children}
      </div>
      <FooterDashboard />
    </main>
  )
}
