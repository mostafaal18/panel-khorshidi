import { useMemo } from 'react'

// تولید عدد تصادفی ثابت (تا با هر رندر جای ستاره‌ها عوض نشود)
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const colors = ['#9CCBFF', '#26D6FF', '#6FB4FF', '#FFFFFF']

// خطوط منحنی نورانی افقی (دستگاه مختصات 1440×3600 که با ارتفاع صفحه کش می‌آید)
// o = شدت نسبی هر خط
const curves = [
  { d: 'M-100 820 C 300 940, 800 640, 1540 740', o: 1 },
  { d: 'M-100 1180 C 350 1300, 850 1020, 1540 1130', o: 0.9 },
  { d: 'M-100 1520 C 400 1660, 900 1380, 1540 1500', o: 1 },
  { d: 'M-100 1860 C 300 1740, 900 2000, 1540 1880', o: 0.8 },
  { d: 'M-100 1980 C 350 1830, 900 2180, 1540 2030', o: 1 },
  { d: 'M-100 2330 C 400 2450, 1000 2200, 1540 2310', o: 0.85 },
  { d: 'M-100 2640 C 400 2780, 1000 2490, 1540 2620', o: 1 },
  { d: 'M-100 2960 C 350 3080, 900 2820, 1540 2950', o: 0.85 },
  { d: 'M-100 3260 C 300 3110, 900 3400, 1540 3230', o: 1 },
  { d: 'M-100 3480 C 400 3380, 1000 3560, 1540 3450', o: 0.8 },
]

// خطوط عمودی ملایم کنار صفحه
const sideCurves = [
  { d: 'M180 -50 C 90 600, 330 1150, 150 1750', o: 0.7 },
  { d: 'M1280 900 C 1380 1500, 1130 2100, 1300 2800', o: 0.7 },
  { d: 'M160 2300 C 70 2800, 300 3200, 140 3650', o: 0.6 },
]

export default function PageBackground() {
  const stars = useMemo(() => {
    const rnd = mulberry32(7)
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      r: 0.6 + rnd() * 1.3,
      o: 0.25 + rnd() * 0.55,
      c: colors[Math.floor(rnd() * colors.length)],
      twinkle: rnd() > 0.55,
      delay: -rnd() * 6,
      dur: 3 + rnd() * 4,
      bright: rnd() > 0.93, // ستاره‌های درشت با هاله
    }))
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* لکه‌های نور آبی */}
      <div className="absolute -left-40 top-[18%] size-[520px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="absolute -right-40 top-[46%] size-[480px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="absolute -left-32 top-[74%] size-[460px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="absolute -right-32 top-[92%] size-[380px] rounded-full bg-primary/[0.06] blur-[130px]" />

      {/* خطوط منحنی */}
      <svg viewBox="0 0 1440 3600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="bg-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#168BFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#26D6FF" />
            <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg-line-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#168BFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#26D6FF" />
            <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {curves.map(({ d, o }, i) => (
          <g key={`h${i}`} fill="none" stroke="url(#bg-line)" opacity={o}>
            <path d={d} strokeWidth="12" opacity=".16" vectorEffect="non-scaling-stroke" />
            <path d={d} strokeWidth="4" opacity=".32" vectorEffect="non-scaling-stroke" />
            <path d={d} strokeWidth="1.5" opacity=".9" vectorEffect="non-scaling-stroke" />
            <path d={d} transform="translate(0 22)" strokeWidth="1" opacity=".4" vectorEffect="non-scaling-stroke" />
            <path d={d} transform="translate(0 46)" strokeWidth="1" opacity=".22" vectorEffect="non-scaling-stroke" />
          </g>
        ))}

        {sideCurves.map(({ d, o }, i) => (
          <g key={`v${i}`} fill="none" stroke="url(#bg-line-v)" opacity={o}>
            <path d={d} strokeWidth="8" opacity=".14" vectorEffect="non-scaling-stroke" />
            <path d={d} strokeWidth="1.5" opacity=".8" vectorEffect="non-scaling-stroke" />
            <path d={d} transform="translate(26 0)" strokeWidth="1" opacity=".35" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>

      {/* نقطه‌ها و ستاره‌ها */}
      <svg className="absolute inset-0 h-full w-full">
        {stars.map((s) => (
          <g key={s.id}>
            {s.bright && <circle cx={`${s.x}%`} cy={`${s.y}%`} r={s.r * 4} fill={s.c} opacity=".12" />}
            <circle
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.bright ? s.r * 1.4 : s.r}
              fill={s.c}
              opacity={s.o}
              className={s.twinkle ? 'motion-safe:animate-twinkle' : undefined}
              style={s.twinkle ? { animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` } : undefined}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}