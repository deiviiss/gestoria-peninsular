'use client'

import {
  type ColumnDef,
  type FilterFn,
  type Row,
  type SortDirection
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { BsCurrencyDollar } from 'react-icons/bs'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { MdCached, MdContentCopy, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineInfo } from 'react-icons/md'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type CustomerActivate } from '@/interfaces/activate.interface'

type IStatus = 'Alta' | 'Baja'
type IColorVariant = 'info' | 'secondary' | 'success' | 'outline' | 'destructive' | 'default'

const myCustomFilter: FilterFn<CustomerActivate> = (
  row: Row<CustomerActivate>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  const filterValueLower = filterValue.toLowerCase()
  const filterParts = filterValueLower.split(' ')

  const rowValuesInput = `${row.original.customer.customer} ${row.original.status}`.toLocaleLowerCase()

  // Check if all parts of the filter are included in the row values
  return filterParts.every(part => rowValuesInput.includes(part))
}

const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === 'asc') {
    return <MdKeyboardArrowDown className="h-4 w-4 ml-1" />
  }
  if (isSorted === 'desc') {
    return <MdKeyboardArrowUp className="h-4 w-4 ml-1" />
  }
  return null
}

export const columns: Array<ColumnDef<CustomerActivate>> = [
  {
    accessorKey: 'customer.customer',
    filterFn: myCustomFilter,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Cliente
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const customer = row.original.customer

      return (
        <div className="capitalize">
          {customer.customer}
        </div>
      )
    }
  }, // customer
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className='w-full flex items-center'
        onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
      >
        Status
        <SortedIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => {
      const status: IStatus = row.getValue('status')

      const statusColors: Record<IStatus, IColorVariant> = {
        Alta: 'success',
        Baja: 'destructive'
      }

      const variantColor: IColorVariant = statusColors[status] ?? 'default'

      return (
        <Badge
          variant={variantColor}
          capitalize={true}
          className="max-w-24 flex items-center justify-center mx-auto"
        >
          {`${status}`}
        </Badge>
      )
    }
  }, // status
  {
    accessorKey: 'salary',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-full flex items-center"
        onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
      >
        Salario
        <SortedIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salary'))

      if (amount === 0) {
        return <div className="text-center">-</div>
      }

      const formatted = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(amount)

      return <div className="text-center font-medium">{formatted}</div>
    }
  }, // salary
  {
    accessorKey: 'incomeDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex items-center'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Fecha de alta
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const incomeDate: Date | null = row.getValue('incomeDate')

      if (incomeDate === null) {
        return <div className="text-center">-</div>
      }

      const date = new Date(incomeDate)

      // utc date is one day behind
      date.setDate(date.getDate() + 1)

      return (
        <div className="text-center">
          {date.toLocaleDateString('es-MX')}
        </div>
      )
    }
  }, // incomeDate
  {
    accessorKey: 'downDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex items-center'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Fecha de baja
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const downDate: Date | null = row.getValue('downDate')

      if (downDate === null) {
        return <div className="text-center">Vigente</div>
      }

      const date = new Date(downDate)

      // utc date is one day behind
      date.setDate(date.getDate() + 1)

      return (
        <div className="text-center">
          {date.toLocaleDateString('es-MX')}
        </div>
      )
    }
  }, // downDate
  {
    accessorKey: 'nextPayment',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex items-center'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Próximo pago
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const nextPayment: Date | null = row.getValue('nextPayment')

      if (nextPayment === null) {
        return <div className="text-center">-</div>
      }

      const date = new Date(nextPayment)

      // utc date is one day behind
      date.setDate(date.getDate() + 1)

      return (
        <div className="text-center">
          {date.toLocaleDateString('es-MX')}
        </div>
      )
    }
  }, // NextPaymentDate
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer: CustomerActivate = row.original

      return (
        <div className='flex items-center justify-center'>

          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(customer.customer.curp)

                  toast.success('Curp copiado al portapapeles', {
                    position: 'top-right'
                  })
                }}
              >
                <MdContentCopy className='h-4 w-4 mr-2' /> Copiar Curp
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(customer.customer.nss)

                  toast.success('NSS copiado al portapapeles', {
                    position: 'top-right'
                  })
                }}
              >
                <MdContentCopy className='h-4 w-4 mr-2' /> Copiar NSS
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <BsCurrencyDollar className='h-4 w-4 mr-2' />
                <Link href={`/dashboard/activate/${customer.id}/add-payment`}>
                  Agregar pago
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <MdCached className='h-4 w-4  mr-2' />
                <Link href={`/dashboard/activate/${customer.id}/change-status`}>
                  Cambiar status
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IoCloudUploadOutline className='h-4 w-4 mr-2' />
                <Link href={`/dashboard/customers/${customer.id}/documents`}>
                  Subir documentos
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <MdOutlineInfo className='h-4 w-4 mr-2' />
                <Link href={`/dashboard/activate/${customer.id}`}>
                  Detalles
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  } // actions
]
