import { useState } from 'react'
import { Plus, CircleHelp } from 'lucide-react'
import { faqs } from '../data'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    // --- قاب گرادینتی اصلی (جایگزین GlowFrame) ---
    <div className="h-full rounded-2xl sm:rounded-[1.5rem] p-[1.5px] bg-linear-to-r from-primary via-white/15 to-secondary shadow-[-8px_4px_20px_-12px_rgba(255,149,0,0.4),8px_4px_20px_-12px_rgba(22,139,255,0.45),0_15px_35px_-20px_rgba(0,0,0,0.8)] sm:shadow-[-14px_8px_36px_-16px_rgba(255,149,0,0.55),14px_8px_36px_-16px_rgba(22,139,255,0.6),0_25px_55px_-25px_rgba(0,0,0,0.9)]">
      
      {/* --- بدنه شیشه‌ای اصلی (جایگزین innerClassName) --- */}
      <div className="relative h-full overflow-hidden bg-bg/90 backdrop-blur-xl rounded-[calc(1rem-1.5px)] sm:rounded-[calc(1.5rem-1.5px)] p-4 sm:p-6 md:p-7">
        
        {/* المان‌های تزئینی پنل */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-8 size-40 rounded-full bg-secondary/20 blur-3xl sm:-top-20 sm:-right-10 sm:size-48" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-8 size-40 rounded-full bg-primary/15 blur-3xl sm:-bottom-24 sm:-left-10 sm:size-48" />
        <div aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent sm:inset-x-8" />

        <div className="relative">
          {/* هدر پنل */}
          <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_-6px_rgba(255,149,0,0.6)] sm:size-12 sm:rounded-2xl">
              <CircleHelp className="size-[18px] sm:size-[22px]" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold sm:text-xl">سوالات متداول</h3>
              <p className="mt-0.5 text-[11px] text-muted sm:mt-1 sm:text-xs">پاسخ به پرسش‌های رایج شما</p>
            </div>
          </div>

          {/* آکاردئون سوالات */}
          <div className="space-y-1">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div
                  key={f.q}
                  className={`relative overflow-hidden rounded-xl border bg-bg-secondary/60 transition-all duration-300 ${
                    isOpen
                      ? 'border-primary/50 shadow-[0_0_28px_-8px_rgba(255,149,0,0.55)]'
                      : 'border-white/10 hover:border-secondary/50 hover:shadow-[0_0_22px_-10px_rgba(22,139,255,0.5)]'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 start-0 w-1 bg-gradient-primary transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-start text-xs font-medium sm:px-5 sm:py-4 sm:text-sm"
                  >
                    <span className={`transition-colors ${isOpen ? 'text-text' : 'text-text/85'}`}>{f.q}</span>
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300 sm:size-7 ${
                        isOpen
                          ? 'rotate-[225deg] border-primary bg-primary text-bg shadow-[0_0_16px_rgba(255,149,0,0.6)]'
                          : 'border-white/20 text-muted'
                      }`}
                    >
                      <Plus size={12} className="sm:w-[14px] sm:h-[14px]" />
                    </span>
                  </button>

                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="mx-4 border-t border-white/10 pb-4 pt-3 text-xs leading-6 text-muted sm:mx-5 sm:text-sm sm:leading-7">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}