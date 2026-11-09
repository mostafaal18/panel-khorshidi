
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { productSortOptions } from '../../data'

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute start-3 top-1/2 z-10 -translate-y-1/2 text-primary">
        <ArrowUpDown size={15} />
      </div>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="مرتب‌سازی محصولات"
        className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-bg-secondary/80 py-2.5 pe-9 ps-9 text-[11px] font-semibold text-text outline-none backdrop-blur-xl transition-colors hover:border-secondary/40 focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-xs"
      >
        {productSortOptions.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="bg-bg-secondary text-text"
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  )
}
