// src/pages/Profile.jsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  User,
  Package,
  MapPin,
  Heart,
  Shield,
  LogOut,
  Camera,
  Phone,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Truck,
  Clock,
  CreditCard,
  Eye,
  Star,
  ShoppingBag,
  Wallet,
  Award,
  Lock,
  AlertCircle,
} from 'lucide-react'
import Img from '../components/Img'
import { products } from '../data'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'

const inputClass =
  'w-full rounded-xl border border-white/20 bg-white/[0.05] py-2.5 px-3.5 text-sm text-text placeholder:text-muted/60 outline-none transition hover:border-white/35 focus:border-secondary focus:bg-white/[0.08] focus:ring-4 focus:ring-secondary/20'

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */
const USER = {
  name: 'علی رضایی',
  email: 'ali.rezaei@example.com',
  phone: '09121234567',
  avatar: '/images/avatar-1.jpg',
  joinedAt: '۱۴۰۲/۰۳/۱۵',
  memberCode: 'ST-94821',
  points: 1250,
}

const ORDERS = [
  {
    id: 'ST-74839201',
    date: '۱۴۰۴/۰۸/۱۲',
    status: 'delivered',
    statusLabel: 'تحویل داده شد',
    total: 46_200_000,
    items: 3,
    itemsPreview: [products[0], products[1], products[3]],
  },
  {
    id: 'ST-74839102',
    date: '۱۴۰۴/۰۷/۲۸',
    status: 'shipping',
    statusLabel: 'در حال ارسال',
    total: 10_500_000,
    items: 1,
    itemsPreview: [products[0]],
  },
  {
    id: 'ST-74838201',
    date: '۱۴۰۴/۰۶/۰۵',
    status: 'pending',
    statusLabel: 'در انتظار پرداخت',
    total: 25_200_000,
    items: 1,
    itemsPreview: [products[1]],
  },
]

const ADDRESSES = [
  {
    id: 1,
    title: 'خانه',
    receiver: 'علی رضایی',
    phone: '09121234567',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    postalCode: '1234567890',
    isDefault: true,
  },
  {
    id: 2,
    title: 'محل کار',
    receiver: 'علی رضایی',
    phone: '09121234567',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان آزادی، برج تجاری آفتاب، طبقه ۷',
    postalCode: '1234567891',
    isDefault: false,
  },
]

const WISHLIST = [products[2], products[4], products[5]]

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */
const TABS = [
  { id: 'overview', label: 'نمای کلی', icon: User },
  { id: 'orders', label: 'سفارش‌ها', icon: Package },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
  { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
  { id: 'security', label: 'امنیت', icon: Shield },
]

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */
function FieldError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-300">
      <AlertCircle size={12} />
      {message}
    </p>
  )
}

