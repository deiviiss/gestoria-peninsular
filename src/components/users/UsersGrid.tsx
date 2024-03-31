import { type Users } from '@/interfaces'

export const UsersGrid = ({ users = [] }: Users) => {
  return (
    <>
      {
        users.map((user) => (
          // TODO UserCard
          <div key={user.id} className='border border-b-gray-300 p-2'>
            <h2>Nombre: {user.name}</h2>
            <p>Correo: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))
      }
    </>

  )
}
