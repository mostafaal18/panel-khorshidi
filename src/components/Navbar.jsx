import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Headphones, Menu, Search, X, ChevronDown } from 'lucide-react'
import { navLinks } from '../data'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative flex items-center gap-1 pb-1 transition hover:text-primary ${i === 0 ? 'text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary' : ''}`}
            >
              {l.label}
              {(l.label === 'خدمات' || l.label === 'محصولات') && <ChevronDown size={14} />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button aria-label="جستجو" className="hidden p-2 text-muted hover:text-text sm:block"><Search size={18} /></button>
          <Link to="/#contact" className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-bg transition hover:brightness-110 sm:flex glow-orange">
            <Headphones size={16} /> درخواست مشاوره
          </Link>
          <button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="منو">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-4 rounded-2xl p-5 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm hover:text-primary">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}
