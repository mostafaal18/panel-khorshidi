import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ArrowRight, ChevronLeft, Package, Layers,
  Sun, Sparkles, Grid3x3, Award, Zap, CircuitBoard,
  BatteryCharging, Battery, Gauge, Sliders, Wrench,
  Home, Mountain, Cable, Plug, Server,
} from 'lucide-react'
import {
  getCategoryBySlug, getSubcategories, getAncestors, getDescendants, products,
} from '../data'
import ProductCard from '../components/product/ProductCard'
import Img from '../components/Img'

const ICONS = {
  Sun, Sparkles, Grid3x3, Award, Zap, CircuitBoard,
  BatteryCharging, Battery, Gauge, Sliders, Wrench,
  Home, Mountain, Cable, Plug, Server,
}

export default function CategoryDetailPage() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)

  if (!category) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl">دسته پیدا نشد</h1>
        <p className="mt-3 text-sm text-muted">
          ممکن است لینک اشتباه باشد یا این دسته حذف شده باشد.
        </p>
        <Link
          to="/categories"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/5 px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
        >
          <ArrowRight size={16} />
          بازگشت به دسته‌بندی‌ها
        </Link>
      </section>
    )
  }

  const Icon = ICONS[category.icon] || Sun
  const subcategories = getSubcategories(slug)
  const ancestors = getAncestors(slug)
  const allSlugs = getDescendants(slug)
  const categoryProducts = products.filter((p) => allSlugs.includes(p.category))
  const parent = category.parent ? getCategoryBySlug(category.parent) : null

  return (
    <>
      <Helmet>
        <title>{category.name} | دسته‌بندی | SunTech</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-1/2 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-muted sm:text-xs">
            <Link to="/" className="transition-colors hover:text-primary">خانه</Link>
            <ChevronLeft size={12} className="text-muted/60" />
            <Link to="/categories" className="transition-colors hover:text-primary">دسته‌بندی‌ها</Link>
            {ancestors.map((a) => (
              <span key={a.slug} className="flex items-center gap-1.5">
                <ChevronLeft size={12} className="text-muted/60" />
                <Link to={`/categories/${a.slug}`} className="transition-colors hover:text-primary">
                  {a.name}
                </Link>
              </span>
            ))}
            <ChevronLeft size={12} className="text-muted/60" />
            <span className="font-bold text-text">{category.name}</span>
          </nav>

          {/* دکمه بازگشت */}
          <Link
            to={parent ? `/categories/${parent.slug}` : '/categories'}
            className="group mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary sm:text-sm"
          >
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            {parent ? `بازگشت به ${parent.name}` : 'همه دسته‌بندی‌ها'}
          </Link>

          {/* کارت معرفی دسته */}
          <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary/70 backdrop-blur-xl">
            <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg/60 md:aspect-auto md:h-full">
                <Img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-transparent to-transparent md:bg-gradient-to-l" />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-primary shadow-[0_0_20px_-6px_rgba(255,149,0,0.5)]">
                  <Icon size={18} />
                  <span className="text-[11px] font-bold sm:text-xs">
                    {ancestors.length === 0 ? 'دسته اصلی' : ancestors.length === 1 ? 'زیردسته' : 'زیرزیردسته'}
                  </span>
                </div>

                <h1 className="text-xl font-extrabold text-text sm:text-2xl md:text-3xl">
                  {category.name}
                </h1>
                <p className="mt-1 text-xs text-muted sm:text-sm" dir="ltr">
                  {category.nameEn}
                </p>

                <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  {category.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/50 px-3 py-1.5 text-[11px] text-muted sm:text-xs">
                    <Package size={13} className="text-primary/80" />
                    {categoryProducts.length > 0 ? `${categoryProducts.length} محصول` : 'به‌زودی'}
                  </span>
                  {subcategories.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/50 px-3 py-1.5 text-[11px] text-muted sm:text-xs">
                      <Layers size={13} className="text-secondary/80" />
                      {subcategories.length} زیردسته
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ───── زیردسته‌ها با تصویر بندانگشتی ───── */}
          {subcategories.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-5 text-lg font-extrabold text-text sm:text-xl md:text-2xl">
                زیردسته‌های <span className="text-gradient-primary">{category.name}</span>
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {subcategories.map((sub) => {
                  const SubIcon = ICONS[sub.icon] || Sun
                  const subAll = getDescendants(sub.slug)
                  const subCount = products.filter((p) => subAll.includes(p.category)).length
                  const hasChildren = getSubcategories(sub.slug).length > 0

                  return (
                    <Link
                      key={sub.slug}
                      to={`/categories/${sub.slug}`}
                      className="
                        group relative flex items-center gap-3 overflow-hidden rounded-2xl
                        border border-white/10 bg-bg-secondary/70 backdrop-blur-xl
                        p-2.5 transition-all duration-300
                        hover:-translate-y-1 hover:border-primary/40
                        hover:shadow-[0_15px_35px_-12px_rgba(255,149,0,0.4)]
                        sm:p-3
                      "
                    >
                      {/* تصویر بندانگشتی */}
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-bg/60 sm:size-20">
                        {sub.image ? (
                          <Img
                            src={sub.image}
                            alt={sub.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-primary/70">
                            <SubIcon size={22} />
                          </div>
                        )}

                        {/* آیکون کوچک روی تصویر */}
                        <span className="absolute end-1 top-1 grid size-6 place-items-center rounded-md border border-primary/40 bg-bg/80 text-primary backdrop-blur-md">
                          <SubIcon size={11} />
                        </span>
                      </div>

                      {/* محتوا */}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-extrabold text-text transition-colors group-hover:text-primary sm:text-sm">
                          {sub.name}
                        </div>
                        <div className="mt-0.5 truncate text-[10px] text-muted" dir="ltr">
                          {sub.nameEn}
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[10px] text-muted sm:text-xs">
                          <span className="inline-flex items-center gap-1">
                            {hasChildren ? (
                              <>
                                <Layers size={11} className="text-secondary/70" />
                                {getSubcategories(sub.slug).length} زیردسته
                              </>
                            ) : (
                              <>
                                <Package size={11} className="text-primary/70" />
                                {subCount} محصول
                              </>
                            )}
                          </span>
                          <ChevronLeft
                            size={13}
                            className="text-primary transition-transform duration-300 group-hover:-translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* محصولات */}
          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-lg font-extrabold text-text sm:text-xl md:text-2xl">
                محصولات <span className="text-gradient-primary">{category.name}</span>
              </h2>
              {categoryProducts.length > 0 && (
                <span className="text-xs text-muted sm:text-sm">
                  {categoryProducts.length} محصول
                </span>
              )}
            </div>

            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                {categoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-bg-secondary/50 py-16 text-center backdrop-blur-xl">
                <p className="text-sm text-muted sm:text-base">
                  هنوز محصولی در این دسته موجود نیست.
                </p>
                {subcategories.length > 0 && (
                  <p className="mt-2 text-xs text-muted">
                    می‌توانید از زیردسته‌های بالا محصول مورد نظر خود را پیدا کنید.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}