// src/pages/Consultation.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Factory,
  Headphones,
  Home as HomeIcon,
  Layers,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  Zap,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^09\d{9}$/
const MESSAGE_MAX = 2000

const emptyForm = {
  fullName: '',
  phone: '',
  email: '',
  projectType: '',
  capacity: '',
  location: '',
  timeline: '',
  message: '',
  website: '', // honeypot
}

/* کلاس مشترک فیلدها — حاشیه روشن، فوکوس آبی، خطا قرمز */
const inputClass = (hasError, extra = '') =>
  [
    'w-full rounded-xl border bg-white/[0.06] py-2.5 text-sm text-text',
    'placeholder:text-muted/60 outline-none transition duration-200',
    'focus:bg-white/[0.09] focus:ring-4',
    hasError
      ? 'border-red-400/90 focus:border-red-400 focus:ring-red-400/20'
      : 'border-white/30 hover:border-white/50 focus:border-secondary focus:ring-secondary/25',
    extra,
  ].join(' ')

const selectClass = (hasError) =>
  inputClass(hasError, 'appearance-none pr-3.5 pl-10 [&>option]:bg-bg-secondary')

/* ------------------------------------------------------------------ */
/* گزینه‌ها                                                            */
/* ------------------------------------------------------------------ */
const PROJECT_TYPES = [
  { value: 'power-plant', label: 'نیروگاه خورشیدی', icon: Sun },
  { value: 'residential', label: 'مسکونی', icon: HomeIcon },
  { value: 'commercial', label: 'تجاری', icon: Building2 },
  { value: 'industrial', label: 'صنعتی', icon: Factory },
]

const CAPACITIES = [
  { value: 'under-10kw', label: 'کمتر از ۱۰ کیلووات' },
  { value: '10-100kw', label: '۱۰ تا ۱۰۰ کیلووات' },
  { value: '100kw-1mw', label: '۱۰۰ کیلووات تا ۱ مگاوات' },
  { value: 'above-1mw', label: 'بیش از ۱ مگاوات' },
  { value: 'unknown', label: 'نمی‌دانم، نیاز به مشاوره دارم' },
]

const TIMELINES = [
  { value: 'urgent', label: 'فوری (کمتر از ۱ ماه)' },
  { value: '1-3months', label: '۱ تا ۳ ماه آینده' },
  { value: '3-6months', label: '۳ تا ۶ ماه آینده' },
  { value: 'exploring', label: 'در حال بررسی هستم' },
]

/* ------------------------------------------------------------------ */
/* مزیت‌ها                                                              */
/* ------------------------------------------------------------------ */
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'کاملاً رایگان',
    desc: 'مشاورهٔ اولیه بدون هیچ هزینه‌ای',
    color: 'bg-success/15 text-success border-success/50',
  },
  {
    icon: Clock,
    title: 'پاسخ سریع',
    desc: 'حداکثر ۲۴ ساعت کاری',
    color: 'bg-secondary/15 text-secondary border-secondary/50',
  },
  {
    icon: Award,
    title: 'بدون تعهد',
    desc: 'فقط برای آشنایی و بررسی',
    color: 'bg-primary/15 text-primary border-primary/50',
  },
]

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */
const cardClass =
  'rounded-2xl border border-white/25 bg-bg-secondary/50 backdrop-blur-xl'

function FieldError({ message }) {
  if (!message) return null
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-300"
    >
      <AlertCircle size={12} />
      {message}
    </p>
  )
}

function Label({ htmlFor, required, optional, icon: Icon, children, as: Tag = 'label' }) {
  return (
    <Tag
      {...(Tag === 'label' ? { htmlFor } : {})}
      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text/85"
    >
      {Icon && <Icon size={13} className="text-primary" />}
      {children}
      {required && <span className="text-red-400">*</span>}
      {optional && (
        <span className="text-[10px] font-normal text-muted/70">(اختیاری)</span>
      )}
    </Tag>
  )
}

function SelectField({ id, value, onChange, hasError, placeholder, options }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={selectClass(hasError)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  )
}

