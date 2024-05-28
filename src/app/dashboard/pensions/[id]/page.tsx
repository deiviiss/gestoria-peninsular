import { getPensionById } from '@/actions'
import { ButtonBack, Title } from '@/components'
import { getDateFormatSpanish } from '@/utils'

interface Props {
  params: {
    id: number
  }
}

export default async function PensionsByIdPage({ params }: Props) {
  const pension = await getPensionById(params.id)

  if (pension === null) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Datos del cliente' subtitle='' className='text-xl text-center' />
        <p className=' my-5'>No se encontraron resultados</p>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <Title title='Datos del cliente' subtitle='' className='text-xl text-center' />
      <div className='w-full max-w-xl p-5 bg-white rounded-md shadow-md'>
        <div className='flex flex-col items-center justify-center w-full'>
          <div className='flex gap-2 items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Cliente</p>
            <p className='capitalize'>{pension.cliente}</p>
          </div>
          <div className='flex gap-2 items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Fecha de tramite</p>
            <p>{getDateFormatSpanish(pension.fecha_tramite)}</p>
          </div>
          <div className='flex gap-2 items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Zona</p>
            <p className='capitalize'>{pension.zona.zona}</p>
          </div>
          {
            pension.observaciones && (
              <div className='flex flex-col gap-2 items-center justify-center w-full'>
                <p className='text-lg font-semibold'>Observaciones</p>
                <p>{pension.observaciones}</p>
              </div>
            )
          }
        </div>
        <div className='flex gap-2 items-center justify-center w-full mt-5'>
          <ButtonBack />
        </div>
      </div>
    </main>
  )
}
