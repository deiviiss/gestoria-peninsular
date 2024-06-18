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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type IStatusPension, type IPensionStatus } from '@/interfaces'

interface Props {
  pension: IPensionStatus
  status: IStatusPension[]
}

const pensionsDetailsSchema = z.object({
  observations: z.string().min(10, { message: 'La observación debe tener al menos 10 carácteres' }),
  statusPensionId: z.string()
})

export const ChangeStatusForm = ({ pension, status }: Props) => {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof pensionsDetailsSchema>>({
    resolver: zodResolver(pensionsDetailsSchema),
    defaultValues: {
      observations: '',
      statusPensionId: `${pension?.pensionsDetails?.statusPensionId}`
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pensionsDetailsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-4"
        >
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

          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe la información del status de la pensión"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Escribe cualquier observación hecha durante el trámite.
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
