'use client'

import { MdCached } from 'react-icons/md'
// import { FormChangeStatusIncome } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { type CustomerActivate } from '@/interfaces/activate.interface'

interface ICustomerData {
  customer: CustomerActivate
}

// interface IUpdateData {
//   status: string
//   observations?: string | null
//   nextPayment: Date | null
//   incomeDate: Date
//   salary: Decimal
// }

export const DialogFormChangeStatus = ({ customer }: ICustomerData) => {
  // const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  // const handleStatusChange = async () => {
  //   let updateData: IUpdateData
  //   console.log('data')
  //   // onClose()

  //   if (customer.status === 'Baja') {
  //     updateData = {
  //       status: 'Alta',
  //       observations: customer.observations,
  //       nextPayment: customer.nextPayment,
  //       incomeDate: customer.incomeDate,
  //       salary: customer.salary
  //     }

  //     await toggleStatusCustomerActivate({
  //       id: customer.id,
  //       data: updateData
  //     })
  //   }

  //   // setAlertDialogOpen(true)

  //   toast.success('Status cambiado', {
  //     position: 'top-right'
  //   })
  // }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='h-8 w-8 p-0'>
          <MdCached className='h-4 w-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>¿Cambiar status del cliente?</DialogTitle>
          <DialogDescription>
            {`Cambia el status del cliente de ${customer.status === 'Alta' ? 'Alta' : 'Baja'} a ${customer.status === 'Alta' ? 'Baja' : 'Alta'}.`}
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        {/* <FormChangeStatusIncome /> */}
        <DialogFooter>
          <Button type="button">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}
// >
//   <AlertDialogTrigger asChild>
//     <button className='flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer' >
//       Cambiar Status
//     </button>
//   </AlertDialogTrigger>

//   <AlertDialogContent>
//     <AlertDialogHeader>
//       <AlertDialogTitle>¿Cambiar status del cliente?</AlertDialogTitle>
//       <AlertDialogDescription>
//         {`Cambia el status del cliente de ${customer.status === 'Alta' ? 'Alta' : 'Baja'} a ${customer.status === 'Alta' ? 'Baja' : 'Alta'}.`}

//       </AlertDialogDescription>
//     </AlertDialogHeader>
//     <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="downDate" className="text-right">
//           Fecha de alta
//         </Label>
//         <Input
//           id="downDate"
//           defaultValue="Pedro Duarte"
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="observations" className="text-right">
//           Observaciones
//         </Label>
//         <Input
//           id="observations"
//           defaultValue="cliente..."
//           className="col-span-3"
//         />
//       </div>
//     </div>
//     <AlertDialogFooter>
//       <AlertDialogCancel>Cancelar</AlertDialogCancel>
//       <AlertDialogAction onClick={handleStatusChange}
//       >Confirmar</AlertDialogAction>
//     </AlertDialogFooter>
//   </AlertDialogContent>
// </AlertDialog>
