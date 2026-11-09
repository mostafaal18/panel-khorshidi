// src/components/modals/ChangePhoneModal.jsx
import { useEffect, useRef, useState } from 'react'
import {
  X,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const PHONE_REGEX = /^09\d{9}$/
const OTP_LENGTH = 5
const OTP_COUNTDOWN = 120 // ثانیه
const DEMO_OTP = '12345' // TODO: از API واقعی

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white/[0.05] py-2.5 px-3.5 text-sm text-text placeholder:text-muted/60 outline-none transition focus:bg-white/[0.08] focus:ring-4 ${
    hasError
      ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/15'
      : 'border-white/20 hover:border-white/35 focus:border-secondary focus:ring-secondary/20'
  }`

/* تبدیل ثانیه به فرمت mm:ss */
function formatCountdown(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function FieldError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-300">
      <AlertCircle size={11} />
      {message}
    </p>
  )
}

export default function ChangePhoneModal({
  isOpen,
  onClose,
  currentPhone,
  onSuccess,
}) {
  const [step, setStep] = useState('phone') // phone | otp | done
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const otpRef = useRef(null)
  const phoneRef = useRef(null)

  /* ریست هنگام باز شدن */
  useEffect(() => {
    if (isOpen) {
      setStep('phone')
      setPhone('')
      setOtp('')
      setError('')
      setCountdown(0)
      setLoading(false)
    }
  }, [isOpen])

  /* تایمر شمارش معکوس — با setTimeout که هر ثانیه یکی کم می‌کند */
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  /* قفل اسکرول بدن */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  /* Escape */
  useEffect(() => {
    if (!isOpen) return
    const handle = (e) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [isOpen, onClose, loading])

  /* فوکوس خودکار */
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      if (step === 'otp') otpRef.current?.focus()
      else if (step === 'phone') phoneRef.current?.focus()
    }, 100)
    return () => clearTimeout(t)
  }, [isOpen, step])

  if (!isOpen) return null

  const handleBackdrop = () => {
    if (loading) return
    onClose()
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return setError('شماره موبایل الزامی است')
    if (!PHONE_REGEX.test(phone.trim()))
      return setError('شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد')
    if (phone.trim() === currentPhone)
      return setError('شماره جدید نباید با شمارهٔ فعلی یکسان باشد')

    setError('')
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 700)) // TODO: API واقعی
      setStep('otp')
      setCountdown(OTP_COUNTDOWN)
    } catch {
      setError('ارسال کد تأیید انجام نشد. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (otp.length !== OTP_LENGTH)
      return setError(`کد باید ${OTP_LENGTH} رقم باشد`)
    if (otp !== DEMO_OTP) return setError('کد وارد شده صحیح نیست')

    setError('')
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 700)) // TODO: API واقعی
      onSuccess?.(phone.trim())
      setStep('done')
      setTimeout(() => onClose(), 1400)
    } catch {
      setError('تأیید کد انجام نشد. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0 || loading) return
    setOtp('')
    setError('')
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 500)) // TODO: API واقعی
      setCountdown(OTP_COUNTDOWN)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePhone = () => {
    if (loading) return
    setStep('phone')
    setOtp('')
    setError('')
    setCountdown(0)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-md"
        onClick={handleBackdrop}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-phone-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/95 p-6 shadow-[0_25px_80px_-25px_rgba(22,139,255,0.55)] backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-secondary/15 text-secondary">
              <Smartphone size={18} />
            </div>
            <div>
              <h2
                id="change-phone-title"
                className="text-base font-extrabold text-text"
              >
                {step === 'phone' && 'تغییر شماره موبایل'}
                {step === 'otp' && 'تأیید کد پیامک'}
                {step === 'done' && 'شماره تغییر کرد'}
              </h2>
              <p className="mt-0.5 text-[11px] text-muted">
                {step === 'phone' && 'شماره جدید خود را وارد کنید'}
                {step === 'otp' && (
                  <>
                    کد ارسال‌شده به{' '}
                    <span dir="ltr" className="font-mono text-text">
                      {phone}
                    </span>{' '}
                    را وارد کنید
                  </>
                )}
                {step === 'done' && 'شمارهٔ جدید با موفقیت ثبت شد'}
              </p>
            </div>
          </div>
          <button
            onClick={handleBackdrop}
            disabled={loading}
            className="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="بستن"
          >
            <X size={16} />
          </button>
        </div>

        {/* ---------- Step: phone ---------- */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="new-phone"
                className="mb-1.5 block text-xs font-semibold text-text/80"
              >
                شماره موبایل جدید <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Smartphone
                  size={14}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="new-phone"
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))
                    setError('')
                  }}
                  placeholder="09xxxxxxxxx"
                  dir="ltr"
                  className={inputClass(!!error) + ' pr-10'}
                  aria-invalid={!!error}
                />
              </div>
              <FieldError message={error} />
              <p className="mt-2 text-[11px] text-muted">
                شمارهٔ فعلی:{' '}
                <span dir="ltr" className="font-mono text-text">
                  {currentPhone}
                </span>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-muted transition hover:border-white/30 hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
              >
                لغو
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-xs font-extrabold text-bg transition hover:shadow-[0_0_24px_rgba(255,149,0,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <ShieldCheck size={13} />
                )}
                {loading ? 'در حال ارسال...' : 'ارسال کد تأیید'}
              </button>
            </div>
          </form>
        )}

        {/* ---------- Step: OTP ---------- */}
        {step === 'otp' && (
          <form onSubmit={handleVerify} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="otp-code"
                className="mb-1.5 block text-xs font-semibold text-text/80"
              >
                کد تأیید ({OTP_LENGTH} رقمی){' '}
                <span className="text-red-400">*</span>
              </label>
              <input
                id="otp-code"
                ref={otpRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) => {
                  setOtp(
                    e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH),
                  )
                  setError('')
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData
                    .getData('text')
                    .replace(/\D/g, '')
                    .slice(0, OTP_LENGTH)
                  if (pasted) {
                    e.preventDefault()
                    setOtp(pasted)
                    setError('')
                  }
                }}
                /* ✅ اصلاح اصلی: داخل {} قرار گرفت */
                placeholder={'•'.repeat(OTP_LENGTH)}
                dir="ltr"
                maxLength={OTP_LENGTH}
                className={
                  inputClass(!!error) +
                  ' text-center text-lg font-bold tracking-[0.4em]'
                }
                aria-invalid={!!error}
              />
              <FieldError message={error} />
              <p className="mt-2 rounded-lg border border-primary/20 bg-primary/[0.06] px-3 py-2 text-[11px] leading-6 text-text/85">
                <span className="font-bold text-primary">تست:</span> کد نمایشی{' '}
                <span dir="ltr" className="font-mono font-bold text-primary">
                  {DEMO_OTP}
                </span>{' '}
                را وارد کنید.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || loading}
                className="font-bold text-secondary transition hover:text-secondary/80 disabled:cursor-not-allowed disabled:text-muted"
              >
                {countdown > 0
                  ? `ارسال مجدد در ${formatCountdown(countdown)}`
                  : 'ارسال مجدد کد'}
              </button>
              <button
                type="button"
                onClick={handleChangePhone}
                disabled={loading}
                className="flex items-center gap-1 text-muted transition hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowRight size={11} /> تغییر شماره
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-muted transition hover:border-white/30 hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
              >
                لغو
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== OTP_LENGTH}
                className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-xs font-extrabold text-bg transition hover:shadow-[0_0_24px_rgba(255,149,0,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={13} />
                )}
                {loading ? 'در حال تأیید...' : 'تأیید و ثبت'}
              </button>
            </div>
          </form>
        )}

        {/* ---------- Step: done ---------- */}
        {step === 'done' && (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center py-6 text-center"
          >
            <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-8px_rgba(34,197,94,0.6)]">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-sm font-bold text-text">شمارهٔ جدید ثبت شد</p>
            <p className="mt-1 text-xs text-muted" dir="ltr">
              {phone}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}