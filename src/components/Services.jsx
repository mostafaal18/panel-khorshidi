import { SquareCheckBig, ArrowLeft } from 'lucide-react'
import { services, serviceBullets } from '../data'
import SectionHeading from './SectionHeading'
import Img from './Img'
import Icon from './Icon'

// کلاس‌ها کامل نوشته شده‌اند تا Tailwind پیدایشان کند
const cardStyles = [
  {
    position: 'left-[-8%] top-[12%] z-10 h-[54%] w-[38%]',
    transform:
      '[transform:perspective(1100px)_rotateY(32deg)_rotateZ(-9deg)] group-hover:[transform:perspective(1100px)_rotateY(14deg)_rotateZ(-5deg)_translateY(-8px)]',
    delay: '0s',
  },
  {
    position: 'left-[28%] top-[0%] z-20 h-[64%] w-[44%]',
    transform:
      '[transform:perspective(1100px)_rotateY(28deg)_rotateZ(-7deg)] group-hover:[transform:perspective(1100px)_rotateY(10deg)_rotateZ(-3deg)_translateY(-12px)]',
    delay: '-2.3s',
  },
  {
    position: 'left-[70%] top-[15%] z-10 h-[49%] w-[34%]',
    transform:
      '[transform:perspective(1100px)_rotateY(37deg)_rotateZ(-8deg)] group-hover:[transform:perspective(1100px)_rotateY(17deg)_rotateZ(-5deg)_translateY(-8px)]',
    delay: '-4.6s',
  },
]

// قاب گرادینتی: چپ نارنجی، وسط سفید محو، راست آبی
const frame = 'bg-linear-to-r from-primary via-white/20 to-secondary'

export default function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden py-10 sm:py-18 lg:py-22">
      {/* نورهای پس‌زمینه */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 -z-10 size-[420px] rounded-full bg-secondary/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-4 md:gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
        
        {/* متن */}
        <div className="text-start lg:order-1">
          <SectionHeading
            eyebrow="راهکارهای جذاب خورشیدی"
            title="خدمات ما"
            desc="ما در تمامی مراحل، از مشاوره و طراحی تا نصب و پشتیبانی، در کنار شما هستیم."
          />

          <ul className="mt-8 space-y-4 sm:mt-9 sm:space-y-5">
            {serviceBullets.map((b) => (
              <li key={b} className="group flex items-center gap-1 text-sm text-muted transition-colors duration-300 hover:text-text sm:text-base">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/20 group-hover:shadow-[0_0_18px_rgba(255,149,0,0.35)]">
                  <SquareCheckBig size={17} className="text-primary drop-shadow-[0_0_7px_rgba(255,149,0,0.6)]" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/5 px-8 py-3.5 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(255,149,0,0.25)] sm:mt-10"
          >
            مشاهده همه خدمات
            <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
        </div>

        {/* ۱. دسکتاپ: کارت‌های شیشه‌ای سه‌بعدی روی هم افتاده */}
        <div dir="ltr" className="relative mx-auto hidden aspect-[560/430] w-full max-w-[680px] lg:order-2 lg:block">
          <div aria-hidden className="pointer-events-none absolute left-[15%] top-[25%] size-[65%] rounded-full border border-secondary/15 shadow-[0_0_70px_rgba(22,139,255,0.15)]" />
          <div aria-hidden className="pointer-events-none absolute left-[22%] top-[32%] size-[50%] rounded-full border border-secondary/20" />
          <div aria-hidden className="pointer-events-none absolute bottom-[6%] left-[8%] h-8 w-[84%] rounded-[100%] bg-secondary/25 blur-2xl" />

          <svg aria-hidden viewBox="0 0 560 430" className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="services-ring" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#26D6FF" stopOpacity="0" />
                <stop offset="45%" stopColor="#26D6FF" />
                <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
              </linearGradient>
              <filter id="services-ring-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
              <filter id="services-dot-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" /></filter>
            </defs>
            <g transform="rotate(-18 180 250)">
              <ellipse cx="180" cy="250" rx="190" ry="78" fill="none" stroke="url(#services-ring)" strokeWidth="5" filter="url(#services-ring-glow)" opacity=".85" />
              <ellipse cx="180" cy="250" rx="190" ry="78" fill="none" stroke="url(#services-ring)" strokeWidth="1.5" />
              <ellipse cx="180" cy="250" rx="206" ry="90" fill="none" stroke="#168BFF" strokeOpacity=".18" strokeWidth="1" />
              <circle cx="-10" cy="250" r="5" fill="#26D6FF" filter="url(#services-dot-glow)" />
              <circle cx="-10" cy="250" r="2.2" fill="#fff" />
            </g>
          </svg>

          {services.slice(0, 3).map((s, i) => (
            <div
              key={s.title}
              style={{ animationDelay: cardStyles[i].delay }}
              className={`group absolute motion-safe:animate-float ${cardStyles[i].position}`}
            >
              <div
                className={`h-full w-full rounded-[1.5rem] p-[1.5px] shadow-[-14px_10px_40px_-14px_rgba(255,149,0,0.5),14px_10px_40px_-14px_rgba(22,139,255,0.6),0_25px_55px_rgba(0,0,0,0.6)] will-change-transform transition-transform duration-700 ease-out ${frame} ${cardStyles[i].transform}`}
              >
                <article className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-bg-secondary/70 p-[3%] backdrop-blur-xl">
                  <Img
                    src={s.img}
                    alt={s.title}
                    className="!absolute inset-[3%] rounded-[1rem] transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-[3%] rounded-[1rem] bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

                  <div dir="rtl" className="absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-2 px-2 text-center">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-primary/35 bg-bg/80 text-primary shadow-[0_0_20px_rgba(255,149,0,0.25)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                      <Icon name={s.icon} size={22} />
                    </div>
                    <h3 className="text-xs font-extrabold leading-6 text-text sm:text-sm">{s.title}</h3>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>

        {/* ۲. موبایل و تبلت: دقیقاً همان استایل دسکتاپ، اما به صورت زیر هم */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:hidden">
          {services.map((s) => (
            <div 
              key={s.title} 
              // ارتفاع کارت‌ها در موبایل و تبلت برای حفظ تناسب
              className={`h-[320px] w-full rounded-[1.5rem] p-[1.5px] shadow-[-10px_8px_30px_-12px_rgba(255,149,0,0.5),10px_8px_30px_-12px_rgba(22,139,255,0.6),0_15px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1 sm:h-[400px] ${frame}`}
            >
              <article className="group relative h-full w-full overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-bg-secondary/70 p-[3%] backdrop-blur-xl">
                <Img
                  src={s.img}
                  alt={s.title}
                  className="!absolute inset-[3%] rounded-[1rem] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-[3%] rounded-[1rem] bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />
                
                {/* افکت درخشش نور */}
                <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

                {/* محتوای داخل کارت (آیکون و متن) دقیقاً مثل دسکتاپ */}
                <div dir="rtl" className="absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-2 px-2 text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-primary/35 bg-bg/80 text-primary shadow-[0_0_25px_rgba(255,149,0,0.3)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110 sm:size-10">
                    <Icon name={s.icon} size={24} className="sm:size-[22px]" />
                  </div>
                  <h3 className="text-sm font-extrabold leading-6 text-text sm:text-xs">{s.title}</h3>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}