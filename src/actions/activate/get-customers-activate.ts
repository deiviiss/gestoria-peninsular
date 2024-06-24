'use server'

import { revalidatePath } from 'next/cache'
import { type CustomerActivate, type ActivateResponse } from '@/interfaces/activate.interface'
import prisma from '@/lib/prisma'

export const getCustomersActivate = async (): Promise<ActivateResponse> => {
  try {
    const customers = await prisma.activate.findMany({
      select: {
        id: true,
        incomeDate: true,
        salary: true,
        status: true,
        observations: true,
        nextPayment: true,
        downDate: true,
        customer: {
          select: {
            cliente_id: true,
            cliente: true,
            curp: true,
            nss: true,
            rfc: true,
            fecha_ultima_baja: true,
            scotizadas: true,
            sdescontadas: true,
            direccion: true,
            telefono: true,
            referencia: true,
            editado: true,
            infonavit: true,
            email: true,
            entidad: true,
            state: true
          }
        },
        payments: {
          select: {
            id: true,
            paymentDate: true,
            paymentAmount: true
          }
        }
      }

    })

    if (!customers) {
      return {
        ok: false,
        message: 'No se encontraron clientes'
      }
    }

    const formatCustomers: CustomerActivate[] = customers.map(customer => ({
      id: customer.id,
      incomeDate: customer.incomeDate,
      salary: customer.salary,
      status: customer.status,
      observations: customer.observations,
      nextPayment: customer.nextPayment,
      downDate: customer.downDate,
      payments: [],
      customer: {
        id: customer.customer.cliente_id,
        customer: customer.customer.cliente || '',
        curp: customer.customer.curp || '',
        rfc: customer.customer.rfc || '',
        nss: customer.customer.nss || '',
        lastDownDate: customer.customer.fecha_ultima_baja || new Date(),
        cotizationWeeks: customer.customer.scotizadas || 0,
        discountedWeeks: customer.customer.sdescontadas || 0,
        address: customer.customer.direccion || '',
        phone: customer.customer.telefono || '',
        reference: customer.customer.referencia || '',
        modified_by: customer.customer.editado || '',
        infonavit: customer.customer.infonavit || 0,
        email: customer.customer.email || '',
        birthState: customer.customer.entidad || '',
        state: customer.customer.state || ''
      }
    }))

    revalidatePath('/dashboard/activate')
    return {
      ok: true,
      customers: formatCustomers
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Server internal error'
    }
  }
}
