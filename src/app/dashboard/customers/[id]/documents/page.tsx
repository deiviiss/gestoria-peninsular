import { type Metadata } from 'next'
import Link from 'next/link'
import { Title } from '@/components'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Cargar documentos',
  description: 'Cargar documentos de los clientes'
}

const UploadDocumentsCustomerPage = async () => {
  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
      <Title title='Pagina para cargar documentos' subtitle='Formulario para cargar los documentos de los clientes' />

      <div className='flex gap-3 items-end justify-end mb-4 mr-2'>
        <Button
          type='button'
          variant={'destructive'}
        >
          <Link href={'/dashboard/activate'} >Regresar</Link>
        </Button>
        {/* <Button
              className='text-white'
            >
              <Link href={`/dashboard/activate/${customer.id}/change-status`}>
                Cambiar status
              </Link>
            </Button> */}
      </div>
    </div>
  )
}

export default UploadDocumentsCustomerPage
