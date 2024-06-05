'use server'

import { type IPensionStatus } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getPensionStatus = async (id: number): Promise<IPensionStatus | null> => {
  const pension = await prisma.customer.findUnique({
    where: {
      cliente_id: Number(id)
    },
    select: {
      cliente_id: true,
      cliente: true,
      pensionsDetails: {
        select: {
          porcentaje: true,
          pago: true,
          pago_imss: true,
          encargado: true,
          statusPensionId: true
        }
      },
      zona: {
        select: {
          zona: true
        }
      }
    }
  })

  if (!pension) {
    return null
  }

  return pension
}
