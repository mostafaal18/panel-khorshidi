// src/components/MobileBottomNav.jsx
import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, Layers, ShoppingCart, User } from 'lucide-react'

const items = [
  { id: 'home',     label: 'خانه',       icon: Home,         to: '/' },
  { id: 'products', label: 'محصولات',    icon: ShoppingBag,  to: '/products' },
  { id: 'services', label: 'خدمات',      icon: Layers,       to: '/services' },
  { id: 'cart',     label: 'سبد خرید',   icon: ShoppingCart, to: '/cart' },
  { id: 'profile',  label: 'پروفایل',    icon: User,         to: '/profile' },
]

export default function MobileBottomNav() {
  const { pathname, hash } = useLocation()

  const isActive = (to) => {
    if (to.startsWith('/#')) {
      return pathname === '/' && hash === to.slice(1)
    }
    if (to === '/') return pathname === '/'
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  const handleClick = (to) => {
    if (to.startsWith('/#')) {
      const id = to.slice(2)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      {/* فضای خالی تا انتهای صفحه زیر نوبار گیر نکند */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      <nav
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        aria-label="ناوبری موبایل"
      >
        {/* گرادیان محو شدن بالای نوبار */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-bg to-transparent" />

        <div className="mx-auto max-w-md px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
          <div className="glass relative overflow-hidden rounded-2xl shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.6)]">
            {/* خط گرادیان بالای نوبار */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <ul className="flex items-center justify-around">
              {items.map(({ id, label, icon: Icon, to }) => {
                const active = isActive(to)
                return (
                  <li key={id} className="flex-1">
                    <Link
                      to={to}
                      onClick={() => handleClick(to)}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors duration-300 ${
                        active ? 'text-primary' : 'text-muted hover:text-text'
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-1 -z-10 rounded-lg bg-primary/10" />
                      )}

                      <span
                        className={`absolute -top-1 size-1 rounded-full bg-primary shadow-[0_0_8px_rgba(255,149,0,0.9)] transition-opacity duration-300 ${
                          active ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      <span
                        className={`grid size-9 place-items-center rounded-lg transition-all duration-300 ${
                          active
                            ? 'bg-primary text-bg glow-orange'
                            : 'bg-transparent group-hover:bg-white/5'
                        }`}
                      >
                        <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                      </span>

                      <span className="text-[10px] font-medium leading-none">
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}