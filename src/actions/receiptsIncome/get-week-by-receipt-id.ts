'use server'

import prisma from '@/libs/prisma'

export const getWeekByReceiptId = async (id: number) => {
  try {
    const rta = await prisma.receiptIncome.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        week: true
      }
    })

    if (rta === null) {
      return 'No se encontró la semana seleccionada'
    }

    return rta.week
  } catch (error) {
    return 'No se encontró la semana seleccionada'
  }
}
