'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { ModeToggle } from '@/components'
import { useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const navLinks = [
    {
      name: 'Outsourcing',
      url: '/dashboard/outsourcing'
    },
    {
      name: 'Impuestos',
      url: '/dashboard/taxes'
    },
    {
      name: 'Pensiones',
      url: '/dashboard/pensions'
    }
  ]

  return (
    <nav className="flex px-5 py-2 border-b shadow-lg text-primary md:px-8 md:py-4">

      <div className='flex w-full justify-between items-center max-w-7xl mx-auto'>
        {/* logo */}
        <div className='w-40'>
          <Link href={'/'}>
            <Image src={'/LogoGP.png'} width={190} height={70} alt='logoGP' className='w-full h-auto' />
          </Link>
        </div>

        {/* center menu */}
        <div className='hidden sm:block'>
          {
            navLinks.map((link) => (
              <Link key={link.name} href={link.url} className='m-2 p-2 rounded-md transition-all hover:underline'>{link.name}</Link>
            ))
          }
        </div>

        {/* search menu */}
        <div className='flex items-center'>
          <Link href={'/'} className='mx-2'>
            <IoSearchOutline className='w-5 h-5 hover:scale-105 fade-in'></IoSearchOutline>
          </Link>

          <ModeToggle />

          {
            loaded && (
              <button type='button' onClick={openMenu} className='m-2 p-2 rounded-md transition-all hover:underline'>
                <RxHamburgerMenu className='w-5 h-5 hover:scale-105 fade-in'></RxHamburgerMenu>
              </button>
            )
          }
        </div>
      </div>

    </nav>
  )
}
