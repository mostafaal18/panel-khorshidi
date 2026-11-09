// src/pages/Checkout.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle, CheckCircle2, ChevronLeft, Home as HomeIcon,
  MapPin, User, Phone, Mail, Building2, Truck, Zap, CreditCard,
  Wallet, Banknote, ShieldCheck, Lock, Tag, Send, Loader2,
  ArrowRight, ArrowLeft, Package, Clock, X, FileText,
  CalendarDays, Download, MessageSquare, Info, Save,
} from 'lucide-react'
import Img from '../components/Img'
import { products } from '../data'

/* ============================================================ */
/* Constants                                                     */
/* ============================================================ */

const STORAGE_KEY = 'suntech:checkout:v1'
const FREE_SHIPPING_THRESHOLD = 30_000_000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^09\d{9}$/
const POSTAL_REGEX = /^\d{10}$/

const CART = [
  { ...products[0], qty: 2 },
  { ...products[1], qty: 1 },
  { ...products[3], qty: 1 },
]

const SHIPPING_METHODS = [
  { id: 'standard', title: 'ارسال استاندارد', desc: '۲ تا ۴ روز کاری', price: 250_000, icon: Truck, badge: 'اقتصادی' },
  { id: 'express', title: 'ارسال سریع', desc: '۲۴ ساعته (تهران و کرج)', price: 450_000, icon: Zap, badge: 'سریع‌ترین' },
  { id: 'pickup', title: 'تحویل حضوری', desc: 'از دفتر مرکزی (تهران)', price: 0, icon: Building2 },
]

const PAYMENT_METHODS = [
  { id: 'gateway', title: 'درگاه پرداخت آنلاین', desc: 'پرداخت امن با تمام کارت‌های بانکی', icon: CreditCard, cards: ['visa', 'master', 'shetab'] },
  { id: 'wallet', title: 'کیف پول SunTech', desc: 'موجودی فعلی: ۰ تومان', icon: Wallet, disabled: true },
  { id: 'cod', title: 'پرداخت در محل', desc: 'فقط برای تهران و کرج', icon: Banknote },
]

const COUPONS = {
  SOLAR10: { type: 'percent', value: 10, label: '۱۰٪ تخفیف' },
  WELCOME: { type: 'fixed', value: 500_000, label: '۵۰۰ هزار تومان تخفیف' },
  SUN200: { type: 'fixed', value: 200_000, label: '۲۰۰ هزار تومان تخفیف' },
}

const STEPS = [
  { id: 1, label: 'اطلاعات و آدرس' },
  { id: 2, label: 'ارسال و پرداخت' },
  { id: 3, label: 'تایید نهایی' },
]

const EMPTY_FORM = {
  firstName: '', lastName: '', phone: '', email: '',
  province: '', city: '', postalCode: '', address: '',
  note: '', terms: false, website: '',
}

/* ============================================================ */
/* Helpers                                                       */
/* ============================================================ */

const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'
const formatNumber = (n) => n.toLocaleString('fa-IR')

function inputClass(hasError, extra = '') {
  return [
    'w-full rounded-xl border bg-white/[0.04] py-2.5 text-sm text-text',
    'placeholder:text-muted/50 outline-none transition duration-200',
    'focus:bg-white/[0.07] focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
    hasError
      ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/15'
      : 'border-white/20 hover:border-white/35 focus:border-secondary focus:ring-secondary/20',
    extra,
  ].join(' ')
}

function loadForm() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { form: EMPTY_FORM, shipping: 'standard', payment: 'gateway' }
    const data = JSON.parse(raw)
    return {
      form: { ...EMPTY_FORM, ...data.form },
      shipping: data.shipping || 'standard',
      payment: data.payment || 'gateway',
    }
  } catch {
    return { form: EMPTY_FORM, shipping: 'standard', payment: 'gateway' }
  }
}

