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

  const userImage = user.image || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
  const userName = user.fullname || 'Nombre de usuario'
  const userEmail = user.email || 'Correo electrónico'
  const userAddress = user.direccion || 'Dirección de usuario'
  const userMovil = user.movil || 'Teléfono de usuario'
  const userOficina = user.oficina || 'Oficina de usuario'
  const userZona = user.zona || 'Zona de usuario'
  const userPuesto = user.puesto || 'Puesto de usuario'

  return (
    <div className='flex flex-col items-center gap-3'>
      <h1 className='p-10 text-3xl'>Perfil de usuario</h1>

      {/* // TODO: Add the user card component here */}
      <div className='flex flex-col items-center justify-center max-w-2xl mx-auto gap-3 p-3 mb-10'>

        <Image src={userImage} alt={userName} width={100} height={100} className='rounded-full' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-4 '>
          <p><span className='font-semibold'>Nombre:</span> {userName}</p>
          <p><span className='font-semibold'>Correo:</span> {userEmail}</p>
          <p><span className='font-semibold'>Zona:</span> {userZona}</p>
          <p><span className='font-semibold'>Puesto:</span> {userPuesto}</p>
          <p><span className='font-semibold'>Movil:</span> {userMovil}</p>
          <p><span className='font-semibold'>Oficina:</span> {userOficina}</p>
          <p><span className='font-semibold'>Dirección:</span> {userAddress}</p>
        </div>
        <button type='button' className='btn-secondary'>
          <LogoutButton />
        </button>
      </div>

    </div>
  )
}

export default ProfilePage
