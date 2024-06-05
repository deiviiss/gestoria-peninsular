'use server'

import prisma from '@/lib/prisma'

export const getStatusPensions = async () => {
  try {
    const statusPensions = await prisma.statusPension.findMany({
      orderBy: {
        status: 'desc'
      }
    })

    if (!statusPensions === null || statusPensions.length === 0) {
      return {
        ok: false,
        error: 'No se encontraron status de pensiones'
      }
    }

    return {
      ok: true,
      statusPensions
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Error al obtener los status de pensiones'
    }
  }
}