function validateField(name, value, form, shipping) {
  switch (name) {
    case 'firstName':
      if (!value.trim()) return 'نام الزامی است'
      if (value.trim().length < 2) return 'نام باید حداقل ۲ کاراکتر باشد'
      return ''
    case 'lastName':
      if (!value.trim()) return 'نام خانوادگی الزامی است'
      if (value.trim().length < 2) return 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'
      return ''
    case 'phone':
      if (!value.trim()) return 'شماره موبایل الزامی است'
      if (!PHONE_REGEX.test(value.trim())) return 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد'
      return ''
    case 'email':
      if (value.trim() && !EMAIL_REGEX.test(value.trim())) return 'فرمت ایمیل صحیح نیست'
      return ''
    case 'province':
      if (shipping === 'pickup') return ''
      if (!value.trim()) return 'استان الزامی است'
      return ''
    case 'city':
      if (shipping === 'pickup') return ''
      if (!value.trim()) return 'شهر الزامی است'
      return ''
    case 'postalCode':
      if (shipping === 'pickup') return ''
      if (!value.trim()) return 'کد پستی الزامی است'
      if (!POSTAL_REGEX.test(value.trim())) return 'کد پستی باید ۱۰ رقم باشد'
      return ''
    case 'address':
      if (shipping === 'pickup') return ''
      if (!value.trim()) return 'آدرس الزامی است'
      if (value.trim().length < 10) return 'آدرس باید حداقل ۱۰ کاراکتر باشد'
      return ''
    case 'terms':
      if (!value) return 'پذیرش قوانین الزامی است'
      return ''
    default:
      return ''
  }
}

function validateStep(step, form, shipping) {
  const errors = {}
  const fields = step === 1
    ? ['firstName', 'lastName', 'phone', 'email', 'province', 'city', 'postalCode', 'address']
    : step === 2
      ? []
      : ['terms']
  fields.forEach((name) => {
    const error = validateField(name, form[name], form, shipping)
    if (error) errors[name] = error
  })
  return errors
}

/* ============================================================ */
/* Sub-components                                                */
/* ============================================================ */

function FieldError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-300">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  )
}

function Label({ htmlFor, required, optional, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center justify-between text-xs font-semibold text-text/80">
      <span>
        {children}
        {required && <span className="mr-1 text-red-400">*</span>}
        {optional && <span className="mr-1 text-[10px] font-normal text-muted/70">(اختیاری)</span>}
      </span>
    </label>
  )
}

function Field({ id, label, required, optional, error, icon: Icon, className = '', children }) {
  return (
    <div data-error={!!error} className={className}>
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <div className={Icon ? 'relative' : ''}>
        {Icon && (
          <Icon size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
        )}
        {children}
      </div>
      <FieldError message={error} />
    </div>
  )
}

