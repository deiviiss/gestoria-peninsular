const days = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles',
  'Jueves', 'Viernes', 'Sábado'
]
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
  'Junio', 'Julio', 'Agosto', 'Septiembre',
  'Octubre', 'Noviembre', 'Diciembre'
]

export const getDateFormatSpanish = (date: Date | null): string => {
  if (!date) return 'Por pagar'

  const dayWeek = days[date.getDay()]
  const dayMonth = date.getDate().toString().padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${dayWeek} ${dayMonth} de ${month} de ${year}`
}

// dd-mm-yyyy
export const getDateFormat = (date: Date): string => {
  const newDate = new Date(date)

  const day = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const year = newDate.getFullYear()

  return `${day}-${month}-${year}`
}
