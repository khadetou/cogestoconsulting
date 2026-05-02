export function TeamPortrait({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(180deg,#fbfbf8_0%,#f5f2ec_100%)]">
      <div className="relative size-42 overflow-hidden rounded-full bg-white shadow-[0_18px_40px_rgba(21,32,54,0.1)] sm:size-48">
        <img
          src={src}
          alt={alt}
          className="h-full w-full scale-[2.05] object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
