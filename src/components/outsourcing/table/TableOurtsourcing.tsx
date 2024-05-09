import Link from 'next/link'
import { PaymentStatus } from '../payment-status/PaymentStatus'
import { getReceiptsIncome } from '@/actions'
import { currencyFormat, getDateFormatSpanish } from '@/utils'

export const TableOutsourcing = async () => {
  const { receiptsIncome } = await getReceiptsIncome()

  return (
    <div className="mb-10 text-center w-full">
      <table className="min-w-full">
        <thead className="bg-primary text-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Semana
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Total
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Costo
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Pagado
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Outsoursing
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Fecha de pago
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">

            </th>
          </tr>
        </thead>
        <tbody>
          {
            receiptsIncome?.map(receiptIncome => (
              <tr
                key={receiptIncome.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200">
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {receiptIncome.week}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {receiptIncome.total}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(Number(receiptIncome.cost))}
                </td>
                <td className="flex items-center justify-center text-sm font-light px-6 py-4 whitespace-nowrap">
                  <PaymentStatus isPaid={receiptIncome.isPaid} datePaid={receiptIncome.atPaid} receiptIncomeId={receiptIncome.id} />
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {receiptIncome.outsourcing?.name}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {getDateFormatSpanish(receiptIncome.atPaid)}
                </td>
                <td className="text-sm font-light px-6 ">
                  <Link
                    href={`/dashboard/outsourcing/${receiptIncome.id}`}
                    className="hover:underline">
                    Detalles
                  </Link>
                </td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  )
}
