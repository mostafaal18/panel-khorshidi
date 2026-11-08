export default function SectionHeading({ eyebrow, title, desc, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="mb-3 flex items-center gap-3 text-sm font-medium text-primary">
          <span className="h-px w-10 bg-primary" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
      {desc && <p className="mt-4 max-w-xl leading-8 text-muted">{desc}</p>}
    </div>
  )
}
