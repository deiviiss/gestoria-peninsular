import { Title, TableOutsourcing } from '@/components'

export default async function OutsourcingPage() {
  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <Title title='Outsourcing' subtitle='Lista de pagos hechos a outsourcing' className='text-xl w-full' />

      <TableOutsourcing />

    </main>
  )
}
