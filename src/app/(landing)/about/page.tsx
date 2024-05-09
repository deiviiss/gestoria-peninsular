import Image from 'next/image'
import Link from 'next/link'
import { HeaderTitle } from '@/components'

export default function HomePage() {
  return (
    <>
      <HeaderTitle title='Gestoria Peninsular: una historia de éxito en la gestión de trámites' />
      <div className='text-lg text-slate-600 tracking-wide'>
        <div className='max-w-[920px] mx-auto mb-5 pb-10'>
          <div className='bg-slate-50 m-4 mb-0 pb-0 p-8 text-justify'>
            <p>¿Sabías que en México hay más de 2 millones de personas que reciben algún tipo de apoyo por desempleo, negativa de pensión o pensión? Estos trámites pueden ser complicados y requieren de un conocimiento especializado para evitar errores y retrasos
            </p>
          </div>

          <div className='text-justify'>
            <div className='grid sm:grid-cols-2 items-center gap-8 pt-16'>
              <div className='flex flex-col py-2 px-3'>
                <h2 className='text-slate-700 text-3xl font-bold py-4 text-left'>Por eso, en Gestoria Peninsular</h2>
                <p className='text-base'>Nos dedicamos a ofrecer un servicio integral y personalizado para ayudar a nuestros clientes a obtener los beneficios que les corresponden por ley. Somos una empresa fundada en 2018 por nuestro director general, Héctor Zuluaga, quien tiene más de 10 años de experiencia en el sector.</p>
                <p className='text-base'>
                  Desde entonces, hemos logrado ayudar a más de 7000 personas a resolver sus trámites con éxito y satisfacción. Contamos con un equipo de profesionales capacitados y comprometidos con nuestra misión: facilitar la vida de nuestros clientes y defender sus derechos.
                </p>
              </div>
              <Image className='min-h-[410px] max-h-[410px] min-w-full object-cover' width={478} height={410} src='/historia.jpg' alt='historia' />
            </div>

            <div className='flex flex-col py-12 gap-4'>
              <div className='px-3'>
                <h2 className='text-center text-3xl font-bold text-slate-700 py-4'>Historia</h2>
                <p className='text-base'>En el año 2018, un joven emprendedor llamado Héctor Zuluaga decidió crear una empresa que se dedicara a gestionar los trámites de apoyo por desempleo, negativas de pensión y pensiones para las personas que lo necesitaran. Su motivación era ayudar a los ciudadanos a obtener sus derechos y beneficios ante las instituciones públicas, así como orientarlos sobre las mejores opciones para su futuro financiero.</p>
                <p className='text-base'>Así nació Gestoria Peninsular, una empresa que desde sus inicios se ha caracterizado por su profesionalismo, eficiencia y compromiso con sus clientes. Con sede en Campeche, Gestoria Peninsular ha logrado expandirse a diferentes estados del país.</p>

                <p className='text-base'>Hoy en día, Gestoria Peninsular tiene una base de clientes que ha ayudado de más de 7000 personas, las cuales han podido acceder a sus prestaciones sociales o mejorar su situación económica gracias al asesoramiento personalizado y especializado que ofrece la empresa.</p>
              </div>
              <h2 id='sucursales' className='text-center text-3xl font-bold text-slate-700 pt-24 mt-3'>Sucursales</h2>
              <ul className='flex flex-col gap-2 list-disc px-8 text-base mb-3'>
                <li>Campeche: Calle 10 #329 Edificio San Ignacio local #4 Colonia Centro CP 24000 <Link href='tel:+529811338591'>Tel: 981 133 8591</Link> San Francisco de Campeche, Campeche.</li>
                <li>Chetumal: Av. Benito Juarez  entre Alvaro Obregon numero 64 Col. Centro CP. 77000 <Link href='tel:+529831459481'>Tel: 983 145 9481</Link> Chetumal, Quintana Roo.</li>
                <li>Cozumel: Calle 65 con 2 norte CP 77620 <Link href='tel:+529871466196'>Tel: 987 146 6196</Link> Cozumel, Quintana Roo.</li>
                <li className='mt-3'>Cuernavaca: Calle Cuernavaca #47 Col Cuauhnahuac CP 62430 <Link href='tel:+529811202069'>Tel: 981 120 2069</Link> Cuernavaca, Morelos.</li>
                <li>Ixtapaluca: Av. Cuauhtemoc #7 Santana Barbara CP 56538 <Link href='tel:+525577710769'>557 771 0769</Link> Ixtapaluca, México.</li>
                <li>Jiutepec: Insurgentes Num 1 Col Centro CP 62550 Edificio Corporativo 3er piso oficina 402 <Link href='tel:+527777370907'>Tel: 777 737 0907</Link> Jiutepec Morelos.</li>
                <li>Ocotepec: Boulevard 17 de abril #118 CP 6220 <Link href='tel:+52773758404'>Tel: 777 375 8404</Link> Ocotepec, Morelos.</li>

              </ul>

              <Image className='min-h-[410px] max-h-[410px] min-w-full object-cover' width={478} height={410} src='/mapa.jpg' alt='mapa' />

              <div className='px-3'>
                <h2 className='text-center text-3xl font-bold text-slate-700 pt-12 py-4'>Anécdota del fundador</h2>

                <p className='text-base'>Héctor Zuluaga siempre tuvo un espíritu emprendedor y solidario desde pequeño. Cuando tenía diez años, organizó una colecta entre sus compañeros de escuela para comprar juguetes para los niños de un orfanato cercano. Su maestra quedó tan impresionada por su iniciativa que le regaló un libro sobre finanzas personales que despertó su interés por el tema.</p>

                <p className='text-base'>Años más tarde, cuando estudiaba la carrera de administración en la universidad, Héctor tuvo la oportunidad de hacer unas prácticas en una gestoría donde aprendió los procesos y requisitos para tramitar pensiones y subsidios por desempleo. Ahí se dio cuenta de que muchas personas desconocían sus derechos o tenían dificultades para acceder a ellos por falta de información o asesoría.</p>

                <p className='text-base'>Fue entonces cuando decidió crear su propia empresa que ofreciera un servicio integral y personalizado a los ciudadanos que necesitaran ayuda con estos trámites. Así nació Gestoria Peninsular, una empresa que combina el conocimiento financiero con el compromiso social.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
