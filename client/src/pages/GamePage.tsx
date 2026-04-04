import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChatBox } from '../components/ChatBox'
import { getStoryById } from '../services/api'
import type { Story } from '../constants/stories'

const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
} as const

const difficultyClasses = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-rose-100 text-rose-700',
} as const

export function GamePage() {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [story, setStory] = useState<Story | null>(null)

  useEffect(() => {
    const loadStory = async () => {
      if (!id) return
      
      setIsLoading(true)
      try {
        const data = await getStoryById(id)
        setStory(data)
      } catch (error) {
        console.error('加载谜题失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStory()
  }, [id])

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-8 text-slate-100 shadow-xl min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin mb-4" />
          <p className="text-sm sm:text-base text-indigo-300">正在加载案件档案...</p>
        </div>
      </section>
    )
  }

  if (!story) {
    return (
      <section className="rounded-2xl bg-brand-card p-6 sm:p-8 shadow-sm ring-1 ring-slate-200 text-center animate-fade-in">
        <p className="text-sm font-semibold text-rose-500">错误</p>
        <h1 className="mt-3 text-xl sm:text-2xl font-bold text-slate-800">未找到该案件</h1>
        <p className="mt-4 text-sm sm:text-base text-slate-500">抱歉，找不到ID为 "{id}" 的故事。</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-brand-primary px-5 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
        >
          返回案件列表
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-4 sm:p-6 text-white shadow-xl animate-fade-in">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${difficultyClasses[story.difficulty]}`}>
                {difficultyLabels[story.difficulty]}
              </span>
              <span className="text-xs text-indigo-300">案件编号: {story.id}</span>
            </div>
            <h1 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{story.title}</h1>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 rounded-xl bg-white/10 p-3 sm:p-4 backdrop-blur">
          <p className="text-xs sm:text-sm font-semibold text-indigo-300 mb-2">汤面（题面）</p>
          <p className="text-sm sm:text-base leading-7 text-slate-200">{story.surface}</p>
        </div>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-indigo-300">
          小提示：你可以向我提问，我只能回答"是"、"不是"或"不相关"哦！
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <ChatBox story={story} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-200 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="rounded-lg border border-slate-300 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          >
            返回列表
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <Link
            to={`/result/${story.id}`}
            className="rounded-lg border border-amber-300 bg-amber-50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-amber-700 hover:bg-amber-100 active:scale-95 transition-all"
          >
            查看汤底
          </Link>
          <Link
            to="/"
            className="rounded-lg bg-slate-800 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-700 active:scale-95 transition-all"
          >
            结束游戏
          </Link>
        </div>
      </div>
    </section>
  )
}
