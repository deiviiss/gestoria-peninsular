import bcrypt from 'bcryptjs'

interface SeedUser {
  id: string
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
}

interface SeedData {
  users: SeedUser[]
}

export const initialData: SeedData = {
  users: [
    {
      id: '218da11a-3790-4040-b1f0-d5e6de9d5250',
      email: 'admin@mail.com',
      name: 'David Hilera',
      password: bcrypt.hashSync('userseed'),
      role: 'admin'
    },
    {
      id: '618c01ea-fc81-4ac3-a6b3-bf07d87e607e',
      email: 'user@mail.com',
      name: 'User',
      password: bcrypt.hashSync('userseed'),
      role: 'user'
    }
  ]
}
