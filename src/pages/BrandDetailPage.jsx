import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Globe2, CalendarDays, Package } from 'lucide-react'
import { brands, products } from '../data'
import ProductCard from '../components/product/ProductCard'
import Img from '../components/Img'

export default function BrandDetailPage() {
  const { slug } = useParams()
  const brand = brands.find((b) => b.slug === slug)

  if (!brand) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl">برند پیدا نشد</h1>
        <p className="mt-3 text-sm text-muted">
          ممکن است لینک اشتباه باشد یا این برند حذف شده باشد.
        </p>
        <Link
          to="/brands"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/5 px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
        >
          <ArrowRight size={16} />
          بازگشت به برندها
        </Link>
      </section>
    )
  }

  const brandProducts = products.filter((p) => p.brand === slug)

  return (
    <>
      <Helmet>
        <title>{brand.name} | برندها | SunTech</title>
        <meta name="description" content={brand.description} />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-1/2 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* بازگشت */}
          <Link
            to="/brands"
            className="group mb-8 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary sm:text-sm"
          >
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            همه برندها
          </Link>

          {/* کارت معرفی برند */}
          <div className="mb-12 grid gap-6 rounded-3xl border border-white/10 bg-bg-secondary/70 p-6 backdrop-blur-xl sm:grid-cols-[200px_1fr] sm:items-center sm:p-8 lg:grid-cols-[240px_1fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl bg-bg/60 p-6">
              <Img
                src={brand.logo}
                alt={brand.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
                <span className="h-px w-6 bg-primary" /> برند
              </div>
              <h1 className="text-xl font-extrabold text-text sm:text-2xl md:text-3xl">
                {brand.name}
              </h1>
              <p className="mt-1 text-xs text-muted sm:text-sm" dir="ltr">
                {brand.nameEn}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
                {brand.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/50 px-3 py-1.5 text-[11px] text-muted sm:text-xs">
                  <Globe2 size={13} className="text-primary/80" />
                  {brand.country}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/50 px-3 py-1.5 text-[11px] text-muted sm:text-xs">
                  <CalendarDays size={13} className="text-primary/80" />
                  تأسیس {brand.founded}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/50 px-3 py-1.5 text-[11px] text-muted sm:text-xs">
                  <Package size={13} className="text-primary/80" />
                  {brandProducts.length} محصول
                </span>
              </div>
            </div>
          </div>

          {/* محصولات برند */}
          <div>
            <h2 className="mb-5 text-lg font-extrabold text-text sm:text-xl md:text-2xl">
              محصولات <span className="text-gradient-primary">{brand.name}</span>
            </h2>

            {brandProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                {brandProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-bg-secondary/50 py-16 text-center backdrop-blur-xl">
                <p className="text-sm text-muted sm:text-base">
                  هنوز محصولی از این برند در فروشگاه موجود نیست.
                </p>
                <Link
                  to="/products"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 sm:text-sm"
                >
                  مشاهده همه محصولات
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}