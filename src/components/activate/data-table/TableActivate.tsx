import { columns } from './columns'
import { DataTable } from './data-table'
import { getCustomersActivate } from '@/actions'

export const TableActivate = async () => {
  const { customers } = await getCustomersActivate()

  if (!customers) {
    return (
      <div>
        <h1>No hay clientes</h1>
      </div>
    )
  }

  return (
    <>
      <DataTable columns={columns} data={customers} />
    </>
  )
}
