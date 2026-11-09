import { CalendarDays, Clock, ArrowUpLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Img from './Img'

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="
        group flex h-full flex-col overflow-hidden rounded-2xl
        border border-white/10 bg-bg-secondary/70 backdrop-blur-xl
        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
        transition-all duration-500
        hover:-translate-y-1.5 hover:border-primary/40
        hover:shadow-[0_20px_45px_-15px_rgba(255,149,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]
        
      "
    >
      {/* تصویر */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg/60">
        <Img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* برچسب دسته */}
        <span className="
          absolute end-3 top-3 rounded-full border border-primary/40
          bg-bg/80 px-2.5 py-1 text-[10px] font-bold text-primary
          backdrop-blur-md shadow-[0_0_14px_rgba(255,149,0,0.3)]
          sm:text-xs
        ">
          {post.category}
        </span>
      </div>

      {/* محتوا */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-4 text-[11px] text-muted sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} className="text-primary/80" />
            {post.date}
          </span>
        </div>

        <h3 className="
          line-clamp-2 text-sm font-extrabold leading-6 text-text
          transition-colors duration-300 group-hover:text-primary
          sm:text-base sm:leading-7
        ">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}