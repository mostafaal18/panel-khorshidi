// src/pages/Services.jsx
import { Link } from 'react-router-dom'
import {
  Sun,
  Home as HomeIcon,
  Factory,
  Check,
  ChevronLeft,
  Phone,
  Sparkles,
  MessageCircle,
  PencilRuler,
  Wrench,
  Headphones,
  ShieldCheck,
  Zap,
  Leaf,
  Award,
} from 'lucide-react'
import Img from '../components/Img'
import { services } from '../data'

/* ---------- نقشهٔ آیکون‌ها برای دادهٔ داینامیک ---------- */
const iconMap = {
  Sun,
  Home: HomeIcon,
  Factory,
}

/* ---------- جزئیات خدمات ---------- */
const detailedServices = [
  {
    ...services[0],
    description:
      'طراحی، تأمین و اجرای نیروگاه‌های خورشیدی در مقیاس‌های بزرگ با بالاترین استانداردهای بین‌المللی و بازدهی حداکثری.',
    features: [
      'مطالعات امکان‌سنجی و مکان‌یابی',
      'طراحی مهندسی تخصصی',
      'تأمین تجهیزات با گارانتی',
      'اجرا و راه‌اندازی کامل',
    ],
  },
  {
    ...services[1],
    description:
      'سیستم‌های خورشیدی خانگی و تجاری، متناسب با نیاز و بودجهٔ شما با کمترین هزینه و بیشترین بازدهی.',
    features: [
      'بازدید و مشاورهٔ رایگان',
      'طراحی اختصاصی سیستم',
      'نصب حرفه‌ای و استاندارد',
      'اتصال به شبکهٔ برق',
    ],
  },
  {
    ...services[2],
    description:
      'نیروگاه‌های خورشیدی صنعتی برای تأمین پایدار برق کارخانه‌ها و کاهش چشمگیر هزینه‌های انرژی.',
    features: [
      'طراحی نیروگاه در مقیاس صنعتی',
      'مدیریت پروژه و مهندسی',
      'نظارت بر نصب و راه‌اندازی',
      'مانیتورینگ و نگهداری',
    ],
  },
]

/* ---------- مراحل فرآیند ---------- */
const steps = [
  {
    icon: MessageCircle,
    title: 'مشاورهٔ رایگان',
    desc: 'گفتگو با کارشناسان ما برای درک نیاز شما و ارائهٔ راه‌حل اولیه.',
  },
  {
    icon: PencilRuler,
    title: 'طراحی و مهندسی',
    desc: 'طراحی سیستم بر اساس شرایط محیطی، مصرف و بودجهٔ شما.',
  },
  {
    icon: Wrench,
    title: 'نصب و اجرا',
    desc: 'اجرای حرفه‌ای پروژه با رعایت استانداردها و ایمنی کامل.',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی',
    desc: 'خدمات پس از فروش، نگهداری و پشتیبانی فنی مستمر.',
  },
]

/* ---------- مزیت‌های ما ---------- */
const whyUs = [
  { icon: ShieldCheck, title: '۲۵ سال', desc: 'ضمانت کیفیت' },
  { icon: Zap, title: 'تا ۹۵٪', desc: 'بازدهی انرژی' },
  { icon: Award, title: '۵۰+', desc: 'پروژه موفق' },
  { icon: Leaf, title: 'انرژی پاک', desc: 'کاهش کربن' },
]

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
      {/* ---------- Breadcrumb ---------- */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-secondary"
        >
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">خدمات ما</span>
      </nav>

      {/* ---------- Header ---------- */}
      <div className="mb-10 max-w-2xl">
        <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
          <span className="h-px w-8 bg-primary" /> خدمات تخصصی ما
        </div>
        <h1 className="mb-3 text-3xl font-extrabold leading-tight md:text-4xl">
          راهکارهای{' '}
          <span className="text-gradient-primary">انرژی خورشیدی</span> برای هر نیاز
        </h1>
        <p className="text-sm leading-7 text-muted">
          از مشاوره و طراحی تا نصب و پشتیبانی، تمام مراحل پروژهٔ خورشیدی شما را
          با بالاترین استانداردها اجرا می‌کنیم.
        </p>
      </div>

      {/* ---------- Services grid ---------- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {detailedServices.map((s, i) => {
          const Icon = iconMap[s.icon] || Sun
          return (
            <article
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(255,149,0,0.4)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/20 to-transparent" />

                {/* Icon badge */}
                <div className="absolute bottom-4 start-4 grid size-12 place-items-center rounded-2xl border border-white/20 bg-white/10 text-primary shadow-[0_0_22px_rgba(255,149,0,0.4)] backdrop-blur-xl">
                  <Icon size={22} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-text">{s.title}</h3>
                <p className="mb-4 text-sm leading-6 text-muted">
                  {s.description}
                </p>
                <ul className="space-y-2">
                  {s.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-muted"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-secondary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>

      {/* ---------- Process ---------- */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3 text-xs font-medium text-primary">
            <span className="h-px w-8 bg-primary" /> فرآیند کار
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-2xl font-extrabold md:text-3xl">
            مسیر <span className="text-gradient-primary">همکاری</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute inset-x-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="grid size-16 place-items-center rounded-2xl border border-secondary/30 bg-bg-secondary/60 text-secondary shadow-[0_0_28px_-8px_rgba(22,139,255,0.5)] backdrop-blur-xl">
                      <Icon size={26} />
                    </div>
                    <span className="absolute -end-2 -top-2 grid size-7 place-items-center rounded-full bg-gradient-primary text-[11px] font-bold text-bg shadow-[0_0_16px_rgba(255,149,0,0.6)]">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-text">{step.title}</h3>
                  <p className="text-xs leading-6 text-muted">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---------- Why us ---------- */}
      <div className="mt-16 rounded-3xl border border-white/10 bg-bg-secondary/40 p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold">
            چرا <span className="text-gradient-primary">SunTech</span>؟
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {whyUs.map((w, i) => {
            const Icon = w.icon
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <div className="text-lg font-extrabold text-primary">
                  {w.title}
                </div>
                <div className="text-xs text-muted">{w.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-bg-secondary/40 to-secondary/10 p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative">
          <h2 className="mb-3 text-2xl font-extrabold md:text-3xl">
            آماده‌اید پروژه‌تان را{' '}
            <span className="text-gradient-primary">شروع</span> کنیم؟
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm leading-7 text-muted">
            برای مشاورهٔ رایگان با کارشناسان ما تماس بگیرید یا فرم تماس را پر
            کنید. ما در اسرع وقت با شما هماهنگ می‌کنیم.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
            >
              <Phone size={16} /> تماس با ما
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-6 py-3 text-sm font-bold text-secondary transition hover:bg-secondary hover:text-bg"
            >
              <Sparkles size={16} /> مشاهده محصولات
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}