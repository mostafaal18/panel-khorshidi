// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { Home, ArrowRight, Search, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 pb-16 pt-28">
      {/* هاله‌های نور پس‌زمینه */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 rounded-full bg-secondary/10 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute left-[20%] top-[60%] size-[280px] rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>

      {/* کارت شیشه‌ای */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white/[0.001] p-8 text-center shadow-[0_25px_80px_-30px_rgba(22,139,255,0.55),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.04)] backdrop-blur-3xl backdrop-saturate-150 sm:p-12">
        {/* درخشش‌های داخلی شیشه */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-secondary/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-primary/55 blur-3xl" />

        {/* خط گرادیان بالای کارت */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* هالهٔ داخلی */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(22,139,255,0.16),transparent_60%)]" />

        {/* انعکاس نور گوشهٔ بالا */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.06] to-transparent" />

        {/* عدد ۴۰۴ */}
        <div className="relative mb-6 inline-block select-none">
          <h1
            dir="ltr"
            className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-[5rem] font-black leading-none text-transparent drop-shadow-[0_0_40px_rgba(22,139,255,0.45)] sm:text-[7rem]"
          >
            404
          </h1>
          <span className="absolute -right-3 -top-2 grid size-9 place-items-center rounded-full border border-white/25 bg-white/10 text-secondary shadow-[0_0_22px_rgba(22,139,255,0.55)] backdrop-blur-xl">
            <Compass size={18} />
          </span>
        </div>

        {/* متن */}
        <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
          صفحه‌ای که دنبالش بودید{' '}
          <span className="text-gradient-primary">پیدا نشد</span>
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-muted">
          ممکن است آدرس اشتباه باشد، یا صفحه جابه‌جا شده باشد. می‌توانید از
          طریق دکمه‌های زیر به مسیر درست برگردید.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg shadow-[0_0_22px_rgba(255,149,0,0.35)] transition hover:shadow-[0_0_32px_rgba(255,149,0,0.6)]"
          >
            <Home size={16} /> بازگشت به خانه
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-bold text-secondary backdrop-blur-xl transition hover:border-secondary/50 hover:bg-secondary/15 hover:text-secondary"
          >
            <Search size={16} /> مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  )
}