// src/components/MobileBottomNav.jsx
import { Home, Briefcase, Layers, User, Mail } from 'lucide-react'

const items = [
  { id: 'home', label: 'خانه', icon: Home, href: '#home' },
  { id: 'projects', label: 'پروژه‌ها', icon: Briefcase, href: '#projects' },
  { id: 'services', label: 'خدمات', icon: Layers, href: '#services' },
  { id: 'about', label: 'درباره ما', icon: User, href: '#about' },
  { id: 'contact', label: 'تماس', icon: Mail, href: '#contact' },
]

export default function MobileBottomNav({ active = 'home' }) {
  return (
    <>
      {/* فضای خالی برای اینکه انتهای صفحه زیر نوبار گیر نکند */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      <nav
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        aria-label="ناوبری موبایل"
      >
        {/* گرادیان محو شدن بالای نوبار */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-bg to-transparent" />

        <div className="mx-auto max-w-md px-1 pb-[max(env(safe-area-inset-bottom),0.2rem)]">
          <div className="glass relative rounded-2xl  shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.6)]">
            {/* خط گرادیان بالای نوبار */}
            <div className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <ul className="flex items-center justify-around">
              {items.map(({ id, label, icon: Icon, href }) => {
                const isActive = active === id
                return (
                  <li key={id} className="flex-1">
                    <a
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group relative flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-muted hover:text-text'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-1 -z-10 rounded-lg bg-primary/10" />
                      )}

                      <span
                        className={`absolute -top-1 h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(255,149,0,0.9)] transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      <span
                        className={`grid size-9 place-items-center rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-primary text-bg glow-orange'
                            : 'bg-transparent group-hover:bg-white/5'
                        }`}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                      </span>

                      <span className="text-[10px] font-medium leading-none">
                        {label}
                      </span>
                    </a>
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