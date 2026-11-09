import { Headphones, ArrowUpLeft, Leaf } from 'lucide-react'
import Img from './Img'

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[680px] items-center overflow-hidden pt-28 lg:min-h-[780px]">
      <Img src="/images/hero.jpg" className="!absolute inset-0 -z-20 h-full w-full" />

      {/* <div aria-hidden className="pointer-events-none absolute -left-[12%] -top-[45%] -z-10 size-[900px] rounded-full border border-secondary/10 shadow-[inset_0_0_120px_rgba(22,139,255,0.25),0_0_80px_rgba(22,139,255,0.2)]" />
      <div aria-hidden className="pointer-events-none absolute left-[28%] top-[8%] -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,226,170,0.9)_0%,rgba(255,149,0,0.35)_25%,transparent_65%)] opacity-70 blur-sm" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-bg/90 via-bg/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-bg to-transparent" /> */}

      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 text-sm font-medium text-primary">
            <span className="h-px w-10 bg-linear-to-l from-primary to-transparent" />
            انرژی پاک، آینده روشن
            <span className="h-px w-10 bg-linear-to-r from-primary to-transparent" />
          </div>

          <h1 className="text-4xl font-extrabold leading-snug drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] md:text-6xl md:leading-[1.3]">
            راهکاری هوشمندانه
            <br />
            برای زندگی <span className="text-gradient-primary drop-shadow-[0_0_28px_rgba(255,149,0,0.45)]">پایدار</span>
          </h1>

          <p className="mt-6 max-w-md leading-8 text-muted">
            با نصب پنل‌های خورشیدی، هزینه‌های انرژی را کاهش دهید و سهمی در حفظ محیط زیست داشته باشید.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 font-bold text-bg shadow-[0_0_32px_-4px_rgba(255,149,0,0.65)] transition duration-300 hover:-translate-y-1 hover:brightness-110"
            >
              <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[130%]" />
              <Headphones size={18} className="relative" /> <span className="relative">مشاوره رایگان</span>
            </a>

            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full border border-primary/70 bg-bg/30 px-6 py-3.5 font-medium text-primary backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_28px_-6px_rgba(255,149,0,0.5)]"
            >
              مشاهده پروژه‌ها
              <span className="grid size-7 place-items-center rounded-full border border-primary/60 transition-all duration-300 group-hover:bg-primary group-hover:text-bg">
                <ArrowUpLeft size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}