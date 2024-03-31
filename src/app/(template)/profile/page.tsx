import { type Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'
import { LogoutButton } from '@/components'

export const metadata: Metadata = {
  title: 'Perfil de usuario',
  description: 'Contiene la información del usuario.'
}

const ProfilePage = async () => {
  const user = await getUserSessionServer()

  if (!user) redirect('/auth/login')

  const userName = user.name || 'Nombre de usuario'
  const userImage = user.image || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  return (
    <div className='flex flex-col items-center gap-3'>
      <h1 className='p-10 text-3xl'>Perfil de usuario</h1>

      <div className='flex flex-col items-center gap-3 p-3'>

        <Image src={userImage} alt={userName} width={100} height={100} className='rounded-full' />

        <div className='flex flex-col gap-2 my-4'>
          <p><span className='font-semibold'>Nombre:</span> {userName}</p>
          <p><span className='font-semibold'>Correo:</span> {user.email}</p>
        </div>
        <button type='button' className='p-2 rounded bg-red-500 hover:bg-red-300'>
          <LogoutButton />
        </button>
      </div>

    </div>
  )
}

export default ProfilePage
