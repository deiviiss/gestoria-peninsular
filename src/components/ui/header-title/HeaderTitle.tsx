export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <header className='py-10 px-2 bg-primary'>
      <div className=' max-w-7xl mx-auto'>
        <h1 className='text-4xl text-white font-bold'>{title}</h1>
      </div>
    </header>
  )
}
