'use server'

import prisma from '@/lib/prisma'

export const getCustomersByReceipt = async (id: number) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        receiptIncomeId: Number(id)
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

    if (!customers) {
      return {
        ok: false,
        customers: [],
        message: 'No se encontraron clientes para la semana seleccionada'
      }
    }

    return {
      ok: true,
      customers
    }
  } catch (error) {
    return {
      ok: false,
      customers: [],
      error
    }
  }
}
