'use server'

import prisma from '@/lib/prisma'

export const getReceiptIncomeById = async (id: number) => {
  try {
    const rta = await prisma.receiptIncome.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        week: true,
        total: true,
        cost: true,
        isPaid: true,
        atPaid: true,
        outsourcing: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!rta) {
      return null
    }

    return rta
  } catch (error) {
    return null
  }
}
