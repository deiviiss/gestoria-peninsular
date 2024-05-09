import { type Users } from '@/interfaces'

export const UsersGrid = ({ users = [] }: Users) => {
  return (
    <>
      {
        users.map((user) => (
          // TODO UserCard
          <div key={user.user_id} className='border border-b-gray-300 p-2'>
            <h2>Nombre: {user.fullname}</h2>
            <p>Correo: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))
      }
    </>

  )
}
