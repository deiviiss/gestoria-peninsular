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
import { changeStatusCustomerActivateIncome } from '@/actions'
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
    salary: z
      .coerce.number({
        required_error: 'Salario es requerido',
        invalid_type_error: 'Salario es requerido'
      })
      .min(261, {
        message: 'El salario debe ser mayor a $261'
      }),
    incomeDate: z.date({
      required_error: 'Fecha de alta es requerida'
    }),
    observations: z.string().optional(),
    paymentAmount: z
      .coerce.number({
        required_error: 'Pago es requerido',
        invalid_type_error: 'Salario es requerido'
      })
      .min(2620, {
        message: 'El pago debe ser mayor a $2,620'
      }),
    paymentDate: z.date({
      required_error: 'Fecha de pago es requerida'
    })
  })

export const FormChangeStatusIncome = ({ id }: { id: number }) => {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const rta = await changeStatusCustomerActivateIncome({ id, data: { ...values } })

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
            {/* salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$ 262"
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Salario con el que será dado de alta el cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* payment */}
            <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pago</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$ 2,620"
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Pago realizado por el cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>

            {/* incomeDate */}
            <FormField
              control={form.control}
              name="incomeDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de alta</FormLabel>
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
                        // disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    La fecha de alta es usada para calcular la fecha del siguiente pago.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* paymentDate */}
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de pago</FormLabel>
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
                        // disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    La fecha de pago es usada para calcular impuestos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-6 mb-2'>
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

            <div className='flex gap-3 items-end justify-end mb-4 mr-2'>
              <Button
                type='button'
                variant={'destructive'}
                disabled={isSubmitting}
              >
                <Link href={'/dashboard/activate'} >Cancelar</Link>
              </Button>
              {/*  submit */}
              <Button
                type="submit"
                className='text-white'
                disabled={isSubmitting}
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ >
  )
}
