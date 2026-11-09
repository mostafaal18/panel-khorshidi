
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  Home as HomeIcon,
  Sparkles,
  Leaf,
  Settings,
  Zap,
  ShieldCheck,
  Check,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  ArrowUpLeft,
  Quote,
  Star,
  Building2,
  TrendingUp,
  Globe,
} from 'lucide-react'
import Img from '../components/Img'
import { testimonials } from '../data'
import Stats from '../components/Stats'

const frame = 'bg-linear-to-r from-primary via-white/20 to-secondary'

const cardClass =
  `rounded-2xl p-[1.5px] ${frame} shadow-[0_4px_12px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.25)]`


const cardInner =
  'h-full rounded-[calc(1rem-1.5px)] bg-bg-secondary/90 backdrop-blur-md'


const cardStyles = [
  {
    position: 'left-[-8%] top-[12%] z-10 h-[54%] w-[38%]',
    transform:
      '[transform:perspective(1100px)_rotateY(32deg)_rotateZ(-9deg)] group-hover:[transform:perspective(1100px)_rotateY(14deg)_rotateZ(-5deg)_translateY(-8px)]',
    delay: '0s',
  },
  {
    position: 'left-[28%] top-[0%] z-20 h-[64%] w-[44%]',
    transform:
      '[transform:perspective(1100px)_rotateY(28deg)_rotateZ(-7deg)] group-hover:[transform:perspective(1100px)_rotateY(10deg)_rotateZ(-3deg)_translateY(-12px)]',
    delay: '-2.3s',
  },
  {
    position: 'left-[70%] top-[15%] z-10 h-[49%] w-[34%]',
    transform:
      '[transform:perspective(1100px)_rotateY(37deg)_rotateZ(-8deg)] group-hover:[transform:perspective(1100px)_rotateY(17deg)_rotateZ(-5deg)_translateY(-8px)]',
    delay: '-4.6s',
  },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'کیفیت بی‌قید و شرط',
    desc: 'از انتخاب متریال تا نصب و پشتیبانی، هیچ‌جا از استانداردها کوتاه نمی‌آییم.',
    color: 'bg-secondary/15 text-secondary',
  },
  {
    icon: Leaf,
    title: 'تعهد به محیط زیست',
    desc: 'هر پروژهٔ ما یعنی کربن کمتر و زمینی سالم‌تر برای نسل بعد.',
    color: 'bg-success/15 text-success',
  },
  {
    icon: Heart,
    title: 'مشتری‌محوری واقعی',
    desc: 'به‌جای فروش، دنبال راهکار درست برای نیاز واقعی شما هستیم.',
    color: 'bg-primary/15 text-primary',
  },
  {
    icon: TrendingUp,
    title: 'نوآوری مستمر',
    desc: 'با تکنولوژی‌های جدید و بهبود مداوم، بازدهی پروژه‌ها را بالا می‌بریم.',
    color: 'bg-accent/15 text-accent',
  },
]

const HERO_IMAGES = [
  '/images/about-1.jpg',
  '/images/about-2.jpg',
  '/images/about-3.jpg',
]

const TEAM = [
  {
    name: 'مهندس رضا محمدی',
    role: 'مدیرعامل و بنیان‌گذار',
    image: '/images/team-1.jpg',
  },
  {
    name: 'مهندس سارا کریمی',
    role: 'مدیر فنی و مهندسی',
    image: '/images/team-2.jpg',
  },
  {
    name: 'مهندس علی احمدی',
    role: 'مدیر پروژه‌ها',
    image: '/images/team-3.jpg',
  },
  {
    name: 'مهندس مریم حسینی',
    role: 'مدیر پشتیبانی',
    image: '/images/team-4.jpg',
  },
]

function OrbitRing() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 560 430"
      className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="about-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#26D6FF" stopOpacity="0" />
          <stop offset="45%" stopColor="#26D6FF" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
        </linearGradient>

        <filter id="about-ring-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id="about-dot-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <g transform="rotate(-18 180 250)">
        <ellipse
          cx="180"
          cy="250"
          rx="190"
          ry="78"
          fill="none"
          stroke="url(#about-ring)"
          strokeWidth="5"
          filter="url(#about-ring-glow)"
          opacity=".85"
        />

        <ellipse
          cx="180"
          cy="250"
          rx="190"
          ry="78"
          fill="none"
          stroke="url(#about-ring)"
          strokeWidth="1.5"
        />

        <ellipse
          cx="180"
          cy="250"
          rx="206"
          ry="90"
          fill="none"
          stroke="#168BFF"
          strokeOpacity=".18"
          strokeWidth="1"
        />

        <circle
          cx="-10"
          cy="250"
          r="5"
          fill="#26D6FF"
          filter="url(#about-dot-glow)"
        />

        <circle cx="-10" cy="250" r="2.2" fill="#fff" />
      </g>
    </svg>
  )
}

