
import { useState } from 'react'
import {
  Tag,
  Award,
  Wallet,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'
import {
  productCategories,
  productBrands,
  productPriceRanges,
} from '../../data'

function FilterSection({
  icon: Icon,
  title,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <section className="border-b border-white/[0.07] pb-3 last:border-0 last:pb-0 lg:pb-5">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex min-h-12 w-full items-center gap-3 rounded-xl text-start lg:mb-3 lg:min-h-0 lg:cursor-default"
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary lg:size-7 lg:rounded-lg">
          <Icon size={17} />
        </div>

        <span className="text-sm font-extrabold text-text">
          {title}
        </span>

        <ChevronDown
          size={16}
          className={`ms-auto text-muted transition-transform duration-300 lg:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="space-y-1 pb-2 pt-1 lg:pb-0 lg:pt-0">
          {children}
        </div>
      </div>
    </section>
  )
}

function FilterOption({
  label,
  checked,
  count,
  onChange,
  type = 'checkbox',
  dir,
}) {
  return (
    <label
      className={`group flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors lg:min-h-0 lg:px-2.5 lg:py-2 ${
        checked
          ? 'bg-primary/10 text-primary'
          : 'text-text/80 hover:bg-white/[0.04]'
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <input
          type={type}
          checked={checked}
          onChange={onChange}
          className="size-4 shrink-0 cursor-pointer accent-primary"
        />

        <span
          dir={dir}
          className="truncate text-xs font-medium sm:text-sm lg:text-xs"
        >
          {label}
        </span>
      </span>

      {count !== undefined && (
        <span
          className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold tabular-nums ${
            checked
              ? 'bg-primary/15 text-primary'
              : 'bg-white/[0.05] text-muted'
          }`}
        >
          {count.toLocaleString('fa-IR')}
        </span>
      )}
    </label>
  )
}

export default function ProductFilters({
  filters,
  onChange,
  onReset,
  counts = { categories: {}, brands: {} },
  showHeader = true,
}) {
  const toggleCategory = (id) => {
    const selected = filters.categories.includes(id)

    onChange({
      ...filters,
      categories: selected
        ? filters.categories.filter((item) => item !== id)
        : [...filters.categories, id],
    })
  }

  const toggleBrand = (id) => {
    const selected = filters.brands.includes(id)

    onChange({
      ...filters,
      brands: selected
        ? filters.brands.filter((item) => item !== id)
        : [...filters.brands, id],
    })
  }

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange !== 'all' ? 1 : 0)

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {showHeader && (
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold text-text">
              فیلتر محصولات
            </h2>

            <p className="mt-1 text-[10px] text-muted">
              انتخاب بر اساس نیاز شما
            </p>
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-500/[0.07] px-2.5 py-2 text-[10px] font-bold text-red-300 transition hover:bg-red-500/10"
            >
              <RotateCcw size={12} />
              پاک کردن
              <span>
                ({activeCount.toLocaleString('fa-IR')})
              </span>
            </button>
          )}
        </div>
      )}

      <FilterSection icon={Tag} title="دسته‌بندی">
        {productCategories.map((category) => (
          <FilterOption
            key={category.id}
            label={category.label}
            checked={filters.categories.includes(category.id)}
            count={counts.categories[category.id] || 0}
            onChange={() => toggleCategory(category.id)}
          />
        ))}
      </FilterSection>

      <FilterSection icon={Award} title="برند">
        {productBrands.map((brand) => (
          <FilterOption
            key={brand.id}
            label={brand.label}
            dir="ltr"
            checked={filters.brands.includes(brand.id)}
            count={counts.brands[brand.id] || 0}
            onChange={() => toggleBrand(brand.id)}
          />
        ))}
      </FilterSection>

      <FilterSection icon={Wallet} title="محدوده قیمت">
        {productPriceRanges.map((range) => (
          <FilterOption
            key={range.id}
            label={range.label}
            type="radio"
            checked={filters.priceRange === range.id}
            onChange={() =>
              onChange({
                ...filters,
                priceRange: range.id,
              })
            }
          />
        ))}
      </FilterSection>
    </div>
  )
}
