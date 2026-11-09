// src/pages/profile/ProfileNotifications.jsx
import { useState } from 'react'
import { Bell, Check, ShoppingBag, Truck, Tag, Info } from 'lucide-react'

const INITIAL = [
  { id: 1, type: 'order', title: 'سفارش شما ارسال شد', desc: 'سفارش ST-74839102 به پست تحویل داده شد.', time: '۲ ساعت پیش', unread: true },
  { id: 2, type: 'discount', title: 'تخفیف ویژه پنل‌های خورشیدی', desc: 'تا ۲۵٪ تخفیف روی پنل‌های مونوکریستال.', time: 'دیروز', unread: true },
  { id: 3, type: 'info', title: 'به‌روزرسانی شرایط گارانتی', desc: 'شرایط جدید گارانتی محصولات اعلام شد.', time: '۳ روز پیش', unread: true },
  { id: 4, type: 'order', title: 'سفارش تحویل شد', desc: 'سفارش ST-74839201 تحویل داده شد.', time: '۱ هفته پیش', unread: false },
]

const ICONS = {
  order: ShoppingBag,
  shipping: Truck,
  discount: Tag,
  info: Info,
}
const COLORS = {
  order: 'bg-secondary/15 text-secondary',
  shipping: 'bg-primary/15 text-primary',
  discount: 'bg-accent/15 text-accent',
  info: 'bg-white/5 text-muted',
}

export default function ProfileNotifications() {
  const [items, setItems] = useState(INITIAL)

  const markAllRead = () => setItems((arr) => arr.map((i) => ({ ...i, unread: false })))
  const markRead = (id) => setItems((arr) => arr.map((i) => (i.id === id ? { ...i, unread: false } : i)))

  const unreadCount = items.filter((i) => i.unread).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-text">
          <Bell size={18} className="text-primary" />
          اعلان‌ها
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              {unreadCount.toLocaleString('fa-IR')} جدید
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-muted transition hover:border-secondary/40 hover:text-secondary"
          >
            <Check size={11} /> خواندن همه
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((n) => {
          const Icon = ICONS[n.type] || Info
          return (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${
                n.unread
                  ? 'border-primary/25 bg-primary/[0.04] hover:bg-primary/[0.07]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className={`grid size-10 shrink-0 place-items-center rounded-lg ${COLORS[n.type]}`}>
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-text">{n.title}</span>
                  {n.unread && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-5 text-muted">{n.desc}</p>
                <div className="mt-1 text-[10px] text-muted/70">{n.time}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}