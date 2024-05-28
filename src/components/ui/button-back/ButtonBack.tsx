'use client'

import { useRouter } from 'next/navigation'

export const ButtonBack = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => { router.back() }}
      className='p-2 text-white bg-blue-500 rounded-md'
    >
      Regresar
    </button>
  )
}

export default ButtonBack
