import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PageBackground from './components/PageBackground'

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-page">
      <PageBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}