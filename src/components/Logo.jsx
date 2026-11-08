import { Sun } from 'lucide-react'

export default function Logo({ large = false }) {
  return (
    <a href="/" className="flex items-center gap-3" dir="ltr">
      <Sun className="text-primary" size={large ? 44 : 36} />
      <div className="leading-tight">
        <div className={`${large ? 'text-3xl' : 'text-2xl'} font-extrabold tracking-wide`}>SunTech</div>
        <div className="text-[10px] text-muted">Solar Energy Solutions</div>
      </div>
    </a>
  )
}
