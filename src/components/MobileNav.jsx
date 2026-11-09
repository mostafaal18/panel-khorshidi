import { useState } from 'react'
import { Menu, X, ArrowUpLeft, Leaf } from 'lucide-react'

const links = [
  { href: '#home', label: 'خانه' },
  { href: '#services', label: 'خدمات' },
  { href: '#projects', label: 'پروژه‌ها' },
  { href: '#about', label: 'درباره ما' },
  { href: '#contact', label: 'تماس با ما' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <div className="border-b border-white/10 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-extrabold"
          >
            <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
              <Leaf size={18} />
            </span>
            <span>انرژی پاک</span>
          </a>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-text transition hover:bg-white/10"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="بستن منو"
          />

          <nav
            id="mobile-menu"
            className="relative mx-4 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-bg/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-primary/10 hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpLeft size={15} />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 font-bold text-bg"
            >
              مشاوره رایگان
            </a>
          </nav>
        </>
      )}
    </header>
  )
}