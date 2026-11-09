// src/pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  MapPin,
  Calendar,
  Zap,
  ArrowRight,
  Check,
  Phone,
  Sparkles,
  Sun,
  Building2,
  Factory,
  Award,
} from 'lucide-react'
import ImageGallery from '../components/ImageGallery'
import Img from '../components/Img'
import { projects } from '../data'

const categoryIconMap = {
  power: Sun,
  residential: HomeIcon,
  commercial: Building2,
  industrial: Factory,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
        <div className="mx-auto max-w-xl rounded-3xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="rounded-[calc(1.5rem-1px)] bg-bg/85 p-10 text-center backdrop-blur-2xl">
            <h1 className="mb-2 text-2xl font-extrabold">پروژه یافت نشد</h1>
            <p className="mb-6 text-sm text-muted">
              پروژه‌ای با این شناسه وجود ندارد.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
            >
              <ArrowRight size={16} /> بازگشت به پروژه‌ها
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const images = project.images?.length ? project.images : [project.img]
  const CategoryIcon = categoryIconMap[project.category] || Sun
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3)

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
        <Link to="/projects" className="transition hover:text-secondary">
          پروژه‌ها
        </Link>
        <ChevronLeft size={12} />
        <span className="truncate text-text">{project.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* ---------- Gallery (shared component) ---------- */}
        <div className="lg:col-span-3">
          <ImageGallery
            images={images}
            alt={project.title}
            extraBadge={
              <span className="flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/15 px-2 py-1 text-[10px] font-bold text-primary backdrop-blur-sm">
                <Calendar size={10} />
                {project.year}
              </span>
            }
          />
        </div>

        {/* ---------- Info ---------- */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-secondary/30 bg-secondary/10 px-2.5 py-1 text-[11px] font-bold text-secondary">
                <CategoryIcon size={12} />
                {project.categoryLabel}
              </span>
              <span className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                <Calendar size={10} />
                {project.year}
              </span>
            </div>

            <h1 className="mb-2 text-2xl font-extrabold leading-tight md:text-3xl">
              {project.title}
            </h1>
            <p className="text-sm leading-7 text-muted">{project.shortDesc}</p>
          </div>

          {/* Key specs */}
          <div className="rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="rounded-[calc(1rem-1px)] bg-bg/85 p-4 backdrop-blur-2xl">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[11px] text-muted">
                    <MapPin size={11} className="text-secondary" />
                    موقعیت
                  </div>
                  <div className="text-sm font-bold text-text">
                    {project.location}
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[11px] text-muted">
                    <Zap size={11} className="text-secondary" />
                    ظرفیت
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {project.capacity}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Award size={16} className="text-primary" /> نکات برجسته
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <Check size={14} className="mt-0.5 shrink-0 text-secondary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            to="/consultation"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-bold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]"
          >
            <Phone size={16} /> درخواست مشاوره برای پروژهٔ مشابه
          </Link>
        </div>
      </div>

      {/* Description + Specs */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-full rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="h-full rounded-[calc(1rem-1px)] bg-bg/85 p-5 backdrop-blur-2xl md:p-7">
              <h2 className="mb-4 text-lg font-bold">دربارهٔ پروژه</h2>
              <div className="whitespace-pre-line text-sm leading-7 text-muted">
                {project.description}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="h-full rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="h-full rounded-[calc(1rem-1px)] bg-bg/85 p-5 backdrop-blur-2xl">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Sparkles size={18} className="text-primary" /> مشخصات پروژه
              </h2>
              <div className="space-y-2">
                {project.specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg border border-secondary/15 px-3 py-2.5 text-sm"
                  >
                    <span className="text-muted">{s.label}</span>
                    <span className="font-bold text-text">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-3 text-xs font-medium text-primary">
                <span className="h-px w-8 bg-primary" /> پروژه‌های مرتبط
              </div>
              <h2 className="text-xl font-extrabold">پروژه‌های مشابه</h2>
            </div>
            <Link
              to="/projects"
              className="flex items-center gap-1 text-sm text-secondary transition hover:gap-2"
            >
              مشاهده همه <ChevronLeft size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group block rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition hover:-translate-y-1"
              >
                <div className="h-full overflow-hidden rounded-[calc(1rem-1px)] bg-bg/85 backdrop-blur-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                    />
                    <span className="absolute end-2 top-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-bold text-text backdrop-blur-xl">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-bold text-text">{p.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-secondary" />
                        {p.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-primary">
                        <Zap size={11} />
                        {p.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}