function Section({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold text-text">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[11px] leading-5 text-muted">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function OptionCard({ checked, onChange, icon: Icon, title, desc, extra, disabled, badge }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-start transition ${
        disabled
          ? 'cursor-not-allowed border-white/10 bg-white/[0.01] opacity-50'
          : checked
            ? 'border-primary bg-primary/10 shadow-[0_0_20px_-8px_rgba(255,149,0,0.4)]'
            : 'border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]'
      }`}
    >
      <div className={`grid size-10 shrink-0 place-items-center rounded-lg transition ${
        checked && !disabled ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted'
      }`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-bold ${checked && !disabled ? 'text-primary' : 'text-text'}`}>
            {title}
          </span>
          {badge && (
            <span className="rounded-full bg-secondary/15 px-1.5 py-0.5 text-[9px] font-bold text-secondary">
              {badge}
            </span>
          )}
        </div>
        <div className="text-[11px] text-muted">{desc}</div>
      </div>
      {extra ? (
        <div className="shrink-0">{extra}</div>
      ) : (
        <div className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${
          checked && !disabled ? 'border-primary bg-primary' : 'border-white/30'
        }`}>
          {checked && !disabled && <CheckCircle2 size={12} className="text-bg" />}
        </div>
      )}
    </button>
  )
}

function Stepper({ current, onStepClick }) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max items-center gap-2">
        {STEPS.map((step, i) => {
          const isDone = step.id < current
          const isActive = step.id === current
          return (
            <div key={step.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => isDone && onStepClick(step.id)}
                disabled={!isDone}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  isDone
                    ? 'cursor-pointer border-success/40 bg-success/10 text-success hover:bg-success/15'
                    : isActive
                      ? 'cursor-default border-primary bg-primary/15 text-primary'
                      : 'cursor-not-allowed border-white/15 bg-white/[0.03] text-muted'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <span className={`grid size-4 place-items-center rounded-full text-[9px] ${
                    isActive ? 'bg-primary text-bg' : 'bg-white/10 text-muted'
                  }`}>
                    {formatNumber(step.id)}
                  </span>
                )}
                {step.label}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-6 transition sm:w-10 ${isDone ? 'bg-success/40' : 'bg-white/10'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = 'text-text', className = '', small }) {
  return (
    <div className={`flex items-center justify-between ${small ? 'text-xs' : 'text-sm'}`}>
      <span className={`text-muted ${className}`}>{label}</span>
      <span className={`font-bold ${valueClass}`}>{value}</span>
    </div>
  )
}

/* ============================================================ */
/* Main                                                          */
/* ============================================================ */

export default function Checkout() {
  const initialState = useRef(loadForm()).current

  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialState.form)
  const [shipping, setShipping] = useState(initialState.shipping)
  const [payment, setPayment] = useState(initialState.payment)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(null)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  /* persist */
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ form, shipping, payment }))
    } catch {}
  }, [form, shipping, payment])

  /* totals */
  const totals = useMemo(() => {
    const subtotal = CART.reduce((s, i) => s + i.final_price * i.qty, 0)
    const originalTotal = CART.reduce((s, i) => s + i.price * i.qty, 0)
    const productDiscount = originalTotal - subtotal
    const baseShipping = SHIPPING_METHODS.find((m) => m.id === shipping)?.price || 0
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
    const shippingCost = isFreeShipping ? 0 : baseShipping
    const couponDiscount = !appliedCoupon
      ? 0
      : appliedCoupon.type === 'percent'
        ? Math.round((subtotal * appliedCoupon.value) / 100)
        : Math.min(appliedCoupon.value, subtotal)
    const finalTotal = Math.max(subtotal - couponDiscount + shippingCost, 0)
    const totalQty = CART.reduce((s, i) => s + i.qty, 0)
    return {
      subtotal, originalTotal, productDiscount, shippingCost,
      couponDiscount, finalTotal, totalQty, isFreeShipping,
      remainingForFree: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      freeShippingProgress: Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100),
    }
  }, [shipping, appliedCoupon])

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleBlur = (name) => {
    const error = validateField(name, form[name], form, shipping)
    if (error) setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const goNext = () => {
    const stepErrors = validateStep(step, form, shipping)
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }))
      setTimeout(() => {
        document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }
    setStep((s) => Math.min(STEPS.length, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (!code) return
    if (COUPONS[code]) {
      setAppliedCoupon({ ...COUPONS[code], code })
      setCouponError('')
      setCouponCode('')
    } else {
      setAppliedCoupon(null)
      setCouponError('کد تخفیف نامعتبر است')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError('')
    setCouponCode('')
  }

  const handleSubmit = async () => {
    if (form.website) return
    const allErrors = {
      ...validateStep(1, form, shipping),
      ...validateStep(3, form, shipping),
    }
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      setStep(1)
      return
    }
    setSending(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      setOrderPlaced({
        orderNumber: `ST-${Date.now().toString().slice(-8)}`,
        total: totals.finalTotal,
        payment,
        shipping,
        address: shipping === 'pickup' ? 'تحویل حضوری - دفتر مرکزی' : `${form.province}، ${form.city}، ${form.address}`,
        phone: form.phone,
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        itemsCount: totals.totalQty,
      })
      sessionStorage.removeItem(STORAGE_KEY)
    } finally {
      setSending(false)
    }
  }

  /* ============ SUCCESS ============ */
  if (orderPlaced) {
    return <SuccessPage order={orderPlaced} />
  }

  /* ============ EMPTY ============ */
  if (CART.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-28">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-white/15 bg-bg-secondary/50 p-10 text-center backdrop-blur-xl">
          <div className="mb-5 grid size-20 place-items-center rounded-full bg-primary/10 text-primary">
            <Package size={36} />
          </div>
          <h1 className="mb-2 text-2xl font-extrabold">سبد خرید شما خالی است</h1>
          <p className="mb-6 text-sm text-muted">برای تسویه حساب، ابتدا محصولی به سبد اضافه کنید.</p>
          <Link to="/products" className="rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]">
            مشاهدهٔ محصولات
          </Link>
        </div>
      </section>
    )
  }

  /* ============ FORM ============ */
  const firstErrorStep = Object.keys(errors).length > 0 ? step : null

  return (
    <section className="mx-auto max-w-7xl px-5 pb-32 pt-28 lg:pb-20">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="flex items-center gap-1 transition hover:text-secondary">
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <Link to="/cart" className="transition hover:text-secondary">سبد خرید</Link>
        <ChevronLeft size={12} />
        <span className="text-text">تسویه حساب</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
          <span className="h-px w-8 bg-primary" /> تکمیل سفارش
        </div>
        <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
          تسویه <span className="text-gradient-primary">حساب</span>
        </h1>
      </div>

      {/* Stepper */}
      <Stepper current={step} onStepClick={setStep} />

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <Section icon={User} title="اطلاعات تماس" subtitle="برای هماهنگی و ارسال سفارش با شما تماس می‌گیریم.">
                {/* honeypot */}
                <div aria-hidden className="sr-only">
                  <label>Website
                    <input type="text" tabIndex={-1} autoComplete="new-password"
                      value={form.website} onChange={(e) => setField('website', e.target.value)} />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="c-firstName" label="نام" required error={errors.firstName} icon={User}>
                    <input id="c-firstName" type="text" placeholder="نام" autoComplete="given-name"
                      value={form.firstName} onChange={(e) => setField('firstName', e.target.value)}
                      onBlur={() => handleBlur('firstName')} className={inputClass(!!errors.firstName, 'pr-10 pl-3')} />
                  </Field>

                  <Field id="c-lastName" label="نام خانوادگی" required error={errors.lastName}>
                    <input id="c-lastName" type="text" placeholder="نام خانوادگی" autoComplete="family-name"
                      value={form.lastName} onChange={(e) => setField('lastName', e.target.value)}
                      onBlur={() => handleBlur('lastName')} className={inputClass(!!errors.lastName, 'px-3')} />
                  </Field>

                  <Field id="c-phone" label="شماره موبایل" required error={errors.phone} icon={Phone}>
                    <input id="c-phone" type="tel" inputMode="numeric" placeholder="09xxxxxxxxx" dir="ltr"
                      autoComplete="tel" value={form.phone}
                      onChange={(e) => setField('phone', e.target.value.replace(/\D/g, '').slice(0, 11))}
                      onBlur={() => handleBlur('phone')} className={inputClass(!!errors.phone, 'pr-10 pl-3')} />
                  </Field>

                  <Field id="c-email" label="ایمیل" optional error={errors.email} icon={Mail}>
                    <input id="c-email" type="email" placeholder="example@mail.com" dir="ltr"
                      autoComplete="email" value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      onBlur={() => handleBlur('email')} className={inputClass(!!errors.email, 'pr-10 pl-3')} />
                  </Field>
                </div>
              </Section>

              <Section icon={MapPin} title="آدرس تحویل"
                subtitle={shipping === 'pickup' ? 'چون تحویل حضوری انتخاب شده، آدرس لازم نیست.' : 'این آدرس برای ارسال سفارش استفاده می‌شود.'}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="c-province" label="استان" required={shipping !== 'pickup'} error={errors.province}>
                    <input id="c-province" type="text" placeholder="مثلاً تهران" autoComplete="address-level1"
                      value={form.province} disabled={shipping === 'pickup'}
                      onChange={(e) => setField('province', e.target.value)}
                      onBlur={() => handleBlur('province')} className={inputClass(!!errors.province, 'px-3')} />
                  </Field>

                  <Field id="c-city" label="شهر" required={shipping !== 'pickup'} error={errors.city}>
                    <input id="c-city" type="text" placeholder="مثلاً تهران" autoComplete="address-level2"
                      value={form.city} disabled={shipping === 'pickup'}
                      onChange={(e) => setField('city', e.target.value)}
                      onBlur={() => handleBlur('city')} className={inputClass(!!errors.city, 'px-3')} />
                  </Field>

                  {shipping !== 'pickup' && (
                    <>
                      <Field id="c-postalCode" label="کد پستی" required error={errors.postalCode}>
                        <input id="c-postalCode" type="text" inputMode="numeric" placeholder="۱۰ رقم" dir="ltr"
                          autoComplete="postal-code" value={form.postalCode}
                          onChange={(e) => setField('postalCode', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          onBlur={() => handleBlur('postalCode')} className={inputClass(!!errors.postalCode, 'px-3')} />
                      </Field>

                      <Field id="c-address" label="آدرس کامل" required error={errors.address} className="sm:col-span-2">
                        <textarea id="c-address" rows={3} placeholder="خیابان، کوچه، پلاک، واحد..."
                          autoComplete="street-address" value={form.address}
                          onChange={(e) => setField('address', e.target.value)}
                          onBlur={() => handleBlur('address')}
                          className={inputClass(!!errors.address, 'resize-none px-3.5 py-3 leading-7')} />
                      </Field>
                    </>
                  )}
                </div>
              </Section>
            </>
          )}

          {step === 2 && (
            <>
              <Section icon={Truck} title="روش ارسال" subtitle="روش ارسال مورد نظر خود را انتخاب کنید.">
                <div className="space-y-2">
                  {SHIPPING_METHODS.map((m) => {
                    const Icon = m.icon
                    const isFree = totals.subtotal >= FREE_SHIPPING_THRESHOLD && m.price > 0
                    return (
                      <OptionCard key={m.id} checked={shipping === m.id} onChange={() => setShipping(m.id)}
                        icon={Icon} title={m.title} desc={m.desc} badge={m.badge}
                        extra={<span className={`text-xs font-bold ${m.price === 0 || isFree ? 'text-success' : 'text-primary'}`}>
                          {m.price === 0 || isFree ? 'رایگان' : formatPrice(m.price)}
                        </span>} />
                    )
                  })}
                </div>
              </Section>

              <Section icon={CreditCard} title="روش پرداخت" subtitle="روش پرداخت خود را انتخاب کنید.">
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((m) => {
                    const Icon = m.icon
                    return (
                      <OptionCard key={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)}
                        icon={Icon} title={m.title} desc={m.desc} disabled={m.disabled} />
                    )
                  })}
                </div>
              </Section>

              <Section icon={Send} title="یادداشت سفارش" subtitle="اگر توضیح خاصی برای سفارش دارید اینجا بنویسید.">
                <textarea rows={3} placeholder="اختیاری..."
                  value={form.note} onChange={(e) => setField('note', e.target.value)}
                  className={inputClass(false, 'resize-none px-3.5 py-3 leading-7')} />
              </Section>
            </>
          )}

          {step === 3 && (
            <>
              <Section icon={FileText} title="تایید اطلاعات" subtitle="اطلاعات خود را یک‌بار دیگر بررسی کنید.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ReviewRow label="نام و نام خانوادگی" value={`${form.firstName} ${form.lastName}`} onEdit={() => setStep(1)} />
                  <ReviewRow label="شماره موبایل" value={form.phone} dir="ltr" onEdit={() => setStep(1)} />
                  {form.email && <ReviewRow label="ایمیل" value={form.email} dir="ltr" onEdit={() => setStep(1)} />}
                  <ReviewRow label="روش ارسال" value={SHIPPING_METHODS.find((m) => m.id === shipping)?.title} onEdit={() => setStep(2)} />
                  {shipping !== 'pickup' && (
                    <ReviewRow label="آدرس" value={`${form.province}، ${form.city}، ${form.address}`} onEdit={() => setStep(1)} className="sm:col-span-2" />
                  )}
                  <ReviewRow label="روش پرداخت" value={PAYMENT_METHODS.find((m) => m.id === payment)?.title} onEdit={() => setStep(2)} />
                </div>
              </Section>

              <Section icon={ShieldCheck} title="قوانین و شرایط" subtitle="لطفاً قوانین را مطالعه و تایید کنید.">
                <div data-error={!!errors.terms}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/15 bg-white/[0.02] p-3 text-xs leading-6 text-text/90 transition hover:border-white/25">
                    <input type="checkbox" checked={form.terms}
                      onChange={(e) => {
                        setField('terms', e.target.checked)
                        if (e.target.checked) setErrors((p) => ({ ...p, terms: undefined }))
                      }}
                      className="mt-1 size-3.5 shrink-0 cursor-pointer accent-primary" />
                    <span>
                      قوانین و شرایط فروش SunTech را مطالعه کرده و می‌پذیرم. همچنین با
                      دریافت سفارش و پرداخت، تمامی شرایط از جمله سیاست بازگشت ۷ روزه را پذیرفته‌ام.
                    </span>
                  </label>
                  <FieldError message={errors.terms} />
                </div>
              </Section>
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-bg-secondary/40 p-3 backdrop-blur-xl">
            {step > 1 && (
              <button type="button" onClick={goBack}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-text transition hover:border-white/35 hover:bg-white/[0.08]">
                <ArrowRight size={16} /> مرحله قبل
              </button>
            )}
            <div className="ms-auto flex items-center gap-2">
              <span className="hidden text-xs text-muted sm:inline">
                مرحله {formatNumber(step)} از {formatNumber(STEPS.length)}
              </span>
              {step < STEPS.length ? (
                <button type="button" onClick={goNext}
                  className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]">
                  مرحله بعد <ArrowLeft size={16} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={sending}
                  className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60">
                  {sending ? (<><Loader2 size={16} className="animate-spin" /> در حال ثبت...</>) : (<><Lock size={16} /> پرداخت و ثبت سفارش</>)}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-white/20 bg-bg-secondary/50 p-5 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center justify-between text-base font-extrabold text-text">
              <span className="flex items-center gap-2">
                <Package size={16} className="text-primary" /> خلاصهٔ سفارش
              </span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold text-muted">
                {formatNumber(totals.totalQty)} کالا
              </span>
            </h2>

            {/* Free shipping bar */}
            {totals.remainingForFree > 0 && shipping !== 'pickup' && (
              <div className="mb-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-3 text-[11px] leading-6 text-text/90">
                <div className="mb-2 flex items-center justify-between">
                  <span>
                    <span className="font-bold text-primary">{formatPrice(totals.remainingForFree)}</span>{' '}
                    تا ارسال رایگان
                  </span>
                  <Truck size={14} className="text-primary" />
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-primary transition-all"
                    style={{ width: `${totals.freeShippingProgress}%` }} />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="mb-4 max-h-[260px] space-y-2.5 overflow-y-auto pe-1">
              {CART.map((item) => (
                <div key={item.id} className="flex gap-2.5">
                  <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-bg/60">
                    <Img src={item.main_image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-xs font-bold text-text">{item.title}</div>
                    <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-muted">×{formatNumber(item.qty)}</span>
                      <span className="shrink-0 font-bold text-primary">{formatPrice(item.final_price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 h-px bg-white/10" />

            {/* Coupon */}
            <div className="mb-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Tag size={14} className="text-success" />
                    <span className="font-bold text-success">{appliedCoupon.code}</span>
                    <span className="text-muted">({appliedCoupon.label})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-muted transition hover:text-red-400" aria-label="حذف کد تخفیف">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input type="text" value={couponCode} onChange={(e) => { setCouponCode(e.target.value); setCouponError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), applyCoupon())}
                      placeholder="کد تخفیف" dir="ltr"
                      className={inputClass(!!couponError, 'px-3')} />
                    <button type="button" onClick={applyCoupon}
                      className="shrink-0 rounded-xl border border-primary/50 bg-primary/10 px-3 text-xs font-bold text-primary transition hover:bg-primary hover:text-bg">
                      اعمال
                    </button>
                  </div>
                  {couponError && <FieldError message={couponError} />}
                </div>
              )}
            </div>

            <div className="mb-4 h-px bg-white/10" />

            {/* Totals */}
            <div className="space-y-2">
              <Row label="قیمت محصولات" value={formatPrice(totals.originalTotal)} small />
              {totals.productDiscount > 0 && (
                <Row label="تخفیف محصولات" value={`− ${formatPrice(totals.productDiscount)}`} valueClass="text-red-400" small />
              )}
              {totals.couponDiscount > 0 && (
                <Row label="کد تخفیف" value={`− ${formatPrice(totals.couponDiscount)}`} valueClass="text-red-400" small />
              )}
              <Row label="هزینهٔ ارسال"
                value={totals.shippingCost === 0 ? 'رایگان' : formatPrice(totals.shippingCost)}
                valueClass={totals.shippingCost === 0 ? 'text-success' : 'text-text'} small />
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted">مبلغ قابل پرداخت</span>
              <span className="text-lg font-extrabold text-primary">{formatPrice(totals.finalTotal)}</span>
            </div>

            {/* Hidden submit for mobile sticky */}
            <button type="button" onClick={step === STEPS.length ? handleSubmit : goNext}
              disabled={sending}
              className="hidden w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60 lg:flex">
              {sending ? (<><Loader2 size={17} className="animate-spin" /> در حال ثبت...</>)
                : step === STEPS.length
                  ? (<><Lock size={16} /> پرداخت و ثبت سفارش</>)
                  : (<>ادامه <ArrowLeft size={16} /></>)}
            </button>

            <div className="mt-4 space-y-2 text-[11px] text-muted">
              <p className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-secondary" /> پرداخت امن و رمزنگاری‌شده</p>
              <p className="flex items-center gap-1.5"><Clock size={13} className="text-secondary" /> ارسال در سریع‌ترین زمان ممکن</p>
              <p className="flex items-center gap-1.5"><Tag size={13} className="text-secondary" /> ضمانت اصالت و بازگشت ۷ روزه</p>
            </div>

            <Link to="/cart" className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] py-2 text-[11px] font-medium text-muted transition hover:border-secondary/40 hover:text-secondary">
              <ArrowRight size={12} /> بازگشت به سبد خرید
            </Link>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bg-secondary/90 p-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-muted">مبلغ قابل پرداخت</div>
            <div className="text-sm font-extrabold text-primary">{formatPrice(totals.finalTotal)}</div>
          </div>
          <button type="button" onClick={step === STEPS.length ? handleSubmit : goNext}
            disabled={sending}
            className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition disabled:cursor-not-allowed disabled:opacity-60">
            {sending ? (<><Loader2 size={16} className="animate-spin" /> ...</>)
              : step === STEPS.length
                ? (<><Lock size={16} /> پرداخت</>)
                : (<>ادامه <ArrowLeft size={16} /></>)}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ */
/* Review row                                                    */
/* ============================================================ */
function ReviewRow({ label, value, onEdit, dir, className = '' }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.02] p-3 ${className}`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted">{label}</span>
        <button type="button" onClick={onEdit}
          className="text-[10px] font-bold text-secondary transition hover:text-primary">
          ویرایش
        </button>
      </div>
      <div className="text-xs font-bold text-text" dir={dir}>{value}</div>
    </div>
  )
}

/* ============================================================ */
/* Success page                                                  */
/* ============================================================ */
function SuccessPage({ order }) {
  const estimatedDelivery = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + (order.shipping === 'express' ? 1 : 3))
    return d.toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' })
  }, [order.shipping])

  return (
    <section className="mx-auto max-w-4xl px-5 pb-20 pt-28">
      <div className="relative overflow-hidden rounded-3xl border border-success/30 bg-bg-secondary/50 p-6 backdrop-blur-xl sm:p-10">
        <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-success/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-8px_rgba(34,197,94,0.6)]">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-text sm:text-3xl">
              سفارش شما با موفقیت ثبت شد
            </h1>
            <p className="mx-auto max-w-md text-sm leading-7 text-muted">
              از خرید شما سپاسگزاریم. جزئیات سفارش به شمارهٔ{' '}
              <span dir="ltr" className="font-bold text-text">{order.phone}</span>{' '}
              پیامک خواهد شد.
            </p>
          </div>

          {/* Order details */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted"><Package size={11} /> شمارهٔ سفارش</div>
              <div className="text-base font-extrabold text-primary" dir="ltr">{order.orderNumber}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted"><Wallet size={11} /> مبلغ پرداخت‌شده</div>
              <div className="text-base font-extrabold text-primary">{formatPrice(order.total)}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted"><CalendarDays size={11} /> زمان تحویل تقریبی</div>
              <div className="text-sm font-bold text-text">{estimatedDelivery}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted"><CreditCard size={11} /> روش پرداخت</div>
              <div className="text-sm font-bold text-text">{PAYMENT_METHODS.find((m) => m.id === order.payment)?.title}</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4 sm:col-span-2">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted"><MapPin size={11} /> آدرس تحویل</div>
              <div className="text-sm font-bold text-text">{order.address}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6 rounded-xl border border-white/15 bg-white/[0.02] p-4">
            <h3 className="mb-3 text-xs font-bold text-text">مراحل بعدی</h3>
            <ul className="space-y-2.5">
              {[
                { icon: MessageSquare, text: 'تایید سفارش و اطلاع‌رسانی از طریق پیامک', active: true },
                { icon: Package, text: 'آماده‌سازی و بسته‌بندی سفارش', active: false },
                { icon: Truck, text: 'ارسال و تحویل به آدرس شما', active: false },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className={`grid size-7 shrink-0 place-items-center rounded-full ${s.active ? 'bg-primary/15 text-primary' : 'bg-white/5 text-muted'}`}>
                    <s.icon size={13} />
                  </div>
                  <span className={`text-xs leading-7 ${s.active ? 'font-bold text-text' : 'text-muted'}`}>{s.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]">
              <HomeIcon size={16} /> بازگشت به خانه
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-6 py-3 text-sm font-bold text-text transition hover:border-secondary/50 hover:bg-white/[0.08]">
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}