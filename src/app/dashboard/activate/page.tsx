import { TableActivate, Title } from '@/components'

export default async function ActivatePage() {
  return (
    <div>
      <Title title='Activate' subtitle='Lista de clientes en modalidad Activate' className='text-xl w-full' />

      <TableActivate />
    </div>
  )
}
