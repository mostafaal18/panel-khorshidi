import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom' // ✅ اضافه شد
import 'swiper/css'
import { products } from '../../data'
import ProductCard from './ProductCard'

const navBtn =
  'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-bg/70 text-text backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-bg hover:shadow-[0_0_22px_rgba(255,149,0,0.5)] lg:grid [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30'

export default function ProductsSlider() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 pt-12 md:py-12">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-medium text-primary sm:text-xs">
            <span className="h-px w-6 bg-primary" /> فروشگاه آنلاین
          </div>
          <h2 className="text-xl font-extrabold sm:text-2xl md:text-3xl">
            محصولات <span className="text-gradient-primary">خورشیدی</span>
          </h2>
        </div>

        {/* ✅ اصلاح: از <a href="#contact"> به <Link to="/products"> */}
        <Link
          to="/products"
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
          مشاهده همه محصولات
          <ChevronLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <div className="relative">
        <button className={`prod-prev -start-3 sm:-start-5 ${navBtn}`} aria-label="قبلی">
          <ChevronRight size={20} />
        </button>
        <button className={`prod-next -end-3 sm:-end-5 ${navBtn}`} aria-label="بعدی">
          <ChevronLeft size={20} />
        </button>

        <Swiper
          dir="rtl"
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.prod-prev', nextEl: '.prod-next' }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={8}
          breakpoints={{
            320:  { slidesPerView: 1.3, spaceBetween: 4 },
            360:  { slidesPerView: 2.3, spaceBetween: 4 },
            480:  { slidesPerView: 2.5, spaceBetween: 4 },
            640:  { slidesPerView: 3.5, spaceBetween: 4 },
            768:  { slidesPerView: 4.1, spaceBetween: 4 },
            1024: { slidesPerView: 4.4, spaceBetween: 4 },
            1280: { slidesPerView: 5.4, spaceBetween: 4 },
          }}
          className="!px-1"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto my-2">
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}