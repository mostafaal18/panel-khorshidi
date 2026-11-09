import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import About from '../components/About'
import Projects from '../components/Projects'
import Faq from '../components/Faq'
import Testimonials from '../components/Testimonials'
import ContactCta from '../components/ContactCta'
import ProductsSlider from '../components/product/ProductsSlider'
import BlogSlider from '../components/BlogSlider'
import BrandsSlider from '../components/BrandsSlider'
import TopCategories from '../components/TopCategories'   // ← اضافه شد

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SunTech | راهکارهای هوشمند انرژی خورشیدی</title>
        <meta name="description" content="طراحی، نصب و پشتیبانی پنل‌های خورشیدی خانگی، تجاری و صنعتی" />
      </Helmet>

      <Hero />
      <Stats />
      <TopCategories />        {/* ← اینجا */}
      <ProductsSlider />

      <Services />
      <BrandsSlider />
      <About />
      <Projects />

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <Testimonials />
        <Faq />
      </section>

      <BlogSlider />
      <ContactCta />
    </>
  )
}