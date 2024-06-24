'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SideItemProps {
  url: string
  icon?: JSX.Element
  name: string
}

export const SidebarItem = ({ url, name }: SideItemProps) => {
  const pathName = usePathname()

  return (
    <Link
      href={url}
      className={`text-base capitalize text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 ${pathName === url ? 'bg-gray-200 dark:bg-slate-800' : ''}`}
    >
      <span className="ml-3">{name}</span>
    </Link>
  )
}
