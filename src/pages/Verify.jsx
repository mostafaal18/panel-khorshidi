// src/pages/Verify.jsx
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Loader2,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Home as HomeIcon,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react'
import { formatPhoneFa } from '../utils/phone'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const OTP_LENGTH = 4
const OTP_DURATION = 60 // ثانیه برای ارسال مجدد
const OTP_PHONE_MAX_AGE_MS = 5 * 60 * 1000 // اعتبار شماره ذخیره‌شده
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
    raw.includes('\\')
  ) {
    return '/'
  }
  return raw
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function Verify() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
  const [phone, setPhone] = useState(null)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(OTP_DURATION)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const inputRefs = useRef([])
  const submittingRef = useRef(false)

  /* ---------- بررسی اولیه و بارگذاری شماره ---------- */
  useEffect(() => {
    const storedPhone = localStorage.getItem(OTP_PHONE_KEY)
    const storedTs = Number(localStorage.getItem(OTP_SENT_AT_KEY) || 0)

    if (!storedPhone) {
      navigate('/login', { replace: true })
      return
    }

    if (Date.now() - storedTs > OTP_PHONE_MAX_AGE_MS) {
      localStorage.removeItem(OTP_PHONE_KEY)
      localStorage.removeItem(OTP_SENT_AT_KEY)
      navigate('/login', { replace: true })
      return
    }

    setPhone(storedPhone)

    const elapsed = Math.floor((Date.now() - storedTs) / 1000)
    setTimer(Math.max(OTP_DURATION - elapsed, 0))

    setTimeout(() => inputRefs.current[0]?.focus(), 100)
  }, [navigate])

  /* ---------- تایمر شمارش معکوس ---------- */
  useEffect(() => {
    if (timer <= 0) return
    const t = setTimeout(() => setTimer((v) => Math.max(v - 1, 0)), 1000)
    return () => clearTimeout(t)
  }, [timer])

  /* ---------- ریست کد ---------- */
  const resetCode = () => {
    setCode(Array(OTP_LENGTH).fill(''))
    setTimeout(() => inputRefs.current[0]?.focus(), 50)
  }

  /* ---------- ورود ---------- */
  const handleLogin = async (otp) => {
    if (otp.length !== OTP_LENGTH || !phone) return
    if (submittingRef.current || isLoggingIn) return
    submittingRef.current = true

    setError('')
    setIsLoggingIn(true)

    try {
      // TODO: API واقعی
      // const res = await fetch('/api/auth/login-otp', {...})
      await new Promise((r) => setTimeout(r, 800))

      if (otp !== DEMO_OTP) {
        setError('کد وارد شده صحیح نیست')
        resetCode()
        return
      }

      localStorage.removeItem(OTP_PHONE_KEY)
      localStorage.removeItem(OTP_SENT_AT_KEY)
      // TODO: ذخیرهٔ توکن

      const redirect = getSafeRedirect(searchParams.get('redirect'))
      navigate(redirect, { replace: true })
    } catch {
      setError('خطا در ورود. دوباره تلاش کنید.')
      resetCode()
    } finally {
      submittingRef.current = false
      setIsLoggingIn(false)
    }
  }

  /* ---------- تغییر رقم ---------- */
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const digit = value.slice(-1)
    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)
    setError('')

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    const otp = newCode.join('')
    if (otp.length === OTP_LENGTH) {
      void handleLogin(otp)
    }
  }

  /* ---------- کیبورد ---------- */
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  /* ---------- پیست ---------- */
  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)
    if (!pasted) return

    const newCode = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((d, i) => {
      newCode[i] = d
    })
    setCode(newCode)
    setError('')

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[focusIndex]?.focus()

    if (pasted.length === OTP_LENGTH) {
      void handleLogin(pasted)
    }
  }

  /* ---------- ارسال مجدد ---------- */
  const handleResend = async () => {
    if (!phone || timer > 0 || isResending || isLoggingIn) return

    setError('')
    setIsResending(true)

    try {
      // TODO: API واقعی
      await new Promise((r) => setTimeout(r, 800))

      localStorage.setItem(OTP_SENT_AT_KEY, String(Date.now()))
      resetCode()
      setTimer(OTP_DURATION)
    } catch {
      setError('ارسال مجدد کد با خطا مواجه شد')
    } finally {
      setIsResending(false)
    }
  }

  /* ---------- Render ---------- */
  if (!phone) return null

  const isBusy = isLoggingIn || isResending
  const isComplete = code.every((d) => d !== '')

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
        <Link to="/login" className="transition hover:text-secondary">
          ورود
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">تأیید کد</span>
      </nav>

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/50 p-6 backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute -top-24 right-1/4 size-64 rounded-full bg-success/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-64 rounded-full bg-secondary/15 blur-[100px]" />

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)]">
            <ShieldCheck size={34} />
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-extrabold text-text">
            تأیید شماره تلفن
          </h1>
          <p className="mb-6 text-center text-sm leading-7 text-muted">
            کد {OTP_LENGTH} رقمی ارسال‌شده به
            <span
              dir="ltr"
              className="mt-1 block font-mono text-base font-bold text-text"
            >
              {formatPhoneFa(phone)}
            </span>
            را وارد کنید
          </p>

          {/* OTP input */}
          <div dir="ltr" className="mb-4 flex justify-center gap-2 sm:gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                disabled={isBusy}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`h-14 w-14 rounded-xl border-2 text-center text-2xl font-bold outline-none transition-all focus:ring-4 sm:h-16 sm:w-16 ${
                  isBusy
                    ? 'cursor-not-allowed border-white/10 bg-white/[0.03] opacity-60'
                    : error
                      ? 'border-red-400/80 bg-red-500/10 text-red-300 ring-red-400/15'
                      : digit
                        ? 'border-success/60 bg-success/10 text-success ring-success/15'
                        : 'border-white/20 bg-white/[0.05] text-text hover:border-white/35 focus:border-secondary focus:ring-secondary/20'
                }`}
              />
            ))}
          </div>

          {/* Demo hint */}
          <p className="mb-4 rounded-lg border border-primary/20 bg-primary/[0.06] px-3 py-2 text-center text-[11px] leading-6 text-text/85">
            <span className="font-bold text-primary">تست:</span> کد نمایشی{' '}
            <span dir="ltr" className="font-mono font-bold text-primary">
              {DEMO_OTP}
            </span>{' '}
            را وارد کنید.
          </p>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mb-4 flex items-start gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 p-2.5 text-xs leading-6 text-red-300"
            >
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={() => void handleLogin(code.join(''))}
            disabled={isBusy || !isComplete}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isBusy ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                {isLoggingIn ? 'در حال ورود...' : 'در حال ارسال...'}
              </>
            ) : (
              <>
                تأیید و ادامه
                <ArrowLeft size={16} />
              </>
            )}
          </button>

          {/* Resend */}
          <div className="mt-5 text-center">
            {timer > 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-muted">
                ارسال مجدد کد تا{' '}
                <span dir="ltr" className="font-mono font-bold text-secondary">
                  {formatTimer(timer)}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isBusy}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-2.5 text-xs font-bold text-secondary transition hover:border-secondary/60 hover:bg-secondary/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <RotateCcw size={14} />
                    ارسال مجدد کد
                  </>
                )}
              </button>
            )}
          </div>

          {/* Change phone */}
          <Link
            to="/login"
            className="mt-5 block w-full rounded-xl border border-white/15 bg-white/[0.03] py-2.5 text-center text-xs font-medium text-muted transition hover:border-secondary/40 hover:text-secondary"
          >
            تغییر شماره موبایل
          </Link>
        </div>
      </div>
    </section>
  )
}