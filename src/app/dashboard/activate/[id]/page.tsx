import { type Metadata } from 'next'
import Link from 'next/link'
import { getCustomersActivateById } from '@/actions'
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

export default async function ActivateByIdPage({ params }: IStatusActivatePageProps) {
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
              <h1 className={`${titleFont.className} antialiased font-semibold my-2 capitalize`}>{customer.customer.customer}</h1>
            </div>
          </div>
        </CardHeader>

        <CardContent className='w-full'>

          <div className='flex flex-col gap-3 mb-10 p-3'>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p><span className='font-semibold'>Curp:</span> {customer.customer.curp}</p>
              <p><span className='font-semibold'>NSS:</span> {customer.customer.nss}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p> <span className='font-semibold'>Telefono:</span> {customer.customer.phone}</p>
              <p><span className='font-semibold'>Correo:</span> {customer.customer.email}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p><span className='font-semibold'>RFC:</span> {customer.customer.rfc}</p>
              <p><span className='font-semibold'>NSS:</span> {customer.customer.rfc}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p><span className='font-semibold'>Semanas cotizadas:</span> {customer.customer.cotizationWeeks}</p>
              <p><span className='font-semibold'>Semanas descontadas:</span> {customer.customer.discountedWeeks}</p>
            </div>
            <div className='w-full'>
              <p><span className='font-semibold'>Dirección:</span> {customer.customer.address}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p><span className='font-semibold'>Estado:</span> {customer.customer.state}</p>
              <p><span className='font-semibold'>Entidad:</span> {customer.customer.birthState}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full'>
              <p><span className='font-semibold'>Infonavit:</span> {customer.customer.infonavit === 0 ? 'Sí' : 'No'}</p>
              <p className='capitalize'><span className='font-semibold'>Referencia:</span> {customer.customer.reference}</p>
            </div>
            <p><span className='font-semibold'>Última fecha de baja:</span> {customer.customer.lastDownDate.toLocaleDateString('es-MX')}</p>
          </div>

          <div className='flex gap-3 items-end justify-end mb-4 mr-2'>
            <Button
              type='button'
              variant={'destructive'}
            >
              <Link href={'/dashboard/activate'} >Regresar</Link>
            </Button>
            {/* <Button
              className='text-white'
            >
              <Link href={`/dashboard/activate/${customer.id}/change-status`}>
                Cambiar status
              </Link>
            </Button> */}
          </div>
        </CardContent>

      </Card>
    </div>
  )
}
