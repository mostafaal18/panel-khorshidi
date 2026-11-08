import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Quote, Star, BadgeCheck, MessageSquareQuote } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '../data'
import Img from './Img'

export default function Testimonials() {
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
              <MessageSquareQuote className="size-[18px] sm:size-[22px]" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold sm:text-xl">نظرات مشتریان</h3>
              <p className="mt-0.5 text-[11px] text-muted sm:mt-1 sm:text-xs">اعتماد شما، بزرگترین سرمایه ماست</p>
            </div>
          </div>

          {/* اسلایدر */}
          <Swiper
            dir="rtl"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={16}
            className="!pb-10"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="!h-auto">
                
                {/* --- قاب گرادینتی داخل اسلایدر (جایگزین GlowFrame دوم) --- */}
                <div className="h-full rounded-[1rem] p-[1px] bg-linear-to-r from-primary via-white/15 to-secondary shadow-[-8px_6px_24px_-12px_rgba(255,149,0,0.45),8px_6px_24px_-12px_rgba(22,139,255,0.5)]">
                  
                  {/* --- بدنه شیشه‌ای داخل اسلایدر --- */}
                  <div className="relative h-full overflow-hidden bg-bg-secondary/80 backdrop-blur-xl rounded-[calc(1rem-1px)] p-4 pt-10 sm:p-5 sm:pt-10">
                    
                    <Quote className="absolute start-4 top-3.5 fill-primary/30 text-primary sm:start-5 sm:top-4" size={20} />
                    <Quote aria-hidden className="pointer-events-none absolute -bottom-4 end-3 rotate-180 fill-white/[0.04] text-transparent" size={80} />

                    <figure className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-start">
                      <div className="relative shrink-0">
                        <div className="rounded-full bg-gradient-primary p-0.5 shadow-[0_0_24px_rgba(255,149,0,0.5)]">
                          <Img src={t.avatar} alt={t.name} className="size-14 rounded-full border-2 border-bg sm:size-16" />
                        </div>
                        <BadgeCheck size={18} className="absolute -bottom-1 -end-1 rounded-full bg-bg fill-success text-bg sm:size-5" />
                      </div>

                      <div className="min-w-0 w-full sm:w-auto">
                        <div className="mb-2 flex justify-center gap-0.5 text-accent sm:justify-start" aria-label="امتیاز ۵ از ۵">
                          {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={13} className="fill-current" />)}
                        </div>
                        <blockquote className="text-xs leading-6 text-text/90 sm:text-sm sm:leading-7">
                          {t.text}
                        </blockquote>
                        <figcaption className="mt-3">
                          <div className="text-sm font-bold">{t.name}</div>
                          <div className="text-xs text-muted">{t.role}</div>
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}