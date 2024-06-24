// 'use client'

// import clsx from 'clsx'
import { SidebarItem } from './SidebarItem'
import { getUserSessionServer } from '@/actions'
// import { useSession } from 'next-auth/react'
// import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
// import { logout } from '@/actions'
// import { useUiStore } from '@/store'

export const Sidebar = async () => {
  // const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  // const closeMenu = useUiStore((state) => state.closeSideMenu)

  // const { data: session } = useSession()
  // const isAuthenticated = !!session?.user
  // const isAdmin = session?.user?.role === 'admin'

  const user = await getUserSessionServer()
  const isAdmin = user?.role === 'admin'
  const isCoordinator = user?.role === 'coordinator'

  const linksAdmin = [
    { name: 'Outsourcing', href: '/dashboard/outsourcing' },
    { name: 'Pensiones', href: '/dashboard/pensions' },
    { name: 'Usuarios', href: '/dashboard/users' },
    { name: 'Impuestos', href: '/dashboard/taxes' },
    { name: 'Activate', href: '/dashboard/activate' }
  ].sort((a, b) => a.name.localeCompare(b.name))

  const linksCoordinator = [
    { name: 'Activate', href: '/dashboard/activate' }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-48 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0 dark:bg-slate-900 dark:border-slate-900">
          <div className="flex-1 flex flex-col pt-6 mt-2 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1 dark:bg-slate-900">
              {/* links */}
              {
                isAdmin && (
                  <ul className="space-y-2 pb-2">
                    {linksAdmin.map((link) => (
                      <li key={link.href}>
                        <SidebarItem
                          url={link.href}
                          name={link.name}
                        />
                      </li>
                    ))}
                  </ul>
                )
              }
              {
                isCoordinator && (
                  <ul className="space-y-2 pb-2">
                    {linksCoordinator.map((link) => (
                      <li key={link.href}>
                        <li key={link.href}>
                          <SidebarItem
                            url={link.href}
                            name={link.name}
                          />
                        </li>
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
          </div>
        </div>
      </aside>
      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
    </>
  )
}

// <>
//   {
//     isSideMenuOpen && (
//       <>
//         {/* background */}
//         <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-primary opacity-30'>
//         </div>
//         {/* blur */}
//         <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
//         </div>
//       </>
//     )
//   }

//   <nav className={
//     clsx(
//       'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-white text-primary z-20 shadow-2xl transform transition-all duration-300',
//       {
//         'translate-x-full': !isSideMenuOpen
//       }
//     )
//   }>

//     <IoCloseOutline
//       size={35}
//       className='absolute top-5 right-5 cursor-pointer'
//       onClick={closeMenu}
//     />

//     {/* input */}
//     <div className='relative mt-14'>
//       <IoSearchOutline size={20} className='absolute top-2 left-2 text-primary' />
//       <input
//         type='text'
//         placeholder='Buscar'
//         className='w-full bg-white rounded px-10 py-1 border-b-2 border-primary text-xl text-primary focus:outline-none focus:border-tertiary focus:border-b-2'
//       />
//     </div>

//     {/* menú */}
//     <div>
//       {
//         !isAuthenticated
//           ? (
//             <Link href='/auth/login'
//               onClick={() => { closeMenu() }}
//               className='flex items-center mt-10 p-2 hover:bg-primary hover:text-white rounded transition-all'>
//               <IoLogInOutline size={30} />
//               <span className='ml-3 text-xl'>Ingresar</span>
//             </Link>)
//           : (
//             <>
//               <Link href='/dashboard/profile'
//                 onClick={() => { closeMenu() }}
//                 className='flex items-center mt-10 p-2 hover:bg-primary hover:text-white rounded transition-all'>
//                 <IoPersonOutline size={30} />
//                 <span className='ml-3 text-xl'>Perfil</span>
//               </Link>

//               <button
//                 onClick={() => { logout() }}
//                 className='flex items-center w-full mt-10 p-2 hover:bg-primary hover:text-white rounded transition-all'>
//                 <IoLogOutOutline size={30} />
//                 <span className='ml-3 text-xl'>Salir</span>
//               </button>
//             </>)
//       }

//       {/* divisor */}
//       <div className="w-full h-px bg-primary rounded transition-all my-5"></div>
//     </div>

//     {
//       isAdmin && (
//         <>
//           <Link href='/dashboard/users'
//             onClick={() => { closeMenu() }}
//             className='flex items-center p-2 hover:bg-primary hover:text-white rounded transition-all'>
//             <IoPeopleOutline size={30} />
//             <span className='ml-3 text-xl'>Usuarios</span>
//           </Link>
//         </>)
//     }
//   </nav >

// </ >
