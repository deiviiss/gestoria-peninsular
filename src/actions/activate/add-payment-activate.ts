'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

interface IProps {
  customerActivateId: number
  data: {
    observations: string
    paymentDate: Date
    paymentAmount: number
  }
}

export const addPaymentActivate = async ({ customerActivateId, data }: IProps) => {
  try {
    await prisma.$transaction(async (tx) => {
      const payment = await tx.activatePayment.create({
        data: {
          paymentDate: data.paymentDate,
          paymentAmount: data.paymentAmount,
          activateId: customerActivateId
        }
      })

      const customer = await tx.activate.update({
        where: { id: customerActivateId },
        data: {
          observations: data.observations
        }
      })

      return { payment, customer }
    })

    revalidatePath('/dashboard/activate')
    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Server internal error'
    }
  }
}
