import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowUpLeft,
  Share2,
  Link as LinkIcon,
} from 'lucide-react'
import { blogs, authors } from '../data'
import Img from '../components/Img'

// رندر هر بلاک محتوا
const ContentBlock = ({ block }) => {
  if (block.type === 'h2') {
    return (
      <h2 className="mb-4 mt-10 text-lg font-extrabold text-text sm:text-xl md:text-2xl">
        {block.text}
      </h2>
    )
  }
  if (block.type === 'h3') {
    return (
      <h3 className="mb-3 mt-7 text-base font-bold text-text sm:text-lg">
        {block.text}
      </h3>
    )
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="my-8 rounded-2xl border-s-4 border-primary/60 bg-primary/[0.06] px-5 py-4 text-sm leading-8 text-text/90 backdrop-blur-sm sm:text-base">
        {block.text}
      </blockquote>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="my-5 space-y-2.5 ps-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-7 text-muted sm:text-base sm:leading-8">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(255,149,0,0.6)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  // پیش‌فرض: پاراگراف
  return (
    <p className="mb-4 text-sm leading-8 text-muted sm:text-base sm:leading-9">
      {block.text}
    </p>
  )
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogs.find((b) => b.slug === slug)

  // اگر مقاله پیدا نشد
  if (!post) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl">مقاله پیدا نشد</h1>
        <p className="mt-3 text-sm text-muted">
          ممکن است لینک اشتباه باشد یا مقاله حذف شده باشد.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/5 px-6 py-3 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
        >
          <ArrowRight size={16} />
          بازگشت به لیست مقالات
        </Link>
      </section>
    )
  }

  const author = authors[post.author] || {}

  // مقالات مرتبط (همان دسته، به‌جز خودش، حداکثر ۳ تا)
  const related = blogs
    .filter((b) => b.id !== post.id && b.category === post.category)
    .slice(0, 3)

  // اگر کمتر از ۳ مقاله‌ی مشابه بود، بقیه رو از سایر مقالات پر کن
  if (related.length < 3) {
    const extras = blogs
      .filter((b) => b.id !== post.id && !related.some((r) => r.id === b.id))
      .slice(0, 3 - related.length)
    related.push(...extras)
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | SunTech</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <article className="relative isolate overflow-hidden pb-20 pt-24">
        {/* هاله‌های پس‌زمینه */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-20 -z-10 size-[400px] rounded-full bg-secondary/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 -z-10 size-[380px] rounded-full bg-primary/10 blur-[130px]"
        />

        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          {/* دکمه بازگشت */}
          <Link
            to="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary sm:text-sm"
          >
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            بازگشت به مقالات
          </Link>

          {/* دسته + متا */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary sm:text-xs">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted sm:text-xs">
              <CalendarDays size={13} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted sm:text-xs">
              <Clock size={13} />
              {post.readTime} مطالعه
            </span>
          </div>

          {/* عنوان */}
          <h1 className="text-2xl font-extrabold leading-tight text-text sm:text-3xl md:text-4xl md:leading-tight">
            {post.title}
          </h1>

          {/* خلاصه */}
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {post.excerpt}
          </p>

          {/* تصویر کاور */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary/70 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
            <Img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
          </div>

          {/* محتوا */}
          <div className="mt-10">
            {post.content?.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          {/* نوار اکشن: اشتراک‌گذاری */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 backdrop-blur-xl sm:p-5">
            <div className="flex items-center gap-2 text-xs text-muted sm:text-sm">
              <Share2 size={16} className="text-primary" />
              این مقاله را به اشتراک بگذارید
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/60 px-3 py-1.5 text-[11px] font-medium text-text transition-all hover:border-primary/40 hover:text-primary sm:text-xs"
              >
                <LinkIcon size={13} />
                کپی لینک
              </button>
            </div>
          </div>

          {/* کارت نویسنده */}
          {author.name && (
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-secondary/50 p-4 backdrop-blur-xl sm:p-5">
              <div className="relative shrink-0">
                <div className="rounded-full bg-gradient-primary p-0.5 shadow-[0_0_20px_rgba(255,149,0,0.4)]">
                  <Img
                    src={author.avatar}
                    alt={author.name}
                    className="size-14 rounded-full border-2 border-bg sm:size-16"
                  />
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-muted sm:text-xs">نویسنده</div>
                <div className="mt-0.5 text-sm font-extrabold text-text sm:text-base">
                  {author.name}
                </div>
                <div className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {author.role}
                </div>
              </div>
            </div>
          )}
        </div>

      </article>
    </>
  )
}