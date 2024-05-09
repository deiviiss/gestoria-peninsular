import { getCustomerById } from '@/actions'
import { Title } from '@/components'
import ButtonBack from '@/components/ui/button-back/ButtonBack'
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
      <Title title='Cliente' subtitle='' className='text-xl text-center' />
      <div className='w-full max-w-4xl p-5 bg-white rounded-md shadow-md'>
        <div className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Cliente</p>
            <p className='text-sm'>{customer.cliente}</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Fecha de tramite</p>
            <p className='text-sm'>{getDateFormatSpanish(customer.fecha_tramite)}</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full'>
            <p className='text-lg font-semibold'>Zona</p>
            <p className='text-sm'>{customer.zona.zona}</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5'>
          <ButtonBack />
        </div>
      </div>
    </main>
  )
}
