'use client'

import { useSession } from 'next-auth/react'
import { logout } from '@/actions'

export const LogoutButton = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return <p>
      <span >Espere...</span>
    </p >
  }

  return (
    <button
      onClick={async () => { await logout() }}
      className='hover:underline cursor-pointer'
    >
      <span >Cerrar sesión</span>
    </button>
  )
}
