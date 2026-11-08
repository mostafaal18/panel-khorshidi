import { ArrowLeft, Phone } from 'lucide-react'

export default function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden ">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/contact-banner.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          
        </div>

        <div className="relative z-10 flex min-h-[230px] flex-col items-center justify-between gap-8 px-7 py-10 text-center md:flex-row md:px-12 md:text-right">

          <a
            href="tel:02112345678"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,160,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,160,0,0.55)]"
          >
            تماس با ما
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 group-hover:-translate-x-1">
              <ArrowLeft size={17} />
            </span>
          </a>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-400/40 bg-orange-400/15 shadow-[0_0_30px_rgba(255,160,0,0.2)]">
              <Phone size={30} className="text-orange-500" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-center gap-3 text-xs font-bold text-orange-600 md:justify-start bg-gray-900 md:bg-transparent rounded-2xl px-8">
                <span className="h-px w-7 bg-orange-50" />
                همیشه در دسترس شما هستیم
              </div>

              <h3 className="text-xl font-extrabold text-slate-200 bg-gray-900 md:bg-transparent rounded-2xl sm:text-2xl">
                با ما در ارتباط باشید
              </h3>

              <p className="mt-2 text-xs leading-7 text-slate-20 sm:text-sm bg-gray-900 md:bg-transparent rounded-2xl px-8 ">
                برای دریافت مشاوره و استعلام قیمت، با ما تماس بگیرید.
              </p>
            </div>
          </div>

        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
      </div>
    </section>
  )
}