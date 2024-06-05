import { getPensionCustomer } from '@/actions/pensions/get-pension-by-id'
import { ButtonBack, FormUpdatePensionCustomer, Title } from '@/components'

interface Props {
  params: {
    id: number
  }
}

export default async function PensionsByIdPage({ params }: Props) {
  const pension = await getPensionCustomer(params.id)

  if (pension === null) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Datos del cliente' subtitle='' className='text-xl text-center' />
        <p className=' my-5'>No se encontraron resultados</p>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-2 gap-3' >

      <div className='flex justify-between w-full'>
        <Title title='Datos del cliente' subtitle='' className='text-xl w-full' />

        <ButtonBack />
      </div>

      <FormUpdatePensionCustomer pensionCustomer={pension} />
    </main>
  )
}
