
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  SlidersHorizontal,
  X,
  PackageSearch,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import SortDropdown from '../components/product/SortDropdown'
import { products, productPriceRanges } from '../data'

const INITIAL_FILTERS = {
  categories: [],
  brands: [],
  priceRange: 'all',
}

const frame = 'bg-linear-to-r from-primary via-white/20 to-secondary'

const panelClass = `rounded-2xl p-[1.5px] ${frame}`

const panelInner =
  'h-full rounded-[calc(1rem-1.5px)] bg-bg-secondary/90 backdrop-blur-md'

export default function Products() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [sort, setSort] = useState('newest')
  const [mobileOpen, setMobileOpen] = useState(false)

  const counts = useMemo(() => {
    const categories = {}
    const brands = {}

    products.forEach((product) => {
      categories[product.category] =
        (categories[product.category] || 0) + 1

      brands[product.brand] = (brands[product.brand] || 0) + 1
    })

    return { categories, brands }
  }, [])

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category)

      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand)

      let priceMatch = true

      if (filters.priceRange !== 'all') {
        const range = productPriceRanges.find(
          (item) => item.id === filters.priceRange,
        )

        if (range) {
          priceMatch =
            product.final_price >= range.min &&
            product.final_price < range.max
        }
      }

      return categoryMatch && brandMatch && priceMatch
    })

    switch (sort) {
      case 'newest':
        list.sort(
          (a, b) =>
            new Date(b.created_at) - new Date(a.created_at),
        )
        break

      case 'bestseller':
        list.sort((a, b) => b.sold_count - a.sold_count)
        break

      case 'most-discount':
        list.sort(
          (a, b) => b.discount_percent - a.discount_percent,
        )
        break

      case 'cheapest':
        list.sort((a, b) => a.final_price - b.final_price)
        break

      case 'most-expensive':
        list.sort((a, b) => b.final_price - a.final_price)
        break

      case 'popular':
        list.sort((a, b) => b.rating - a.rating)
        break

      default:
        break
    }

    return list
  }, [filters, sort])

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange !== 'all' ? 1 : 0)

  const resetFilters = () => setFilters(INITIAL_FILTERS)

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-5 sm:pt-28 lg:pb-20">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition-colors hover:text-secondary"
        >
          <HomeIcon size={13} />
          خانه
        </Link>

        <ChevronLeft size={13} />

        <span className="font-medium text-text">محصولات</span>
      </nav>

      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
          <span className="h-px w-8 bg-primary" />
          فروشگاه SunTech
        </div>

        <h1 className="mb-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
          محصولات <span className="text-gradient-primary">خورشیدی</span>
        </h1>

        <p className="max-w-2xl text-xs leading-7 text-muted sm:text-sm">
          از پنل و اینورتر تا باتری و کابل؛ همهٔ تجهیزات لازم برای
          پروژهٔ خورشیدی شما در یک‌جا.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-7">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className={panelClass}>
              <div className={`${panelInner} p-4 xl:p-5`}>
                <ProductFilters
                  filters={filters}
                  onChange={setFilters}
                  onReset={resetFilters}
                  counts={counts}
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-bg-secondary/70 px-3 py-2.5 text-xs font-bold text-text transition hover:border-primary/40 hover:text-primary lg:hidden"
              >
                <SlidersHorizontal size={15} />
                فیلترها

                {activeCount > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-bg">
                    {activeCount.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1.5 text-xs text-muted">
                <ShoppingBag size={14} className="text-primary" />
                <span>
                  {filtered.length.toLocaleString('fa-IR')} محصول
                </span>
              </div>
            </div>

            <div className="w-[170px] sm:w-52">
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          {activeCount > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted">
                فیلترهای فعال:
              </span>

              {filters.categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      categories: current.categories.filter(
                        (item) => item !== category,
                      ),
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] text-primary transition hover:bg-primary/20"
                >
                  {category}
                  <X size={11} />
                </button>
              ))}

              {filters.brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      brands: current.brands.filter(
                        (item) => item !== brand,
                      ),
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-1 text-[10px] text-secondary transition hover:bg-secondary/20"
                >
                  {brand}
                  <X size={11} />
                </button>
              ))}

              {filters.priceRange !== 'all' && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      priceRange: 'all',
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-1 text-[10px] text-secondary transition hover:bg-secondary/20"
                >
                  {productPriceRanges.find(
                    (range) => range.id === filters.priceRange,
                  )?.label}
                  <X size={11} />
                </button>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] text-red-400 transition hover:text-red-300"
              >
                <RotateCcw size={11} />
                حذف همه
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={panelClass}>
              <div
                className={`${panelInner} flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center`}
              >
                <div className="mb-5 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <PackageSearch size={30} />
                </div>

                <h2 className="mb-2 text-base font-extrabold text-text sm:text-lg">
                  محصولی پیدا نشد
                </h2>

                <p className="mb-6 max-w-sm text-xs leading-6 text-muted sm:text-sm">
                  با فیلترهای انتخاب‌شده محصولی پیدا نکردیم.
                  فیلترها را تغییر دهید یا همه را پاک کنید.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-xs font-bold text-bg transition hover:-translate-y-0.5"
                >
                  <RotateCcw size={14} />
                  پاک کردن فیلترها
                </button>
              </div>
            </div>
          )}
        </main>
      </div>


{mobileOpen && (
  <div className="fixed inset-0 z-[70] lg:hidden mb-19">
    <button
      type="button"
      aria-label="بستن فیلترها"
      onClick={() => setMobileOpen(false)}
      className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
    />

    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
      className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-bg-secondary shadow-2xl"
    >
      <div className="shrink-0 border-b border-white/[0.08] px-5 pb-4 pt-3">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

        <div className="flex items-center justify-between gap-3">
          <div>
            <h2
              id="mobile-filter-title"
              className="text-base font-extrabold text-text"
            >
              فیلتر محصولات
            </h2>

            <p className="mt-1 text-[11px] text-muted">
              محصولات موردنظرت را راحت‌تر پیدا کن
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="بستن"
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-muted transition hover:bg-white/10 hover:text-text"
          >
            <X size={19} />
          </button>
        </div>

        {activeCount > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/[0.08] px-3 py-2.5">
            <span className="text-xs font-medium text-text">
              فیلترهای انتخاب‌شده
            </span>

            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-primary"
            >
              <RotateCcw size={13} />
              حذف همه
            </button>
          </div>
        )}
      </div>

<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 py-4">        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
          counts={counts}
          showHeader={false}
        />
      </div>

      <div className="shrink-0 border-t border-white/10 bg-bg-secondary px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetFilters}
            disabled={activeCount === 0}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-xs font-bold text-muted transition hover:border-red-400/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={14} />
            پاک کردن
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-extrabold text-bg transition hover:-translate-y-0.5"
          >
            نمایش محصولات
            <span className="rounded-lg bg-black/10 px-2 py-1 text-xs">
              {filtered.length.toLocaleString('fa-IR')}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </section>
  )
}
