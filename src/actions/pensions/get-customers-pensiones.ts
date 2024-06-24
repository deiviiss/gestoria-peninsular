'use server'

import prisma from '@/lib/prisma'

export const getCustomersPensiones = async () => {
  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        { tipo_tramite: 'Pension' },
        { tipo_tramite: 'Negativa' }
      ]
    },
    select: {
      cliente_id: true,
      cliente: true,
      curp: true,
      nss: true,
      monto: true,
      fecha_tramite: true,
      tipo_tramite: true

    },
    orderBy: {
      fecha_tramite: 'desc'
    },
    take: 10
  })

  if (!customers) {
    return null
  }

  return customers
}
