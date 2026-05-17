import { cn } from '#/lib/utils'

type PartnerMarkProps = {
  laneId: string
  className?: string
}

export function PartnerMark({ laneId, className }: PartnerMarkProps) {
  const isOzone = laneId === 'ozone'

  return (
    <div
      className={cn(
        'relative flex size-14 items-center justify-center rounded-[1.15rem] border border-border/70 bg-card/25',
        isOzone && 'overflow-hidden border-transparent bg-transparent p-0',
        className,
      )}
      aria-hidden="true"
    >
      {laneId === 'documentation-stewards' ? (
        <svg
          viewBox="0 0 56 56"
          className="size-9 text-foreground/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="12" y="14" width="14" height="26" rx="5" />
          <rect x="30" y="18" width="14" height="18" rx="5" />
          <path d="M18 21h2m-2 6h6m-6 6h6m12-9h2m-2 6h4" />
        </svg>
      ) : null}
      {laneId === 'regional-communities' ? (
        <svg
          viewBox="0 0 56 56"
          className="size-9 text-foreground/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="18" cy="28" r="6" />
          <circle cx="38" cy="20" r="4" />
          <circle cx="38" cy="36" r="4" />
          <path d="M24 26l10-4m-10 6l10 6" />
        </svg>
      ) : null}
      {laneId === 'public-infrastructure' ? (
        <svg
          viewBox="0 0 56 56"
          className="size-9 text-foreground/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 36V20l14-8 14 8v16" />
          <path d="M20 36V24h16v12M24 30h8" />
        </svg>
      ) : null}
      {laneId === 'research-circles' ? (
        <svg
          viewBox="0 0 56 56"
          className="size-9 text-foreground/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="28" cy="28" r="10" />
          <circle cx="28" cy="28" r="3" />
          <path d="M28 12v6m0 20v6M12 28h6m20 0h6M17 17l4 4m14 14l4 4M17 39l4-4m14-14l4-4" />
        </svg>
      ) : null}
      {laneId === 'ozone' ? (
        <img
          src="/images/partners/ozone-logo.png"
          alt=""
          className="size-full object-cover"
        />
      ) : null}
    </div>
  )
}
