'use server'

import { type CustomersResponse, type Customer } from '@/interfaces/customers.interface'
import prisma from '@/lib/prisma'

export const getCustomers = async (): Promise<CustomersResponse> => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        cliente_id: true,
        cliente: true,
        curp: true,
        nss: true,
        rfc: true,
        fecha_baja: true,
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
      },
      orderBy: {
        fecha_tramite: 'desc'
      }
    })

    if (!customers) {
      return {
        ok: false,
        message: 'No se encontraron clientes'
      }
    }

    const formatCustomers: Customer[] = customers.map(customer => ({
      id: customer.cliente_id || 0,
      customer: customer.cliente || '',
      curp: customer.curp || '',
      rfc: customer.rfc || '',
      nss: customer.nss || '',
      lastDownDate: customer.fecha_baja || new Date(),
      cotizationWeeks: customer.scotizadas || 0,
      discountedWeeks: customer.sdescontadas || 0,
      address: customer.direccion || '',
      phone: customer.telefono || '',
      reference: customer.referencia || '',
      modified_by: customer.editado || '',
      infonavit: customer.infonavit || 0,
      email: customer.email || '',
      birthState: customer.entidad || '',
      state: customer.state || ''
    }))

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
