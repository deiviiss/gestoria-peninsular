'use client'

import Link from 'next/link'
import { IoFlashOutline, IoCreateOutline, IoCloudUploadOutline, IoEllipsisHorizontal, IoAnalytics } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { type Pension } from '@/interfaces'

interface Props {
  pension: Pension
}

export function PopoverPension({ pension }: Props) {
  if (pension === undefined) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <IoEllipsisHorizontal />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="grid gap-4">

          <h4 className="text-sm text-muted-foreground">Seleciona un opción</h4>

          <div className="flex items-center gap-2">
            <IoAnalytics className="w-4 h-4" />
            <Link
              href={`/dashboard/pensions/change-status/${pension.cliente_id}`}
              className="hover:underline"
            >
              Cambiar status
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IoCreateOutline className="w-4 h-4" />
            <Link
              href={`/dashboard/pensions/${pension.cliente_id}`}
              className="hover:underline"
            >
              Detalles
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IoCloudUploadOutline className="w-4 h-4" />
            <Link
              href={'/dashboard/pensions/upload-documents'}
              className="hover:underline"
            >
              Subir documento
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IoFlashOutline className="w-4 h-4" />
            <Link
              href={`/dashboard/pensions/complete-data/${pension.cliente_id}`}
              className="hover:underline"
            >
              Completar datos
            </Link>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  )
}
