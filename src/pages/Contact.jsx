// src/pages/Contact.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
  Home as HomeIcon,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^09\d{9}$/
const MESSAGE_MAX = 5000

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '', // honeypot
}

/* کلاس مشترک فیلدها — حاشیه روشن‌تر، فوکوس آبی، خطا قرمز */
const inputClass = (hasError, extra = '') =>
  [
    'w-full rounded-xl border bg-white/[0.05] py-2.5 text-sm text-text',
    'placeholder:text-muted/60 outline-none transition duration-200',
    'focus:bg-white/[0.08] focus:ring-4',
    hasError
      ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/15'
      : 'border-white/25 hover:border-white/40 focus:border-secondary focus:ring-secondary/20',
    extra,
  ].join(' ')

/* ------------------------------------------------------------------ */
/* Channels                                                            */
/* ------------------------------------------------------------------ */
const CHANNELS = [
  {
    icon: Phone,
    title: 'تلفن پشتیبانی',
    value: '021-91001234',
    href: 'tel:02191001234',
    color: 'bg-secondary/15 text-secondary border border-secondary/40',
    hover: 'hover:border-secondary/60 hover:shadow-[0_18px_45px_-18px_rgba(22,139,255,0.55)]',
    hint: 'شنبه تا چهارشنبه ۹ تا ۱۸، پنجشنبه ۹ تا ۱۳',
    ltr: true,
  },
  {
    icon: Mail,
    title: 'ایمیل',
    value: 'info@suntech.ir',
    href: 'mailto:info@suntech.ir',
    color: 'bg-primary/15 text-primary border border-primary/40',
    hover: 'hover:border-primary/60 hover:shadow-[0_18px_45px_-18px_rgba(255,149,0,0.55)]',
    hint: 'معمولاً ظرف ۲۴ ساعت کاری پاسخ می‌دهیم',
    ltr: true,
  },
  {
    icon: AtSign,
    title: 'اینستاگرام',
    value: '@suntech.ir',
    href: 'https://instagram.com/suntech.ir',
    color: 'bg-accent/15 text-accent border border-accent/40',
    hover: 'hover:border-accent/60 hover:shadow-[0_18px_45px_-18px_rgba(255,200,80,0.45)]',
    hint: 'جدیدترین پروژه‌ها و اخبار',
    ltr: true,
  },
]

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */
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

function Label({ htmlFor, required, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold text-text/80"
    >
      {children}
      {required && <span className="mr-1 text-red-400">*</span>}
    </label>
  )
}

