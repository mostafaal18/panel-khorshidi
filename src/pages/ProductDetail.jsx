// src/pages/ProductDetail.jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Home,
  ArrowRight,
  Tag,
  Award,
  Clock,
} from 'lucide-react'
import ImageGallery from '../components/ImageGallery'
import { products } from '../data'

const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'

function getSpecs(p) {
  const specsMap = {
    1: [
      { label: 'توان نامی', value: '۵۵۰ وات' },
      { label: 'نوع سلول', value: 'مونوکریستال' },
      { label: 'ولتاژ نامی', value: '۴۱.۸ ولت' },
      { label: 'جریان نامی', value: '۱۳.۱۵ آمپر' },
      { label: 'راندمان', value: '۲۱.۳٪' },
      { label: 'ابعاد', value: '۲۲۷۹ × ۱۱۳۴ × ۳۵ میلی‌متر' },
      { label: 'وزن', value: '۲۸.۵ کیلوگرم' },
      { label: 'گارانتی', value: '۲۵ سال' },
    ],
    2: [
      { label: 'توان خروجی', value: '۵۰۰۰ وات' },
      { label: 'نوع', value: 'هیبرید' },
      { label: 'ولتاژ ورودی DC', value: '۹۰ – ۴۵۰ ولت' },
      { label: 'ولتاژ خروجی AC', value: '۲۳۰ ولت' },
      { label: 'فرکانس', value: '۵۰ هرتز' },
      { label: 'راندمان', value: '۹۸٪' },
      { label: 'گارانتی', value: '۵ سال' },
    ],
    3: [
      { label: 'ظرفیت', value: '۲۰۰ آمپر ساعت' },
      { label: 'نوع', value: 'لیتیوم یون (LiFePO4)' },
      { label: 'ولتاژ', value: '۱۲ ولت' },
      { label: 'عمر چرخه', value: 'بیش از ۶۰۰۰ چرخه' },
      { label: 'گارانتی', value: '۵ سال' },
    ],
    4: [
      { label: 'جریان نامی', value: '۶۰ آمپر' },
      { label: 'نوع', value: 'MPPT' },
      { label: 'ولتاژ ورودی', value: 'تا ۱۵۰ ولت' },
      { label: 'ولتاژ باتری', value: '۱۲ / ۲۴ / ۴۸ ولت' },
      { label: 'گارانتی', value: '۲ سال' },
    ],
    5: [
      { label: 'جنس', value: 'آلومینیوم آندایز' },
      { label: 'زاویه قابل تنظیم', value: '۱۵ – ۶۰ درجه' },
      { label: 'تحمل وزن', value: 'تا ۵۰ کیلوگرم' },
      { label: 'مقاومت', value: 'تا باد ۱۵۰ کیلومتر بر ساعت' },
      { label: 'گارانتی', value: '۱۰ سال' },
    ],
    6: [
      { label: 'سطح مقطع', value: '۶ میلی‌متر مربع' },
      { label: 'ولتاژ نامی', value: '۱۵۰۰ ولت DC' },
      { label: 'مقاومت UV', value: 'دارد' },
      { label: 'دمای کارکرد', value: '۴۰- تا ۹۰+ درجه' },
      { label: 'استاندارد', value: 'TÜV / IEC' },
    ],
  }
  return (
    specsMap[p.id] || [
      { label: 'برند', value: 'SunTech' },
      { label: 'کد محصول', value: p.slug },
      { label: 'گارانتی', value: '۲۵ سال' },
    ]
  )
}

function getDescription(p) {
  return `این محصول از سری محصولات باکیفیت SunTech است که با رعایت بالاترین استانداردهای بین‌المللی طراحی و تولید شده است. ${p.title} با تکنولوژی روز دنیا و بهره‌گیری از متریال درجه یک، عملکردی پایدار و طولانی‌مدت را در سخت‌ترین شرایط آب‌وهوایی برای شما فراهم می‌کند.

تمامی محصولات SunTech با گارانتی رسمی و خدمات پس از فروش گسترده در سراسر کشور عرضه می‌شوند و تیم فنی ما آماده ارائه مشاوره تخصصی برای انتخاب بهترین گزینه متناسب با نیاز شماست.`
}

