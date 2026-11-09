// src/utils/image.js

/**
 * آدرس پایهٔ API (بدون /api در انتها).
 * در Vite متغیرها باید با VITE_ شروع شوند.
 *
 * .env:
 *   VITE_API_URL=http://localhost:3000/api
 */
const RAW_API_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
  'http://localhost:3000/api'

export const API_BASE_URL = String(RAW_API_URL)
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '')

/** تصویر جایگزین در صورت خالی/نامعتبر بودن */
export const PLACEHOLDER_IMAGE = '/images/placeholder.png'

/**
 * تبدیل هر ورودی به URL معتبر تصویر.
 *
 * پشتیبانی از:
 *  - رشته: 'product-1.jpg'، '/uploads/p.jpg'، 'https://...'
 *  - آبجکت: { url }, { image_url }, { src }
 *  - data: / blob:
 *  - آدرس‌های نسبی و مطلق
 *
 * @param {string | { url?: string; image_url?: string; src?: string } | null | undefined} input
 * @returns {string}
 */
export function getImageUrl(input) {
  // پشتیبانی از شکل آبجکتی
  let url = input
  if (url && typeof url === 'object') {
    url = url.url || url.image_url || url.src || ''
  }

  if (typeof url !== 'string' || !url.trim()) {
    return PLACEHOLDER_IMAGE
  }

  const cleanUrl = url.trim()

  // data: / blob: → دست نخورده
  if (
    cleanUrl.startsWith('data:') ||
    cleanUrl.startsWith('blob:')
  ) {
    return cleanUrl
  }

  // http / https → مطلق
  if (
    cleanUrl.startsWith('http://') ||
    cleanUrl.startsWith('https://')
  ) {
    return cleanUrl
  }

  // //cdn.example.com/... → protocol-relative
  if (cleanUrl.startsWith('//')) {
    return cleanUrl
  }

  // مسیر نسبی
  const normalizedUrl = cleanUrl.startsWith('/')
    ? cleanUrl
    : `/${cleanUrl}`

  return `${API_BASE_URL}${normalizedUrl}`.replace(
    /([^:]\/)\/+/g,
    '$1',
  )
}

/**
 * بررسی معتبر بودن URL تصویر (بدون نیاز به درخواست).
 * @param {string | null | undefined} url
 * @returns {boolean}
 */
export function isImageUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false
  const clean = url.trim()
  return (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('data:') ||
    clean.startsWith('blob:') ||
    clean.startsWith('/') ||
    clean.startsWith('//')
  )
}