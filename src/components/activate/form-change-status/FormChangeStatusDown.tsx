'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCalendarOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { z } from 'zod'
import { changeStatusCustomerActivateDown } from '@/actions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const formSchema = z
  .object({
    downDate: z
      .date({
        required_error: 'Fecha de alta es requerida'
      }),
    cotizationWeeks: z
      .coerce.number({
        required_error: 'Semanas cotizadas son requeridas',
        invalid_type_error: 'Semanas cotizadas son requeridas'
      })
      .positive({
        message: 'Las semanas cotizadas deben ser mayor a 0'
      }),
    discountedWeeks: z
      .coerce.number({
        required_error: 'Semanas descontadas son requeridas',
        invalid_type_error: 'Semanas descontadas son requeridas'
      })
      .min(0, {
        message: 'Las semanas cotizadas deben ser igual o mayor a 0'
      }),
    observations: z.string({
      required_error: 'Observaciones son requeridas'
    })
  })

export const FormChangeStatusDown = ({ id }: { id: number }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const rta = await changeStatusCustomerActivateDown({ id, data: { ...values } })

    if (!rta.ok) {
      toast.error(
        'No se ha podido guardar',
        {
          position: 'top-right'
        })

      setIsSubmitting(false)
      return
    }

    toast.success(
      'El cliente se ha actualizado correctamente',
      {
        position: 'top-right'
      })

    router.push('/dashboard/activate')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className='grid grid-cols-2 gap-6'>
            {/* cotizationWeeks */}
            <FormField
              control={form.control}
              name="cotizationWeeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semanas cotizadas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1.00"
                      placeholder="230"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Las semanas cotizadas con las que se queda el cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* discountedWeeks */}
            <FormField
              control={form.control}
              name="discountedWeeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semanas descontas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1.00"
                      placeholder="230"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Las semanas descontadas con las que se queda el cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            {/* downDate */}
            <FormField
              control={form.control}
              name="downDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de baja</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? (format(field.value, 'PPP'))
                            : (<span>Selecciona una fecha</span>)
                          }
                          <IoCalendarOutline className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    La fecha de baja es usada para dar de baja al cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* observations */}
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escribe las observaciones aquí." {...field} />
                  </FormControl>
                  <FormDescription>
                    Observaciones sobre el cambio de status.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-3 items-end justify-end my-4 mr-2'>
            <Button
              type='button'
              variant={'destructive'}
              disabled={isSubmitting}
            >
              <Link href={'/dashboard/activate'} >Cancelar</Link>
            </Button>
            {/*  submit */}
            <Button disabled={isSubmitting} type="submit" className='text-white'>Guardar</Button>
          </div>
        </form>
      </Form>
    </ >
  )
}
