type NameWithAvatarProps = {
  name: string
  avatarSrc: string
  avatarAlt: string
  className?: string
}

export function NameWithAvatar({ name, avatarSrc, avatarAlt, className = '' }: NameWithAvatarProps) {
  return (
    <span className={`inline-flex items-center gap-1 align-middle ${className}`.trim()}>
      <span>{name}</span>
      <img
        className="h-6 w-6 flex-none rounded-full bg-white ring-2 ring-slate-200 shadow-sm"
        src={avatarSrc}
        alt={avatarAlt}
      />
    </span>
  )
}
