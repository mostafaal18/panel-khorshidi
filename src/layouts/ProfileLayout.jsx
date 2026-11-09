// src/layouts/ProfileLayout.jsx
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  User,
  Edit3,
  LogOut,
  Smartphone,
  Check,
  MapPin,
  ShoppingBag,
  RotateCcw,
  Bell,
  Heart,
  Star,
  HelpCircle,
  Mail,
  CreditCard,
  Wallet,
  CircleUser,
} from 'lucide-react'
import Img from '../components/Img'
import ProfileEditModal from '../pages/profile/ProfileEditModal'
import ChangePhoneModal from '../pages/profile/ChangePhoneModal'

/* ------------------------------------------------------------------ */
/* Mock user (بعداً از API/Auth بگیرید)                                */
/* ------------------------------------------------------------------ */
export const DEFAULT_USER = {
  id: 1,
  name: 'علی رضایی',
  phone: '09121234567',
  email: 'ali.rezaei@example.com',
  avatar: '/images/avatar-1.jpg',
  is_active: true,
  last_login_at: new Date().toISOString(),
  joined_at: '2024-03-15',
}

/* ------------------------------------------------------------------ */
/* Menu config                                                         */
/* ------------------------------------------------------------------ */
export const MENU_ITEMS = [
  { icon: ShoppingBag, label: 'سفارشات', path: '/profile/orders', bg: 'bg-secondary/15', text: 'text-secondary' },
  { icon: Heart, label: 'علاقه‌مندی‌ها', path: '/profile/wishlist', bg: 'bg-rose-500/15', text: 'text-rose-400' },
  { icon: RotateCcw, label: 'مرجوعی‌ها', path: '/profile/returns', bg: 'bg-amber-500/15', text: 'text-amber-400' },
  { icon: Wallet, label: 'بازگشت وجه', path: '/profile/refunds', bg: 'bg-success/15', text: 'text-success' },
  { icon: CreditCard, label: 'پرداخت‌ها', path: '/profile/payments', bg: 'bg-teal-500/15', text: 'text-teal-400' },
  { icon: MapPin, label: 'آدرس‌ها', path: '/profile/addresses', bg: 'bg-violet-500/15', text: 'text-violet-400' },
  { icon: Star, label: 'نظرات من', path: '/profile/reviews', bg: 'bg-primary/15', text: 'text-primary' },
  { icon: HelpCircle, label: 'سوالات من', path: '/profile/questions', bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  { icon: Mail, label: 'پیام‌های من', path: '/profile/contact-messages', bg: 'bg-indigo-500/15', text: 'text-indigo-400' },
  { icon: Bell, label: 'اعلان‌ها', path: '/profile/notifications', bg: 'bg-sky-500/15', text: 'text-sky-400' },
]

export const NOTIFICATIONS_PATH = '/profile/notifications'

/* ------------------------------------------------------------------ */
/* UnreadBadge                                                         */
/* ------------------------------------------------------------------ */
function UnreadBadge({ count }) {
  if (count <= 0) return null
  return (
    <span
      aria-label={`${count} اعلان خوانده‌نشده`}
      className="absolute -end-1 -top-1 z-10 grid h-5 min-w-5 place-items-center rounded-full border-2 border-bg-secondary bg-red-500 px-1 text-[10px] font-bold leading-none text-white"
    >
      {count > 99 ? '99+' : count.toLocaleString('fa-IR')}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
export default function ProfileLayout() {
  const [user, setUser] = useState(DEFAULT_USER)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [unreadCount] = useState(3) // mock — بعداً از context/API

  const isProfileComplete = !!user.name
  const displayName = user.name || 'کاربر'
  const displayPhone = user.phone || ''

  const handleLogout = () => {
    // TODO: API logout + پاک کردن توکن + navigate('/login')
    console.log('logout')
  }

  return (
    <section className="mx-auto max-w-6xl px-3 pb-20 pt-24 sm:px-5 sm:pt-28">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="flex items-center gap-1 transition hover:text-secondary">
          <HomeIcon size={12} /> خانه
        </Link>
        <ChevronLeft size={12} />
        <span className="text-text">پروفایل</span>
      </nav>

      {/* ---------- Header Card ---------- */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/50 p-5 backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -top-24 right-1/4 size-64 rounded-full bg-primary/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-64 rounded-full bg-secondary/15 blur-[110px]" />

        <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="size-20 overflow-hidden rounded-full border-2 border-primary/40 bg-bg/60 shadow-[0_0_40px_-10px_rgba(255,149,0,0.5)] sm:size-24">
              {user.avatar ? (
                <Img src={user.avatar} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-3xl text-muted">
                  <User />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 text-center sm:text-start">
            <h1 className="truncate text-lg font-extrabold text-text sm:text-2xl">
              سلام، {displayName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-sm sm:justify-start">
              <span
                className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-xs text-text"
                dir="ltr"
              >
                {displayPhone}
              </span>
              {isProfileComplete ? (
                <span className="flex items-center gap-1 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  <Check size={10} /> تکمیل
                </span>
              ) : (
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                  ناقص
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-wrap justify-center gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.06] px-3 py-2 text-xs font-bold text-text backdrop-blur-xl transition hover:border-primary/50 hover:text-primary"
            >
              <Edit3 size={13} /> ویرایش پروفایل
            </button>
            <button
              onClick={() => setShowPhoneModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.06] px-3 py-2 text-xs font-bold text-text backdrop-blur-xl transition hover:border-secondary/50 hover:text-secondary"
            >
              <Smartphone size={13} /> تغییر شماره
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Mobile quick access ---------- */}
      <div className="mb-6 lg:hidden">
        <div className="rounded-3xl border border-white/15 bg-bg-secondary/40 p-4 backdrop-blur-xl">
          <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-text">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            دسترسی سریع
          </h2>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon
              const showBadge = item.path === NOTIFICATIONS_PATH && unreadCount > 0
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${
                      isActive
                        ? 'border-primary/40 bg-primary/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <div className="relative">
                    <div className={`grid size-11 place-items-center rounded-xl ${item.bg} ${item.text}`}>
                      <Icon size={18} />
                    </div>
                    {showBadge && <UnreadBadge count={unreadCount} />}
                  </div>
                  <span className="text-[10px] font-medium leading-tight text-text/90">
                    {item.label}
                  </span>
                </NavLink>
              )
            })}

            <button
              onClick={handleLogout}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center transition hover:border-red-400/40 hover:bg-red-500/5"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-red-500/15 text-red-400">
                <LogOut size={18} />
              </div>
              <span className="text-[10px] font-medium text-red-400">خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Grid: sidebar + content ---------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/15 bg-bg-secondary/40 p-2 backdrop-blur-xl">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `mb-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-text/90 hover:bg-white/[0.04]'
                }`
              }
            >
              <div className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
                <CircleUser size={16} />
              </div>
              <span className="flex-1">اطلاعات شخصی</span>
            </NavLink>

            <div className="my-1 h-px bg-white/10" />

            {MENU_ITEMS.map((item) => {
              const Icon = item.icon
              const showBadge = item.path === NOTIFICATIONS_PATH && unreadCount > 0
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text/85 hover:bg-white/[0.04] hover:text-text'
                    }`
                  }
                >
                  <div className="relative">
                    <div className={`grid size-8 place-items-center rounded-lg ${item.bg} ${item.text}`}>
                      <Icon size={14} />
                    </div>
                    {showBadge && <UnreadBadge count={unreadCount} />}
                  </div>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {showBadge && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                      {unreadCount > 99 ? '99+' : unreadCount.toLocaleString('fa-IR')}
                    </span>
                  )}
                </NavLink>
              )
            })}

            <div className="my-1 h-px bg-white/10" />

            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <div className="grid size-8 place-items-center rounded-lg bg-red-500/15">
                <LogOut size={14} />
              </div>
              خروج
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <Outlet context={{ user, setUser }} />
        </div>
      </div>

      {/* Modals */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onSave={(updates) => setUser((u) => ({ ...u, ...updates }))}
      />
      <ChangePhoneModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        currentPhone={user.phone}
        onSuccess={(newPhone) => setUser((u) => ({ ...u, phone: newPhone }))}
      />
    </section>
  )
}