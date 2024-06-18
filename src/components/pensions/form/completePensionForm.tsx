'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type IStatusPension, type Pension } from '@/interfaces'

interface Props {
  pension: Pension
  status: IStatusPension[]
}

const pensionsDetailsSchema = z.object({
  porcentaje: z.number(),
  pago: z.number().positive(),
  pago_imss: z.number({
    required_error: 'El pago IMSS es requerido',
    invalid_type_error: 'El pago IMSS debe ser un número'
  }).positive({
    message: 'El pago IMSS debe ser mayor a 0'
  }),
  encargado: z.string({
    required_error: 'El nombre del encargado es requerido',
    invalid_type_error: 'El nombre del encargado debe ser una cadena de texto'
  }).min(1, { message: 'Falta nombre de encargado' }),
  cliente_id: z.number().int(),
  statusPensionId: z.string()
})

export const CompletePensionForm = ({ pension, status }: Props) => {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof pensionsDetailsSchema>>({
    resolver: zodResolver(pensionsDetailsSchema),
    defaultValues: {
      porcentaje: Number(pension?.pensionsDetails?.porcentaje) ?? null,
      pago: Number(pension?.pensionsDetails?.pago),
      pago_imss: Number(pension?.pensionsDetails?.pago_imss) ?? 0,
      encargado: pension?.pensionsDetails?.encargado?.toString() ?? '',
      cliente_id: pension?.cliente_id,
      statusPensionId: `${pension?.pensionsDetails?.statusPensionId}`
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pensionsDetailsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log({ values })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid x sm:grid-cols-3 gap-4"
        >
          {/* Porcentaje */}
          <FormField
            control={form.control}
            name="porcentaje"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Porcentaje</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormDescription>
                  Porcentaje del pago.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pago */}
          <FormField
            control={form.control}
            name="pago"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pago</FormLabel>
                <FormControl>
                  <Input type='number' placeholder="0.00" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormDescription>
                  Pago correspondiente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pago IMSS */}
          <FormField
            control={form.control}
            name="pago_imss"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pago IMSS</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        field.onChange(0)
                        return
                      }

                      field.onChange(parseFloat(e.target.value))
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Pago correspondiente al IMSS.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Encargado */}
          <FormField
            control={form.control}
            name="encargado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Encargado</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del encargado" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormDescription>
                  Nombre de la persona encargada.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="statusPensionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      status.map((item) => (
                        <SelectItem key={item.id} value={`${item.id}`}>{item.status}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Status de la pensión.

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 col-span-1 sm:col-span-3">

            {/* Submit */}
            <Button type="submit" className="">Guardar</Button>

            <Button type='button' variant={'destructive'} onClick={() => { router.back() }}>Cancelar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
