import bcrypt from 'bcryptjs'

interface SeedUser {
  id?: string
  username: string
  password: string
  fullname: string
  zona: string
  puesto: string
  email: string
  movil: string
  oficina: string
  direccion: string
  permiso: string
}

interface SeedData {
  users: SeedUser[]
}

export const initialData: SeedData = {
  users: [
    {
      username: 'admin',
      email: 'admin@mail.com',
      fullname: 'David Hilera',
      zona: 'Campeche',
      password: bcrypt.hashSync('userseed'),
      puesto: 'Admin',
      movil: '9811234567',
      oficina: '9811234567',
      direccion: 'Calle 123',
      permiso: 'admin'
    },
    {
      username: 'user',
      email: 'user@mail.com',
      fullname: 'User',
      zona: 'Campeche',
      password: bcrypt.hashSync('userseed'),
      puesto: 'User',
      movil: '9811234567',
      oficina: '9811234567',
      direccion: 'Calle 123',
      permiso: 'user'
    }
  ]
}
