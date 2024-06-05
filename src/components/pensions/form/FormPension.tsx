'use client'

import clsx from 'clsx'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { updatedPension } from '@/actions/pensions/updated-pension'
import { type IPensionCustomer } from '@/interfaces'
import { currencyFormat } from '@/utils'

interface Props {
  pensionCustomer: IPensionCustomer
}

export const FormUpdatePensionCustomer = ({ pensionCustomer }: Props) => {
  if (pensionCustomer === null) {
    redirect('/pensiones')
  }

  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { handleSubmit, register, formState: { isValid }, reset, formState: { errors } } = useForm<IPensionCustomer>({
    defaultValues: {
      cliente_id: pensionCustomer?.cliente_id || 0,
      cliente: pensionCustomer?.cliente || '',
      curp: pensionCustomer?.curp || '',
      nss: pensionCustomer?.nss || '',
      monto: pensionCustomer?.monto || null,
      scotizadas: pensionCustomer?.scotizadas || 0,
      sdescontadas: pensionCustomer?.sdescontadas || 0,
      direccion: pensionCustomer?.direccion || '',
      telefono: pensionCustomer?.telefono || '',
      observaciones: pensionCustomer?.observaciones || '',
      tipo_tramite: pensionCustomer?.tipo_tramite || '',
      editado: pensionCustomer?.editado || '',
      create_at: pensionCustomer?.create_at || new Date(),
      rfc: pensionCustomer?.rfc || '',
      email: pensionCustomer?.email || '',
      pensionsDetails: {
        porcentaje: pensionCustomer?.pensionsDetails?.porcentaje || null,
        pago: pensionCustomer?.pensionsDetails?.pago || null,
        pago_imss: pensionCustomer?.pensionsDetails?.pago_imss || null,
        encargado: pensionCustomer?.pensionsDetails?.encargado || '',
        statusPensionId: Number(pensionCustomer?.pensionsDetails?.statusPensionId) || 0
      },
      asesor: {
        asesor_id: pensionCustomer?.asesor?.asesor_id || 0,
        asesor: pensionCustomer?.asesor?.asesor || ''
      },
      zona: {
        zona_id: pensionCustomer?.zona?.zona_id || 0,
        zona: pensionCustomer?.zona?.zona || ''
      },
      afore: {
        afore_id: pensionCustomer?.afore?.afore_id || 0,
        afore: pensionCustomer?.afore?.afore || ''
      }
    }
  })

  useEffect(() => {
    // is in edit mode, reset the form with the pensionCustomer data.
    if (isEditing) {
      reset({
        cliente_id: pensionCustomer?.cliente_id || 0,
        cliente: pensionCustomer?.cliente || '',
        curp: pensionCustomer?.curp || '',
        nss: pensionCustomer?.nss || '',
        monto: pensionCustomer?.monto || null,
        scotizadas: pensionCustomer?.scotizadas || 0,
        sdescontadas: pensionCustomer?.sdescontadas || 0,
        direccion: pensionCustomer?.direccion || '',
        telefono: pensionCustomer?.telefono || '',
        tipo_tramite: pensionCustomer?.tipo_tramite || '',
        observaciones: pensionCustomer?.observaciones || '',
        editado: pensionCustomer?.editado || '',
        rfc: pensionCustomer?.rfc || '',
        email: pensionCustomer?.email || '',
        create_at: pensionCustomer?.create_at || new Date(),
        pensionsDetails: {
          porcentaje: pensionCustomer?.pensionsDetails?.porcentaje || null,
          pago: pensionCustomer?.pensionsDetails?.pago || null,
          pago_imss: pensionCustomer?.pensionsDetails?.pago_imss || null,
          encargado: pensionCustomer?.pensionsDetails?.encargado || '',
          statusPensionId: Number(pensionCustomer?.pensionsDetails?.statusPensionId) || 0
        },
        asesor: {
          asesor_id: pensionCustomer?.asesor?.asesor_id || 0,
          asesor: pensionCustomer?.asesor?.asesor || ''
        },
        zona: {
          zona_id: pensionCustomer?.zona?.zona_id || 0,
          zona: pensionCustomer?.zona?.zona || ''
        },
        afore: {
          afore_id: pensionCustomer?.afore?.afore_id || 0,
          afore: pensionCustomer?.afore?.afore || ''
        }
      })
    }
  }, [pensionCustomer, isEditing, reset])

  const onSubmit = async (data: IPensionCustomer) => {
    setErrorMessage('')
    setIsSubmitting(true)

    // if (isEditing) {
    //   // server action
    //   const rta = await updatedPension(data.cliente_id, data)

    //   if (!rta.ok) {
    //     setErrorMessage('No se pudo editar cliente')
    //     setIsSubmitting(false)
    //     setIsEditing(false)
    //     return
    //   }
    // }

    // setIsSubmitting(false)
    // setIsEditing(false)
  }

  const handleButtonEditing = () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    setIsEditing(false)

    reset({
      cliente_id: pensionCustomer?.cliente_id || 0,
      cliente: pensionCustomer?.cliente || '',
      curp: pensionCustomer?.curp || '',
      nss: pensionCustomer?.nss || '',
      monto: pensionCustomer?.monto || null,
      scotizadas: pensionCustomer?.scotizadas || 0,
      sdescontadas: pensionCustomer?.sdescontadas || 0,
      direccion: pensionCustomer?.direccion || '',
      telefono: pensionCustomer?.telefono || '',
      tipo_tramite: pensionCustomer?.tipo_tramite || '',
      observaciones: pensionCustomer?.observaciones || '',
      editado: pensionCustomer?.editado || '',
      rfc: pensionCustomer?.rfc || '',
      email: pensionCustomer?.email || '',
      create_at: pensionCustomer?.create_at || new Date(),
      pensionsDetails: {
        porcentaje: pensionCustomer?.pensionsDetails?.porcentaje || null,
        pago: pensionCustomer?.pensionsDetails?.pago || null,
        pago_imss: pensionCustomer?.pensionsDetails?.pago_imss || null,
        encargado: pensionCustomer?.pensionsDetails?.encargado || '',
        statusPensionId: Number(pensionCustomer?.pensionsDetails?.statusPensionId) || 0
      },
      asesor: {
        asesor_id: pensionCustomer?.asesor?.asesor_id || 0,
        asesor: pensionCustomer?.asesor?.asesor || ''
      },
      zona: {
        zona_id: pensionCustomer?.zona?.zona_id || 0,
        zona: pensionCustomer?.zona?.zona || ''
      },
      afore: {
        afore_id: pensionCustomer?.afore?.afore_id || 0,
        afore: pensionCustomer?.afore?.afore || ''
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 mt-10 grid-cols-1 sm:px-5 sm:grid-cols-2 gap-3 bg-white dark:bg-slate-600 rounded-md shadow-md w-full p-3">

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="cliente">Nombre completo</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p className='capitalize'>{pensionCustomer.cliente}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.cliente
                      }
                    )
                  }
                  type="text"
                  {...register('cliente', { required: true })}
                />)
          }
        </div>
        {
          errors.cliente?.type === 'required' && (
            <span className='text-red-500'>* El nombre completo del cliente es requerido</span>
          )
        }
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="curp">Curp</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p className='capitalize'>{pensionCustomer.curp}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.curp
                      }
                    )
                  }
                  type="text"
                  {...register('curp', { required: true })}
                />)
          }
        </div>
        {
          errors.curp?.type === 'required' && (
            <span className='text-red-500'>* El curp del cliente es requerido</span>
          )
        }
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="nss">NSS</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p className='capitalize'>{pensionCustomer.nss}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.nss
                      }
                    )
                  }
                  type="text"
                  {...register('nss', { required: true })}
                />)
          }
        </div>
        {
          errors.nss?.type === 'required' && (
            <span className='text-red-500'>* El nss del cliente es requerido</span>
          )
        }
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="monto">Monto</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{currencyFormat(pensionCustomer.monto)}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.monto
                      }
                    )
                  }
                  type="text"
                  {...register('monto', { required: true })}
                />)
          }
        </div>
        {
          errors.monto?.type === 'required' && (
            <span className='text-red-500'>* El monto es requerido</span>
          )
        }
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="scotizadas">Semanas cotizadas</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.scotizadas}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.scotizadas
                      }
                    )
                  }
                  type="text"
                  {...register('scotizadas', { required: true })}
                />)
          }
        </div>
        {
          errors.scotizadas?.type === 'required' && (
            <span className='text-red-500'>* Las semanas cotizadas son requeridas</span>
          )
        }
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="sdescontadas">Semanas descontadas</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.sdescontadas}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.sdescontadas
                      }
                    )
                  }
                  type="text"
                  {...register('sdescontadas', { required: true })}
                />)
          }
        </div>
        {
          errors.sdescontadas?.type === 'required' && (
            <span className='text-red-500'>* Las semanas descontadas son requeridas</span>
          )
        }
      </div>

      {/* teléfono */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono">Teléfono</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.telefono}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.telefono
                      }
                    )
                  }
                  type="text"
                  {...register('telefono', { required: true })}
                />)
          }
        </div>
        {
          errors.telefono?.type === 'required' && (
            <span className='text-red-500'>* El teléfono es requerido</span>
          )
        }
      </div>

      {/* rfc */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="rfc">RFC</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.rfc}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 dark:bg-gray-700',
                      {
                        'border-red-500': errors.rfc
                      }
                    )
                  }
                  type="text"
                  {...register('rfc', { required: true })}
                />)
          }
        </div>
        {
          errors.rfc?.type === 'required' && (
            <span className='text-red-500'>* El rfc es requerido</span>
          )
        }
      </div>

      {/* tipo de trámite */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="tipo_tramite">Tipo de trámite</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.tipo_tramite}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.tipo_tramite
                      }
                    )
                  }
                  type="text"
                  {...register('tipo_tramite', { required: true })}
                />)
          }
        </div>
        {
          errors.tipo_tramite?.type === 'required' && (
            <span className='text-red-500'>* El tipo de trámite es requerido</span>
          )
        }
      </div>

      {/* email */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Correo</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.email}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 dark:bg-gray-700',
                      {
                        'border-red-500': errors.email
                      }
                    )
                  }
                  type="text"
                  {...register('email', { required: true })}
                />)
          }
        </div>
        {
          errors.email?.type === 'required' && (
            <span className='text-red-500'>* El correo eléctronico es requerido</span>
          )
        }
      </div>

      {/* afore */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="afore">Afore</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.afore?.afore}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 dark:bg-gray-700',
                      {
                        'border-red-500': errors.afore?.afore
                      }
                    )
                  }
                  type="text"
                  {...register('afore.afore', { required: true })}
                />)
          }
        </div>
        {
          errors.afore?.afore?.type === 'required' && (
            <span className='text-red-500'>* El nombre del afore es requerido</span>
          )
        }
      </div>

      {/* zona */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="zona">Zona</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.zona?.zona}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 dark:bg-gray-700',
                      {
                        'border-red-500': errors.zona?.zona
                      }
                    )
                  }
                  type="text"
                  {...register('zona.zona', { required: true })}
                />)
          }
        </div>
        {
          errors.zona?.zona?.type === 'required' && (
            <span className='text-red-500'>* La zona es requerida</span>
          )
        }
      </div>

      {/* porcentaje */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="porcentaje">Porcentaje</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.pensionsDetails?.porcentaje}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.pensionsDetails?.porcentaje
                      }
                    )
                  }
                  type="text"
                  {...register('pensionsDetails.porcentaje', { required: true })}
                />)
          }
        </div>
        {
          errors.pensionsDetails?.porcentaje?.type === 'required' && (
            <span className='text-red-500'>* El porcentaje es requerido</span>
          )
        }
      </div>

      {/* pago */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="pago">Pago</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{currencyFormat(pensionCustomer.pensionsDetails?.pago)}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.pensionsDetails?.pago
                      }
                    )
                  }
                  type="text"
                  {...register('pensionsDetails.pago', { required: true })}
                />)
          }
        </div>
        {
          errors.pensionsDetails?.pago?.type === 'required' && (
            <span className='text-red-500'>* El pago es requerido</span>
          )
        }
      </div>

      {/* pago imss */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="pago_imss">Pago IMSS</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{currencyFormat(pensionCustomer.pensionsDetails?.pago_imss)}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.pensionsDetails?.pago_imss
                      }
                    )
                  }
                  type="text"
                  {...register('pensionsDetails.pago_imss', { required: true })}
                />)
          }
        </div>
        {
          errors.pensionsDetails?.pago_imss?.type === 'required' && (
            <span className='text-red-500'>* El pago del imss es requerido</span>
          )
        }
      </div>

      {/*  encargado */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="encargado">Encargado</label>
          {
            !isEditing
              ? (
                <div className='h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 flex items-center text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.pensionsDetails?.encargado}</p>
                </div>)
              : (
                <input
                  className={
                    clsx(
                      'h-10 rounded-lg border border-solid focus:outline-none bg-gray-200 pl-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.pensionsDetails?.encargado
                      }
                    )
                  }
                  type="text"
                  {...register('pensionsDetails.encargado', { required: true })}
                />)
          }
        </div>
        {
          errors.pensionsDetails?.pago?.type === 'required' && (
            <span className='text-red-500'>* El nombre del encargado es requerido</span>
          )
        }
      </div>

      {/* dirección */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="direccion">Dirección</label>
          {
            !isEditing
              ? (
                <div className='h-20 rounded-lg border border-solid focus:outline-none bg-gray-200 p-2 flex items-start text-primary dark:bg-gray-700' >
                  <p>{pensionCustomer.direccion}</p>
                </div>)
              : (
                <textarea
                  className={
                    clsx(
                      'h-20 rounded-lg border border-solid focus:outline-none bg-gray-200 p-2 uppercase dark:bg-gray-700',
                      {
                        'border-red-500': errors.direccion
                      }
                    )
                  }
                  {...register('direccion', { required: true })}
                />)
          }
        </div>
        {
          errors.direccion?.type === 'required' && (
            <span className='text-red-500'>* La dirección es requerida</span>
          )
        }
      </div>

      {/* observaciones */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="observaciones">Observaciones</label>
          {
            !isEditing
              ? (
                <div className='h-20 rounded-lg border border-solid focus:outline-none bg-gray-200 p-2 flex items-start text-primary dark:bg-gray-700'>
                  <p>{pensionCustomer.observaciones}</p>
                </div>)
              : (
                <textarea
                  className={
                    clsx(
                      'h-20 rounded-lg border border-solid focus:outline-none bg-gray-200 p-2 capitalize dark:bg-gray-700',
                      {
                        'border-red-500': errors.observaciones
                      }
                    )
                  }
                  {...register('observaciones', { required: true })}
                />)
          }
        </div>
        {
          errors.observaciones?.type === 'required' && (
            <span className='text-red-500'>* Las observaciones son requeridas</span>
          )
        }
      </div>

      <span className='text-red-500'>{errorMessage}</span>

      {/* buttons */}
      <div className="mt-8 mb-6 flex gap-[10px]">
        <button
          type="button"
          onClick={handleButtonEditing}
          className="h-[51px] btn-danger"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        {
          isEditing && (
            <button
              disabled={isSubmitting && !isEditing}
              type="submit"
              className={clsx(
                'h-[51px]',
                {
                  'btn-primary': !isValid || !isSubmitting || !isEditing,
                  'btn-disabled': isSubmitting
                }
              )}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>)
        }
      </div>
    </form>
  )
}
