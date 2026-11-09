// src/pages/profile/ProfilePlaceholder.jsx
import { Link } from 'react-router-dom'
import { PackageSearch, ArrowLeft } from 'lucide-react'

export default function ProfilePlaceholder({ title, desc, icon: Icon = PackageSearch }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-bg-secondary/40 p-10 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon size={28} />
      </div>
      <h3 className="mb-2 text-lg font-extrabold text-text">{title}</h3>
      <p className="mx-auto mb-5 max-w-md text-sm text-muted">{desc}</p>
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold text-text transition hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft size={12} /> بازگشت به پروفایل
      </Link>
    </div>
  )
}