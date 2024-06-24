'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

interface IProps {
  id: number
  data: {
    incomeDate: Date
    observations?: string | null
    salary: number
    paymentDate: Date
    paymentAmount: number
  }
}

export const changeStatusCustomerActivateIncome = async ({ id, data }: IProps) => {
  try {
    const nextPaymentDate = new Date(data.incomeDate.getTime() + (30 * 24 * 60 * 60 * 1000)) // Adds 30 days in milliseconds

    await prisma.$transaction(async (tx) => {
      const customer = await tx.activate.update({
        where: { id },
        data: {
          salary: data.salary,
          incomeDate: data.incomeDate,
          status: 'Alta',
          observations: data.observations || null,
          nextPayment: nextPaymentDate,
          downDate: null
        }
      })

      const payment = await tx.activatePayment.create({
        data: {
          paymentAmount: data.paymentAmount,
          paymentDate: data.incomeDate,
          activate: {
            connect: { id }
          }
        }

      })

      return { customer, payment }
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
