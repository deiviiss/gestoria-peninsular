import { initialData } from './seed'
import prisma from '../libs/prisma'

const main = async () => {
  // delete all data
  await prisma.user.deleteMany()

  // seed users
  const { users } = initialData

  // users
  await prisma.user.createMany({
    data: users
  })

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()
