'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/libs/prisma'

export const toggleStatusPaid = async (id: number, statusPaid: boolean) => {
  try {
    await prisma.receiptIncome.update({
      where: { id },
      data: {
        isPaid: statusPaid,
        atPaid: statusPaid ? new Date() : null
      }
    })

    revalidatePath('/dashboard/outsourcing')

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}
