import { Footer } from '@/components'

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <div className='px-0 sm:px-10 max-w-[1440px] mx-auto'>
        {children}
      </div>
      <Footer />
    </main>
  )
}
