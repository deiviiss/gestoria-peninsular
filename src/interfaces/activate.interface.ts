import { type Decimal } from '@prisma/client/runtime/library'
import { type Customer } from './customers.interface'

export interface CustomerActivate {
  id: number
  incomeDate: Date
  salary: Decimal
  status: string
  observations: string | null
  nextPayment: Date | null
  downDate: Date | null
  payments: ActivatePayments[]
  customer: Customer
}

export interface ActivatePayments {
  id: number
  customerId: number
  paymentDate: Date
  paymentAmount: number
  status: string
  observations?: string
}

export interface ActivateResponse {
  ok: boolean
  customers?: CustomerActivate[]
  message?: string
}
