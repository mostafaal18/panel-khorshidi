// src/utils/phone.js

/* ------------------------------------------------------------------ */
/* ارقام                                                               */
/* ------------------------------------------------------------------ */
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/**
 * تبدیل ارقام فارسی/عربی به انگلیسی.
 * @param {string | number} input
 * @returns {string}
 */
export function toEnglishDigits(input) {
  return String(input ?? '').replace(
    /[\u06F0-\u06F9\u0660-\u0669]/g,
    (d) => String(d.charCodeAt(0) & 0xf),
  )
}

/**
 * تبدیل ارقام انگلیسی به فارسی.
 * @param {string | number} input
 * @returns {string}
 */
export function toPersianDigits(input) {
  return String(input ?? '').replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)])
}

/* ------------------------------------------------------------------ */
/* نرمال‌سازی                                                          */
/* ------------------------------------------------------------------ */

/**
 * شماره را به فرمت استاندارد ایران (09xxxxxxxxx) نرمالایز می‌کند.
 *
 * مثال:
 *   +989121234567  → 09121234567
 *   00989121234567 → 09121234567
 *   989121234567   → 09121234567
 *   9121234567     → 09121234567
 *   ۰۹۱۲۱۲۳۴۵۶۷   → 09121234567
 *
 * @param {string | null | undefined} phone
 * @returns {string}
 */
export function normalizePhone(phone) {
  if (!phone) return ''

  let normalized = toEnglishDigits(phone).trim()

  // حذف فاصله، خط تیره، پرانتز و نقطه
  normalized = normalized.replace(/[\s\-().]/g, '')

  if (normalized.startsWith('+98')) {
    normalized = `0${normalized.slice(3)}`
  } else if (normalized.startsWith('0098')) {
    normalized = `0${normalized.slice(4)}`
  } else if (
    normalized.startsWith('98') &&
    normalized.length === 12
  ) {
    normalized = `0${normalized.slice(2)}`
  } else if (
    normalized.startsWith('9') &&
    normalized.length === 10
  ) {
    normalized = `0${normalized}`
  }

  return normalized
}

/* ------------------------------------------------------------------ */
/* اعتبارسنجی                                                          */
/* ------------------------------------------------------------------ */

/**
 * آیا شماره، یک موبایل معتبر ایران است؟
 * @param {string | null | undefined} phone
 * @returns {boolean}
 */
export function isValidIranianPhone(phone) {
  return /^09\d{9}$/.test(normalizePhone(phone))
}

/**
 * آیا شماره، یک تلفن ثابت معتبر ایران است؟ (۰۲۱ + ۸ رقم)
 * @param {string | null | undefined} phone
 * @returns {boolean}
 */
export function isValidIranianLandline(phone) {
  return /^0\d{2,3}\d{7,8}$/.test(normalizePhone(phone))
}

/* ------------------------------------------------------------------ */
/* خروجی برای API و نمایش                                              */
/* ------------------------------------------------------------------ */

/**
 * تبدیل به فرمت بین‌المللی برای ارسال به API.
 * اگر معتبر نبود، خروجی همان ورودی نرمال‌شده است.
 * @param {string | null | undefined} phone
 * @returns {string}
 */
export function formatPhoneForApi(phone) {
  const normalized = normalizePhone(phone)
  if (!/^09\d{9}$/.test(normalized)) return normalized
  return `+98${normalized.slice(1)}`
}

/**
 * فرمت خوانا برای نمایش: 0912 345 6789
 * @param {string | null | undefined} phone
 * @returns {string}
 */
export function formatPhoneForDisplay(phone) {
  const normalized = normalizePhone(phone)
  if (!/^09\d{9}$/.test(normalized)) return phone || ''
  return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`
}

/**
 * فرمت خوانا با ارقام فارسی: ۰۹۱۲ ۳۴۵ ۶۷۸۹
 * @param {string | null | undefined} phone
 * @returns {string}
 */
export function formatPhoneFa(phone) {
  return toPersianDigits(formatPhoneForDisplay(phone))
}

/**
 * پاک‌سازی ورودی کاربر به‌صورت زنده (برای onChange).
 * فقط رقم، حداکثر ۱۱ رقم.
 * @param {string} value
 * @returns {string}
 */
export function sanitizePhoneInput(value) {
  return toEnglishDigits(value).replace(/\D/g, '').slice(0, 11)
}

/**
 * ماسک کردن شماره برای حریم خصوصی: 0912***6789
 * @param {string | null | undefined} phone
 * @returns {string}
 */
export function maskPhone(phone) {
  const normalized = normalizePhone(phone)
  if (!/^09\d{9}$/.test(normalized)) return phone || ''
  return `${normalized.slice(0, 4)}***${normalized.slice(-4)}`
}