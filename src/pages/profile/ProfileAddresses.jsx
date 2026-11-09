// src/pages/profile/ProfileAddresses.jsx
import { MapPin, Plus, Edit3, Trash2 } from 'lucide-react'

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
    address: 'خیابان آزادی، برج آفتاب، طبقه ۷',
    postalCode: '1234567891',
    isDefault: false,
  },
]

export default function ProfileAddresses() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-text">
          <MapPin size={18} className="text-primary" />
          آدرس‌های من
        </h2>
        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-[11px] font-bold text-bg transition hover:shadow-[0_0_18px_rgba(255,149,0,0.4)]">
          <Plus size={12} /> افزودن آدرس
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ADDRESSES.map((addr) => (
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
              <span className="text-sm font-extrabold text-text">{addr.title}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <Line label="گیرنده" value={addr.receiver} />
              <Line label="تلفن" value={addr.phone} ltr />
              <Line label="کد پستی" value={addr.postalCode} ltr />
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
    </div>
  )
}

function Line({ label, value, ltr }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-text" dir={ltr ? 'ltr' : undefined}>{value}</span>
    </div>
  )
}