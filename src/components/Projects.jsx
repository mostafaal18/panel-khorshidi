import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowUpLeft } from 'lucide-react'
import 'swiper/css'
import { projects } from '../data'
import Img from './Img'

const navBtn =
  'absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-bg/70 text-text backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-bg hover:shadow-[0_0_22px_rgba(255,149,0,0.5)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
          <span className="h-px w-8 bg-primary" /> نمونه‌کارهای موفق ما
        </div>
        <h2 className="text-3xl font-extrabold md:text-4xl">
          پروژه‌های <span className="text-gradient-primary">اخیر</span>
        </h2>
      </div>

      <div className="relative">
        <button className={`proj-prev -start-3 sm:-start-5 ${navBtn}`} aria-label="قبلی"><ChevronRight size={20} /></button>
        <button className={`proj-next -end-3 sm:-end-5 ${navBtn}`} aria-label="بعدی"><ChevronLeft size={20} /></button>

        <Swiper
          dir="rtl"
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.proj-prev', nextEl: '.proj-next' }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={18}
          breakpoints={{ 0: { slidesPerView: 1.2 }, 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4 } }}
          className="!px-1 !py-6"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="group h-full transition-transform duration-500 hover:-translate-y-2">
                
                <div className="h-full rounded-[1.1rem] p-[1.5px] bg-linear-to-r from-primary via-white/15 to-secondary shadow-[-9px_0_22px_-8px_rgba(255,149,0,0.6),9px_0_22px_-8px_rgba(22,139,255,0.65)] transition-shadow duration-500 group-hover:shadow-[-11px_0_28px_-8px_rgba(255,149,0,0.75),11px_0_28px_-8px_rgba(22,139,255,0.8)]">
                  
                  <div className="relative h-full overflow-hidden rounded-[calc(1.1rem-1.5px)] bg-bg-secondary p-1">
                    
                    <div className="relative overflow-hidden rounded-[calc(1.1rem-6px)]">
                      <Img src={p.img} alt={p.title} className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-52" />
                      
                      <div className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-sm font-bold text-text">{p.title}</span>
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-bg shadow-[0_0_16px_rgba(255,149,0,0.6)]">
                          <ArrowUpLeft size={16} />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}