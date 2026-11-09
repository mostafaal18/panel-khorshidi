export const navLinks = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'خدمات', href: '/services' },
  { label: 'محصولات', href: '/products' },
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
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

export const serviceBullets = [
  'طراحی و مشاوره تخصصی',
  'نصب حرفه‌ای و استاندارد',
  'پشتیبانی و خدمات پس از فروش',
]

/* ============================================================
   پروژه‌ها — با ساختار کامل برای صفحهٔ لیست و صفحهٔ جزئیات
   ============================================================ */
export const projects = [
  {
    id: 1,
    slug: 'desert-power-plant',
    title: 'نیروگاه بیابانی',
    category: 'power',
    categoryLabel: 'نیروگاه خورشیدی',
    location: 'یزد، ایران',
    year: '۱۴۰۲',
    capacity: '۱۰ مگاوات',
    img: '/images/project-1.jpg',
    images: [
      '/images/project-1.jpg',
      '/images/project-1-2.jpg',
      '/images/project-1-3.jpg',
      '/images/project-1-4.jpg',
    ],
    shortDesc:
      'بزرگ‌ترین نیروگاه خورشیدی منطقه با پنل‌های مونوکریستال پیشرفته و بازدهی بالا در شرایط سخت بیابانی.',
    description: `پروژهٔ نیروگاه خورشیدی بیابانی در زمینی به مساحت ۲۰ هکتار در استان یزد اجرا شد. چالش اصلی این پروژه، شرایط سخت آب‌وهوایی بیابان شامل طوفان‌های شن، دمای بالای تابستان و اختلاف دمای زیاد شب و روز بود.

تیم مهندسی ما با طراحی سازه‌های مقاوم در برابر طوفان شن، استفاده از پنل‌های دوطرفه (bifacial) و سیستم شست‌وشوی خودکار پنل‌ها، توانست بازدهی نیروگاه را حتی در سخت‌ترین شرایط حفظ کند.

این نیروگاه سالانه بیش از ۱۸٬۰۰۰ مگاوات‌ساعت برق پاک تولید می‌کند که معادل صرفه‌جویی ۱۲٬۰۰۰ تن CO2 در سال است.`,
    specs: [
      { label: 'مساحت', value: '۲۰ هکتار' },
      { label: 'تعداد پنل', value: '۲۴٬۰۰۰ عدد' },
      { label: 'نوع پنل', value: 'مونوکریستال دوطرفه' },
      { label: 'مدت اجرا', value: '۱۴ ماه' },
      { label: 'بازدهی سالانه', value: '۱۸٬۵۰۰ مگاوات‌ساعت' },
      { label: 'کاهش CO2', value: '۱۲٬۰۰۰ تن در سال' },
    ],
    highlights: [
      'طراحی مقاوم در برابر طوفان شن',
      'سیستم شست‌وشوی خودکار پنل‌ها',
      'مانیتورینگ از راه دور ۲۴/۷',
      'بازگشت سرمایه در ۵ سال',
    ],
  },
  {
    id: 2,
    slug: 'solar-villa-tehran',
    title: 'ویلای خورشیدی',
    category: 'residential',
    categoryLabel: 'مسکونی',
    location: 'تهران، ایران',
    year: '۱۴۰۳',
    capacity: '۵ کیلووات',
    img: '/images/project-2.jpg',
    images: [
      '/images/project-2.jpg',
      '/images/project-2-2.jpg',
      '/images/project-2-3.jpg',
    ],
    shortDesc:
      'سیستم خورشیدی خانگی با اتصال به شبکه، نصب‌شده روی سقف ویلای مدرن با طراحی مینیمال و بدون تغییر در نمای ساختمان.',
    description: `این پروژه شامل طراحی و نصب یک سیستم خورشیدی ۵ کیلوواتی روی سقف ویلایی در شمال تهران بود. چالش اصلی، حفظ زیبایی نمای ساختمان و هماهنگی پنل‌ها با معماری مدرن ویلا بود.

با استفاده از پنل‌های تمام‌مشکی (all-black) و سازه‌های کم‌ارتفاع، سیستم به‌گونه‌ای نصب شد که از نمای خیابان تقریباً نامرئی باشد.

سیستم به شبکهٔ برق متصل است و در ساعات کم‌مصرف، برق اضافی به شبکه فروخته می‌شود. صاحب ویلا اعلام کرده که قبض برق او به کمتر از ۱۰٪ قبل رسیده است.`,
    specs: [
      { label: 'ظرفیت', value: '۵ کیلووات' },
      { label: 'تعداد پنل', value: '۱۰ عدد' },
      { label: 'نوع پنل', value: 'مونوکریستال تمام‌مشکی' },
      { label: 'اینورتر', value: 'هیبرید ۵ کیلووات' },
      { label: 'مدت اجرا', value: '۳ روز' },
      { label: 'بازدهی سالانه', value: '۷٬۵۰۰ کیلووات‌ساعت' },
    ],
    highlights: [
      'طراحی هماهنگ با نمای مدرن ویلا',
      'اتصال به شبکه و فروش برق اضافی',
      'مانیتورینگ موبایلی مصرف',
      'گارانتی ۲۵ سالهٔ پنل‌ها',
    ],
  },
  {
    id: 3,
    slug: 'solar-farm-isfahan',
    title: 'مزرعه خورشیدی',
    category: 'power',
    categoryLabel: 'نیروگاه خورشیدی',
    location: 'اصفهان، ایران',
    year: '۱۴۰۱',
    capacity: '۵ مگاوات',
    img: '/images/project-3.jpg',
    images: [
      '/images/project-3.jpg',
      '/images/project-3-2.jpg',
      '/images/project-3-3.jpg',
      '/images/project-3-4.jpg',
    ],
    shortDesc:
      'مزرعه خورشیدی با مساحت وسیع، طراحی‌شده برای حداکثر جذب نور و تولید پایدار انرژی در تمام فصول سال.',
    description: `مزرعهٔ خورشیدی اصفهان در زمینی به مساحت ۸ هکتار و با هدف تولید ۵ مگاوات برق پاک احداث شد. این پروژه به‌دلیل نزدیکی به شبکهٔ سراسری برق، امکان تزریق مستقیم انرژی به شبکه را دارد.

برای بهینه‌سازی بازدهی، پنل‌ها با زاویهٔ ۳۰ درجه و به‌صورت ردیفی شرقی-غربی چیده شدند تا در تمام ساعات روز، حداکثر تابش دریافت شود.

سیستم مانیتورینگ مرکزی، عملکرد هر رشته از پنل‌ها را به‌صورت جداگانه پایش می‌کند و در صورت افت بازدهی، هشدار می‌دهد.`,
    specs: [
      { label: 'مساحت', value: '۸ هکتار' },
      { label: 'تعداد پنل', value: '۱۲٬۰۰۰ عدد' },
      { label: 'نوع پنل', value: 'مونوکریستال PERC' },
      { label: 'مدت اجرا', value: '۸ ماه' },
      { label: 'بازدهی سالانه', value: '۸٬۵۰۰ مگاوات‌ساعت' },
      { label: 'کاهش CO2', value: '۵٬۸۰۰ تن در سال' },
    ],
    highlights: [
      'چیدمان بهینهٔ شرقی-غربی پنل‌ها',
      'مانیتورینگ رشته‌ای پنل‌ها',
      'اتصال مستقیم به شبکهٔ سراسری',
      'بازگشت سرمایه در ۴ سال',
    ],
  },
  {
    id: 4,
    slug: 'industrial-factory-karaj',
    title: 'کارخانه صنعتی',
    category: 'industrial',
    categoryLabel: 'صنعتی',
    location: 'کرج، ایران',
    year: '۱۴۰۲',
    capacity: '۵۰۰ کیلووات',
    img: '/images/project-4.jpg',
    images: [
      '/images/project-4.jpg',
      '/images/project-4-2.jpg',
      '/images/project-4-3.jpg',
    ],
    shortDesc:
      'نیروگاه صنعتی برای تأمین برق کارخانه با کاهش چشمگیر هزینه‌های انرژی و بازگشت سرمایهٔ سریع.',
    description: `این پروژه برای تأمین بخشی از برق مصرفی یک کارخانهٔ تولیدی در شهرک صنعتی کرج اجرا شد. چالش اصلی، نصب سیستم روی سقف‌های صنعتی با سازه‌های موجود و بدون توقف خط تولید بود.

تیم ما با برنامه‌ریزی دقیق، نصب را در ساعات تعطیلی کارخانه انجام داد و هیچ وقفه‌ای در تولید ایجاد نشد.

سیستم به‌صورت هیبرید طراحی شده و در صورت قطع برق شبکه، بخش حیاتی کارخانه (سیستم‌های IT و روشنایی اضطراری) را پشتیبانی می‌کند.`,
    specs: [
      { label: 'ظرفیت', value: '۵۰۰ کیلووات' },
      { label: 'تعداد پنل', value: '۹۱۰ عدد' },
      { label: 'نوع پنل', value: 'مونوکریستال ۵۵۰ وات' },
      { label: 'اینورتر', value: '۳ عدد ۱۵۰ کیلوواتی' },
      { label: 'مدت اجرا', value: '۴۵ روز' },
      { label: 'بازدهی سالانه', value: '۷۵۰ مگاوات‌ساعت' },
    ],
    highlights: [
      'نصب بدون توقف خط تولید',
      'سیستم هیبرید با پشتیبانی اضطراری',
      'کاهش ۳۰٪ هزینهٔ برق کارخانه',
      'بازگشت سرمایه در ۳.۵ سال',
    ],
  },
  {
    id: 5,
    slug: 'commercial-mall-mashhad',
    title: 'پروژه تجاری',
    category: 'commercial',
    categoryLabel: 'تجاری',
    location: 'مشهد، ایران',
    year: '۱۴۰۳',
    capacity: '۱۰۰ کیلووات',
    img: '/images/project-5.jpg',
    images: [
      '/images/project-5.jpg',
      '/images/project-5-2.jpg',
      '/images/project-5-3.jpg',
    ],
    shortDesc:
      'پروژهٔ خورشیدی مجتمع تجاری با سیستم مانیتورینگ هوشمند و کنترل از راه دور مصرف انرژی.',
    description: `نیروگاه خورشیدی ۱۰۰ کیلوواتی روی سقف یک مجتمع تجاری بزرگ در مشهد نصب شد. این پروژه با هدف کاهش هزینه‌های انرژی مشترکین و بهبود پایداری برق در ساعات پیک مصرف اجرا شد.

سیستم مانیتورینگ هوشمند، مصرف و تولید را به‌صورت لحظه‌ای مقایسه می‌کند و در ساعات پیک، بار سرمایشی مجتمع را به‌صورت خودکار کاهش می‌دهد.

این پروژه اولین مجتمع تجاری در مشهد است که به‌طور کامل با انرژی خورشیدی در ساعات روز کار می‌کند.`,
    specs: [
      { label: 'ظرفیت', value: '۱۰۰ کیلووات' },
      { label: 'تعداد پنل', value: '۱۸۲ عدد' },
      { label: 'نوع پنل', value: 'مونوکریستال ۵۵۰ وات' },
      { label: 'مدت اجرا', value: '۲۵ روز' },
      { label: 'بازدهی سالانه', value: '۱۵۰ مگاوات‌ساعت' },
      { label: 'کاهش CO2', value: '۱۰۰ تن در سال' },
    ],
    highlights: [
      'مانیتورینگ هوشمند مصرف و تولید',
      'کاهش خودکار بار در ساعات پیک',
      'پوشش کامل برق روز مجتمع',
      'بدون نیاز به باتری (grid-tied)',
    ],
  },
]

