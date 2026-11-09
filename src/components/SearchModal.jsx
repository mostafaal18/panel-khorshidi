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
} from 'lucide-react'
import Img from './Img'
import { products, projects } from '../data'

const MAX_RESULTS = 6

function normalize(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .trim()
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const navigate = useNavigate()

  /* ریست هنگام باز شدن */
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  /* قفل اسکرول هنگام باز بودن */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* Escape برای بستن */
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

  /* نتایج جستجو */
  const results = useMemo(() => {
    const q = normalize(query)
    if (q.length < 2) return []

    const productHits = products
      .filter(
        (p) => normalize(p.title).includes(q) || normalize(p.slug).includes(q),
      )
      .map((p) => ({
        type: 'product',
        id: `p-${p.id}`,
        title: p.title,
        subtitle: p.final_price.toLocaleString('fa-IR') + ' تومان',
        image: p.images?.[0]?.url || p.main_image,
        href: `/product/${p.slug}`,
      }))

    const projectHits = projects
      .filter(
        (p) =>
          normalize(p.title).includes(q) ||
          normalize(p.categoryLabel).includes(q) ||
          normalize(p.location).includes(q),
      )
      .map((p) => ({
        type: 'project',
        id: `pr-${p.id}`,
        title: p.title,
        subtitle: p.location,
        image: p.img,
        href: `/projects/${p.slug}`,
      }))

    return [...productHits, ...projectHits].slice(0, MAX_RESULTS)
  }, [query])

  /* ریست active هنگام تغییر نتایج */
  useEffect(() => {
    setActive(0)
  }, [results.length])

  /* کیبورد بالا/پایین و Enter */
  const onKeyDown = (e) => {
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = results[active]
      if (target) {
        navigate(target.href)
        onClose()
      }
    }
  }

  if (!open) return null

  const hasQuery = query.trim().length >= 2
  const showEmpty = hasQuery && results.length === 0

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
        ref={panelRef}
        className="absolute inset-x-3 top-20 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-bg-secondary/80 shadow-[0_25px_80px_-30px_rgba(22,139,255,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:inset-x-5 sm:top-24"
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
            placeholder="جستجوی محصولات و پروژه‌ها..."
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

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {/* حالت اولیه */}
          {!hasQuery && (
            <div className="px-3 py-8 text-center">
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search size={20} />
              </div>
              <p className="text-sm font-bold text-text">چی دنبالش هستید؟</p>
              <p className="mt-1 text-xs text-muted">
                حداقل ۲ حرف تایپ کنید تا نتایج نمایش داده شود.
              </p>
            </div>
          )}

          {/* بدون نتیجه */}
          {showEmpty && (
            <div className="px-3 py-8 text-center">
              <p className="text-sm font-bold text-text">نتیجه‌ای پیدا نشد</p>
              <p className="mt-1 text-xs text-muted">
                عبارت دیگری را امتحان کنید یا از منو به بخش موردنظر بروید.
              </p>
            </div>
          )}

          {/* نتایج */}
          {results.length > 0 && (
            <>
              <div className="px-3 pb-2 pt-1 text-[10px] font-bold text-muted">
                {results.length.toLocaleString('fa-IR')} نتیجه
              </div>

              <ul>
                {results.map((r, i) => {
                  const isActive = active === i
                  const TypeIcon = r.type === 'product' ? Package : Briefcase
                  return (
                    <li key={r.id}>
                      <Link
                        to={r.href}
                        onMouseEnter={() => setActive(i)}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-xl px-2 py-2 transition ${
                          isActive
                            ? 'bg-primary/10 ring-1 ring-primary/30'
                            : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="size-11 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-bg/60">
                          {r.image && (
                            <Img
                              src={r.image}
                              alt={r.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <TypeIcon
                              size={11}
                              className={
                                r.type === 'product'
                                  ? 'text-primary'
                                  : 'text-secondary'
                              }
                            />
                            <span className="truncate text-sm font-bold text-text">
                              {r.title}
                            </span>
                          </div>
                          <div className="mt-0.5 truncate text-xs text-muted">
                            {r.subtitle}
                          </div>
                        </div>

                        {isActive ? (
                          <CornerDownLeft
                            size={14}
                            className="shrink-0 text-primary"
                          />
                        ) : (
                          <ArrowUpLeft
                            size={14}
                            className="shrink-0 text-muted transition group-hover:text-primary"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
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
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono">
                Esc
              </kbd>
              بستن
            </span>
          </div>
        )}
      </div>
    </div>
  )
}