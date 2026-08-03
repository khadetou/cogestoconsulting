type TeamPortraitProps = {
  alt: string
  imageScale?: number
  src: string
}

export function TeamPortrait({ alt, imageScale = 2.05, src }: TeamPortraitProps) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(180deg,#fbfbf8_0%,#f5f2ec_100%)]">
      <div className="relative size-42 overflow-hidden rounded-full bg-white shadow-[0_18px_40px_rgba(21,32,54,0.1)] sm:size-48">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
          style={{ transform: `scale(${imageScale})` }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
