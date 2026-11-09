// src/components/TopCategories.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { getTopCategories } from '../data'
import Img from './Img'

const navBtn =
  'absolute top-1/2 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-bg/70 text-text backdrop-blur-md transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-bg hover:shadow-[0_0_22px_rgba(22,139,255,0.5)] lg:grid [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30'

export default function TopCategories() {
  const topCategories = getTopCategories()

  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 pt-12 md:py-12">
      {/* هدر */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium text-primary sm:text-xs">
            <span className="h-px w-6 bg-primary" /> خرید بر اساس دسته
          </div>
          <h2 className="text-xl font-extrabold sm:text-2xl md:text-3xl">
            دسته‌بندی <span className="text-gradient-primary">محصولات</span>
          </h2>
        </div>

        <Link
          to="/categories"
          className="
            group inline-flex w-full shrink-0 items-center justify-center gap-2
            rounded-full border border-primary/60 bg-primary/5
            px-5 py-2.5 text-xs font-bold text-primary
            transition-all duration-300
            hover:-translate-y-1 hover:border-primary hover:bg-primary/10
            hover:shadow-[0_0_30px_rgba(255,149,0,0.25)]
            sm:w-auto sm:justify-start sm:px-6 sm:py-2.5 sm:text-sm
          "
        >
          مشاهده همه
          <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>
      </div>

      {/* اسلایدر */}
      <div className="relative">
        <button className={`cat-prev -start-2 sm:-start-4 ${navBtn}`} aria-label="قبلی">
          <ChevronRight size={14} />
        </button>
        <button className={`cat-next -end-2 sm:-end-4 ${navBtn}`} aria-label="بعدی">
          <ChevronLeft size={14} />
        </button>

        <Swiper
          dir="rtl"
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.cat-prev', nextEl: '.cat-next' }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={8}
          breakpoints={{
            0:    { slidesPerView: 3.2,  spaceBetween: 6 },
            480:  { slidesPerView: 4.2,  spaceBetween: 8 },
            640:  { slidesPerView: 5.5,  spaceBetween: 8 },
            768:  { slidesPerView: 7,    spaceBetween: 10 },
            1024: { slidesPerView: 8.5,  spaceBetween: 10 },
          }}
          className="!py-2"
        >
          {topCategories.map((cat) => (
            <SwiperSlide key={cat.slug} className="!h-auto">
              <Link
                to={`/categories/${cat.slug}`}
                className="
                  group relative block aspect-square overflow-hidden rounded-lg
                  border border-white/10
                  transition-all duration-500
                  hover:-translate-y-1 hover:border-secondary/50
                  hover:shadow-[0_15px_35px_-12px_rgba(22,139,255,0.6)]
                "
              >
                <Img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}