export const faqs = [
  {
    q: 'پنل‌های خورشیدی چه مزایایی دارند؟',
    a: 'کاهش قبض برق، تولید انرژی پاک، عمر طولانی و نیاز کم به نگهداری.',
  },
  {
    q: 'هزینه نصب چقدر است؟',
    a: 'هزینه بسته به ظرفیت و نوع سیستم متفاوت است؛ برای برآورد دقیق با ما تماس بگیرید.',
  },
  {
    q: 'آیا در روزهای ابری هم برق تولید می‌شود؟',
    a: 'بله، با راندمان کمتر. سیستم‌های ما برای شرایط مختلف آب‌وهوایی طراحی می‌شوند.',
  },
]

export const testimonials = [
  {
    name: 'علی رضایی',
    role: 'مشتری محترم',
    text: 'از کیفیت کار و پشتیبانی تیم SunTech بسیار راضی هستیم. مصرف برق ما به شکل قابل توجهی کاهش پیدا کرده است.',
    avatar: '/images/avatar-1.jpg',
  },
  {
    name: 'سارا احمدی',
    role: 'مدیر مجتمع تجاری',
    text: 'نصب سریع و حرفه‌ای بود و هزینه‌های انرژی مجموعه ما واقعاً کم شد.',
    avatar: '/images/avatar-1.jpg',
  },
  {
    name: 'محمد کریمی',
    role: 'مدیر کارخانه',
    text: 'نیروگاه صنعتی ما طبق برنامه و با کیفیت عالی راه‌اندازی شد.',
    avatar: '/images/avatar-1.jpg',
  },
]

