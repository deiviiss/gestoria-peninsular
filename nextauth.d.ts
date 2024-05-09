import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      user_id: number
      username: string
      fullname: string
      zona: string
      puesto: string
      email: string
      movil: string
      oficina: string
      direccion: string
      permiso: string
      region: number
      role: string
    } & DefaultSession['user']
  }
}
