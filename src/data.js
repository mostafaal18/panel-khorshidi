export const navLinks = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'خدمات', href: '#services' },
  { label: 'محصولات', href: '#services' },
  { label: 'پروژه‌ها', href: '#projects' },
  { label: 'درباره ما', href: '#about' },
  { label: 'تماس با ما', href: '#contact' },
]

export const stats = [
  { icon: 'Leaf', title: 'کاهش', sub: 'انتشار کربن' },
  { icon: 'Settings', title: 'بیش از ۵۰', sub: 'پروژه موفق' },
  { icon: 'Zap', title: 'تا ۹۵٪', sub: 'بازدهی انرژی' },
  { icon: 'ShieldCheck', title: '۲۵ سال', sub: 'ضمانت کیفیت' },
]

export const services = [
  { title: 'نیروگاه‌های خورشیدی', icon: 'Sun', img: '/images/service-1.jpg' },
  { title: 'پنل‌های خانگی و تجاری', icon: 'Home', img: '/images/service-2.jpg' },
  { title: 'نیروگاه‌های صنعتی', icon: 'Factory', img: '/images/service-3.jpg' },
]

export const serviceBullets = ['طراحی و مشاوره تخصصی', 'نصب حرفه‌ای و استاندارد', 'پشتیبانی و خدمات پس از فروش']

export const projects = [
  { title: 'نیروگاه بیابانی', img: '/images/project-1.jpg' },
  { title: 'ویلای خورشیدی', img: '/images/project-2.jpg' },
  { title: 'مزرعه خورشیدی', img: '/images/project-3.jpg' },
  { title: 'کارخانه صنعتی', img: '/images/project-4.jpg' },
  { title: 'پروژه تجاری', img: '/images/project-5.jpg' },
]

export const faqs = [
  { q: 'پنل‌های خورشیدی چه مزایایی دارند؟', a: 'کاهش قبض برق، تولید انرژی پاک، عمر طولانی و نیاز کم به نگهداری.' },
  { q: 'هزینه نصب چقدر است؟', a: 'هزینه بسته به ظرفیت و نوع سیستم متفاوت است؛ برای برآورد دقیق با ما تماس بگیرید.' },
  { q: 'آیا در روزهای ابری هم برق تولید می‌شود؟', a: 'بله، با راندمان کمتر. سیستم‌های ما برای شرایط مختلف آب‌وهوایی طراحی می‌شوند.' },
]

export const testimonials = [
  { name: 'علی رضایی', role: 'مشتری محترم', text: 'از کیفیت کار و پشتیبانی تیم SunTech بسیار راضی هستیم. مصرف برق ما به شکل قابل توجهی کاهش پیدا کرده است.', avatar: '/images/avatar-1.jpg' },
  { name: 'سارا احمدی', role: 'مدیر مجتمع تجاری', text: 'نصب سریع و حرفه‌ای بود و هزینه‌های انرژی مجموعه ما واقعاً کم شد.', avatar: '/images/avatar-1.jpg' },
  { name: 'محمد کریمی', role: 'مدیر کارخانه', text: 'نیروگاه صنعتی ما طبق برنامه و با کیفیت عالی راه‌اندازی شد.', avatar: '/images/avatar-1.jpg' },
]

export const footerServices = ['نصب پنل خورشیدی', 'مشاوره و طراحی', 'تعمیر و پشتیبانی', 'نیروگاه‌های خورشیدی']
export const footerLinks = ['صفحه اصلی', 'درباره ما', 'پروژه‌ها', 'تماس با ما']

export const products = [
  {
    id: 1,
    slug: 'solar-panel-550w',
    title: 'پنل خورشیدی مونوکریستال ۵۵۰ وات',
    price: 12500000,
    final_price: 10500000,
    discount_percent: 16,
    main_image: '/images/product-1.jpg',
    images: [{ url: '/images/product-1.jpg' }],
  },
  {
    id: 2,
    slug: 'solar-inverter-5kw',
    title: 'اینورتر خورشیدی ۵ کیلوواتی هیبرید',
    price: 28000000,
    final_price: 25200000,
    discount_percent: 10,
    main_image: '/images/product-2.jpg',
    images: [{ url: '/images/product-2.jpg' }],
  },
  {
    id: 3,
    slug: 'solar-battery-200ah',
    title: 'باتری خورشیدی ۲۰۰ آمپر لیتیومی',
    price: 18000000,
    final_price: 18000000,
    discount_percent: 0,
    main_image: '/images/product-3.jpg',
    images: [{ url: '/images/product-3.jpg' }],
  },
  {
    id: 4,
    slug: 'solar-charge-controller-60a',
    title: 'کنترلر شارژ خورشیدی ۶۰ آمپر MPPT',
    price: 4500000,
    final_price: 3600000,
    discount_percent: 20,
    main_image: '/images/product-4.jpg',
    images: [{ url: '/images/product-4.jpg' }],
  },
  {
    id: 5,
    slug: 'solar-mounting-kit',
    title: 'کیت پایه و سازه نصب پنل خورشیدی',
    price: 7200000,
    final_price: 6480000,
    discount_percent: 10,
    main_image: '/images/product-5.jpg',
    images: [{ url: '/images/product-5.jpg' }],
  },
  {
    id: 6,
    slug: 'solar-cable-6mm',
    title: 'کابل خورشیدی ۶ میلی‌متر مقاوم به UV',
    price: 950000,
    final_price: 950000,
    discount_percent: 0,
    main_image: '/images/product-6.jpg',
    images: [{ url: '/images/product-6.jpg' }],
  },
]