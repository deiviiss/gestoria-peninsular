export interface Customer {
  id: number
  customer: string
  curp: string
  nss: string
  rfc: string
  lastDownDate: Date
  cotizationWeeks: number
  discountedWeeks: number
  address: string
  phone: string
  reference: string
  modified_by: string
  infonavit: number
  email: string
  birthState: string
  state: string
}

export interface CustomersResponse {
  ok: boolean
  customers?: Customer[]
  message?: string
}
