import { PopoverPension } from '../popover/Popover'
import { type Pension } from '@/interfaces'
import { currencyFormat } from '@/utils'

interface Props {
  pensions: Pension[]
}

export const TablePensiones = async ({ pensions }: Props) => {
  return (

    <div className='w-full overflow-auto'>
      <table className='w-full text-center'>
        <thead className="bg-primary dark:bg-secondary text-white border-b">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Cliente
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Trámite
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Porcentaje
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4">
              Monto a retirar
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 ">
              Pago
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 ">
              Status
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 ">
              Pago IMSS
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 ">

            </th>
          </tr>
        </thead>
        <tbody>
          {
            pensions?.map(pension => (
              <tr
                key={pension.cliente_id}
                className="bg-white dark:bg-slate-600 border-b transition duration-300 ease-in-out hover:bg-gray-200">
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap text-left max-w-58">
                  {pension.cliente}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap max-w-58">
                  {pension.tipo_tramite}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {pension.pensionsDetails?.porcentaje ? pension.pensionsDetails?.porcentaje : '0'}
                </td>
                <td className="flex items-center justify-center text-sm font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(pension.monto)}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap ">
                  {currencyFormat(pension.pensionsDetails?.pago)}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap ">
                  {pension.pensionsDetails?.statusPensionId === 1 ? 'En espera' : 'En el IMSS'}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap ">
                  {currencyFormat(pension.pensionsDetails?.pago_imss)}
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap" >
                  <PopoverPension pension={pension} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table >
    </div>

  )
}
