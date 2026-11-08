// تصویر با پس‌زمینه گرادینتی تا وقتی عکس واقعی در public/images نیست، صفحه خالی نماند
export default function Img({ src, alt = '', className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-secondary/40 via-card to-bg-secondary ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}
