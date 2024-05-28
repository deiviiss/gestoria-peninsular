'use server'

import { type GetPensionsResponse, type PaginationOptions } from '@/interfaces'
import prisma from '@/libs/prisma'
import { validatePageNumber } from '@/utils'

export const getPensions = async ({ page = 1, take = 12, query = '' }: PaginationOptions): Promise<GetPensionsResponse> => {
  page = validatePageNumber(page)

  try {
    const pensions = await prisma.customer.findMany({
      where: {
        AND: [
          {
            OR: [
              { tipo_tramite: 'pension' },
              { tipo_tramite: 'negativa' }
            ]
          },
          {
            OR: [
              { cliente: { contains: query } }
            ]
          }
        ]
      },
      take,
      skip: (page - 1) * take,
      select: {
        cliente_id: true,
        cliente: true,
        tipo_tramite: true,
        monto: true,
        status: true,
        pensionesDetails: {
          select: {
            porcentaje: true,
            pago: true,
            pago_imss: true,
            encargado: true
          }
        }
      },
      orderBy: {
        create_at: 'desc'
      }
    })

    if (!pensions === null || pensions.length === 0) {
      return {
        ok: false,
        error: 'No se encontraron pensiones',
        currentPage: page,
        totalPages: 0
      }
    }

    const totalCount = await prisma.customer.count({
      where: {
        AND: [
          {
            OR: [
              { tipo_tramite: 'pension' },
              { tipo_tramite: 'negativa' }
            ]
          },
          {
            OR: [
              { cliente: { contains: query } }
            ]
          }
        ]
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      ok: true,
      pensions,
      currentPage: page,
      totalPages
    }
  } catch (error) {
    return {
      ok: false,
      currentPage: page,
      totalPages: 0,
      error: 'Error al obtener las pensiones'
    }
  }
}