function SectionCard({ title, subtitle, icon: Icon, action, children }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-5 backdrop-blur-xl sm:p-6">
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon size={18} />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-text">{title}</h2>
              {subtitle && (
                <p className="mt-0.5 text-[11px] leading-5 text-muted">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
  }
  return (
    <div className="rounded-xl border border-white/15 bg-bg-secondary/40 p-4 backdrop-blur-xl">
      <div className={`mb-3 grid size-10 place-items-center rounded-lg ${colorMap[color]}`}>
        <Icon size={18} />
      </div>
      <div className="text-lg font-extrabold text-text">{value}</div>
      <div className="mt-0.5 text-[11px] text-muted">{label}</div>
    </div>
  )
}

const statusStyles = {
  delivered: {
    label: 'تحویل داده شد',
    className: 'border-success/40 bg-success/10 text-success',
    icon: CheckCircle2,
  },
  shipping: {
    label: 'در حال ارسال',
    className: 'border-secondary/40 bg-secondary/10 text-secondary',
    icon: Truck,
  },
  pending: {
    label: 'در انتظار پرداخت',
    className: 'border-primary/40 bg-primary/10 text-primary',
    icon: Clock,
  },
}

/* ------------------------------------------------------------------ */
/* Tab: Overview                                                       */
/* ------------------------------------------------------------------ */
function OverviewTab({ user, onEdit, orders }) {
  const recentOrders = orders.slice(0, 2)
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Package} label="سفارش‌ها" value={orders.length.toLocaleString('fa-IR')} color="primary" />
        <StatCard icon={Wallet} label="کیف پول" value="۰ تومان" color="secondary" />
        <StatCard icon={Award} label="امتیاز" value={user.points.toLocaleString('fa-IR')} color="success" />
        <StatCard icon={Heart} label="علاقه‌مندی‌ها" value={WISHLIST.length.toLocaleString('fa-IR')} color="primary" />
      </div>

      {/* Account info */}
      <SectionCard
        title="اطلاعات حساب"
        icon={User}
        action={
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-muted transition hover:border-primary/40 hover:text-primary"
          >
            <Edit3 size={12} />
            ویرایش
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="grid size-9 place-items-center rounded-lg bg-white/5 text-muted">
              <Phone size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-muted">شماره موبایل</div>
              <div dir="ltr" className="text-sm font-bold text-text">
                {user.phone}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="grid size-9 place-items-center rounded-lg bg-white/5 text-muted">
              <Mail size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-muted">ایمیل</div>
              <div dir="ltr" className="truncate text-sm font-bold text-text">
                {user.email}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="grid size-9 place-items-center rounded-lg bg-white/5 text-muted">
              <Calendar size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-muted">تاریخ عضویت</div>
              <div className="text-sm font-bold text-text">{user.joinedAt}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Award size={14} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-muted">کد کاربری</div>
              <div dir="ltr" className="text-sm font-bold text-primary">
                {user.memberCode}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Recent orders */}
      <SectionCard
        title="سفارش‌های اخیر"
        icon={Package}
        action={
          <span className="text-[11px] text-muted">۲ سفارش آخر</span>
        }
      >
        <div className="space-y-3">
          {recentOrders.map((order) => {
            const s = statusStyles[order.status]
            const StatusIcon = s.icon
            return (
              <div
                key={order.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-white/20"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span dir="ltr" className="text-xs font-bold text-text">
                      {order.id}
                    </span>
                    <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${s.className}`}>
                      <StatusIcon size={10} />
                      {s.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted">{order.date}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex -space-x-2 space-x-reverse">
                    {order.itemsPreview.map((p, idx) => (
                      <div
                        key={idx}
                        className="size-8 overflow-hidden rounded-lg border-2 border-bg-secondary bg-bg/60"
                      >
                        <Img src={p.main_image} alt={p.title} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </SectionCard>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tab: Orders                                                         */
/* ------------------------------------------------------------------ */
function OrdersTab({ orders }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const s = statusStyles[order.status]
        const StatusIcon = s.icon
        return (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border border-white/15 bg-bg-secondary/40 backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span dir="ltr" className="text-sm font-extrabold text-text">
                  {order.id}
                </span>
                <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${s.className}`}>
                  <StatusIcon size={10} />
                  {s.label}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-muted">
                <Calendar size={11} />
                {order.date}
              </span>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {order.itemsPreview.map((p) => (
                  <div key={p.id} className="flex gap-3">
                    <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-bg/60">
                      <Img src={p.main_image} alt={p.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-1 text-xs font-bold text-text">
                        {p.title}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-muted">
                          {p.slug}
                        </span>
                        <span className="font-bold text-primary">
                          {formatPrice(p.final_price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                <div className="text-xs">
                  <span className="text-muted">مبلغ کل: </span>
                  <span className="font-extrabold text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-text transition hover:border-primary/40 hover:text-primary"
                >
                  <Eye size={12} />
                  جزئیات سفارش
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tab: Addresses                                                      */
/* ------------------------------------------------------------------ */
function AddressesTab({ addresses }) {
  return (
    <div className="space-y-4">
      <SectionCard
        title="آدرس‌های من"
        icon={MapPin}
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-[11px] font-bold text-bg transition hover:shadow-[0_0_18px_rgba(255,149,0,0.4)]">
            <Plus size={12} />
            افزودن آدرس
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative rounded-xl border p-4 transition ${
                addr.isDefault
                  ? 'border-primary/40 bg-primary/[0.06]'
                  : 'border-white/15 bg-white/[0.02] hover:border-white/25'
              }`}
            >
              {addr.isDefault && (
                <span className="absolute end-3 top-3 rounded-md bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                  پیش‌فرض
                </span>
              )}

              <div className="mb-2 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-white/5 text-primary">
                  <MapPin size={14} />
                </span>
                <span className="text-sm font-extrabold text-text">
                  {addr.title}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-muted">گیرنده</span>
                  <span className="font-medium text-text">{addr.receiver}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted">تلفن</span>
                  <span dir="ltr" className="font-medium text-text">
                    {addr.phone}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted">کد پستی</span>
                  <span dir="ltr" className="font-medium text-text">
                    {addr.postalCode}
                  </span>
                </div>
                <div className="rounded-md bg-white/[0.03] p-2 text-[11px] leading-5 text-text/85">
                  {addr.province}، {addr.city}، {addr.address}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-1.5 border-t border-white/10 pt-2">
                <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted transition hover:bg-white/5 hover:text-primary">
                  <Edit3 size={11} /> ویرایش
                </button>
                {!addr.isDefault && (
                  <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-red-300 transition hover:bg-red-500/10">
                    <Trash2 size={11} /> حذف
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tab: Wishlist                                                       */
/* ------------------------------------------------------------------ */
function WishlistTab({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-10 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <Heart size={28} />
        </div>
        <h3 className="mb-2 text-lg font-extrabold text-text">
          هنوز چیزی به علاقه‌مندی اضافه نکرده‌اید
        </h3>
        <p className="mb-5 text-sm text-muted">
          محصولات موردنظرتان را ذخیره کنید تا بعداً راحت‌تر پیدایشان کنید.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-bg transition hover:shadow-[0_0_28px_rgba(255,149,0,0.5)]"
        >
          <ShoppingBag size={14} /> مشاهدهٔ محصولات
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
      {items.map((p) => (
        <div
          key={p.id}
          className="group overflow-hidden rounded-2xl border border-white/15 bg-bg-secondary/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="relative aspect-square overflow-hidden bg-bg/60">
            <Img
              src={p.main_image}
              alt={p.title}
              className="h-full w-full object-cover"
            />
            {p.discount_percent > 0 && (
              <span className="absolute end-2 top-2 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-bg">
                {p.discount_percent.toLocaleString('fa-IR')}٪
              </span>
            )}
            <button
              className="absolute start-2 top-2 grid size-7 place-items-center rounded-full bg-bg/80 text-red-400 backdrop-blur-md transition hover:bg-red-500 hover:text-white"
              aria-label="حذف از علاقه‌مندی"
            >
              <X size={12} />
            </button>
          </div>
          <div className="p-3">
            <h3 className="line-clamp-2 min-h-[2.4rem] text-xs font-bold leading-5 text-text">
              {p.title}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <div>
                {p.discount_percent > 0 && (
                  <div className="text-[10px] text-muted line-through">
                    {formatPrice(p.price)}
                  </div>
                )}
                <div className="text-xs font-extrabold text-primary">
                  {formatPrice(p.final_price)}
                </div>
              </div>
              <Link
                to={`/product/${p.slug}`}
                className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary transition hover:bg-primary hover:text-bg"
                aria-label="مشاهدهٔ محصول"
              >
                <Eye size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tab: Security                                                       */
/* ------------------------------------------------------------------ */
function SecurityTab() {
  const [pwForm, setPwForm] = useState({
    current: '',
    next: '',
    confirm: '',
  })
  const [pwErrors, setPwErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = {}
    if (!pwForm.current) err.current = 'رمز عبور فعلی الزامی است'
    if (!pwForm.next) err.next = 'رمز عبور جدید الزامی است'
    else if (pwForm.next.length < 8)
      err.next = 'رمز باید حداقل ۸ کاراکتر باشد'
    if (pwForm.next !== pwForm.confirm)
      err.confirm = 'رمزها با هم مطابقت ندارند'

    if (Object.keys(err).length > 0) {
      setPwErrors(err)
      return
    }

    setPwErrors({})
    setSaved(true)
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <SectionCard
        title="تغییر رمز عبور"
        subtitle="برای امنیت بیشتر، از رمز قوی با حروف بزرگ، کوچک و عدد استفاده کنید."
        icon={Lock}
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text/80">
              رمز عبور فعلی
            </label>
            <input
              type="password"
              value={pwForm.current}
              onChange={(e) => {
                setPwForm((p) => ({ ...p, current: e.target.value }))
                setPwErrors((p) => ({ ...p, current: undefined }))
              }}
              className={inputClass}
              placeholder="••••••••"
            />
            <FieldError message={pwErrors.current} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text/80">
                رمز جدید
              </label>
              <input
                type="password"
                value={pwForm.next}
                onChange={(e) => {
                  setPwForm((p) => ({ ...p, next: e.target.value }))
                  setPwErrors((p) => ({ ...p, next: undefined }))
                }}
                className={inputClass}
                placeholder="••••••••"
              />
              <FieldError message={pwErrors.next} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text/80">
                تکرار رمز جدید
              </label>
              <input
                type="password"
                value={pwForm.confirm}
                onChange={(e) => {
                  setPwForm((p) => ({ ...p, confirm: e.target.value }))
                  setPwErrors((p) => ({ ...p, confirm: undefined }))
                }}
                className={inputClass}
                placeholder="••••••••"
              />
              <FieldError message={pwErrors.confirm} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                <CheckCircle2 size={14} /> رمز عبور با موفقیت تغییر کرد
              </span>
            )}
            <button
              type="submit"
              className="ms-auto flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-bg transition hover:shadow-[0_0_24px_rgba(255,149,0,0.5)]"
            >
              <Save size={14} />
              ذخیرهٔ تغییرات
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title="فعالیت‌های اخیر"
        subtitle="آخرین ورودها به حساب کاربری شما"
        icon={Shield}
      >
        <div className="space-y-2">
          {[
            { device: 'Chrome · Windows', location: 'تهران، ایران', time: '۲ ساعت پیش', current: true },
            { device: 'Safari · iPhone', location: 'تهران، ایران', time: 'دیروز', current: false },
            { device: 'Firefox · macOS', location: 'اصفهان، ایران', time: '۳ روز پیش', current: false },
          ].map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-white/5 text-muted">
                  <Shield size={13} />
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-text">
                    {a.device}
                    {a.current && (
                      <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-[9px] font-bold text-success">
                        فعلی
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[10px] text-muted">
                    {a.location} · {a.time}
                  </div>
                </div>
              </div>
              {!a.current && (
                <button className="text-[11px] font-medium text-red-300 transition hover:text-red-200">
                  خروج
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
export default function Profile() {
  const [tab, setTab] = useState('overview')
  const [user, setUser] = useState(USER)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: USER.name,
    email: USER.email,
    phone: USER.phone,
  })
  const [editErrors, setEditErrors] = useState({})

  const saveEdit = () => {
    const err = {}
    if (!editForm.name.trim()) err.name = 'نام الزامی است'
    if (editForm.phone && !/^09\d{9}$/.test(editForm.phone))
      err.phone = 'شماره موبایل معتبر نیست'
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email))
      err.email = 'فرمت ایمیل صحیح نیست'

    if (Object.keys(err).length > 0) {
      setEditErrors(err)
      return
    }

    setUser((u) => ({ ...u, ...editForm }))
    setEditing(false)
    setEditErrors({})
  }

  const activeTab = useMemo(() => TABS.find((t) => t.id === tab), [tab])

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="flex items-center gap-1 transition hover:text-secondary">
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">پروفایل من</span>
      </nav>

      {/* Header card */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/50 p-5 backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -top-20 right-1/4 size-64 rounded-full bg-primary/12 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 size-64 rounded-full bg-secondary/12 blur-[100px]" />

        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="size-24 overflow-hidden rounded-full border-2 border-primary/40 bg-bg/60 shadow-[0_0_40px_-10px_rgba(255,149,0,0.5)]">
              <Img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <button
              className="absolute -bottom-1 -end-1 grid size-8 place-items-center rounded-full border-2 border-bg-secondary bg-primary text-bg shadow-[0_0_16px_rgba(255,149,0,0.5)] transition hover:scale-110"
              aria-label="تغییر عکس"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 text-center sm:text-start">
            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => {
                        setEditForm((p) => ({ ...p, name: e.target.value }))
                        setEditErrors((p) => ({ ...p, name: undefined }))
                      }}
                      className={inputClass}
                      placeholder="نام و نام خانوادگی"
                    />
                    <FieldError message={editErrors.name} />
                  </div>
                  <div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={editForm.phone}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 11)
                        setEditForm((p) => ({ ...p, phone: v }))
                        setEditErrors((p) => ({ ...p, phone: undefined }))
                      }}
                      dir="ltr"
                      className={inputClass}
                      placeholder="09121234567"
                    />
                    <FieldError message={editErrors.phone} />
                  </div>
                </div>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => {
                    setEditForm((p) => ({ ...p, email: e.target.value }))
                    setEditErrors((p) => ({ ...p, email: undefined }))
                  }}
                  dir="ltr"
                  className={inputClass}
                  placeholder="example@mail.com"
                />
                <FieldError message={editErrors.email} />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-xs font-bold text-bg transition hover:shadow-[0_0_20px_rgba(255,149,0,0.5)]"
                  >
                    <Save size={12} /> ذخیره
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false)
                      setEditForm({ name: user.name, email: user.email, phone: user.phone })
                      setEditErrors({})
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold text-muted transition hover:border-red-400/40 hover:text-red-300"
                  >
                    <X size={12} /> لغو
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-extrabold text-text sm:text-2xl">
                  {user.name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted sm:justify-start">
                  <span className="flex items-center gap-1">
                    <Phone size={11} />
                    <span dir="ltr">{user.phone}</span>
                  </span>
                  <span className="hidden size-1 rounded-full bg-muted/50 sm:block" />
                  <span className="flex items-center gap-1">
                    <Mail size={11} />
                    <span dir="ltr" className="truncate">{user.email}</span>
                  </span>
                </p>
                <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted sm:justify-start">
                  <Calendar size={11} />
                  عضو از {user.joinedAt}
                  <span className="mx-1 text-muted/40">·</span>
                  <span className="text-primary" dir="ltr">{user.memberCode}</span>
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          {!editing && (
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-xs font-bold text-text transition hover:border-primary/40 hover:text-primary"
              >
                <Edit3 size={12} /> ویرایش پروفایل
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 transition hover:border-red-400/60 hover:bg-red-500/15">
                <LogOut size={12} /> خروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar tabs */}
        <aside>
          <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/15 bg-bg-secondary/40 p-2 backdrop-blur-xl lg:flex-col lg:overflow-visible">
            {TABS.map((t) => {
              const Icon = t.icon
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition lg:w-full ${
                    active
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted hover:bg-white/[0.04] hover:text-text'
                  }`}
                >
                  <Icon size={14} />
                  <span className="whitespace-nowrap">{t.label}</span>
                  {active && (
                    <span className="ms-auto hidden size-1.5 rounded-full bg-primary lg:block" />
                  )}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            {(() => {
              const Icon = activeTab?.icon
              return Icon ? <Icon size={16} className="text-primary" /> : null
            })()}
            <h2 className="text-lg font-extrabold text-text">
              {activeTab?.label}
            </h2>
          </div>

          {tab === 'overview' && (
            <OverviewTab
              user={user}
              orders={ORDERS}
              onEdit={() => setEditing(true)}
            />
          )}
          {tab === 'orders' && <OrdersTab orders={ORDERS} />}
          {tab === 'addresses' && <AddressesTab addresses={ADDRESSES} />}
          {tab === 'wishlist' && <WishlistTab items={WISHLIST} />}
          {tab === 'security' && <SecurityTab />}
        </div>
      </div>
    </section>
  )
}