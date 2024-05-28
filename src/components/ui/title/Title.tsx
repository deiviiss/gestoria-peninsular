import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${titleFont.className} antialiased font-semibold my-2`}>{title}</h1>
      {subtitle && (
        <h3 className="text-base my-3">{subtitle}</h3>
      )}
    </div>
  )
}