function FloatCard({ image, title, subtitle, style, icon: Icon }) {
  return (
    <div
      style={{ animationDelay: style.delay }}
      className={`group absolute motion-safe:animate-float ${style.position}`}
    >
      <div
        className={`h-full w-full ${cardClass} will-change-transform transition-transform duration-700 ease-out ${style.transform}`}
      >
        <article className={`${cardInner} relative overflow-hidden p-[3%]`}>
          <Img
            src={image}
            alt={title}
            className="!absolute inset-[3%] rounded-xl object-cover transition-transform duration-700 group-hover:scale-105 sm:rounded-[1rem]"
          />

          <div className="absolute inset-[3%] rounded-xl bg-gradient-to-t from-bg via-bg/30 to-transparent sm:rounded-[1rem]" />

          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />

          <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

          <div
            dir="rtl"
            className="absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-1 px-1 text-center sm:gap-2 sm:px-2"
          >
            {Icon && (
              <div className="flex size-7 items-center justify-center rounded-lg border border-primary/35 bg-bg/80 text-primary shadow-[0_0_14px_rgba(255,149,0,0.25)] backdrop-blur-md sm:size-10 sm:rounded-xl [&>svg]:size-4 sm:[&>svg]:size-[20px]">
                <Icon size={20} />
              </div>
            )}

            <h3 className="text-[10px] font-extrabold leading-4 text-text sm:text-xs sm:leading-6 lg:text-sm">
              {title}
            </h3>

            {subtitle && (
              <p className="text-[9px] text-muted sm:text-[10px]">
                {subtitle}
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

function StackCard({ image, title, subtitle, style, icon: Icon }) {
  return (
    <div
      style={{ animationDelay: style.delay }}
      className="group aspect-[10/11] w-[68%] max-w-[300px] motion-safe:animate-float sm:w-[52%]"
    >
      <div
        className={`h-full w-full ${cardClass} will-change-transform transition-transform duration-700 ease-out ${style.transform}`}
      >
        <article className={`${cardInner} relative overflow-hidden p-[3%]`}>
          <Img
            src={image}
            alt={title}
            className="!absolute inset-[3%] rounded-[1rem] object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-[3%] rounded-[1rem] bg-gradient-to-t from-bg via-bg/30 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />

          <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />

          <div
            dir="rtl"
            className="absolute inset-x-0 bottom-[8%] flex flex-col items-center gap-2 px-2 text-center"
          >
            {Icon && (
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/35 bg-bg/80 text-primary shadow-[0_0_20px_rgba(255,149,0,0.25)] backdrop-blur-md">
                <Icon size={22} />
              </div>
            )}

            <h3 className="text-sm font-extrabold leading-6 text-text">
              {title}
            </h3>

            {subtitle && (
              <p className="text-[10px] text-muted">{subtitle}</p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden"
      >
        <div className="absolute -top-24 right-1/4 size-[400px] rounded-full bg-primary/12 blur-[130px]" />
        <div className="absolute -top-10 left-1/4 size-[360px] rounded-full bg-secondary/12 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
          <Link
            to="/"
            className="flex items-center gap-1 transition hover:text-secondary"
          >
            <HomeIcon size={12} />
            خانه
          </Link>

          <ChevronLeft size={12} />

          <span className="font-medium text-text">درباره ما</span>
        </nav>

        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:order-1">
            <div className={`inline-flex rounded-full p-[1.5px] ${frame}`}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-secondary/90 px-4 py-1.5 text-xs font-bold text-primary backdrop-blur-xl">
                <Sparkles size={12} />
                دربارهٔ SunTech
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              ما به آینده‌ای{' '}
              <span className="text-gradient-primary">پاک و روشن</span> باور
              داریم
            </h1>

            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-primary" />

            <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
              SunTech از سال ۱۳۷۸ با هدف ترویج انرژی‌های تجدیدپذیر در ایران
              تأسیس شد. امروز با بیش از دو دهه تجربه، تیمی از مهندسان متخصص
              و بیش از ۵۰ پروژهٔ موفق، یکی از پیشگامان صنعت خورشیدی کشور
              هستیم.
            </p>

            <p className="mt-4 text-sm leading-8 text-muted">
              باور ما این است که هر پنل خورشیدی، قدمی به‌سوی فردایی بهتر
              است. به همین دلیل هر پروژه را با همان دقتی اجرا می‌کنیم که
              برای خانهٔ خودمان انتظار داریم.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]"
              >
                درخواست مشاوره
                <ArrowUpLeft size={16} />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-text transition hover:border-secondary/50 hover:bg-white/[0.08]"
              >
                مشاهده پروژه‌ها
              </Link>
            </div>
          </div>

          <div
            dir="ltr"
            className="relative mx-auto hidden aspect-[560/430] w-full max-w-[680px] lg:order-2 lg:block"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[15%] top-[25%] size-[65%] rounded-full border border-secondary/15 shadow-[0_0_70px_rgba(22,139,255,0.15)]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-[22%] top-[32%] size-[50%] rounded-full border border-secondary/20"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6%] left-[8%] h-8 w-[84%] rounded-[100%] bg-secondary/25 blur-2xl"
            />

            <OrbitRing />

            {HERO_IMAGES.map((img, i) => (
              <FloatCard
                key={img}
                image={img}
                title={['تیم ما', 'پروژه‌ها', 'کارگاه'][i]}
                style={cardStyles[i]}
              />
            ))}
          </div>

          <div
            dir="ltr"
            className="relative mt-6 flex flex-col items-center gap-14 px-6 pb-6 sm:gap-16 lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[15%] inset-y-0 -z-10 rounded-full bg-secondary/10 blur-[90px]"
            />

            {HERO_IMAGES.map((img, i) => (
              <StackCard
                key={img}
                image={img}
                title={['تیم ما', 'پروژه‌ها', 'کارگاه'][i]}
                style={cardStyles[i % cardStyles.length]}
              />
            ))}
          </div>
        </div>

        <Stats />

        <div className="my-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className={cardClass}>
            <div className={`${cardInner} p-6 sm:p-8`}>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Target size={22} />
              </div>

              <h2 className="mb-3 text-xl font-extrabold text-text">
                مأموریت ما
              </h2>

              <p className="text-sm leading-8 text-muted">
                دسترس‌پذیر کردن انرژی خورشیدی برای همه؛ از خانه‌های کوچک
                تا نیروگاه‌های بزرگ صنعتی. می‌خواهیم هر ایرانی بتواند از
                موهبت بی‌پایان خورشید بهره‌مند شود، بدون اینکه نگران هزینه
                یا پیچیدگی فنی باشد.
              </p>
            </div>
          </div>

          <div className={cardClass}>
            <div className={`${cardInner} p-6 sm:p-8`}>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Eye size={22} />
              </div>

              <h2 className="mb-3 text-xl font-extrabold text-text">
                چشم‌انداز ما
              </h2>

              <p className="text-sm leading-8 text-muted">
                تبدیل شدن به بزرگ‌ترین و قابل‌اعتمادترین شرکت انرژی
                خورشیدی خاورمیانه تا سال ۱۴۱۰، با تکیه بر نوآوری، کیفیت و
                اعتماد مشتریان. می‌خواهیم نام SunTech مترادف با انرژی پاک
                و آینده‌ای روشن باشد.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" />
              ارزش‌های ما
              <span className="h-px w-8 bg-primary" />
            </div>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              آنچه به آن <span className="text-gradient-primary">باور</span>{' '}
              داریم
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon

              return (
                <div
                  key={v.title}
                  className={`${cardClass} group hover:-translate-y-1`}
                >
                  <div className={`${cardInner} p-5`}>
                    <div
                      className={`mb-4 flex size-11 items-center justify-center rounded-xl ${v.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <h3 className="mb-2 text-sm font-extrabold text-text">
                      {v.title}
                    </h3>

                    <p className="text-xs leading-6 text-muted">
                      {v.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${cardClass} mb-16`}>
          <div
            className={`${cardInner} grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-2`}
          >
            <div>
              <div className="mb-2 flex items-center gap-3 text-xs font-medium text-primary">
                <span className="h-px w-8 bg-primary" />
                چرا SunTech؟
              </div>

              <h2 className="mb-4 text-2xl font-extrabold sm:text-3xl">
                تفاوت ما با{' '}
                <span className="text-gradient-primary">دیگران</span>
              </h2>

              <p className="mb-6 text-sm leading-8 text-muted">
                در بازار شلوغ امروز، انتخاب درست سخت است. ما با تکیه بر
                تجربه، تخصص و تعهد واقعی به مشتری، تفاوت را در جزئیات
                می‌سازیم.
              </p>

              <ul className="space-y-3">
                {[
                  'تیم مهندسی متخصص با بیش از ۲۰ سال تجربه',
                  'استفاده از تجهیزات درجه یک با گارانتی معتبر',
                  'پشتیبانی واقعی و پاسخگو پس از نصب',
                  'طراحی اختصاصی متناسب با نیاز هر پروژه',
                  'قیمت‌گذاری شفاف و بدون هزینه‌های پنهان',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-text/90"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check size={12} />
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className={cardClass}>
                <div className={`${cardInner} p-[3px]`}>
                  <Img
                    src="/images/about-team.jpg"
                    alt="تیم مهندسی SunTech"
                    className="aspect-[4/3] w-full rounded-[13px] object-cover"
                  />
                </div>
              </div>

              <Stats />
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" />
              نظرات مشتریان
              <span className="h-px w-8 bg-primary" />
            </div>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              مشتریان ما چه{' '}
              <span className="text-gradient-primary">می‌گویند</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className={cardClass}>
                <div className={`${cardInner} relative p-5`}>
                  <Quote
                    size={28}
                    className="absolute end-4 top-4 text-primary/20"
                  />

                  <div className="mb-3 flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className="fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-text/90">
                    «{t.text}»
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="size-10 shrink-0 overflow-hidden rounded-full border border-white/15 bg-bg/60">
                      <Img
                        src={t.avatar}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-text">
                        {t.name}
                      </div>

                      <div className="text-[10px] text-muted">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-3 text-xs font-medium text-primary">
              <span className="h-px w-8 bg-primary" />
              تیم ما
              <span className="h-px w-8 bg-primary" />
            </div>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              افراد <span className="text-gradient-primary">پشت صحنه</span>
            </h2>
          </div>

          <div
            dir="ltr"
            className="relative mx-auto hidden aspect-[560/430] w-full max-w-[680px] lg:block"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[15%] top-[25%] size-[65%] rounded-full border border-secondary/15 shadow-[0_0_70px_rgba(22,139,255,0.15)]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-[22%] top-[32%] size-[50%] rounded-full border border-secondary/20"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6%] left-[8%] h-8 w-[84%] rounded-[100%] bg-secondary/25 blur-2xl"
            />

            <OrbitRing />

            {TEAM.slice(0, 3).map((m, i) => (
              <FloatCard
                key={m.name}
                image={m.image}
                title={m.name}
                subtitle={m.role}
                style={cardStyles[i]}
              />
            ))}
          </div>

          <div
            dir="ltr"
            className="relative mt-6 flex flex-col items-center gap-14 px-6 pb-6 sm:gap-16 lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[15%] inset-y-0 -z-10 rounded-full bg-secondary/10 blur-[90px]"
            />

            {TEAM.map((m, i) => (
              <StackCard
                key={m.name}
                image={m.image}
                title={m.name}
                subtitle={m.role}
                style={cardStyles[i % cardStyles.length]}
              />
            ))}
          </div>

          <div className="mt-6 hidden justify-center lg:flex">
            <div className="w-[220px]">
              <StackCard
                image={TEAM[3].image}
                title={TEAM[3].name}
                subtitle={TEAM[3].role}
                style={cardStyles[1]}
              />
            </div>
          </div>
        </div>

        <div className={`${cardClass} relative`}>
          <div
            className={`${cardInner} relative overflow-hidden p-8 text-center sm:p-12`}
          >
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative">
              <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">
                بیایید با هم آینده‌ای{' '}
                <span className="text-gradient-primary">روشن</span> بسازیم
              </h2>

              <p className="mx-auto mb-6 max-w-lg text-sm leading-8 text-muted">
                اگر به انرژی پاک باور دارید و می‌خواهید پروژه‌تان را شروع
                کنید، ما اینجاییم تا کمکتان کنیم.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-extrabold text-bg shadow-[0_10px_30px_-10px_rgba(255,149,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,149,0,0.65)]"
                >
                  درخواست مشاوره
                  <ArrowUpLeft size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-text transition hover:border-secondary/50 hover:bg-white/[0.08]"
                >
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
