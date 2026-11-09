import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import { blogs, blogCategories } from '../data'
import BlogCard from '../components/BlogCard'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('همه')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return blogs.filter((post) => {
      const matchesCat =
        activeCategory === 'همه' || post.category === activeCategory
      const q = query.trim()
      const matchesQuery =
        !q ||
        post.title.includes(q) ||
        post.excerpt.includes(q)
      return matchesCat && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <>
      <Helmet>
        <title>مقالات و آموزش‌ها | SunTech</title>
        <meta
          name="description"
          content="جدیدترین مقالات، راهنماها و اخبار حوزه انرژی خورشیدی و پنل‌های فتوولتائیک"
        />
      </Helmet>

      <section className="relative isolate overflow-hidden pb-20 pt-24">
        {/* هاله‌های پس‌زمینه */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* هدر صفحه */}
          <div className="mb-10 text-center sm:text-start">
            <div className="mb-3 inline-flex items-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" /> مجله تخصصی SunTech
            </div>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              همه‌ی <span className="text-gradient-primary">مقالات</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:mx-0 sm:text-base">
              راهنماها، مقایسه‌ها و اخبار مرتبط با انرژی خورشیدی را اینجا بخوانید.
              از انتخاب پنل تا نصب و نگهداری، همه چیز با زبانی ساده.
            </p>
          </div>

          {/* نوار ابزار: فیلتر + جستجو */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* فیلتر دسته */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      rounded-full border px-4 py-2 text-xs font-medium
                      transition-all duration-300
                      ${
                        isActive
                          ? 'border-primary bg-primary/15 text-primary shadow-[0_0_20px_-6px_rgba(255,149,0,0.55)]'
                          : 'border-white/10 bg-bg-secondary/50 text-muted hover:border-primary/40 hover:text-text'
                      }
                    `}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* جستجو */}
            <div className="relative w-full sm:w-72">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو در مقالات..."
                className="
                  w-full rounded-xl border border-white/10 bg-bg-secondary/70
                  py-2.5 pe-4 ps-10 text-xs text-text placeholder:text-muted/70
                  outline-none backdrop-blur-xl transition-all duration-300
                  focus:border-primary focus:shadow-[0_0_20px_-6px_rgba(255,149,0,0.5)]
                  sm:text-sm
                "
              />
              <Search
                size={16}
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* گرید مقالات */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-bg-secondary/50 py-20 text-center backdrop-blur-xl">
              <p className="text-sm text-muted sm:text-base">
                مقاله‌ای با این مشخصات پیدا نشد.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('همه')
                  setQuery('')
                }}
                className="mt-4 rounded-full border border-primary/50 bg-primary/5 px-5 py-2 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary/15 sm:text-sm"
              >
                نمایش همه مقالات
              </button>
            </div>
          )}

          {/* شمارنده */}
          {filtered.length > 0 && (
            <p className="mt-10 text-center text-xs text-muted sm:text-sm">
              نمایش {filtered.length} مقاله از مجموع {blogs.length} مقاله
            </p>
          )}
        </div>
      </section>
    </>
  )
}