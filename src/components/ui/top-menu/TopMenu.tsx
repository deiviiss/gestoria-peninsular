'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} antialiased font-bold`}>Auth | Starter</span>
        </Link>
      </div>

      {/* center menu */}
      <div className='hidden sm:block'>
        <Link href={'/'} className='m-2 p-2 rounded-md transition-all hover:underline'>Acerca de</Link>
        <Link href={'/'} className='m-2 p-2 rounded-md transition-all hover:underline'>Política privacidad</Link>
      </div>

      {/* search cart menu */}
      <div className='flex items-center'>
        <Link href={'/'} className='mx-2'>
          <IoSearchOutline className='w-5 h-5 hover:scale-105 fade-in'></IoSearchOutline>
        </Link>

        {
          loaded && (
            <button type='button' onClick={openMenu} className='m-2 p-2 rounded-md transition-all hover:underline'>Menú</button>
          )
        }
      </div>
    </nav>
  )
}
