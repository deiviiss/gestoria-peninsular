'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

interface IProps {
  id: number
  data: {
    downDate: Date
    observations?: string | null
    cotizationWeeks: number
    discountedWeeks: number
  }
}

export const changeStatusCustomerActivateDown = async ({ id, data }: IProps) => {
  try {
    await prisma.$transaction(async (tx) => {
      const customer = await tx.activate.update({
        where: { id },
        data: {
          downDate: data.downDate,
          status: 'Baja',
          observations: data.observations,
          nextPayment: null,
          salary: 0
        }
      })

      await tx.customer.update({
        where: { cliente_id: customer.customerId },
        data: {
          fecha_ultima_baja: data.downDate,
          scotizadas: data.cotizationWeeks,
          sdescontadas: data.discountedWeeks
        }
      })
      return { customer }
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
