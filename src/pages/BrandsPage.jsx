import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowUpLeft, Package, Globe2, CalendarDays } from 'lucide-react'
import { brands, products } from '../data'
import Img from '../components/Img'

export default function BrandsPage() {
  return (
    <>
      <Helmet>
        <title>برندها | SunTech</title>
        <meta
          name="description"
          content="برندهای معتبر پنل خورشیدی، اینورتر و تجهیزات انرژی خورشیدی موجود در فروشگاه SunTech"
        />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* هدر */}
          <div className="mb-10 text-center sm:text-start">
            <div className="mb-3 inline-flex items-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" /> فروشگاه SunTech
            </div>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              برندهای <span className="text-gradient-primary">معتبر</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:mx-0 sm:text-base">
              محصولات ما از برندهای شناخته‌شده و بین‌المللی تأمین می‌شود تا بالاترین کیفیت و طول عمر را تجربه کنید.
            </p>
          </div>

          {/* گرید برندها */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {brands.map((brand) => {
              const count = products.filter((p) => p.brand === brand.slug).length
              return (
                <Link
                  key={brand.slug}
                  to={`/brands/${brand.slug}`}
                  className="
                    group relative flex flex-col overflow-hidden rounded-2xl
                    border border-white/10 bg-bg-secondary/70 backdrop-blur-xl
                    shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
                    transition-all duration-500
                    hover:-translate-y-1.5 hover:border-primary/40
                    hover:shadow-[0_20px_45px_-15px_rgba(255,149,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]
                  "
                >
                  {/* لوگو */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg/60 p-5 sm:p-6">
                    <Img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* محتوا */}
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-sm font-extrabold text-text transition-colors group-hover:text-primary sm:text-base">
                      {brand.name}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-muted sm:text-xs" dir="ltr">
                      {brand.nameEn}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-muted sm:text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Package size={11} className="text-primary/80" />
                        {count > 0 ? `${count} محصول` : 'به‌زودی'}
                      </span>
                      <ArrowUpLeft
                        size={14}
                        className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}