import { type Metadata } from 'next'
import { getPensionById, getStatusPensions } from '@/actions'
import { ButtonBack, CompletePensionForm, Title } from '@/components'

export const metadata: Metadata = {
  title: 'Cambiar el status de la pensión',
  description: 'Pagina para cambiar el status de la pensión y agregar observaciones'
}

interface Props {
  params: {
    id: number
  }
}

const CompleteDataPage = async ({ params }: Props) => {
  const pension = await getPensionById(params.id)
  const { statusPensions } = await getStatusPensions()

  if (!statusPensions || statusPensions === undefined) {
    return (
      <div className='flex flex-col items-center justify-center gap-3'>
        <Title title='Cambiar el status de la pensión' subtitle='' />

        <p>No hay registros de status de pensiones</p>

        <ButtonBack />
      </div>
    )
  }

  if (!pension || pension === undefined) {
    return (
      <div className='flex flex-col items-center justify-center gap-3'>
        <Title title='Cambiar el status de la pensión' subtitle='' />

        <p>No hay registros de pensiones</p>

        <ButtonBack />
      </div>
    )
  }
  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
      <Title title='Completar datos de la pensión' subtitle='Información adicional' className='text-xl w-full' />

      <CompletePensionForm pension={pension} status={statusPensions} />

    </div>
  )
}

export default CompleteDataPage
