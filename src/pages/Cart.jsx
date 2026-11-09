// src/pages/Cart.jsx
import { useState } from 'react'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  X,
  Sparkles,
} from 'lucide-react'
import Img from '../components/Img'
import { products } from '../data'
import {Link} from "react-router-dom"
const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'

const COUPONS = {
  SOLAR10: { type: 'percent', value: 10, label: '۱۰٪ تخفیف' },
  WELCOME: { type: 'fixed', value: 500_000, label: '۵۰۰ هزار تومان تخفیف' },
}

/* ---------- دادهٔ استاتیک سبد خرید ---------- */
const initialCart = [
  { ...products[0], qty: 1 },
  { ...products[1], qty: 2 },
  { ...products[3], qty: 1 },
]

export default function Cart() {
  const [cart, setCart] = useState(initialCart)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.final_price * i.qty, 0)
  const originalTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const totalDiscount = originalTotal - subtotal

  const shipping = subtotal === 0 || subtotal >= 30_000_000 ? 0 : 450_000
  const couponDiscount = !appliedCoupon
    ? 0
    : appliedCoupon.type === 'percent'
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, subtotal)
  const finalTotal = Math.max(subtotal - couponDiscount + shipping, 0)

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }
  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setCart([])

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (COUPONS[code]) {
      setAppliedCoupon({ ...COUPONS[code], code })
      setCouponError('')
    } else {
      setAppliedCoupon(null)
      setCouponError('کد تخفیف معتبر نیست')
    }
  }
  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  /* -------- Empty State -------- */
  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
        <div className="glass mx-auto flex max-w-xl flex-col items-center rounded-3xl p-10 text-center">
          <div className="animate-float mb-5 grid size-20 place-items-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag size={36} />
          </div>
          <h1 className="mb-2 text-2xl font-extrabold">سبد خرید شما خالی است</h1>
          <p className="mb-6 text-sm text-muted">
            هنوز محصولی به سبد اضافه نکرده‌اید. از فروشگاه دیدن کنید.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
          >
            <Sparkles size={18} />
            مشاهده محصولات
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
            <span className="h-px w-8 bg-primary" /> سبد خرید شما
          </div>
          <h1 className="text-2xl font-extrabold md:text-3xl">
            سبد <span className="text-gradient-primary">خرید</span>
            <span className="ms-2 text-sm font-normal text-muted">
              ({totalQty.toLocaleString('fa-IR')} مورد)
            </span>
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted transition hover:border-red-500/50 hover:text-red-400"
        >
          <Trash2 size={14} /> خالی کردن سبد
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* -------- Items -------- */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="glass flex flex-col gap-4 rounded-2xl p-4 transition hover:border-primary/40 sm:flex-row sm:items-center"
            >
              <div className="relative shrink-0 overflow-hidden rounded-xl sm:w-28">
                <Img
                  src={item.main_image}
                  alt={item.title}
                  className="h-28 w-full object-cover sm:h-24"
                />
                {item.discount_percent > 0 && (
                  <span className="absolute start-1 top-1 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {item.discount_percent.toLocaleString('fa-IR')}٪
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="mb-1 truncate text-sm font-bold text-text">
                  {item.title}
                </h3>
                <div className="mb-3 flex items-center gap-2 text-xs text-muted">
                  <Tag size={12} className="text-primary" />
                  <span dir="ltr" className="truncate">
                    کد: {item.slug}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-bg/50 p-1">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-text disabled:opacity-30"
                      aria-label="کاهش تعداد"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.qty.toLocaleString('fa-IR')}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-text"
                      aria-label="افزایش تعداد"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-end">
                    <div className="text-sm font-extrabold text-primary">
                      {formatPrice(item.final_price * item.qty)}
                    </div>
                    {item.discount_percent > 0 && (
                      <div className="text-xs text-muted line-through">
                        {formatPrice(item.price * item.qty)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="grid size-9 place-items-center rounded-lg text-muted transition hover:bg-red-500/10 hover:text-red-400"
                    aria-label="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}

          <a
            href="/products"
            className="flex w-fit items-center gap-2 text-sm text-primary transition hover:gap-3"
          >
            <ArrowLeft size={16} /> ادامه خرید
          </a>
        </div>

        {/* -------- Summary -------- */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              <ShieldCheck size={18} className="text-primary" /> خلاصه سفارش
            </h2>

            <div className="mb-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-muted">
                <span>قیمت محصولات</span>
                <span className="text-text">{formatPrice(originalTotal)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex items-center justify-between text-red-400">
                  <span>تخفیف محصولات</span>
                  <span>- {formatPrice(totalDiscount)}</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-red-400">
                  <span>کد تخفیف ({appliedCoupon.code})</span>
                  <span>- {formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-muted">
                <span>هزینه ارسال</span>
                <span
                  className={shipping === 0 ? 'font-bold text-success' : 'text-text'}
                >
                  {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="mb-4 h-px bg-border" />

            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-muted">مبلغ قابل پرداخت</span>
              <span className="text-lg font-extrabold text-primary">
                {formatPrice(finalTotal)}
              </span>
            </div>

            {/* Coupon */}
            <div className="mb-4">
              <label
                htmlFor="coupon"
                className="mb-2 block text-xs font-medium text-muted"
              >
                کد تخفیف
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Tag size={14} className="text-success" />
                    <span className="font-bold text-success">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-muted">({appliedCoupon.label})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-muted transition hover:text-red-400"
                    aria-label="حذف کد تخفیف"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="coupon"
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value)
                      setCouponError('')
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                    placeholder="مثلاً SOLAR10"
                    className="flex-1 rounded-xl border border-border bg-bg/50 px-3 py-2 text-sm text-text outline-none transition placeholder:text-muted/60 focus:border-primary"
                    dir="ltr"
                  />
                  <button
                    onClick={applyCoupon}
                    className="rounded-xl border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-bg"
                  >
                    اعمال
                  </button>
                </div>
              )}
              {couponError && (
                <p className="mt-1.5 text-xs text-red-400">{couponError}</p>
              )}
            </div>

            <Link
              to="/checkout"
              className="block w-full rounded-xl bg-gradient-primary py-3.5 text-center text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
            >
              ادامه فرآیند خرید
            </Link>

            <div className="mt-4 space-y-2 text-xs text-muted">
              <p className="flex items-center gap-2">
                <Truck size={14} className="text-primary" />
                {subtotal >= 30_000_000
                  ? 'ارسال رایگان فعال است'
                  : 'ارسال رایگان برای خرید بالای ۳۰ میلیون تومان'}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                ضمانت اصالت کالا و پرداخت امن
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}