function getFeatures() {
  return [
    'طراحی و ساخت با متریال درجه یک و مقاوم',
    'تست کیفیت تحت استانداردهای بین‌المللی',
    'عملکرد پایدار در شرایط سخت آب‌وهوایی',
    'پشتیبانی فنی و مشاوره تخصصی رایگان',
    'ارسال سریع و ایمن به سراسر کشور',
  ]
}

function Stars({ value = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(value) ? 'fill-accent text-accent' : 'text-muted/40'
          }
        />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const [tab, setTab] = useState('specs')
  const [liked, setLiked] = useState(false)
  const [cartQty, setCartQty] = useState(0)

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
        <div className="mx-auto max-w-xl rounded-3xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="rounded-[calc(1.5rem-1px)] bg-bg/85 p-10 text-center backdrop-blur-2xl">
            <h1 className="mb-2 text-2xl font-extrabold">محصول یافت نشد</h1>
            <p className="mb-6 text-sm text-muted">
              محصولی با این شناسه در فروشگاه وجود ندارد.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.55)]"
            >
              <ArrowRight size={16} /> بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const gallery =
    product.images?.length > 1
      ? product.images.map((i) => i.url)
      : [product.main_image]

  const specs = getSpecs(product)
  const description = getDescription(product)
  const features = getFeatures()
  const rating = product.rating ?? 4.7
  const reviewCount = product.review_count ?? 38
  const stock = product.stock ?? 8

  const addToCart = () => setCartQty(1)
  const incQty = () => setCartQty((q) => Math.min(stock, q + 1))
  const decQty = () => setCartQty((q) => Math.max(0, q - 1))

  const TABS = [
    { id: 'specs', label: 'مشخصات فنی' },
    { id: 'desc', label: 'توضیحات' },
    { id: 'reviews', label: `نظرات (${reviewCount.toLocaleString('fa-IR')})` },
  ]

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-28">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link
          to="/"
          className="flex items-center gap-1 transition hover:text-secondary"
        >
          <Home size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <Link to="/products" className="transition hover:text-secondary">
          محصولات
        </Link>
        <ChevronLeft size={12} />
        <span className="truncate text-text">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ---------- Gallery (shared component) ---------- */}
        <ImageGallery
          images={gallery}
          alt={product.title}
          badge={
            product.discount_percent > 0 && (
              <span className="rounded-lg bg-gradient-primary px-2.5 py-1 text-xs font-bold text-bg shadow-[0_0_18px_rgba(255,149,0,0.55)]">
                {product.discount_percent.toLocaleString('fa-IR')}٪ تخفیف
              </span>
            )
          }
          extraBadge={
            stock > 0 && (
              <span className="rounded-lg border border-secondary/40 bg-secondary/15 px-2.5 py-1 text-xs font-bold text-secondary backdrop-blur-sm">
                موجود در انبار
              </span>
            )
          }
        />

        {/* ---------- Info ---------- */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-muted">
              <Tag size={11} className="text-secondary" />
              <span dir="ltr" className="font-mono text-secondary">
                {product.slug}
              </span>
            </div>
            <h1 className="mb-3 text-2xl font-extrabold leading-tight md:text-3xl">
              {product.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <Stars value={rating} />
                <span className="text-xs text-muted">
                  {rating.toLocaleString('fa-IR')} (
                  {reviewCount.toLocaleString('fa-IR')} نظر)
                </span>
              </div>
              <span className="text-muted">•</span>
              <span className="text-xs text-muted">
                {stock.toLocaleString('fa-IR')} عدد در انبار
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="rounded-[calc(1rem-1px)] bg-bg/85 p-4 backdrop-blur-2xl">
              {product.discount_percent > 0 && (
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm text-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="rounded-md bg-secondary/15 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                    {product.discount_percent.toLocaleString('fa-IR')}٪
                  </span>
                </div>
              )}
              <div className="text-2xl font-extrabold text-primary">
                {formatPrice(product.final_price)}
              </div>
            </div>
          </div>

          {/* CTA / Stepper */}
          <div className="flex items-center gap-3">
            {cartQty === 0 ? (
              <button
                onClick={addToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 text-sm font-bold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]"
              >
                <ShoppingCart size={18} /> افزودن به سبد خرید
              </button>
            ) : (
              <div
                dir="ltr"
                className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-secondary/40 bg-secondary/10 p-1.5"
              >
                <button
                  onClick={decQty}
                  className="grid size-9 place-items-center rounded-lg text-secondary transition hover:bg-secondary hover:text-bg"
                  aria-label="کاهش تعداد"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-8 text-center text-base font-bold text-secondary">
                  {cartQty.toLocaleString('fa-IR')}
                </span>
                <button
                  onClick={incQty}
                  disabled={cartQty >= stock}
                  className="grid size-9 place-items-center rounded-lg text-secondary transition hover:bg-secondary hover:text-bg disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="افزایش تعداد"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            <button
              onClick={() => setLiked((v) => !v)}
              className={`grid size-12 shrink-0 place-items-center rounded-xl border transition ${
                liked
                  ? 'border-red-500/50 bg-red-500/10 text-red-400'
                  : 'border-white/15 bg-white/[0.03] text-muted hover:border-red-500/40 hover:text-red-400'
              }`}
              aria-label="افزودن به علاقه‌مندی"
            >
              <Heart size={18} className={liked ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-3 gap-2 rounded-[calc(1rem-1px)] bg-bg/85 p-3 text-center backdrop-blur-2xl">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-secondary" />
                <span className="text-[11px] text-muted">ضمانت اصالت</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={18} className="text-primary" />
                <span className="text-[11px] text-muted">ارسال سریع</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw size={18} className="text-secondary" />
                <span className="text-[11px] text-muted">۷ روز ضمانت</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2 text-sm">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-secondary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="mb-5 rounded-xl bg-linear-to-r from-primary via-white/15 to-secondary p-px">
          <div className="flex items-center gap-1 rounded-[calc(0.75rem-1px)] bg-bg/85 p-1 backdrop-blur-2xl">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                  tab === t.id
                    ? 'bg-primary text-bg shadow-[0_0_16px_rgba(255,149,0,0.4)]'
                    : 'text-muted hover:text-secondary'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="rounded-[calc(1rem-1px)] bg-bg/85 p-5 backdrop-blur-2xl md:p-7">
            {tab === 'specs' && (
              <div className="grid gap-2 sm:grid-cols-2">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg border border-secondary/15 px-4 py-3 text-sm"
                  >
                    <span className="text-muted">{s.label}</span>
                    <span className="font-bold text-text">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'desc' && (
              <div className="whitespace-pre-line text-sm leading-7 text-muted">
                {description}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="flex flex-col items-center py-6 text-center">
                <Stars value={rating} size={22} />
                <div className="mt-3 text-2xl font-extrabold">
                  {rating.toLocaleString('fa-IR')} از ۵
                </div>
                <p className="mb-5 text-xs text-muted">
                  میانگین از {reviewCount.toLocaleString('fa-IR')} نظر ثبت‌شده
                </p>
                <button className="rounded-xl border border-secondary/40 bg-secondary/10 px-5 py-2.5 text-xs font-bold text-secondary transition hover:bg-secondary hover:text-bg">
                  ثبت نظر شما
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust row */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: Award, title: 'گارانتی اصالت کالا', desc: 'با ضمانت رسمی SunTech' },
          { icon: Truck, title: 'ارسال سریع و ایمن', desc: 'به سراسر کشور' },
          { icon: Clock, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="rounded-2xl bg-linear-to-r from-primary via-white/15 to-secondary p-px shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-3 rounded-[calc(1rem-1px)] bg-bg/85 p-4 backdrop-blur-2xl">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-text">{item.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{item.desc}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}