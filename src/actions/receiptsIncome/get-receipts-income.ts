'use server'

import prisma from '@/libs/prisma'

export const getReceiptsIncome = async (): Promise<{
  ok: boolean
  receiptsIncome: Array<{
    id: number
    week: number
    total: number
    cost: number
    isPaid: boolean
    atPaid: Date | null
    outsourcing: {
      name: string
    }
  }>
  error?: undefined
} | {
  ok: boolean
  error: unknown
  receiptsIncome?: undefined
}> => {
  try {
    const receiptsIncome = await prisma.receiptIncome.findMany({
      select: {
        id: true,
        week: true,
        total: true,
        cost: true,
        isPaid: true,
        atPaid: true,
        outsourcing: {
          select: {
            name: true
          }
        }
      }
    })

    if (!receiptsIncome) {
      return {
        ok: false,
        error: 'No se encontraron pagos'
      }
    }

    return {
      ok: true,
      receiptsIncome
    }
  } catch (error) {
    return {
      ok: false,
      error
    }
  }
}
