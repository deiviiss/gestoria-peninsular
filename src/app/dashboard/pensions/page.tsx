import { type Metadata } from 'next'
import { getPensions } from '@/actions'
import { Pagination, TablePensiones, Title } from '@/components'
import Search from '@/components/ui/search-pension/SearchPension'

export const metadata: Metadata = {
  title: 'Pensiones GP',
  description: 'Contiene la información de las pensiones.'
}
interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

const PensionesPage = async ({ searchParams }: Props) => {
  const query = searchParams?.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { pensions, totalPages } = await getPensions({ page, query })

  if (!pensions) {
    return (
      <div className='flex flex-col items-center justify-center gap-3'>
        <Title title='Pensiones y Negativas de pensión' subtitle='' />

        <Search placeholder='Buscar pensiones' />

        <div className='flex flex-col items-center justify-center gap-3 p-3'>
          <p>No hay registros de pensiones</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto max-w-7xl gap-3 p-2'>
      <Title title='Pensiones y Negativas' subtitle='Todos los trámites de pensiones y negativas de pensión' className='text-xl w-full' />

      <div className='w-full flex items-center justify-end mb-2'>
        <Search placeholder='Buscar pensiones' />
      </div>

      <TablePensiones pensions={pensions} />

      <Pagination totalPages={totalPages} />
    </div>
  )
}

export default PensionesPage
