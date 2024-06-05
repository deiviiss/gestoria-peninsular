import { type Decimal } from '@prisma/client/runtime/library'

export const currencyFormat = (value: number | Decimal | null | undefined) => {
  if (value === null || value === undefined) return 0

  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value))
}
