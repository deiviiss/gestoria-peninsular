import { type Metadata } from 'next'
import { getCustomersActivateById } from '@/actions'
import { FormChangeStatusDown, FormChangeStatusIncome } from '@/components'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { titleFont } from '@/config/fonts'

export const metadata: Metadata = {
  title: 'Cambiar status',
  description: 'Cambiar status de los clientes en modalidad Activate'
}

interface IStatusActivatePageProps {
  params: {
    id: string
  }
}

export default async function ChangeStatusActivatePage({ params }: IStatusActivatePageProps) {
  const { id } = params
  const { customer } = await getCustomersActivateById(id)

  if (!customer) {
    return (
      <div>
        <h1>No se encontro el cliente</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
      <Card>
        <CardHeader className='pb-2'>
          <div className='flex gap-3'>
            <div className='text-xl w-full'>
              <h1 className={`${titleFont.className} antialiased font-semibold my-2`}>¿Cambiar status del cliente?</h1>

              <h2 className="text-sm my-3" >Cambia el status de <span className='capitalize font-medium' >{customer.customer.customer}</span> de {customer.status === 'Alta' ? 'Alta' : 'Baja'} a {customer.status === 'Alta' ? 'Baja' : 'Alta'}.</h2>
            </div>

          </div>
        </CardHeader>

        <CardContent>
          {
            customer.status === 'Alta'
              ? (<FormChangeStatusDown id={customer.id} />)
              : (<FormChangeStatusIncome id={customer.id} />)
          }
        </CardContent>

      </Card>
    </div>
  )
}
