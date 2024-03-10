'use client'

import { useSession } from 'next-auth/react'
import { logout } from '@/auth'

export const LogoutButton = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return <p>
      <span >Espere...</span>
    </p >
  }

  return (
    <p
      onClick={async () => { await logout() }}
    >
      <span >Cerrar sesión</span>
    </p>
  )
}
