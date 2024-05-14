import { type Decimal } from '@prisma/client/runtime/library'

export interface CustomerPensiones {
  cliente_id: number
  cliente: string | null
  curp: string | null
  nss: string | null
  monto: Decimal | null
  fecha_tramite: Date | null
  tipo_tramite: string | null
}
