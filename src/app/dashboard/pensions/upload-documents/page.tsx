import { type Metadata } from 'next'
import { getPensions } from '@/actions'
import { ButtonBack, Title } from '@/components'

export const metadata: Metadata = {
  title: 'Cargar documentos',
  description: 'Cargar documentos de los clientes'
}

const UploadDocumentsPage = async () => {
  const page = 1
  const query = ''
  const { pensions } = await getPensions({ page, query })

  if (!pensions || pensions === undefined) {
    return (
      <div className='flex flex-col items-center justify-center gap-3'>
        <h1 className='p-10 text-3xl'>Página para cargar documentos</h1>

        <p>No hay registros de pensiones</p>

        <ButtonBack />
      </div>
    )
  }
  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
      <Title title='Pagina para cargar documentos' subtitle='Formulario para cargar los documentos de los clientes' />

    </div>
  )
}

export default UploadDocumentsPage
