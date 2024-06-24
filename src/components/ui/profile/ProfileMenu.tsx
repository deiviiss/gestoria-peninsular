'use client'

import Link from 'next/link'
import { CiLogout, CiUser } from 'react-icons/ci'
import { logout } from '@/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export const ProfileMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>GP</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="grid gap-4">

          <Button
            variant={'ghost'}
            className='flex items-center justify-start gap-2'
          >
            <CiUser className='w-4 h-4' />
            <Link
              href={'/dashboard/profile'}
            >
              Perfil
            </Link>
          </Button>

          <Button
            className='flex items-center justify-start gap-2'
            variant={'ghost'}
            onClick={() => { logout() }}
          >
            <CiLogout className='w-4 h-4' /> Cerrar sesión
          </Button>

        </div>
      </PopoverContent>
    </Popover>
  )
}
