import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Sun, Zap, BatteryCharging, Gauge, Wrench, Cable,
  ArrowUpLeft, Package, Layers,
} from 'lucide-react'
import {
  getTopCategories, getSubcategories, getDescendants, products,
} from '../data'
import Img from '../components/Img'

const ICONS = { Sun, Zap, BatteryCharging, Gauge, Wrench, Cable }

export default function CategoriesPage() {
  const topCategories = getTopCategories()

  const productsInTree = (slug) => {
    const all = getDescendants(slug)
    return products.filter((p) => all.includes(p.category))
  }

  return (
    <>
      <Helmet>
        <title>دسته‌بندی محصولات | SunTech</title>
        <meta
          name="description"
          content="دسته‌بندی کامل محصولات خورشیدی: پنل، اینورتر، باتری، کنترلر، سازه و کابل"
        />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-start">
            <div className="mb-3 inline-flex items-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" /> فروشگاه SunTech
            </div>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              دسته‌بندی <span className="text-gradient-primary">محصولات</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:mx-0 sm:text-base">
              همه‌ی تجهیزات مورد نیاز سیستم خورشیدی، دسته‌بندی‌شده و آماده‌ی انتخاب.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topCategories.map((cat) => {
              const Icon = ICONS[cat.icon] || Sun
              const subs = getSubcategories(cat.slug)
              const count = productsInTree(cat.slug).length

              return (
                <Link
                  key={cat.slug}
                  to={`/categories/${cat.slug}`}
                  className="
                    group relative flex flex-col overflow-hidden rounded-2xl
                    border border-white/10 bg-bg-secondary/70 backdrop-blur-xl
                    shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
                    transition-all duration-500
                    hover:-translate-y-1.5
                    hover:shadow-[0_20px_45px_-15px_rgba(255,149,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]
                  "
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg/60">
                    <Img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

                    <div className="absolute end-3 top-3 grid size-11 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_-6px_rgba(255,149,0,0.5)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                      <Icon size={20} />
                    </div>

                    <div className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-bg/80 px-2.5 py-1 text-[10px] font-bold text-text backdrop-blur-md">
                      <Package size={11} className="text-primary" />
                      {count > 0 ? `${count} محصول` : 'به‌زودی'}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-sm font-extrabold text-text transition-colors group-hover:text-primary sm:text-base">
                      {cat.name}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-muted sm:text-xs" dir="ltr">
                      {cat.nameEn}
                    </p>

                    <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                      {cat.description}
                    </p>

                    {/* زیردسته‌ها */}
                    {subs.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        <Layers size={11} className="text-muted" />
                        {subs.slice(0, 3).map((s) => (
                          <span
                            key={s.slug}
                            className="rounded-full border border-white/10 bg-bg/50 px-2 py-0.5 text-[10px] text-muted"
                          >
                            {s.name}
                          </span>
                        ))}
                        {subs.length > 3 && (
                          <span className="text-[10px] text-muted">
                            +{subs.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-xs font-bold text-primary sm:text-sm">
                        مشاهده
                      </span>
                      <ArrowUpLeft
                        size={16}
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