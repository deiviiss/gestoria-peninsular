'use client'

import { useRouter } from 'next/navigation'

interface IButtonBackProps {
  className?: string
}

export const ButtonBack = ({ className }: IButtonBackProps) => {
  const router = useRouter()

  return (
    <div className={`${className}`}>
      <button
        onClick={() => { router.back() }}
        className='p-2 text-primary hover:cursor-pointer hover:underline rounded-md'
      >
        Regresar
      </button>

    </div>
  )
}
