// src/pages/Login.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Loader2,
  Smartphone,
  AlertCircle,
  ArrowLeft,
  Home as HomeIcon,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react'
import {
  sanitizePhoneInput,
  normalizePhone,
  isValidIranianPhone,
  formatPhoneFa,
} from '../utils/phone'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const OTP_COOLDOWN_SECONDS = 60
const OTP_SENT_AT_KEY = 'otpSentAt'
const OTP_PHONE_KEY = 'otpPhone'
const DEMO_OTP = '1234' // TODO: API واقعی

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function getSafeRedirect(raw) {
  if (
    !raw ||
    !raw.startsWith('/') ||
    raw.startsWith('//') ||
    raw.includes('\\') ||
    raw.startsWith('/login') ||
    raw.startsWith('/verify')
  ) {
    return '/'
  }
  return raw
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  /* چک اولیهٔ cooldown — اگر از قبل کد فرستاده شده */
  useEffect(() => {
    const lastSentAt = Number(localStorage.getItem(OTP_SENT_AT_KEY) || 0)
    const remaining = Math.ceil(
      (lastSentAt + OTP_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000,
    )
    if (remaining > 0) setCooldown(remaining)
  }, [])

  /* تایمر شمارش معکوس */
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const validate = () => {
    if (!phone.trim()) return 'شماره موبایل الزامی است'
    if (!isValidIranianPhone(phone))
      return 'شماره موبایل معتبر نیست (مثال: 09121234567)'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cooldown > 0) {
      setError(`لطفاً ${cooldown} ثانیه دیگر تلاش کنید`)
      return
    }

    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setError('')
    setLoading(true)

    try {
      const normalized = normalizePhone(phone)

      // TODO: API واقعی
      // await fetch('/api/auth/request-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone: normalized }),
      // })
      await new Promise((r) => setTimeout(r, 800))

      localStorage.setItem(OTP_PHONE_KEY, normalized)
      localStorage.setItem(OTP_SENT_AT_KEY, String(Date.now()))

      const redirect = getSafeRedirect(searchParams.get('redirect'))
      navigate(
        redirect !== '/'
          ? `/verify?redirect=${encodeURIComponent(redirect)}`
          : '/verify',
      )
    } catch {
      setError('خطا در ارسال کد تأیید. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const disabled = loading || cooldown > 0

  return (
    <section className="relative mx-auto max-w-md px-5 pb-16 pt-28">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-secondary"
        >
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">ورود / ثبت‌نام</span>
      </nav>

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/50 p-6 backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute -top-24 right-1/4 size-64 rounded-full bg-primary/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-64 rounded-full bg-secondary/15 blur-[100px]" />

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary shadow-[0_0_40px_-10px_rgba(255,149,0,0.6)]">
            <Smartphone size={34} />
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-extrabold text-text">
            ورود یا ثبت‌نام
          </h1>
          <p className="mb-8 text-center text-sm leading-7 text-muted">
            شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Phone input */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-semibold text-text/80"
              >
                شماره موبایل <span className="text-red-400">*</span>
              </label>

              <div
                dir="ltr"
                className={`flex items-stretch overflow-hidden rounded-xl border bg-white/[0.05] transition focus-within:bg-white/[0.08] focus-within:ring-4 ${
                  error
                    ? 'border-red-400/80 focus-within:border-red-400 focus-within:ring-red-400/15'
                    : 'border-white/20 hover:border-white/35 focus-within:border-secondary focus-within:ring-secondary/20'
                }`}
              >
                <span className="flex items-center border-r border-white/15 bg-white/[0.03] px-3 text-sm font-bold text-secondary">
                  +98
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={11}
                  placeholder="9123456789"
                  disabled={disabled}
                  value={phone}
                  onChange={(e) => {
                    setPhone(sanitizePhoneInput(e.target.value))
                    setError('')
                  }}
                  className="flex-1 bg-transparent px-3 py-3 text-sm text-text outline-none placeholder:text-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
                  autoFocus
                />
              </div>

              {phone && isValidIranianPhone(phone) && (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-success">
                  <ShieldCheck size={11} />
                  {formatPhoneFa(phone)}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="flex items-start gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 p-2.5 text-xs leading-6 text-red-300"
              >
                <AlertCircle size={13} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={disabled}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  در حال ارسال...
                </>
              ) : cooldown > 0 ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {cooldown} ثانیه دیگر...
                </>
              ) : (
                <>
                  ارسال کد تأیید
                  <ArrowLeft size={16} />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="mt-6 text-center text-[11px] leading-6 text-muted">
            با ورود،{' '}
            <Link
              to="/terms"
              className="font-bold text-secondary transition hover:underline"
            >
              قوانین و مقررات
            </Link>{' '}
            و{' '}
            <Link
              to="/privacy"
              className="font-bold text-secondary transition hover:underline"
            >
              حریم خصوصی
            </Link>{' '}
            را می‌پذیرم.
          </p>
        </div>
      </div>
    </section>
  )
}