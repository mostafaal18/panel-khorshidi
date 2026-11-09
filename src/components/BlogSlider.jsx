import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { blogs } from '../data'
import BlogCard from './BlogCard'

const navBtn =
  'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-bg/70 text-text backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-bg hover:shadow-[0_0_22px_rgba(255,149,0,0.5)] lg:grid [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30'

export default function BlogSlider() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-5 pt-12 md:py-12">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium text-primary sm:text-xs">
            <span className="h-px w-6 bg-primary" /> مقالات و آموزش‌ها
          </div>
          <h2 className="text-xl font-extrabold sm:text-2xl md:text-3xl">
            آخرین <span className="text-gradient-primary">مقالات</span>
          </h2>
        </div>

        <Link
          to="/blog"
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
          مشاهده همه مقالات
          <ChevronLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <div className="relative">
        <button className={`blog-prev -start-3 sm:-start-5 ${navBtn}`} aria-label="قبلی">
          <ChevronRight size={20} />
        </button>
        <button className={`blog-next -end-3 sm:-end-5 ${navBtn}`} aria-label="بعدی">
          <ChevronLeft size={20} />
        </button>

        <Swiper
          dir="rtl"
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.blog-prev', nextEl: '.blog-next' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={8}
          breakpoints={{
            320:  { slidesPerView: 1.15, spaceBetween: 4 },
            360:  { slidesPerView: 1.15, spaceBetween: 4 },
            480:  { slidesPerView: 1.5,  spaceBetween: 6 },
            640:  { slidesPerView: 2.15, spaceBetween: 6 },
            768:  { slidesPerView: 2.5,  spaceBetween: 8 },
            1024: { slidesPerView: 3.15, spaceBetween: 8 },
            1280: { slidesPerView: 3.5,  spaceBetween: 8 },
          }}
          className="!px-1"
        >
          {blogs.map((post) => (
            <SwiperSlide key={post.id} className="!h-auto my-2">
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}