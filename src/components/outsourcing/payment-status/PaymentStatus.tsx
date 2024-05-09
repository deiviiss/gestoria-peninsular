'use client'

import { IoCardOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toggleStatusPaid } from '@/actions'
import { Title } from '@/components/ui/title/Title'
import { getDateFormatSpanish } from '@/utils'

interface PaymentStatusProps {
  isPaid: boolean
  datePaid?: Date | null
  receiptIncomeId: number
}

const MySwal = withReactContent(Swal)

export const PaymentStatus = ({ isPaid, datePaid, receiptIncomeId }: PaymentStatusProps) => {
  const iconClassName = isPaid ? 'text-green-800' : 'text-red-800'
  const text = isPaid ? 'Pagado' : 'Pagar'

  const handleTogglePayment = async () => {
    await MySwal.fire({
      html: <TogglePaymentForm />,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cambiar',
      preConfirm: async () => {
        try {
          const rta = await toggleStatusPaid(receiptIncomeId, !isPaid)
          if (!rta.ok) {
            Swal.showValidationMessage('El pago no se pudo verificar.')
            return null
          }
        } catch (error) {
          Swal.showValidationMessage('Sin conexión')
          return null
        }
      }
    })
  }

  const TogglePaymentForm = () => {
    return (
      <div className='flex flex-col'>
        <Title title='Cambiar estado de pago' subtitle='' />

        <div className='flex mb-4'>
          <p>Estado actual:</p> <span className={`mx-2 ${iconClassName}`}>{text}</span>
        </div>
        {
          datePaid && (
            <p className='text-start'>Fecha de pago: {getDateFormatSpanish(datePaid)}</p>
          )
        }
      </div>
    )
  }

  return (
    <>
      <p onClick={async () => { await handleTogglePayment() }} className='flex items-center cursor-pointer'>
        <IoCardOutline className={iconClassName} />
        <span className={`mx-2 ${iconClassName}`}>{text}</span>
      </p>
    </>
  )
}
