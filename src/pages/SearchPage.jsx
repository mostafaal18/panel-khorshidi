import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, ArrowUpLeft } from 'lucide-react'
import { products, blogs } from '../data'
import ProductCard from '../components/product/ProductCard'
import BlogCard from '../components/BlogCard'

// یکسان‌سازی حروف عربی/فارسی و نیم‌فاصله
const normalize = (s = '') =>
  s
    .replace(/\u200c/g, ' ')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .toLowerCase()
    .trim()

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [input, setInput] = useState(q)

  const results = useMemo(() => {
    const query = normalize(q)
    if (!query) return { products: [], blogs: [] }

    return {
      products: products.filter((p) => normalize(p.title).includes(query)),
      blogs: blogs.filter(
        (b) =>
          normalize(b.title).includes(query) ||
          normalize(b.excerpt).includes(query)
      ),
    }
  }, [q])

  const total = results.products.length + results.blogs.length

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = input.trim()
    if (value) setParams({ q: value })
    else setParams({})
  }

  return (
    <>
      <Helmet>
        <title>{q ? `جستجو: ${q}` : 'جستجو'} | SunTech</title>
        <meta
          name="description"
          content="جستجو در محصولات و مقالات SunTech — پنل خورشیدی، اینورتر، باتری و راهنماها"
        />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* هدر */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              جستجو در <span className="text-gradient-primary">SunTech</span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
              محصولات، مقالات و راهنماها را در یک نگاه پیدا کنید.
            </p>
          </div>

          {/* فرم جستجو */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="مثلاً: پنل خورشیدی، اینورتر، نگهداری..."
                className="
                  w-full rounded-2xl border border-white/10
                  bg-bg-secondary/70 py-4 pe-4 ps-12
                  text-sm text-text placeholder:text-muted/70
                  outline-none backdrop-blur-xl
                  transition-all duration-300
                  focus:border-primary focus:shadow-[0_0_25px_-8px_rgba(255,149,0,0.55)]
                  sm:text-base
                "
              />
            </div>
          </form>

          {/* نتایج */}
          {q && (
            <div className="mt-10">
              <p className="mb-6 text-center text-sm text-muted sm:text-base">
                {total > 0
                  ? `${total} نتیجه برای «${q}» پیدا شد`
                  : `نتیجه‌ای برای «${q}» پیدا نشد`}
              </p>

              {results.products.length > 0 && (
                <div className="mb-14">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-extrabold sm:text-xl">
                      محصولات
                    </h2>
                    <Link
                      to="/products"
                      className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all hover:gap-2.5 sm:text-sm"
                    >
                      همه محصولات
                      <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                    {results.products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {results.blogs.length > 0 && (
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-extrabold sm:text-xl">
                      مقالات
                    </h2>
                    <Link
                      to="/blog"
                      className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all hover:gap-2.5 sm:text-sm"
                    >
                      همه مقالات
                      <ArrowUpLeft size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {results.blogs.map((b) => (
                      <BlogCard key={b.id} post={b} />
                    ))}
                  </div>
                </div>
              )}

              {total === 0 && (
                <div className="rounded-2xl border border-white/10 bg-bg-secondary/50 py-16 text-center backdrop-blur-xl">
                  <p className="text-sm text-muted sm:text-base">
                    پیشنهاد می‌کنیم کلمه‌ی دیگری را امتحان کنید یا از دسته‌بندی‌ها شروع کنید.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <Link
                      to="/products"
                      className="rounded-full border border-primary/60 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 sm:text-sm"
                    >
                      محصولات
                    </Link>
                    <Link
                      to="/blog"
                      className="rounded-full border border-primary/60 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 sm:text-sm"
                    >
                      مقالات
                    </Link>
                    <Link
                      to="/brands"
                      className="rounded-full border border-primary/60 bg-primary/5 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 sm:text-sm"
                    >
                      برندها
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* حالت اولیه */}
          {!q && (
            <div className="mx-auto mt-12 max-w-2xl text-center">
              <p className="mb-4 text-xs text-muted sm:text-sm">پیشنهادها:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['پنل خورشیدی', 'اینورتر', 'باتری', 'نگهداری'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setInput(term)
                      setParams({ q: term })
                    }}
                    className="rounded-full border border-white/10 bg-bg-secondary/50 px-4 py-2 text-xs text-muted transition-all hover:border-primary/40 hover:text-primary sm:text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}