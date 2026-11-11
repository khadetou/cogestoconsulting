import { useEffect, useRef, useState } from "react"
import { Maximize, Minimize, Pause, Play, RotateCcw } from "lucide-react"

const controlClass =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1c792]"

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`
}

export function PactesBannerPlayer({ src, poster, durationHint }: { src: string; poster: string; durationHint: number }) {
  const frameRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playButtonRef = useRef<HTMLButtonElement>(null)
  const expandButtonRef = useRef<HTMLButtonElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [playback, setPlayback] = useState<"idle" | "playing" | "paused" | "ended">("idle")
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const playing = playback === "playing"
  const ended = playback === "ended"
  const PlayIcon = playing ? Pause : ended ? RotateCcw : Play
  const ExpandIcon = expanded ? Minimize : Maximize

  useEffect(() => {
    setEnhanced(true)
  }, [])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      if (video.ended) video.currentTime = 0
      void video.play().catch(() => {
        if (video.error) setHasError(true)
      })
    } else {
      video.pause()
    }
  }

  function toggleExpanded() {
    const frame = frameRef.current
    if (!frame) return
    if (expanded) {
      frame.close()
      return
    }
    // Promote the existing player to a modal without reloading the video.
    frame.removeAttribute("open")
    frame.showModal()
    setExpanded(true)
    expandButtonRef.current?.focus()
  }

  return (
    <dialog
      ref={frameRef}
      open
      role={expanded ? "dialog" : "group"}
      aria-label="Lecteur vidéo PACTES"
      className="group relative inset-auto m-0 flex w-full max-w-none flex-col overflow-hidden rounded-[26px] bg-[#111a2b] text-white [&:modal]:fixed [&:modal]:inset-0 [&:modal]:h-full [&:modal]:max-h-none [&:modal]:rounded-none"
      onClose={(event) => {
        event.currentTarget.show()
        setExpanded(false)
        expandButtonRef.current?.focus()
      }}
    >
      <div className="relative flex aspect-video min-h-0 items-center justify-center bg-[#080e18] group-[:modal]:aspect-auto group-[:modal]:flex-1">
        <video
          ref={videoRef}
          aria-label="Extrait d’un atelier PACTES"
          className="block size-full object-contain"
          controls={!enhanced}
          muted
          playsInline
          poster={poster}
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onPlay={() => setPlayback("playing")}
          onPause={(event) => {
            if (!event.currentTarget.ended) setPlayback("paused")
          }}
          onEnded={() => setPlayback("ended")}
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" onError={() => setHasError(true)} />
          <a href={src}>Ouvrir l’extrait</a>
        </video>
        {enhanced && !hasError && !playing && (
          <div className="absolute inset-0 grid place-items-center bg-black/20">
            <button
              type="button"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/30 bg-[#111a2b]/95 py-1.5 pl-1.5 pr-5 text-sm font-semibold shadow-lg transition-colors hover:bg-[#1c2a43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1c792]"
              onClick={() => {
                playButtonRef.current?.focus()
                togglePlayback()
              }}
            >
              <span className="grid size-10 place-items-center rounded-full bg-[#e1c792] text-[#111a2b] sm:size-12">
                <PlayIcon aria-hidden="true" className={ended ? "size-5" : "ml-0.5 size-5 fill-current"} />
              </span>
              {ended ? "Revoir l’extrait" : playback === "paused" ? "Reprendre" : "Voir l’extrait"}
            </button>
          </div>
        )}
        {enhanced && hasError && (
          <div className="absolute inset-0 grid place-items-center bg-[#111a2b]/90 p-4 text-center text-sm">
            <div>
              <p>La vidéo est indisponible dans le lecteur.</p>
              <a href={src} className="mt-2 inline-block font-semibold text-[#e1c792] underline">Ouvrir le fichier vidéo</a>
              {expanded && (
                <button type="button" className="mx-auto mt-3 block rounded-lg border border-white/30 px-4 py-2" onClick={toggleExpanded}>
                  Fermer la vue agrandie
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {enhanced && !hasError && (
        <div className="flex items-center gap-1 border-t border-white/10 px-2 py-1 sm:gap-2 sm:px-3">
          <button
            ref={playButtonRef}
            type="button"
            aria-label={playing ? "Mettre en pause" : ended ? "Revoir la vidéo" : "Lire la vidéo"}
            className={controlClass}
            onClick={togglePlayback}
          >
            <PlayIcon aria-hidden="true" className={ended ? "size-4" : "size-4 fill-current"} />
          </button>
          <span className="shrink-0 whitespace-nowrap text-[11px] tabular-nums text-white/75 sm:text-xs">
            {formatTime(time)} <span className="text-white/45">/</span> {formatTime(duration || durationHint)}
          </span>
          <input
            type="range"
            aria-label="Position de lecture"
            aria-valuetext={`${Math.floor(time)} secondes sur ${Math.floor(duration)}`}
            className="h-11 min-w-0 flex-1 cursor-pointer rounded-sm accent-[#e1c792] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1c792] disabled:cursor-default disabled:opacity-50"
            min={0}
            max={duration || 1}
            step={0.1}
            value={time}
            disabled={!duration}
            onChange={(event) => {
              const video = videoRef.current
              if (!video) return
              const nextTime = Number(event.currentTarget.value)
              video.currentTime = nextTime
              setTime(nextTime)
              if (ended && nextTime < duration) setPlayback("paused")
            }}
          />
          <button
            ref={expandButtonRef}
            type="button"
            aria-label={expanded ? "Fermer la vue agrandie" : "Agrandir la vidéo"}
            className={controlClass}
            onClick={toggleExpanded}
          >
            <ExpandIcon aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </dialog>
  )
}
