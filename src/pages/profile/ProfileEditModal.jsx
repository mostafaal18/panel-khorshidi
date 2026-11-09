// src/components/modals/ProfileEditModal.jsx
import { useEffect, useState } from 'react'
import { X, User, Mail, Save, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white/[0.05] py-2.5 px-3.5 text-sm text-text placeholder:text-muted/60 outline-none transition focus:bg-white/[0.08] focus:ring-4 ${
    hasError
      ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/15'
      : 'border-white/20 hover:border-white/35 focus:border-secondary focus:ring-secondary/20'
  }`

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-300">
      <AlertCircle size={11} /> {message}
    </p>
  )
}

export default function ProfileEditModal({ isOpen, onClose, user, onSave }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setForm({ name: user?.name || '', email: user?.email || '' })
      setErrors({})
      setSaved(false)
    }
  }, [isOpen, user])

  useEffect(() => {
    if (!isOpen) return
    const handle = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }))
    setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'نام الزامی است'
    else if (form.name.trim().length < 2) err.name = 'نام باید حداقل ۲ کاراکتر باشد'
    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim()))
      err.email = 'فرمت ایمیل صحیح نیست'

    if (Object.keys(err).length > 0) {
      setErrors(err)
      return
    }

    setSaving(true)
    try {
      await new Promise((r) => setTimeout(r, 700)) // TODO: API
      onSave({ name: form.name.trim(), email: form.email.trim() })
      setSaved(true)
      setTimeout(() => onClose(), 900)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-bg-secondary/95 p-6 shadow-[0_25px_80px_-25px_rgba(22,139,255,0.55)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-text">ویرایش پروفایل</h2>
              <p className="mt-0.5 text-[11px] text-muted">
                نام و ایمیل خود را به‌روزرسانی کنید
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-text"
            aria-label="بستن"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text/80">
              نام و نام خانوادگی <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="نام شما"
                autoComplete="name"
                className={inputClass(!!errors.name) + ' pr-10'}
              />
            </div>
            <FieldError message={errors.name} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text/80">
              ایمیل <span className="text-[10px] font-normal text-muted">(اختیاری)</span>
            </label>
            <div className="relative">
              <Mail size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="example@mail.com"
                dir="ltr"
                autoComplete="email"
                className={inputClass(!!errors.email) + ' pr-10'}
              />
            </div>
            <FieldError message={errors.email} />
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                <CheckCircle2 size={13} /> ذخیره شد
              </span>
            )}
            <div className="ms-auto flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-muted transition hover:border-white/30 hover:text-text"
              >
                لغو
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-xs font-extrabold text-bg transition hover:shadow-[0_0_24px_rgba(255,149,0,0.55)] disabled:opacity-60"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                {saving ? 'در حال ذخیره...' : 'ذخیره'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}