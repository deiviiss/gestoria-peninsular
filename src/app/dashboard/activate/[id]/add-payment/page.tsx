import { type Metadata } from 'next'
import Link from 'next/link'
import { getCustomersActivateById } from '@/actions'
import { FormAddPayment } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { titleFont } from '@/config/fonts'

export const metadata: Metadata = {
  title: 'Agrega un pago',
  description: 'Agrega un pago a un cliente en modalidad Activate'
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

  if (customer.status === 'Baja') {
    return (
      <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
        <Card>
          <CardHeader className='pb-2'>
            <div className='flex gap-3'>
              <div className='text-xl w-full'>
                <h1 className={`${titleFont.className} antialiased font-semibold my-2`}>Agregar pago de cliente</h1>

                <h2 className="text-sm my-3" >No se puede agregar un pago a <span className='capitalize font-medium' >{customer.customer.customer}</span> ya que el cliente se encuentra de baja en la modalidad <span className='capitalize font-medium'>Activate</span>.</h2>
              </div>

            </div>
          </CardHeader>

          <CardContent className='w-full'>
            <div className='flex gap-3 items-end justify-end mb-4 mr-2'>
              <Button
                type='button'
                variant={'destructive'}
              >
                <Link href={'/dashboard/activate'} >Cancelar</Link>
              </Button>
              <Button
                className='text-white'
              >
                <Link href={`/dashboard/activate/${customer.id}/change-status`}>
                  Cambiar status
                </Link>
              </Button>
            </div>
          </CardContent>

        </Card>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto items-center gap-3 mb-20'>
      <Card>
        <CardHeader className='pb-2'>
          <div className='flex gap-3'>
            <div className='text-xl w-full'>
              <h1 className={`${titleFont.className} antialiased font-semibold my-2`}>Agregar pago de cliente</h1>

              <h2 className="text-sm my-3" >Agrega un pago en modalidad activate a <span className='capitalize font-medium' >{customer.customer.customer}</span>.</h2>
            </div>

          </div>
        </CardHeader>

        <CardContent>
          <FormAddPayment customerActivateId={customer.id} />
        </CardContent>

      </Card>
    </div>
  )
}
