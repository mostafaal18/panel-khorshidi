// src/pages/profile/ProfileHome.jsx
import { useOutletContext } from 'react-router-dom'
import {
  User,
  CircleUser,
  Phone,
  Mail,
  Calendar,
  Check,
  AlertCircle,
  ShieldCheck,
  Award,
} from 'lucide-react'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

export default function ProfileHome() {
  const { user } = useOutletContext()
  const isProfileComplete = !!user.name

  return (
    <div className="space-y-4">
      {/* Account info */}
      <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-5 backdrop-blur-xl sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3 text-base font-extrabold text-text">
          <CircleUser size={18} className="text-primary" />
          اطلاعات حساب کاربری
        </h2>

        <div className="space-y-0">
          <Row label="نام و نام خانوادگی" value={user.name || '—'} icon={User} />
          <Row
            label="شماره موبایل"
            value={user.phone || '—'}
            icon={Phone}
            ltr
          />
          <Row
            label="ایمیل"
            value={user.email || '—'}
            icon={Mail}
            ltr
          />
          <Row
            label="آخرین ورود"
            value={user.last_login_at ? formatDate(user.last_login_at) : '—'}
            icon={Calendar}
          />
          <Row
            label="وضعیت حساب"
            value={
              user.is_active ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                  <Check size={11} /> فعال
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400">
                  <AlertCircle size={11} /> غیرفعال
                </span>
              )
            }
            icon={ShieldCheck}
            last
          />
          <Row
            label="وضعیت پروفایل"
            value={
              isProfileComplete ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                  <Check size={11} /> تکمیل شده
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400">
                  <AlertCircle size={11} /> ناقص
                </span>
              )
            }
            icon={Award}
            last
          />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, icon: Icon, ltr, last }) {
  return (
    <div
      className={`flex flex-col items-start justify-between gap-2 py-3 sm:flex-row sm:items-center ${
        last ? '' : 'border-b border-white/10'
      }`}
    >
      <span className="flex items-center gap-2 text-xs text-muted">
        {Icon && <Icon size={12} />}
        {label}
      </span>
      <span
        className="text-sm font-medium text-text sm:text-base"
        dir={ltr ? 'ltr' : undefined}
      >
        {value}
      </span>
    </div>
  )
}