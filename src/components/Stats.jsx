import { stats } from '../data'
import Icon from './Icon'

// رنگ آیکون هر آیتم (کلاس‌ها کامل نوشته شده تا Tailwind پیدایشان کند)
const iconColors = ['text-success', 'text-primary', 'text-accent', 'text-primary']

export default function Stats() {
  return (
    <section className="relative z-20 -mt-10 px-4 md:-mt-14 md:px-5">
      <div className="relative mx-auto max-w-6xl">
        <div aria-hidden className="pointer-events-none absolute -left-4 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-4 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-secondary/40 blur-3xl" />

        <div className="relative rounded-[1.75rem] bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-2 overflow-hidden rounded-[calc(1.75rem-1px)] bg-bg/85 backdrop-blur-2xl md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.sub}
                className={[
                  'group relative flex min-h-28 flex-col items-center justify-center gap-1.5 px-3 text-center',
                  'border-border',
                  i % 2 === 0 ? 'border-e' : '',
                  i < 2 ? 'border-b' : '',
                  'md:border-b-0',
                  i < 3 ? 'md:border-e' : 'md:border-e-0',
                ].join(' ')}
              >
                {/* لایه شیشه‌ای هاور */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-1.5 overflow-hidden rounded-2xl border border-white/20 bg-linear-to-b from-white/15 via-white/[0.06] to-white/[0.02] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-12px_24px_-12px_rgba(22,139,255,0.25),0_8px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
                >
                  {/* برق شیشه که روی hover عبور می‌کند */}
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-[130%]" />
                </span>

                <Icon
                  name={s.icon}
                  size={28}
                  className={`${iconColors[i]} relative mb-1 drop-shadow-[0_0_10px_currentColor] transition-transform duration-300 group-hover:scale-110`}
                />
                <div className="relative text-base font-extrabold text-text sm:text-lg">{s.title}</div>
                <div className="relative text-xs text-muted transition-colors duration-300 group-hover:text-text/80">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}