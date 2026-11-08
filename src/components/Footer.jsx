import {
  Phone,
  Mail,
  MapPin,
  Send,
  Briefcase, // جایگزین Linkedin
  MessageCircle,
  ArrowUpLeft,
  ArrowLeft,
  Zap,
  Camera, // ایمپورت شد
} from 'lucide-react'

import Logo from './Logo'
import { footerLinks, footerServices } from '../data'

const Col = ({ title, items }) => (
  <div>
    <h4 className="mb-5 flex items-center gap-3 text-sm font-extrabold text-white sm:text-base">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
      {title}
    </h4>

    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item}>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-xs text-slate-400 transition-all duration-300 hover:translate-x-[-3px] hover:text-primary sm:text-sm"
          >
            <ArrowLeft
              size={13}
              className="text-primary/0 transition-all duration-300 group-hover:text-primary"
            />
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const socials = [
  {
    icon: Camera,
    href: '#',
    label: 'Camera',
  },
  {
    icon: Send,
    href: '#',
    label: 'Telegram',
  },
  {
    icon: Briefcase, // آیکون جایگزین لینکدین
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: MessageCircle,
    href: '#',
    label: 'WhatsApp',
  },
]

const contactItems = [
  {
    icon: Phone,
    value: '021-12345678',
    href: 'tel:02112345678',
    dir: 'ltr',
  },
  {
    icon: Mail,
    value: 'info@suntech.ir',
    href: 'mailto:info@suntech.ir',
    dir: 'ltr',
  },
  {
    icon: MapPin,
    value: 'تهران، ایران',
    href: '#',
  },
]

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#020812]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-primary/70" />

      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[450px] rounded-full bg-secondary/[0.08] blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[400px] rounded-full bg-primary/[0.06] blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="space-y-5">
            <Logo large />

            <p className="max-w-sm text-sm leading-8 text-slate-400">
              با SunTech به دنیای انرژی پاک قدم بگذارید. ما با ارائه راهکارهای
              نوین خورشیدی، برای ساخت آینده‌ای روشن‌تر و پایدارتر تلاش می‌کنیم.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/[0.06] px-3.5 py-2 text-xs font-semibold text-success">
              <Zap size={14} />
              انرژی پاک، آینده روشن
            </div>
          </div>

          <Col title="خدمات ما" items={footerServices} />

          <Col title="دسترسی سریع" items={footerLinks} />

          <div>
            <h4 className="mb-5 flex items-center gap-3 text-sm font-extrabold text-white sm:text-base">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
              ارتباط با ما
            </h4>

            <ul className="space-y-4">
              {contactItems.map(({ icon: Icon, value, href, dir }) => (
                <li key={value}>
                  <a
                    href={href}
                    className="group flex items-center gap-3"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(255,149,0,0.1)]">
                      <Icon size={17} />
                    </span>

                    <span
                      dir={dir}
                      className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-white sm:text-sm"
                    >
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="mb-3 text-xs font-bold text-slate-300">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </p>

              <div className="flex flex-wrap gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary hover:shadow-[0_0_20px_rgba(22,139,255,0.15)]"
                  >
                    <Icon
                      size={17}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-12" />

        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-center text-[11px] leading-6 text-slate-500 sm:text-right sm:text-xs">
            © ۲۰۲۶ SunTech. تمامی حقوق محفوظ است.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 sm:text-xs">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-primary"
            >
              حریم خصوصی
            </a>

            <span className="h-3 w-px bg-white/10" />

            <a
              href="#"
              className="transition-colors duration-300 hover:text-primary"
            >
              قوانین و مقررات
            </a>

            <span className="h-3 w-px bg-white/10" />

            {/* href تکراری حذف شد */}
            <a
              href="#top"
              className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-primary"
            >
              بازگشت به بالا
              <ArrowUpLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}