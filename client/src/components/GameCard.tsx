import { Link } from 'react-router-dom'
import type { Story } from '../constants/stories'

type GameCardProps = {
  story: Story
}

const difficultyLabels: Record<Story['difficulty'], string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const difficultyClasses: Record<Story['difficulty'], string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-rose-100 text-rose-700',
}

export function GameCard({ story }: GameCardProps) {
  return (
    <Link
      to={`/game/${story.id}`}
      className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 h-48"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-primary line-clamp-1">
          {story.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${difficultyClasses[story.difficulty]}`}
        >
          {difficultyLabels[story.difficulty]}
        </span>
      </div>

      <p className="mt-3 flex-1 line-clamp-3 text-sm leading-6 text-slate-600">
        {story.surface}
      </p>

      <div className="mt-auto flex items-center text-sm font-medium text-brand-primary">
        开始推理
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}
