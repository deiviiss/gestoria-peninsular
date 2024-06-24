import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-full items-center justify-center',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full items-center justify-center',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 w-full items-center justify-center',
        outline: 'text-foreground w-full items-center justify-center',
        info: 'border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80 w-full items-center justify-center',
        success:
          'border-transparent bg-emerald-600 text-white hover:bg-emerald-600/80 w-full items-center justify-center'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  capitalize?: boolean
}

function Badge({ className, variant, capitalize = false, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
