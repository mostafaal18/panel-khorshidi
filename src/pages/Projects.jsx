// src/pages/Projects.jsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  MapPin,
  Calendar,
  Zap,
  ArrowUpLeft,
  Sun,
  Building2,
  Factory,
  Filter,
  Phone,
  Sparkles,
  Leaf,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import Img from '../components/Img'
import { projects, stats } from '../data'

const statIcons = { Leaf, Settings, Zap, ShieldCheck }

const categories = [
  { id: 'all', label: 'همه', icon: Filter },
  { id: 'power', label: 'نیروگاه', icon: Sun },
  { id: 'residential', label: 'مسکونی', icon: HomeIcon },
  { id: 'commercial', label: 'تجاری', icon: Building2 },
  { id: 'industrial', label: 'صنعتی', icon: Factory },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  )

  const counts = useMemo(() => {
    const c = { all: projects.length }
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1
    })
    return c
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-secondary"
        >
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">پروژه‌ها</span>
      </nav>

      {/* Header */}
      <div className="mb-8 max-w-2xl">
        <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
          <span className="h-px w-8 bg-primary" /> نمونه‌کارهای موفق ما
        </div>
        <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-4xl">
          پروژه‌های <span className="text-gradient-primary">اخیر</span> ما
        </h1>
        <p className="text-sm leading-7 text-muted">
          گزیده‌ای از پروژه‌های اجراشده در حوزهٔ انرژی خورشیدی؛ از نیروگاه‌های
          بزرگ تا سیستم‌های خانگی و صنعتی. روی هر پروژه کلیک کنید تا جزئیات
          کامل، گالری تصاویر و مشخصات فنی آن را ببینید.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = statIcons[s.icon] || Zap
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-bg-secondary/40 p-4 backdrop-blur-xl transition hover:border-secondary/30"
            >
              <Icon size={18} className="mb-2 text-secondary" />
              <div className="text-lg font-extrabold text-primary">{s.title}</div>
              <div className="text-xs text-muted">{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          const active = filter === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                active
                  ? 'bg-gradient-primary text-bg shadow-[0_0_20px_rgba(255,149,0,0.45)]'
                  : 'border border-white/10 bg-white/[0.03] text-muted backdrop-blur-xl hover:border-secondary/40 hover:text-text'
              }`}
            >
              <Icon size={14} />
              {cat.label}
              <span
                className={`ms-1 rounded-full px-1.5 py-0.5 text-[10px] ${
                  active ? 'bg-bg/20 text-bg' : 'bg-white/10 text-muted'
                }`}
              >
                {(counts[cat.id] || 0).toLocaleString('fa-IR')}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_20px_50px_-20px_rgba(22,139,255,0.45)]"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/20 to-transparent" />

              <span className="absolute end-3 top-3 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-text backdrop-blur-xl">
                {p.categoryLabel}
              </span>

              <span className="absolute start-3 top-3 flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary backdrop-blur-xl">
                <Calendar size={10} />
                {p.year}
              </span>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-bg shadow-[0_0_28px_rgba(255,149,0,0.6)]">
                  مشاهده جزئیات
                  <ArrowUpLeft size={14} />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-2 text-base font-bold text-text">{p.title}</h3>
              <p className="mb-4 line-clamp-2 text-xs leading-6 text-muted">
                {p.shortDesc}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <span className="flex items-center gap-1.5 text-muted">
                  <MapPin size={12} className="text-secondary" />
                  {p.location}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-primary">
                  <Zap size={12} />
                  {p.capacity}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary/40 p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative">
          <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
            پروژهٔ بعدی،{' '}
            <span className="text-gradient-primary">پروژهٔ شما</span>ست
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm leading-7 text-muted">
            برای شروع پروژه‌تان و دریافت مشاورهٔ رایگان، همین حالا با ما تماس
            بگیرید.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
            >
              <Phone size={16} /> تماس با ما
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-6 py-3 text-sm font-bold text-secondary transition hover:bg-secondary hover:text-bg"
            >
              <Sparkles size={16} /> مشاهده خدمات
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}