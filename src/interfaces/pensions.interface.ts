import { type Decimal } from '@prisma/client/runtime/library'

export interface PaginationOptions {
  page?: number
  take?: number
  query?: string
}

export interface PensionDetails {
  porcentaje: number | null
  pago: Decimal | null
  pago_imss: Decimal | null
  encargado: string | null
}

export interface Pension {
  cliente_id: number
  cliente: string | null
  tipo_tramite: string | null
  monto: Decimal | null
  status: string | null
  pensionesDetails: PensionDetails | null
}

export interface GetPensionsResponse {
  ok: boolean
  pensions?: Pension[]
  currentPage: number
  totalPages: number
  error?: string
}
