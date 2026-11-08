import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate min-h-[520px] overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/about.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#06172b]/35 via-transparent to-[#06172b]/10" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-20">
        <div className="ms-auto w-full max-w-md text-right">
          <div className="mb-3 flex items-center gap-3 text-xs font-bold text-primary">
            <span className="h-px w-8 bg-primary" />
            آینده‌ای سبز، با ما آغاز می‌شود
          </div>

          <SectionHeading
            title={
              <>
                درباره <span className="text-gradient-primary">شرکت ما</span>
              </>
            }
          />

          <p className="mt-5 text-sm leading-7 text-slate-200 bg-gray-900 md:bg-transparent rounded-2xl px-8 ">
            شرکت SunTech با سال‌ها تجربه در حوزه انرژی‌های تجدیدپذیر،
            با بهره‌گیری از جدیدترین تکنولوژی‌ها، راهکارهای مطمئن و
            مقرون‌به‌صرفه برای تأمین انرژی پاک ارائه می‌دهد.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-300 bg-gray-900 md:bg-transparent rounded-2xl px-8 ">
            هدف ما ساخت آینده‌ای پایدار، کاهش هزینه‌های انرژی و
            حفاظت از محیط زیست با استفاده از انرژی خورشیدی است.
          </p>

          <a
            href="#contact"
            className="mt-7 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,160,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,160,0,0.5)]"
          >
            بیشتر بدانید
          </a>
        </div>
      </div>
    </section>
  )
}