function OptionGroup({ options, value, onChange, name }) {
  return (
    <div
      role="radiogroup"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(name, opt.value)}
            className={`group relative flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-xs font-semibold transition duration-200 ${
              active
                ? 'border-primary bg-primary/15 text-primary shadow-[0_0_26px_-8px_rgba(255,149,0,0.7)]'
                : 'border-white/30 bg-white/[0.04] text-muted hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/[0.08] hover:text-text'
            }`}
          >
            {active && (
              <CheckCircle2
                size={14}
                className="absolute left-2 top-2 text-primary"
              />
            )}
            {Icon && (
              <span
                className={`flex size-10 items-center justify-center rounded-lg border transition ${
                  active
                    ? 'border-primary/60 bg-primary/20'
                    : 'border-white/25 bg-white/[0.05] group-hover:border-white/45'
                }`}
              >
                <Icon size={18} />
              </span>
            )}
            <span className="text-center leading-5">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function Consultation() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  /* پیشرفت تکمیل فیلدهای الزامی */
  const requiredDone = [
    form.fullName.trim().length >= 2,
    PHONE_REGEX.test(form.phone.trim()),
    !!form.projectType,
    !!form.timeline,
  ].filter(Boolean).length
  const progress = (requiredDone / 4) * 100

  const validate = () => {
    const e = {}

    if (!form.fullName.trim()) e.fullName = 'نام الزامی است'
    else if (form.fullName.trim().length < 2)
      e.fullName = 'نام باید حداقل ۲ کاراکتر باشد'

    if (!form.phone.trim()) e.phone = 'شماره موبایل الزامی است'
    else if (!PHONE_REGEX.test(form.phone.trim()))
      e.phone = 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد'

    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim()))
      e.email = 'فرمت ایمیل صحیح نیست'

    if (!form.projectType) e.projectType = 'نوع پروژه را انتخاب کنید'
    if (!form.timeline) e.timeline = 'زمان تقریبی شروع را انتخاب کنید'

    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (form.website) return

    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    setErrors({})
    setSending(true)

    try {
      // TODO: API واقعی
      // await fetch('/api/consultation', { method: 'POST', body: JSON.stringify(form) })
      await new Promise((r) => setTimeout(r, 900))
      setSent(true)
      setForm(emptyForm)
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setForm(emptyForm)
    setErrors({})
    setSent(false)
  }

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-28">
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] overflow-hidden"
      >
        <div className="absolute -top-24 right-1/4 size-[380px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -top-10 left-1/4 size-[340px] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-secondary"
        >
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="font-medium text-text">درخواست مشاوره</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/60 bg-primary/15 px-4 py-1.5 text-xs font-bold text-primary shadow-[0_0_28px_-6px_rgba(255,149,0,0.7)]">
          <Sparkles size={12} />
          مشاورهٔ رایگان
        </span>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
          پروژه‌تان را با{' '}
          <span className="text-gradient-primary">کارشناسان ما</span> شروع کنید
        </h1>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-primary" />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted sm:text-base">
          فرم زیر را پر کنید تا کارشناسان SunTech در اسرع وقت برای بررسی نیاز
          شما و ارائهٔ راهکار مناسب با شما تماس بگیرند. مشاورهٔ اولیه کاملاً
          رایگان و بدون تعهد است.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Form */}
        <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/30 bg-bg-secondary/50 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8">
          {/* top gradient line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary to-transparent"
          />

          {sent ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center py-14 text-center"
            >
              <div className="mb-5 flex size-20 items-center justify-center rounded-full border border-success/50 bg-success/15 text-success shadow-[0_0_44px_-8px_rgba(34,197,94,0.7)]">
                <CheckCircle2 size={38} />
              </div>
              <h2 className="text-xl font-extrabold text-text">
                درخواست شما ثبت شد
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                کارشناسان ما حداکثر تا ۲۴ ساعت کاری آینده با شما تماس
                می‌گیرند. ممنون که به SunTech اعتماد کردید.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-white/35 bg-white/[0.07] px-5 py-2.5 text-sm font-semibold text-text transition hover:border-secondary/70 hover:bg-white/[0.12]"
                >
                  ارسال درخواست جدید
                </button>
                <Link
                  to="/projects"
                  className="rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]"
                >
                  مشاهده پروژه‌ها
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/50 bg-primary/15 text-primary">
                  <Headphones size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-text">
                    فرم درخواست مشاوره
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">
                    فیلدهای ستاره‌دار الزامی هستند. اطلاعات شما نزد ما محفوظ
                    است.
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-7">
                <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted">
                  <span>تکمیل فیلدهای الزامی</span>
                  <span className="font-semibold text-text">
                    {requiredDone.toLocaleString('fa-IR')} از{' '}
                    {(4).toLocaleString('fa-IR')}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* honeypot */}
                <div aria-hidden="true" className="sr-only">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="new-password"
                      value={form.website}
                      onChange={(e) => setField('website', e.target.value)}
                    />
                  </label>
                </div>

                {/* Row 1: نام + موبایل */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-fullName" required>
                      نام و نام خانوادگی
                    </Label>
                    <div className="relative">
                      <User
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="c-fullName"
                        type="text"
                        placeholder="نام شما"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => setField('fullName', e.target.value)}
                        className={inputClass(!!errors.fullName, 'pr-10 pl-3')}
                      />
                    </div>
                    <FieldError message={errors.fullName} />
                  </div>

                  <div>
                    <Label htmlFor="c-phone" required>
                      شماره موبایل
                    </Label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="c-phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="09xxxxxxxxx"
                        dir="ltr"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setField(
                            'phone',
                            e.target.value.replace(/\D/g, '').slice(0, 11),
                          )
                        }
                        className={inputClass(!!errors.phone, 'pr-10 pl-3')}
                      />
                    </div>
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                {/* Row 2: ایمیل */}
                <div>
                  <Label htmlFor="c-email" optional>
                    ایمیل
                  </Label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <input
                      id="c-email"
                      type="email"
                      placeholder="example@mail.com"
                      dir="ltr"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={inputClass(!!errors.email, 'pr-10 pl-3')}
                    />
                  </div>
                  <FieldError message={errors.email} />
                </div>

                {/* نوع پروژه */}
                <div>
                  <Label as="div" icon={Layers} required>
                    نوع پروژه
                  </Label>
                  <OptionGroup
                    options={PROJECT_TYPES}
                    value={form.projectType}
                    onChange={setField}
                    name="projectType"
                  />
                  <FieldError message={errors.projectType} />
                </div>

                {/* ظرفیت */}
                <div>
                  <Label htmlFor="c-capacity" icon={Zap} optional>
                    ظرفیت تقریبی
                  </Label>
                  <SelectField
                    id="c-capacity"
                    value={form.capacity}
                    onChange={(e) => setField('capacity', e.target.value)}
                    placeholder="انتخاب کنید..."
                    options={CAPACITIES}
                  />
                </div>

                {/* Row: موقعیت + زمان */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-location" icon={MapPin} optional>
                      محل اجرا
                    </Label>
                    <input
                      id="c-location"
                      type="text"
                      placeholder="استان / شهر"
                      value={form.location}
                      onChange={(e) => setField('location', e.target.value)}
                      className={inputClass(false, 'px-3.5')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="c-timeline" icon={Calendar} required>
                      زمان تقریبی شروع
                    </Label>
                    <SelectField
                      id="c-timeline"
                      value={form.timeline}
                      onChange={(e) => setField('timeline', e.target.value)}
                      hasError={!!errors.timeline}
                      placeholder="انتخاب کنید..."
                      options={TIMELINES}
                    />
                    <FieldError message={errors.timeline} />
                  </div>
                </div>

                {/* توضیحات */}
                <div>
                  <Label htmlFor="c-message" icon={MessageCircle} optional>
                    توضیحات
                  </Label>
                  <textarea
                    id="c-message"
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    placeholder="هر جزئیات دیگری که فکر می‌کنید به ما کمک می‌کند (مصرف برق فعلی، محدودیت فضا، ...)"
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    className={inputClass(
                      false,
                      'resize-none px-3.5 py-3 leading-7',
                    )}
                  />
                  <p className="mt-1.5 text-[11px] text-muted">
                    {form.message.trim().length.toLocaleString('fa-IR')} /{' '}
                    {MESSAGE_MAX.toLocaleString('fa-IR')}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {sending ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <Send
                        size={17}
                        className="transition group-hover:-translate-x-1"
                      />
                      ارسال درخواست مشاوره
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-4">
          {/* Benefits */}
          <div className={`${cardClass} p-5 transition hover:border-secondary/60`}>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-text">
              <Sparkles size={14} className="text-primary" />
              چرا مشاورهٔ ما؟
            </h3>
            <ul className="space-y-3.5">
              {BENEFITS.map((b) => {
                const Icon = b.icon
                return (
                  <li key={b.title} className="flex items-start gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${b.color}`}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text">
                        {b.title}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-5 text-muted">
                        {b.desc}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Direct contact */}
          <div className={`${cardClass} p-5 transition hover:border-primary/60`}>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-primary/50 bg-primary/15 text-primary">
              <Phone size={19} />
            </div>
            <h3 className="text-sm font-bold text-text">
              ترجیح می‌دهید تماس بگیرید؟
            </h3>
            <a
              href="tel:02191001234"
              className="mt-3 flex items-center gap-2 rounded-lg border border-white/30 bg-white/[0.05] px-3 py-2.5 text-sm font-semibold text-text transition hover:border-secondary/70 hover:bg-white/[0.09]"
            >
              <Phone size={14} className="text-secondary" />
              <span dir="ltr">021-91001234</span>
            </a>
            <Link
              to="/contact"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/[0.05] px-3 py-2.5 text-xs font-medium text-muted transition hover:border-primary/60 hover:text-primary"
            >
              <Mail size={14} /> سایر راه‌های ارتباطی
            </Link>
          </div>

          {/* Note */}
          <div className="rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/20 to-primary/[0.05] p-5">
            <p className="text-xs leading-7 text-text/90">
              <span className="font-extrabold text-primary">نکته:</span> پس از
              ثبت درخواست، کارشناس ما برای هماهنگی زمان بازدید (در صورت نیاز)
              تماس می‌گیرد.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}