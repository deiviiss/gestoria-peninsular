import { getCustomerById } from '@/actions'
import { ButtonBack, Title } from '@/components'

import { getDateFormatSpanish } from '@/utils'

interface Props {
  params: {
    id: number
  }
}

export default async function CustomersByIdPage({ params }: Props) {
  const { id } = params
  const customer = await getCustomerById(id)

  if (customer === null) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Cliente' subtitle='' className='text-xl text-center' />
        <p className=' my-5'>No se encontro el cliente</p>
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
            <p className='capitalize'>{customer.cliente}</p>
          </div>
          <div className='flex gap-2 items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Fecha de tramite</p>
            <p>{getDateFormatSpanish(customer.fecha_tramite)}</p>
          </div>
          <div className='flex gap-2 items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Zona</p>
            <p className='capitalize'>{customer.zona.zona}</p>
          </div>
          {
            customer.observaciones && (
              <div className='flex flex-col gap-2 items-center justify-center w-full'>
                <p className='text-lg font-semibold'>Observaciones</p>
                <p>{customer.observaciones}</p>
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
