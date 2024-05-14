import clsx from 'clsx'
import Link from 'next/link'
import { countCustomersByZone, getCustomersByReceipt, getReceiptIncomeById } from '@/actions'
import { PaymentStatus, Title } from '@/components'
import { currencyFormat, getDateFormatSpanish } from '@/utils'

interface Props {
  params: {
    id: number
  }
}

export default async function OutsourcingByIdPage({ params }: Props) {
  const { customers, ok } = await getCustomersByReceipt(params.id)
  const { totalZonasCount } = await countCustomersByZone(params.id)
  const receiptIncome = await getReceiptIncomeById(params.id)

  if (receiptIncome === null) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Outsourcing' subtitle='Lista de pagos hechos a outsourcing' className='text-xl text-center' />
        <p className=' my-5'>No se encontraron pagos</p>
      </main>
    )
  }

  if (!ok) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Outsourcing' subtitle='Lista de pagos hechos a outsourcing' className='text-xl text-center' />
        <p className=' my-5'>Cargando...</p>
      </main>
    )
  }

  if (!customers.length) {
    return (
      <main className='flex flex-col items-center justify-center w-full p-2' >
        <Title title='Outsourcing' subtitle='Lista de pagos hechos a outsourcing' className='text-xl text-center' />
        <p className=' my-5'>No se encontraron clientes para la semana seleccionada</p>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <div className='flex gap-4 mb-10 w-full'>
        <table className='w-10 text-center m-5'>
          <thead className='bg-primary dark:bg-secondary text-white border-b'>
            <tr>
              <th scope='col' className='text-sm font-medium px-3 py-2'>Zona</th>
              <th scope='col' className='text-sm font-medium px-3 py-2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              totalZonasCount?.map((zona, index) => (
                <tr
                  key={index}
                  className='bg-white dark:bg-slate-600 border-b transition duration-300 ease-in-out hover:bg-gray-200'
                >
                  <td className="text-sm font-light px-3 py-2 whitespace-nowrap text-left">{zona.zona}</td>
                  <td className="text-sm font-light px-3 py-2 whitespace-nowrap">{zona.total}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className='flex flex-col w-full max-w-[700px] gap-10'>
          <Title title={`Clientes por zona - Semana ${receiptIncome.week}`} subtitle='' className='text-xl' />

          <div className='grid grid-cols-[250px,1fr] gap-1 gap-y-5 font-medium max-w-[800px]'>
            <p>Oursourcing: <span className='font-normal'>{receiptIncome.outsourcing.name}</span></p>
            <p>Costo: <span className='font-normal'>{currencyFormat(receiptIncome.cost)}</span></p>
            <p>Total de ingresos: <span className='font-normal'>{receiptIncome.total}</span></p>
            {
              receiptIncome.isPaid && (
                <p>Fecha de pago: <span className='font-normal'>{getDateFormatSpanish(receiptIncome.atPaid)}</span></p>
              )
            }
            <p>Estado de pago: <span className='font-normal'>{receiptIncome.isPaid ? 'Pagado' : 'No pagado'}</span></p>
          </div>
        </div>

        <div className='flex flex-col gap-10 py-5 h-full'>
          <Link href={'/dashboard/outsourcing'} className='hover:underline'>Regresar</Link>

          <button className={clsx(
            'border p-2 rounded',
            {
              'border-green-800': receiptIncome.isPaid,
              'border-red-800': !receiptIncome.isPaid
            })}>
            <PaymentStatus isPaid={receiptIncome.isPaid} datePaid={receiptIncome.atPaid} receiptIncomeId={receiptIncome.id} />
          </button>
        </div>
      </div>

      <table className="min-w-full text-center">
        <thead className="bg-primary dark:bg-secondary text-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Cliente
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Status
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Zona
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Fecha de trámite
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {
            customers?.map(customer => (
              <tr
                key={customer.cliente_id}
                className="bg-white dark:bg-slate-600 border-b transition duration-300 ease-in-out hover:bg-gray-200">

                <td className="text-sm font-light px-6 py-4 whitespace-nowrap text-left">
                  {customer.cliente}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  <span className={
                    clsx(
                      'rounded p-2',
                      {
                        'bg-green-500 text-white': customer.status !== 'Modificando',
                        'bg-red-500 text-white': customer.status === 'Modificando'
                      })
                  }>
                    {
                      customer.status !== 'Modificando' ? 'Confirmado' : 'Modificando'
                    }
                  </span>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {customer.zona?.zona}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {getDateFormatSpanish(customer.fecha_tramite)}
                </td>
                <td className="text-sm font-light px-6 ">
                  <Link
                    href={`/dashboard/customers/${customer.cliente_id}`}
                    className="hover:underline">
                    Detalles
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}
