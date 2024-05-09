import Link from 'next/link'
import { IoLogoFacebook } from 'react-icons/io5'
import { getUserSessionServer } from '@/actions'
import { titleFont } from '@/config/fonts'

export const Footer = async () => {
  const user = await getUserSessionServer()

  return (
    <>
      <footer className='pt-16 pb-10 bg-primary text-white'>
        <div className='max-w-7xl mx-auto px-5'>
          <div className='grid sm:grid-cols-2 xl:grid-cols-3 text-sm gap-5'>
            <div className='md:mx-10'>
              <h6 className='text-base font-bold pb-3'>Acerca de</h6>
              <p className=''>Página web de Gestoría Peninsular, líder en servicios de tramitación de apoyo por desempleo, negativas y pensiones en el estado de Campeche.
              </p>
            </div>
            <div className='md:mx-10'>
              <h6 className='text-base font-bold pb-3'>Enlaces</h6>
              <ul className='pb-6'>
                <li>Importante: <Link href='/terms'>Términos y condiciones</Link>,  <Link href='/privacy'>Política de privacidad </Link>
                </li>
                <li>Menu: <Link href='/'>Inicio</Link>, <Link href='/#services'>Servicios</Link>, <Link href='/#metas'>Metas</Link>, <Link href='/contact'>Contacto</Link>
                </li>
              </ul>
            </div>
            <div className='sm:text-right text-center md:mr-10'>

              <div className='flex justify-center py-2 sm:justify-end gap-4'>
                <Link href='https://www.facebook.com/GestoriaPeninsularMx' target='_blank' rel='noreferrer'>
                  <IoLogoFacebook className='w-8 h-8' />
                </Link>
              </div>

              <p className='py-3'><Link href='mailto:gestoriapeninsularcampeche@gmail.com'><strong>gestoriapeninsularcampeche@gmail.com</strong></Link></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className='pb-6 bg-primary text-center text-white'>
        <div className='flex flex-col gap-2 text-xs'>
          <p className={`${titleFont.className} antialiased font-bold`}>Gestoría Peninsular <span className='font-normal'>© {new Date().getFullYear()}</span></p>
          {
            !user
              ? (
                <Link href='/auth/login' className='hover:underline cursor-pointer'>Iniciar sesión</Link>)
              : (
                <Link href='/dashboard' className='hover:underline cursor-pointer'>Ir a dashboard</Link>)
          }
        </div>
      </div>
    </>
  )
}
