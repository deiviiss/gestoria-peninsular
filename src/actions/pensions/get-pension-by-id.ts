'use server'

import { type IPensionCustomer } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getPensionById = async (id: number) => {
  const pension = await prisma.customer.findUnique({
    where: {
      cliente_id: Number(id)
    },
    select: {
      cliente_id: true,
      cliente: true,
      tipo_tramite: true,
      monto: true,
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

export async function getPensionCustomer(clienteId: number): Promise<IPensionCustomer | null> {
  const pensionCustomer = await prisma.customer.findUnique({
    where: { cliente_id: Number(clienteId) },
    select: {
      cliente_id: true,
      cliente: true,
      curp: true,
      nss: true,
      monto: true,
      scotizadas: true,
      sdescontadas: true,
      direccion: true,
      telefono: true,
      observaciones: true,
      tipo_tramite: true,
      editado: true,
      create_at: true,
      rfc: true,
      email: true,
      pensionsDetails: {
        select: {
          id: true,
          porcentaje: true,
          pago: true,
          pago_imss: true,
          encargado: true,
          statusPensionId: true
        }
      },
      asesor: {
        select: {
          asesor_id: true,
          asesor: true
        }
      },
      zona: {
        select: {
          zona_id: true,
          zona: true
        }
      },
      afore: {
        select: {
          afore_id: true,
          afore: true
        }
      }
    }
  })

  if (!pensionCustomer) {
    return null
  }

  return pensionCustomer
}
