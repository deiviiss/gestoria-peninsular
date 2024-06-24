'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
}

type IStatus = 'Alta' | 'Baja' | 'Todos'
type IColumnsNameSpanish = 'Cliente' | 'Fecha alta' | 'Salario' | 'Status' | 'Próximo pago' | 'Fecha baja'
type IColumnsNameEnglish = 'customer_customer' | 'incomeDate' | 'salary' | 'status' | 'nextPayment' | 'downDate'

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentStatus, setCurrentStatus] = useState<IStatus>('Todos')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div>
      {/* filters */}
      <div className="flex items-center justify-between py-4">
        {/* filter customer */}
        <Input
          placeholder="Filtra cliente, status"
          value={(table.getColumn('customer_customer')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            setCurrentStatus('Todos') // clear status filter
            table.getColumn('status')?.setFilterValue(undefined) // clear status filter
            table.getColumn('customer_customer')?.setFilterValue(event.target.value) // set customer filter
          }
          }
          className="max-w-sm"
        />

        {/* filter status */}
        <Select
          value={currentStatus}
          onValueChange={(value: IStatus) => {
            if (value === 'Todos') {
              table.getColumn('status')?.setFilterValue(undefined)
              setCurrentStatus('Todos')
              return
            }

            setCurrentStatus(value)
            table.getColumn('status')?.setFilterValue(value)
          }}
        >
          <SelectTrigger className="w-[180px] ml-2">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Baja">Baja</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* columns dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                const columnNameChange: Record<IColumnsNameEnglish, IColumnsNameSpanish> = {
                  customer_customer: 'Cliente',
                  incomeDate: 'Fecha alta',
                  salary: 'Salario',
                  status: 'Status',
                  nextPayment: 'Próximo pago',
                  downDate: 'Fecha baja'
                }

                const columnName = columnNameChange[column.id as IColumnsNameEnglish]

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => { column.toggleVisibility(!!value) }
                    }
                  >
                    {columnName}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>)))
              : (<TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center space-x-2 py-4 mx-4">
          {/* number select rows */}
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
          </div>

          {/* pagination */}
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => { table.previousPage() }}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { table.nextPage() }}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>

        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="w-[180px] mx-4 mb-4">
            <SelectValue placeholder='10 filas' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filas</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
    </div >
  )
}
