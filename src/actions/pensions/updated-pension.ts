'use server'

import { type IPensionCustomer } from '@/interfaces'

export const updatedPension = async (id: number, data: IPensionCustomer) => {
  return {
    ok: true,
    error: null,
    message: 'Pensión actualizada correctamente'
  }
}
