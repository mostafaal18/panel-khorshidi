// src/pages/profile/ProfileWishlist.jsx
import { Link } from 'react-router-dom'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import Img from '../../components/Img'
import { products } from '../../data'

const formatPrice = (n) => n.toLocaleString('fa-IR') + ' تومان'
const WISHLIST = [products[2], products[4], products[5]]

export default function ProfileWishlist() {
  if (WISHLIST.length === 0) {
    return (
      <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-10 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <Heart size={28} />
        </div>
        <h3 className="mb-2 text-lg font-extrabold text-text">هنوز چیزی اضافه نکرده‌اید</h3>
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
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-text">
        <Heart size={18} className="text-primary" />
        علاقه‌مندی‌های من
        <span className="text-[11px] font-normal text-muted">
          ({WISHLIST.length.toLocaleString('fa-IR')} محصول)
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {WISHLIST.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-white/15 bg-bg-secondary/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40">
            <div className="relative aspect-square overflow-hidden bg-bg/60">
              <Img src={p.main_image} alt={p.title} className="h-full w-full object-cover" />
              {p.discount_percent > 0 && (
                <span className="absolute end-2 top-2 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-bg">
                  {p.discount_percent.toLocaleString('fa-IR')}٪
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 min-h-[2.4rem] text-xs font-bold leading-5 text-text">{p.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  {p.discount_percent > 0 && (
                    <div className="text-[10px] text-muted line-through">{formatPrice(p.price)}</div>
                  )}
                  <div className="text-xs font-extrabold text-primary">{formatPrice(p.final_price)}</div>
                </div>
                <Link
                  to={`/product/${p.slug}`}
                  className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary transition hover:bg-primary hover:text-bg"
                  aria-label="مشاهده"
                >
                  <Eye size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}