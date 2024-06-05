'use server'

import { type Outsourcing } from '@prisma/client'
import prisma from '@/lib/prisma'

export const getOutsourcingByReceiptId = async (id: number): Promise<Outsourcing | null> => {
  try {
    const rta = await prisma.receiptIncome.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        outsourcing: true
      }
    })

    if (!rta) {
      return null
    }

    return rta.outsourcing
  } catch (error) {
    return null
  }
}
