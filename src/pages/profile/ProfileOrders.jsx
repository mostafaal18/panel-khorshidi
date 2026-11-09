// src/pages/profile/ProfileOrders.jsx
import { Link } from 'react-router-dom'
import { Package, Eye, Calendar, Clock, Truck, CheckCircle2 } from 'lucide-react'
import Img from '../../components/Img'
import { products } from '../../data'

const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'

const MOCK_ORDERS = [
  {
    id: 'ST-74839201',
    date: '۱۴۰۴/۰۸/۱۲',
    status: 'delivered',
    total: 46_200_000,
    items: [products[0], products[1], products[3]],
  },
  {
    id: 'ST-74839102',
    date: '۱۴۰۴/۰۷/۲۸',
    status: 'shipping',
    total: 10_500_000,
    items: [products[0]],
  },
  {
    id: 'ST-74838201',
    date: '۱۴۰۴/۰۶/۰۵',
    status: 'pending',
    total: 25_200_000,
    items: [products[1]],
  },
]

const STATUS = {
  delivered: { label: 'تحویل داده شد', className: 'border-success/40 bg-success/10 text-success', icon: CheckCircle2 },
  shipping: { label: 'در حال ارسال', className: 'border-secondary/40 bg-secondary/10 text-secondary', icon: Truck },
  pending: { label: 'در انتظار پرداخت', className: 'border-primary/40 bg-primary/10 text-primary', icon: Clock },
}

export default function ProfileOrders() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-text">
          <Package size={18} className="text-primary" />
          سفارشات من
        </h2>
        <span className="text-[11px] text-muted">
          {MOCK_ORDERS.length.toLocaleString('fa-IR')} سفارش
        </span>
      </div>

      {MOCK_ORDERS.map((order) => {
        const s = STATUS[order.status]
        const Icon = s.icon
        return (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border border-white/15 bg-bg-secondary/40 backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span dir="ltr" className="text-sm font-extrabold text-text">{order.id}</span>
                <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${s.className}`}>
                  <Icon size={10} />
                  {s.label}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-muted">
                <Calendar size={11} />
                {order.date}
              </span>
            </div>

            <div className="space-y-3 p-4">
              {order.items.map((p) => (
                <div key={p.id} className="flex gap-3">
                  <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-bg/60">
                    <Img src={p.main_image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-xs font-bold text-text">{p.title}</div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-muted" dir="ltr">{p.slug}</span>
                      <span className="font-bold text-primary">{formatPrice(p.final_price)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                <span className="text-xs">
                  <span className="text-muted">مبلغ کل: </span>
                  <span className="font-extrabold text-primary">{formatPrice(order.total)}</span>
                </span>
                <button className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-text transition hover:border-primary/40 hover:text-primary">
                  <Eye size={12} /> جزئیات سفارش
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}