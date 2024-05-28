import { type ColumnDef } from '@tanstack/react-table'
import { type CustomerPensiones } from '@/interfaces'

export const columns: Array<ColumnDef<CustomerPensiones>> = [
  {
    header: 'Cliente',
    accessorKey: 'cliente'
  },
  {
    header: 'CURP',
    accessorKey: 'curp'
  },
  {
    header: 'NSS',
    accessorKey: 'nss'
  },
  {
    header: 'Monto',
    accessorKey: 'monto'
  },
  {
    header: 'Fecha de trámite',
    accessorKey: 'fecha_tramite'
  },
  {
    header: 'Tipo de trámite',
    accessorKey: 'tipo_tramite'
  }
]
