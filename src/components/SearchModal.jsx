// src/components/SearchModal.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  Package,
  Briefcase,
  ArrowUpLeft,
  CornerDownLeft,
  Clock,
  TrendingUp,
  Newspaper,
  Award,
} from 'lucide-react'
import Img from './Img'
import { products, projects, blogs, brands } from '../data'

const RECENT_KEY = 'suntech_recent_searches'
const MAX_RECENT = 6
const POPULAR_TERMS = ['پنل خورشیدی', 'اینورتر', 'باتری', 'نصب', 'نگهداری']

function normalize(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/\u200c/g, ' ')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function readRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw).slice(0, MAX_RECENT) : []
  } catch {
    return []
  }
}

function writeRecent(list) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list))
  } catch {}
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  /* ----- ریست هنگام باز شدن ----- */
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    setRecent(readRecent())
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  /* ----- قفل اسکرول ----- */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  /* ----- Escape ----- */
  useEffect(() => {
    if (!open) return
    const handle = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, onClose])

  /* ----- ذخیره / پاک کردن اخیرها ----- */
  const saveRecent = (term) => {
    const clean = term.trim()
    if (!clean) return
    const next = [clean, ...recent.filter((t) => t !== clean)].slice(0, MAX_RECENT)
    setRecent(next)
    writeRecent(next)
  }

  const clearRecent = () => {
    setRecent([])
    try { localStorage.removeItem(RECENT_KEY) } catch {}
  }

  /* ----- جستجو در محصولات، پروژه‌ها، مقالات، برندها ----- */
  const results = useMemo(() => {
    const q = normalize(query)
    if (q.length < 2) {
      return { products: [], projects: [], blogs: [], brands: [], total: 0, all: [] }
    }

    const productHits = products
      .filter((p) => normalize(p.title).includes(q) || normalize(p.slug).includes(q))
      .slice(0, 4)
      .map((p) => ({
        type: 'product',
        id: `p-${p.id}`,
        title: p.title,
        subtitle: p.final_price
          ? `${Number(p.final_price).toLocaleString('fa-IR')} تومان`
          : '',
        image: p.images?.[0]?.url || p.main_image,
        href: `/products/${p.slug}`,
      }))

    const projectHits = projects
      .filter((p) => normalize(p.title).includes(q))
      .slice(0, 3)
      .map((p, i) => ({
        type: 'project',
        id: `pr-${i}-${p.title}`,
        title: p.title,
        subtitle: 'پروژه',
        image: p.img,
        href: `/#projects`,
      }))

    const blogHits = blogs
      .filter((b) => normalize(b.title).includes(q) || normalize(b.excerpt).includes(q))
      .slice(0, 3)
      .map((b) => ({
        type: 'blog',
        id: `b-${b.id}`,
        title: b.title,
        subtitle: b.category,
        image: b.image,
        href: `/blog/${b.slug}`,
      }))

    const brandHits = brands
      .filter((b) => normalize(b.name).includes(q) || normalize(b.nameEn).includes(q))
      .slice(0, 3)
      .map((b) => ({
        type: 'brand',
        id: `br-${b.slug}`,
        title: b.name,
        subtitle: b.nameEn,
        image: b.logo,
        href: `/brands/${b.slug}`,
      }))

    const all = [...productHits, ...projectHits, ...blogHits, ...brandHits]

    return {
      products: productHits,
      projects: projectHits,
      blogs: blogHits,
      brands: brandHits,
      total: all.length,
      all,
    }
  }, [query])

  const flat = results.all

  /* ----- ریست active با تغییر نتایج ----- */
  useEffect(() => { setActive(0) }, [results.total])

  /* ----- کیبورد ----- */
  const onKeyDown = (e) => {
    if (flat.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => (i + 1) % flat.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => (i - 1 + flat.length) % flat.length)
        return
      }
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (flat[active]) {
        saveRecent(query)
        navigate(flat[active].href)
        onClose()
      } else if (query.trim().length >= 2) {
        saveRecent(query)
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
        onClose()
      }
    }
  }

  if (!open) return null

  const hasQuery = normalize(query).length >= 2

  /* ----- رندر گروه نتایج ----- */
  const Group = ({ title, icon: Icon, color, items, startIndex }) => {
    if (!items?.length) return null
    return (
      <div className="mb-3">
        <div className="mb-1.5 flex items-center gap-2 px-2">
          <Icon size={12} className={color} />
          <span className="text-[10px] font-bold text-muted">{title}</span>
        </div>
        <ul>
          {items.map((r, i) => {
            const idx = startIndex + i
            const isActive = active === idx
            return (
              <li key={r.id}>
                <Link
                  to={r.href}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => { saveRecent(query); onClose() }}
                  className={`group flex items-center gap-3 rounded-lg px-2 py-2 transition ${
                    isActive
                      ? 'bg-primary/10 ring-1 ring-primary/30'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-bg/60">
                    {r.image ? (
                      <Img
                        src={r.image}
                        alt={r.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] text-muted">
                        —
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-text sm:text-sm">
                      {r.title}
                    </div>
                    {r.subtitle && (
                      <div className="mt-0.5 truncate text-[10px] text-muted sm:text-xs">
                        {r.subtitle}
                      </div>
                    )}
                  </div>
                  {isActive ? (
                    <CornerDownLeft size={14} className="shrink-0 text-primary" />
                  ) : (
                    <ArrowUpLeft size={14} className="shrink-0 text-muted transition group-hover:text-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="جستجو"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
          absolute inset-x-3 top-20 mx-auto max-w-2xl overflow-hidden rounded-2xl
          border border-white/15 bg-bg-secondary/80
          shadow-[0_25px_80px_-30px_rgba(22,139,255,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]
          backdrop-blur-2xl
          sm:inset-x-5 sm:top-24
        "
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search size={18} className="shrink-0 text-primary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="جستجوی محصول، پروژه، مقاله یا برند..."
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted/60"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="rounded-md p-1 text-muted transition hover:bg-white/5 hover:text-text"
              aria-label="پاک کردن"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="hidden rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-bold text-muted transition hover:border-red-400/40 hover:text-red-400 sm:block"
            aria-label="بستن"
          >
            Esc
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {/* حالت اولیه */}
          {!hasQuery && (
            <div className="p-2">
              {recent.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-primary" />
                      <span className="text-[10px] font-bold text-muted">
                        جستجوهای اخیر
                      </span>
                    </div>
                    <button
                      onClick={clearRecent}
                      className="text-[10px] text-muted transition hover:text-primary"
                    >
                      پاک کردن
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recent.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-white/10 bg-bg/50 px-3 py-1 text-[11px] text-muted transition hover:border-primary/40 hover:text-primary"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="mb-2 flex items-center gap-2 px-1">
                  <TrendingUp size={12} className="text-primary" />
                  <span className="text-[10px] font-bold text-muted">
                    جستجوهای پرطرفدار
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TERMS.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] text-primary transition hover:bg-primary/15"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* نتایج */}
          {hasQuery && (
            <>
              {results.total === 0 ? (
                <div className="px-3 py-10 text-center">
                  <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search size={20} />
                  </div>
                  <p className="text-sm font-bold text-text">نتیجه‌ای پیدا نشد</p>
                  <p className="mt-1 text-xs text-muted">
                    عبارت دیگری را امتحان کنید یا از منو به بخش موردنظر بروید.
                  </p>
                </div>
              ) : (
                <div className="px-1">
                  <div className="mb-2 px-2 text-[10px] font-bold text-muted">
                    {results.total.toLocaleString('fa-IR')} نتیجه
                  </div>

                  <Group
                    title="محصولات"
                    icon={Package}
                    color="text-primary"
                    items={results.products}
                    startIndex={0}
                  />
                  <Group
                    title="پروژه‌ها"
                    icon={Briefcase}
                    color="text-secondary"
                    items={results.projects}
                    startIndex={results.products.length}
                  />
                  <Group
                    title="مقالات"
                    icon={Newspaper}
                    color="text-accent"
                    items={results.blogs}
                    startIndex={results.products.length + results.projects.length}
                  />
                  <Group
                    title="برندها"
                    icon={Award}
                    color="text-success"
                    items={results.brands}
                    startIndex={
                      results.products.length +
                      results.projects.length +
                      results.blogs.length
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        {hasQuery && results.total > 0 && (
          <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2 text-[10px] text-muted">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono">
                ↑↓
              </kbd>
              جابه‌جایی
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono">
                Enter
              </kbd>
              انتخاب
            </span>
            <Link
              to={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={() => { saveRecent(query); onClose() }}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              همه نتایج
              <ArrowUpLeft size={11} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}