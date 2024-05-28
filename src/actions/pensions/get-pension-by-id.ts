'use server'

import prisma from '@/libs/prisma'

export const getPensionById = async (id: number) => {
  const pension = await prisma.customer.findUnique({
    where: {
      cliente_id: Number(id)
    },
    select: {
      cliente_id: true,
      cliente: true,
      fecha_tramite: true,
      status: true,
      observaciones: true,
      pensionesDetails: {
        select: {
          porcentaje: true,
          pago: true,
          pago_imss: true,
          encargado: true
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
