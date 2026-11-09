import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Headphones,
  Menu,
  Search,
  X,
  ChevronDown,
  ShoppingBag,
  User,
} from 'lucide-react'
import { navLinks } from '../data'
import Logo from './Logo'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname, hash])

  /* Ctrl/Cmd + K برای باز کردن جستجو */
  useEffect(() => {
    const handle = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const isActive = (href) => {
    if (href === '/') return pathname === '/' && !hash
    if (href.startsWith('/#')) {
      return pathname === '/' && hash === href.slice(1)
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`relative flex items-center gap-1 pb-1 transition hover:text-primary ${
                    active
                      ? 'text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary'
                      : ''
                  }`}
                >
                  {l.label}
                  {(l.label === 'خدمات' || l.label === 'محصولات') && (
                    <ChevronDown size={14} />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
              className="hidden rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-text sm:block"
            >
              <Search size={18} />
            </button>
<Link
  to="/profile"
  aria-label="پروفایل"
  className="hidden rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-text sm:block"
>
  <User size={18} />
</Link>
            <Link
              to="/cart"
              aria-label="سبد خرید"
              className="relative p-2 text-muted transition hover:text-text"
            >
              <ShoppingBag size={18} />
              <span className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-bg shadow-[0_0_10px_rgba(255,149,0,0.6)]">
                ۰
              </span>
            </Link>

            <Link
              to="/consultation"
              className="glow-orange hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-bg transition hover:brightness-110 sm:flex"
            >
              <Headphones size={16} /> درخواست مشاوره
            </Link>

            <button
              className="p-2 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="منو"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="glass mx-4 rounded-2xl p-5 lg:hidden">
            {/* دکمهٔ جستجو در منوی موبایل */}
            <button
              onClick={() => {
                setOpen(false)
                setSearchOpen(true)
              }}
              className="mb-2 flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-muted"
            >
              <Search size={16} />
              جستجو...
            </button>

            {navLinks.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm transition hover:text-primary ${
                    active ? 'text-primary' : ''
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm transition hover:text-primary"
            >
              سبد خرید
            </Link>

            <Link
              to="/consultation"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-bold text-bg"
            >
              <Headphones size={16} /> درخواست مشاوره
            </Link>
          </div>
        )}
      </header>

      {/* مودال جستجو — بیرون از header تا z-index تمیز باشد */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}