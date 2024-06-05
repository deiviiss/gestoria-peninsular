import { type Decimal } from '@prisma/client/runtime/library'

export interface PaginationOptions {
  page?: number
  take?: number
  query?: string
}

export interface IPensionsDetails {
  porcentaje: number | null
  pago: Decimal | null | undefined
  pago_imss: Decimal | null | undefined
  encargado: string | null | undefined
  statusPensionId: number
}

export interface Pension {
  cliente_id: number
  cliente: string | null
  tipo_tramite: string | null
  monto: Decimal | null
  pensionsDetails: IPensionsDetails | null
}

export interface IPensionStatus {
  cliente_id: number
  cliente: string | null
  pensionsDetails: IPensionsDetails | null
}

export interface GetPensionsResponse {
  ok: boolean
  pensions?: Pension[]
  currentPage: number
  totalPages: number
  error?: string
}

export interface IPensionCustomer {
  cliente_id: number
  cliente: string | null
  curp: string | null
  nss: string | null
  monto: Decimal | null
  scotizadas: number | null
  sdescontadas: number | null
  direccion: string | null
  telefono: string | null
  observaciones: string | null
  tipo_tramite: string | null
  editado: string | null
  create_at: Date | null
  rfc: string | null
  email: string | null
  pensionsDetails: IPensionsDetails | null
  asesor: {
    asesor_id: number
    asesor: string
  } | null
  zona: {
    zona_id: number
    zona: string
  } | null
  afore: {
    afore_id: number
    afore: string
  } | null
}