export const footerServices = [
  'نصب پنل خورشیدی',
  'مشاوره و طراحی',
  'تعمیر و پشتیبانی',
  'نیروگاه‌های خورشیدی',
]
export const footerLinks = ['صفحه اصلی', 'درباره ما', 'پروژه‌ها', 'تماس با ما']
/* ============================================================
   فیلترهای محصولات
   ============================================================ */
export const productCategories = [
  { id: 'panel', label: 'پنل خورشیدی' },
  { id: 'inverter', label: 'اینورتر' },
  { id: 'battery', label: 'باتری' },
  { id: 'controller', label: 'کنترلر شارژ' },
  { id: 'structure', label: 'سازه و پایه' },
  { id: 'cable', label: 'کابل و اتصالات' },
]

export const productBrands = [
  { id: 'longi', label: 'Longi' },
  { id: 'huawei', label: 'Huawei' },
  { id: 'pylontech', label: 'Pylontech' },
  { id: 'victron', label: 'Victron' },
  { id: 'suntech', label: 'SunTech' },
]

export const productPriceRanges = [
  { id: 'all', label: 'همه قیمت‌ها', min: 0, max: Infinity },
  { id: 'under-5m', label: 'کمتر از ۵ میلیون تومان', min: 0, max: 5_000_000 },
  { id: '5-15m', label: '۵ تا ۱۵ میلیون تومان', min: 5_000_000, max: 15_000_000 },
  { id: '15-30m', label: '۱۵ تا ۳۰ میلیون تومان', min: 15_000_000, max: 30_000_000 },
  { id: 'over-30m', label: 'بیشتر از ۳۰ میلیون تومان', min: 30_000_000, max: Infinity },
]

