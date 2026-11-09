import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart' // ← از pages
import PageBackground from './components/PageBackground'
import MobileBottomNav from './components/MobileBottomNav'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import Consultation from './pages/Consultation'
import About from './pages/About'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import ProfileLayout from './layouts/ProfileLayout'
import ProfileHome from './pages/profile/ProfileHome'
import ProfileOrders from './pages/profile/ProfileOrders'
import ProfileWishlist from './pages/profile/ProfileWishlist'
import ProfileAddresses from './pages/profile/ProfileAddresses'
import ProfileNotifications from './pages/profile/ProfileNotifications'
import ProfilePlaceholder from './pages/profile/ProfilePlaceholder'
import { CreditCard, HelpCircle, Mail, RotateCcw, Star, Wallet } from 'lucide-react'

export default function App() {
  const { pathname } = useLocation()

  // آیتم فعال نوبار موبایل بر اساس مسیر
  const active =
    pathname === '/' ? 'home' : pathname.startsWith('/cart') ? 'cart' : ''

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-page">
      <PageBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />   {/* ← جدید */}
          <Route path="/about" element={<About />} />   {/* ← جدید */}
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
{/* <Route path="/profile" element={<Profile/>} /> */}



   <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfileHome />} />
        <Route path="orders" element={<ProfileOrders />} />
        <Route path="wishlist" element={<ProfileWishlist />} />
        <Route path="addresses" element={<ProfileAddresses />} />
        <Route path="notifications" element={<ProfileNotifications />} />
        <Route
          path="returns"
          element={<ProfilePlaceholder title="مرجوعی‌ها" desc="لیست درخواست‌های مرجوعی شما." icon={RotateCcw} />}
        />
        <Route
          path="refunds"
          element={<ProfilePlaceholder title="بازگشت وجه" desc="وضعیت بازگشت وجه‌های شما." icon={Wallet} />}
        />
        <Route
          path="payments"
          element={<ProfilePlaceholder title="پرداخت‌ها" desc="تاریخچهٔ پرداخت‌های شما." icon={CreditCard} />}
        />
        <Route
          path="reviews"
          element={<ProfilePlaceholder title="نظرات من" desc="نظرات ثبت‌شدهٔ شما." icon={Star} />}
        />
        <Route
          path="questions"
          element={<ProfilePlaceholder title="سوالات من" desc="سوالات شما و پاسخ‌ها." icon={HelpCircle} />}
        />
        <Route
          path="contact-messages"
          element={<ProfilePlaceholder title="پیام‌های من" desc="پیام‌های ارسال‌شده به پشتیبانی." icon={Mail} />}
        />
      </Route>



          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav active={active} />
    </div>
  )
}