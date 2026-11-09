import { memo } from 'react'
import Img from '../Img'

const ProductCard = ({ product }) => {
  const hasDiscount = Number(product.discount_percent) > 0

  const finalPrice =
    Number(product.final_price) || Number(product.price) || 0

  const oldPrice = Number(product.price) || 0

  const imageUrl =
    product.images?.[0]?.url ||
    product.images?.[0]?.image_url ||
    product.main_image ||
    ''

  return (
    <a
      href="#contact"
      className="
        group flex h-full min-w-0 flex-col overflow-hidden
        rounded-2xl border border-white/10
        bg-bg-secondary/70 backdrop-blur-xl
        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
        transition-all duration-500
        hover:-translate-y-1 hover:border-primary/40
        hover:shadow-[0_15px_40px_-15px_rgba(255,149,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] 
      "
    >
      {/* تصویر */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-bg/60 ">
        {imageUrl ? (
          <Img
            src={imageUrl}
            alt={product.title || 'محصول'}
            className="h-full w-full object-cover transition-transform duration-700 will-change-transform  "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted sm:text-sm">
            بدون تصویر
          </div>
        )}

        {/* برچسب تخفیف */}
        {hasDiscount && (
          <span
            className="
              absolute end-2 top-2 rounded-full
              bg-gradient-primary px-2 py-0.5
              text-[10px] font-bold text-bg
              shadow-[0_0_14px_rgba(255,149,0,0.55)]
              sm:end-3 sm:top-3 sm:text-xs
            "
          >
            {product.discount_percent}٪
          </span>
        )}

        {/* گرادیان کف تصویر در هاور */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* محتوا */}
      <div className="flex min-h-[96px] flex-1 flex-col p-3 sm:min-h-[110px] sm:p-3.5">
        <h3 className="line-clamp-2 min-h-[2.25rem] overflow-hidden text-xs font-semibold leading-5 text-text sm:min-h-[2.5rem] sm:text-sm">
          {product.title}
        </h3>

        <div className="mt-auto flex min-h-[24px] flex-wrap items-baseline justify-between gap-1 pt-2 sm:min-h-[28px]">
          <div className="flex min-w-0 items-baseline gap-1">
            <span className="whitespace-nowrap text-sm font-bold text-primary drop-shadow-[0_0_8px_rgba(255,149,0,0.35)] sm:text-base">
              {finalPrice.toLocaleString('fa-IR')}
            </span>
            <span className="whitespace-nowrap text-[9px] text-muted sm:text-[10px]">
              تومان
            </span>
          </div>

          {hasDiscount && (
            <span className="whitespace-nowrap text-[10px] text-muted line-through sm:text-xs">
              {oldPrice.toLocaleString('fa-IR')}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

export default memo(ProductCard)