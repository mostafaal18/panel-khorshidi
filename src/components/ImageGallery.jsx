// src/components/ImageGallery.jsx
import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  ZoomIn,
} from 'lucide-react'
import Img from './Img'

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */
function Lightbox({ images, index, onClose, onChange }) {
  const [zoomed, setZoomed] = useState(false)

  /* Escape + arrow keys */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (zoomed) setZoomed(false)
        else onClose()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setZoomed(false)
        onChange((i) => (i + 1) % images.length)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setZoomed(false)
        onChange((i) => (i - 1 + images.length) % images.length)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [images.length, onClose, onChange, zoomed])

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const goPrev = (e) => {
    e?.stopPropagation()
    setZoomed(false)
    onChange((i) => (i - 1 + images.length) % images.length)
  }
  const goNext = (e) => {
    e?.stopPropagation()
    setZoomed(false)
    onChange((i) => (i + 1) % images.length)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-bg/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="نمایش تصویر تمام‌صفحه"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-white/20 bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-text backdrop-blur-md">
            {(index + 1).toLocaleString('fa-IR')} /{' '}
            {images.length.toLocaleString('fa-IR')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomed((z) => !z)}
            className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-text backdrop-blur-md transition hover:bg-white/[0.12]"
            aria-label={zoomed ? 'بزرگ‌نمایی کمتر' : 'بزرگ‌نمایی بیشتر'}
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-text backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300"
            aria-label="بستن"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute start-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-text backdrop-blur-md transition hover:border-primary/60 hover:bg-primary hover:text-bg sm:start-6 sm:size-12"
            aria-label="قبلی"
          >
            <ChevronRight size={22} />
          </button>
        )}

        <div
          className={`max-h-full max-w-full transition-transform duration-300 ${
            zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setZoomed((z) => !z)
          }}
        >
          <Img
            src={images[index]}
            alt=""
            className="max-h-[70vh] w-auto rounded-lg object-contain shadow-[0_25px_80px_-25px_rgba(0,0,0,0.9)]"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute end-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-text backdrop-blur-md transition hover:border-primary/60 hover:bg-primary hover:text-bg sm:end-6 sm:size-12"
            aria-label="بعدی"
          >
            <ChevronLeft size={22} />
          </button>
        )}
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div
          className="shrink-0 border-t border-white/10 p-3 sm:p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
            {images.map((url, i) => (
              <button
                key={i}
                onClick={() => {
                  setZoomed(false)
                  onChange(() => i)
                }}
                className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  index === i
                    ? 'border-primary'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
                aria-label={`تصویر ${i + 1}`}
              >
                <Img src={url} alt="" className="size-14 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main Gallery                                                        */
/* ------------------------------------------------------------------ */
export default function ImageGallery({
  images = [],
  alt = '',
  badge,
  extraBadge,
  className = '',
}) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbsRef = useRef(null)

  const safeImages = images.filter(Boolean)

  /* ریست active هنگام تغییر images */
  useEffect(() => {
    setActive(0)
  }, [safeImages.length])

  /* اسکرول خودکار thumbnail فعال به مرکز */
  useEffect(() => {
    const container = thumbsRef.current
    if (!container) return
    const btn = container.querySelector(`[data-thumb="${active}"]`)
    if (btn) {
      btn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [active])

  if (safeImages.length === 0) {
    return (
      <div className="rounded-3xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        <div className="grid aspect-square w-full place-items-center rounded-[calc(1.5rem-1px)] bg-bg/85 text-sm text-muted backdrop-blur-2xl">
          بدون تصویر
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* ---------- Main image (gradient frame) ---------- */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-4 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-secondary/30 blur-3xl"
        />

        <div className="relative rounded-3xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="rounded-[calc(1.5rem-1px)] bg-bg/85 p-2 backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative block w-full overflow-hidden rounded-[calc(1.5rem-9px)] bg-bg/60"
              aria-label="مشاهدهٔ تصویر در اندازهٔ بزرگ"
            >
              <Img
                src={safeImages[active]}
                alt={alt}
                className="aspect-square w-full object-cover"
              />

              {/* badges */}
              {(badge || extraBadge) && (
                <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                  <div>{badge}</div>
                  <div>{extraBadge}</div>
                </div>
              )}

              {/* hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* expand hint */}
              <span className="pointer-events-none absolute bottom-3 end-3 flex items-center gap-1.5 rounded-lg border border-white/25 bg-bg/70 px-2.5 py-1 text-[11px] font-bold text-text opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                <Expand size={12} />
                مشاهدهٔ تمام‌صفحه
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Thumbnails strip (horizontal scroll) ---------- */}
      {safeImages.length > 1 && (
        <div
          ref={thumbsRef}
          className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
        >
          {safeImages.map((url, i) => (
            <button
              key={i}
              type="button"
              data-thumb={i}
              onClick={() => setActive(i)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                active === i
                  ? 'border-secondary opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`تصویر ${i + 1}`}
              aria-current={active === i}
            >
              <Img
                src={url}
                alt=""
                className="size-16 object-cover sm:size-20"
              />
            </button>
          ))}
        </div>
      )}

      {/* ---------- Lightbox ---------- */}
      {lightboxOpen && (
        <Lightbox
          images={safeImages}
          index={active}
          onClose={() => setLightboxOpen(false)}
          onChange={setActive}
        />
      )}
    </div>
  )
}