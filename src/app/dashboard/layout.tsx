import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { FooterDashboard, ModeToggle, ProfileMenu, Sidebar } from '@/components'

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      {/* <TopMenu /> */}
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full dark:bg-slate-900 dark:border-slate-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6 hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {/* Logo */}
              <Link
                href={'/dashboard'}
                className="h-10 overflow-hidden cursor-pointer flex items-center justify-center w-40"
              >
                <Image src={'/LogoGP.png'} width={190} height={70} alt='logoGP' className='w-auto h-full' />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <ProfileMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex overflow-hidden bg-white pt-16 dark:bg-slate-900">
        <Sidebar />
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-48 dark:bg-black">
          <main>
            <div className="py-6 px-4 ">
              <div className="w-full min-h-[calc(100vh-170px)]">
                {children}
              </div>
            </div>
          </main>
          <FooterDashboard />
        </div>
      </div>
    </>

  )
}
