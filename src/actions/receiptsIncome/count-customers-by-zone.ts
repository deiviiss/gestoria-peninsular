'use server'

import prisma from '@/libs/prisma'

export const countCustomersByZone = async (id: number) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        receiptIncomeId: Number(id)
      },
      select: {
        cliente_id: true,
        cliente: true,
        fecha_tramite: true,
        zona: {
          select: {
            zona: true
          }
        }
      },
      orderBy: {
        zona: {
          zona: 'asc'
        }
      }
    })

    if (!customers) {
      return {
        ok: false,
        totalZonasCount: [],
        message: 'No se encontraron clientes para la semana seleccionada'
      }
    }

    const zonaCounts: Record<string, number> = customers.reduce((acc: Record<string, number>, customer) => {
      const zonaName = customer.zona.zona
      if (!acc[zonaName]) {
        acc[zonaName] = 0
      }
      acc[zonaName]++
      return acc
    }, {})

    const totalZonasCount = Object.entries(zonaCounts).map(([zona, total]) => ({ zona, total }))

    return {
      ok: true,
      totalZonasCount
    }
  } catch (error) {
    return {
      ok: false,
      totalZonasCount: [],
      error
    }
  }
}