export const productSortOptions = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'bestseller', label: 'پرفروش‌ترین' },
  { id: 'most-discount', label: 'بیشترین تخفیف' },
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'most-expensive', label: 'گران‌ترین' },
  { id: 'popular', label: 'محبوب‌ترین' },
]

/* ============================================================
   محصولات — با فیلدهای فیلتر
   ============================================================ */
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
    category: 'panel',
    brand: 'longi',
    rating: 4.8,
    review_count: 124,
    sold_count: 342,
    created_at: '2024-03-15',
    stock: 25,
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
    category: 'inverter',
    brand: 'huawei',
    rating: 4.7,
    review_count: 89,
    sold_count: 218,
    created_at: '2024-01-20',
    stock: 12,
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
    category: 'battery',
    brand: 'pylontech',
    rating: 4.9,
    review_count: 67,
    sold_count: 156,
    created_at: '2023-11-10',
    stock: 8,
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
    category: 'controller',
    brand: 'victron',
    rating: 4.6,
    review_count: 45,
    sold_count: 89,
    created_at: '2024-05-08',
    stock: 32,
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
    category: 'structure',
    brand: 'suntech',
    rating: 4.5,
    review_count: 32,
    sold_count: 412,
    created_at: '2023-08-22',
    stock: 50,
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
    category: 'cable',
    brand: 'suntech',
    rating: 4.4,
    review_count: 156,
    sold_count: 891,
    created_at: '2023-06-01',
    stock: 200,
  },
]