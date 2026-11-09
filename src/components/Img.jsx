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


// // src/components/Img.jsx
// import { getImageUrl, PLACEHOLDER_IMAGE } from '../utils/image'

// export default function Img({
//   src,
//   alt = '',
//   className = '',
//   ...rest
// }) {
//   const resolved = getImageUrl(src)

//   return (
//     <img
//       src={resolved}
//       alt={alt}
//       className={className}
//       loading="lazy"
//       onError={(e) => {
//         if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
//           e.currentTarget.src = PLACEHOLDER_IMAGE
//         }
//       }}
//       {...rest}
//     />
//   )
// }