'use server'

import prisma from '@/libs/prisma'

export const getCustomerById = async (id: number) => {
  const customer = await prisma.customer.findUnique({
    where: {
      cliente_id: Number(id)
    },
    select: {
      cliente_id: true,
      cliente: true,
      fecha_tramite: true,
      status: true,
      zona: {
        select: {
          zona: true
        }
      }
    }
  })

  if (!customer) {
    return null
  }

  return customer
}
