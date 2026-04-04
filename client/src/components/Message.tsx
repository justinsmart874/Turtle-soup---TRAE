import { kittenAvatar, rabbitAvatar } from '../assets/avatars'

type MessageRole = 'user' | 'assistant'

interface MessageProps {
  message: {
    role: MessageRole
    content: string
    isError?: boolean
  }
}

const roleConfig = {
  user: {
    avatar: kittenAvatar,
    name: '你',
    containerClass: 'flex-row-reverse',
    bubbleClass: 'bg-blue-50 text-slate-800 ring-1 ring-blue-100',
    alignClass: 'items-end',
  },
  assistant: {
    avatar: rabbitAvatar,
    name: '小兔叽',
    containerClass: 'flex-row',
    bubbleClass: 'bg-white text-slate-800 ring-1 ring-slate-200',
    alignClass: 'items-start',
  },
}

export function Message({ message }: MessageProps) {
  const config = roleConfig[message.role]
  const bubbleClass = message.isError 
    ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200' 
    : config.bubbleClass

  return (
    <div className={`flex ${config.containerClass} gap-2 sm:gap-3 ${config.alignClass} animate-slide-up`}>
      <div className="flex flex-col gap-1 shrink-0">
        <img
          src={config.avatar}
          alt={`${config.name}头像`}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white ring-2 ring-slate-200 shadow-sm hover:scale-110 transition-transform"
        />
        <span className="text-xs text-slate-500 text-center hidden sm:block">{config.name}</span>
      </div>

      <div className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base leading-6 ${bubbleClass} hover:shadow-md transition-shadow`}>
        {message.content}
      </div>
    </div>
  )
}
