import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/free-mode'
import { brands } from '../data'
import Img from './Img'

// تکرار برندها برای اطمینان از حرکت نرم و بی‌نهایت
const tickerItems = [...brands, ...brands, ...brands]

export default function BrandsSlider() {
  return (
    <section className="relative isolate overflow-hidden py-10">
      {/* خط تزئینی بالا */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />


      <Swiper
        dir="rtl"
        modules={[Autoplay, FreeMode]}
        loop
        freeMode
        speed={4500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView="auto"
        spaceBetween={12}
        loopAdditionalSlides={6}
        className="!py-2 [&_.swiper-wrapper]:!ease-linear"
      >
        {tickerItems.map((brand, i) => (
          <SwiperSlide key={`${brand.slug}-${i}`} className="!w-auto">
            <Link
              to={`/brands/${brand.slug}`}
              aria-label={brand.name}
              className="
                group flex h-16 w-32 items-center justify-center overflow-hidden
                rounded-xl border border-white/10 bg-bg-secondary/70 backdrop-blur-xl
                p-3
                shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
                transition-all duration-300
                hover:border-primary/40
                hover:shadow-[0_0_25px_-8px_rgba(255,149,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
                sm:h-20 sm:w-40 sm:p-4
              "
            >
              {brand.logo ? (
                <Img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-full object-contain transition-transform duration-500 "
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary">
                  {brand.nameEn?.slice(0, 2) || brand.name?.slice(0, 2)}
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* خط تزئینی پایین */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
      />
    </section>
  )
}