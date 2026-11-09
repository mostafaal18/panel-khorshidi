import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Headphones,
  Menu,
  Search,
  X,
  ShoppingBag,
  User,
  Sun,
} from 'lucide-react'
import { navLinks } from '../data'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname, hash])

  /* قفل اسکرول */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* بستن با کلیک بیرون */
  useEffect(() => {
    if (!open) return
    const handle = (e) => {
      if (
        menuRef.current?.contains(e.target) ||
        toggleRef.current?.contains(e.target)
      ) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [open])

  /* بستن با Esc */
  useEffect(() => {
    if (!open) return
    const handle = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open])

  /* اسکرول */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Ctrl/Cmd + K */
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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-bg/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          {/* لوگو */}
          <Link
            to="/"
            dir="ltr"
            aria-label="SunTech — صفحه اصلی"
            className="group flex items-center gap-2.5 sm:gap-3"
          >
            <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-[0_0_20px_-4px_rgba(255,149,0,0.6)] transition-all duration-500 group-hover:rotate-12 group-hover:shadow-[0_0_30px_-2px_rgba(255,149,0,0.8)] sm:size-10">
              <Sun size={18} className="text-bg" strokeWidth={2.5} />
            </span>
            <div className="leading-tight">
              <div className="text-lg font-extrabold tracking-wide text-text sm:text-xl">
                Sun<span className="text-gradient-primary">Tech</span>
              </div>
              <div className="mt-0.5 text-[9px] font-medium tracking-wide text-muted sm:text-[10px]">
                Solar Energy Solutions
              </div>
            </div>
          </Link>

          {/* ناوبری دسکتاپ */}
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href)
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`relative py-2 transition-colors duration-300 hover:text-primary ${
                    active ? 'text-primary' : 'text-text/85'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-primary transition-all duration-300 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* اکشن‌ها */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
              className="hidden rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-primary sm:block"
            >
              <Search size={18} />
            </button>

            <Link
              to="/profile"
              aria-label="پروفایل"
              className="hidden rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-primary sm:block"
            >
              <User size={18} />
            </Link>

            <Link
              to="/cart"
              aria-label="سبد خرید"
              className="relative rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-primary"
            >
              <ShoppingBag size={18} />
              <span className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-bg shadow-[0_0_10px_rgba(255,149,0,0.6)]">
                ۰
              </span>
            </Link>

            <Link
              to="/consultation"
              className="glow-orange me-1 hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-bg transition hover:brightness-110 sm:flex"
            >
              <Headphones size={16} />
              <span>درخواست مشاوره</span>
            </Link>

            <button
              ref={toggleRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              className="rounded-lg p-2 text-text transition hover:bg-white/5 lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {open && (
          <div
            ref={menuRef}
            className="glass mx-4 mb-4 rounded-2xl p-5 lg:hidden"
          >
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

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}