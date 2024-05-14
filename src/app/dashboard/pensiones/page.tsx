import { type Metadata } from 'next'
import { columns } from './columns'
import { PensionesDataTable } from './data-table'
import { getCustomersPensiones } from '@/actions/customers/get-customers-pensiones'
import { Title } from '@/components'

export const metadata: Metadata = {
  title: 'Página de pensiones',
  description: 'Contiene la información de las pensiones.'
}

const PensionesPage = async () => {
  const customers = await getCustomersPensiones()

  if (!customers) {
    return (
      <div className='flex flex-col items-center justify-center gap-3'>
        <Title title='Pensiones y Negativas de pensión' subtitle='' />
        <div className='flex flex-col items-center justify-center gap-3 p-3'>
          <p>No hay registros de pensiones</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <Title title='Pensiones y Negativas de pensión' subtitle='' />

      <div className='flex flex-col items-center justify-center max-w-2xl mx-auto gap-3 p-3 mb-10'>
        <PensionesDataTable columns={columns} data={customers} />
      </div>
    </div>
  )
}

export default PensionesPage