const cardClass =
  'rounded-2xl border border-white/20 bg-bg-secondary/50 backdrop-blur-xl'

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const e = {}

    if (!form.fullName.trim()) e.fullName = 'نام الزامی است'
    else if (form.fullName.trim().length < 2)
      e.fullName = 'نام باید حداقل ۲ کاراکتر باشد'

    if (!form.subject.trim()) e.subject = 'موضوع الزامی است'

    const hasEmail = form.email.trim().length > 0
    const hasPhone = form.phone.trim().length > 0

    if (!hasEmail && !hasPhone) {
      e.email = 'حداقل یکی از ایمیل یا شماره موبایل الزامی است'
      e.phone = 'حداقل یکی از ایمیل یا شماره موبایل الزامی است'
    }

    if (hasEmail && !EMAIL_REGEX.test(form.email.trim()))
      e.email = 'فرمت ایمیل صحیح نیست'

    if (hasPhone && !PHONE_REGEX.test(form.phone.trim()))
      e.phone = 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد'

    if (!form.message.trim()) e.message = 'متن پیام الزامی است'
    else if (form.message.trim().length < 10)
      e.message = 'متن پیام باید حداقل ۱۰ کاراکتر باشد'

    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    // honeypot — اگر پر شده یعنی ربات است
    if (form.website) return

    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    setErrors({})
    setSending(true)

    try {
      // TODO: اینجا API واقعی را صدا بزنید
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      await new Promise((r) => setTimeout(r, 900)) // شبیه‌سازی

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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
      >
        <div className="absolute -top-24 right-1/4 size-[360px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -top-10 left-1/4 size-[320px] rounded-full bg-secondary/15 blur-[120px]" />
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
        <span className="font-medium text-text">تماس با ما</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-xs font-bold text-primary shadow-[0_0_24px_-6px_rgba(255,149,0,0.6)]">
          <MessageCircle size={12} />
          پشتیبانی SunTech
        </span>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
          با ما <span className="text-gradient-primary">در تماس</span> باشید
        </h1>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-primary" />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted sm:text-base">
          هر سؤال، انتقاد یا پیشنهادی دارید؟ تیم پشتیبانی SunTech آماده‌ی
          پاسخگویی به شماست. از هر کانالی که راحت‌تر هستید با ما ارتباط
          بگیرید.
        </p>
      </div>

      {/* Channels */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon
          const isExternal = channel.href.startsWith('http')
          return (
            <a
              key={channel.title}
              href={channel.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={`group ${cardClass} p-5 transition duration-300 hover:-translate-y-1 hover:bg-bg-secondary/70 ${channel.hover}`}
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-xl transition duration-300 group-hover:scale-110 ${channel.color}`}
              >
                <Icon size={22} />
              </div>
              <h3 className="text-sm font-bold text-text">{channel.title}</h3>
              <p
                className="mt-1 text-start text-sm font-semibold text-text"
                dir={channel.ltr ? 'ltr' : undefined}
              >
                {channel.value}
              </p>
              <p className="mt-2 text-[11px] leading-5 text-muted">
                {channel.hint}
              </p>
            </a>
          )
        })}
      </div>

      {/* Form + Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* Form */}
        <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/25 bg-bg-secondary/50 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8 lg:order-2">
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
              <div className="mb-5 flex size-20 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-8px_rgba(34,197,94,0.6)]">
                <CheckCircle2 size={38} />
              </div>
              <h2 className="text-xl font-extrabold text-text">
                پیام شما با موفقیت ثبت شد
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                تیم پشتیبانی پس از بررسی، با شما تماس می‌گیرد یا به پیامتان
                پاسخ می‌دهد. ممنون که با ما در تماس بودید.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-7 rounded-xl border border-white/30 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-text transition hover:border-secondary/60 hover:bg-white/[0.1]"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-text">فرم تماس</h2>
                  <p className="mt-0.5 text-xs text-muted">
                    فرم زیر را پر کنید تا پیام شما به تیم پشتیبانی برسد.
                  </p>
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

                {/* Row 1: نام + موضوع */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-fullName" required>
                      نام و نام خانوادگی
                    </Label>
                    <div className="relative">
                      <User
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="contact-fullName"
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
                    <Label htmlFor="contact-subject" required>
                      موضوع
                    </Label>
                    <div className="relative">
                      <Sparkles
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="مثلاً: درخواست مشاوره پروژه"
                        value={form.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        className={inputClass(!!errors.subject, 'pr-10 pl-3')}
                      />
                    </div>
                    <FieldError message={errors.subject} />
                  </div>
                </div>

                {/* Row 2: ایمیل + موبایل */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-email">ایمیل</Label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="contact-email"
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

                  <div>
                    <Label htmlFor="contact-phone">شماره موبایل</Label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="contact-phone"
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

                <p className="-mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                  <span className="inline-block size-1.5 rounded-full bg-primary" />
                  حداقل یکی از ایمیل یا شماره موبایل را وارد کنید.
                </p>

                {/* پیام */}
                <div>
                  <Label htmlFor="contact-message" required>
                    متن پیام
                  </Label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    placeholder="پیام خود را کامل بنویسید..."
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    className={inputClass(!!errors.message, 'resize-none px-3.5 py-3 leading-7')}
                  />
                  {errors.message ? (
                    <FieldError message={errors.message} />
                  ) : (
                    <p className="mt-1.5 text-[11px] text-muted">
                      {form.message.trim().length.toLocaleString('fa-IR')} /{' '}
                      {MESSAGE_MAX.toLocaleString('fa-IR')}
                    </p>
                  )}
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
                      ارسال پیام
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-4 lg:order-1">
          {/* Address */}
          <div className={`${cardClass} p-5 transition hover:border-secondary/50`}>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-secondary/40 bg-secondary/15 text-secondary">
              <MapPin size={19} />
            </div>
            <h3 className="text-sm font-bold text-text">آدرس دفتر مرکزی</h3>
            <p className="mt-2 text-xs leading-7 text-muted">
              تهران، خیابان ولیعصر، برج خورشید، طبقه ۷
            </p>
          </div>

          {/* Hours */}
          <div className={`${cardClass} p-5 transition hover:border-primary/50`}>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
              <Clock size={19} />
            </div>
            <h3 className="text-sm font-bold text-text">ساعات پاسخگویی</h3>
            <ul className="mt-3 space-y-2.5 text-xs">
              <li className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-muted">شنبه تا چهارشنبه</span>
                <span className="font-semibold text-text">۹:۰۰ - ۱۸:۰۰</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-muted">پنجشنبه</span>
                <span className="font-semibold text-text">۹:۰۰ - ۱۳:۰۰</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted">جمعه</span>
                <span className="font-semibold text-red-300">تعطیل</span>
              </li>
            </ul>
          </div>

          {/* Note */}
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/[0.04] p-5">
            <p className="text-xs leading-7 text-text/90">
              <span className="font-extrabold text-primary">نکته:</span> برای
              پیگیری سریع‌تر، نام پروژه یا شماره سفارش خود را در متن پیام ذکر
              کنید.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}