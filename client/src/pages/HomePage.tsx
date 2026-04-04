import { useState, useEffect } from 'react'
import { GameCard } from '../components/GameCard'
import { getStories } from '../services/api'
import type { Story, StoryDifficulty } from '../constants/stories'

type DifficultyOption = {
  value: StoryDifficulty | 'all'
  label: string
  className: string
}

const difficultyOptions: DifficultyOption[] = [
  { value: 'all', label: '全部难度', className: 'bg-indigo-100 text-indigo-700' },
  { value: 'easy', label: '简单', className: 'bg-emerald-100 text-emerald-700' },
  { value: 'medium', label: '中等', className: 'bg-amber-100 text-amber-700' },
  { value: 'hard', label: '困难', className: 'bg-rose-100 text-rose-700' },
]

const ITEMS_PER_PAGE = 6

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState<Story[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<StoryDifficulty | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadStories = async () => {
      setIsLoading(true)
      try {
        const data = await getStories()
        setStories(data)
        setCurrentPage(1) // 切换难度时重置到第一页
      } catch (error) {
        console.error('加载谜题失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStories()
  }, [])

  useEffect(() => {
    setCurrentPage(1) // 切换难度时重置到第一页
  }, [selectedDifficulty])

  const filteredStories = selectedDifficulty === 'all' 
    ? stories 
    : stories.filter(story => story.difficulty === selectedDifficulty)

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStories = filteredStories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-8 text-slate-100 shadow-xl min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin mb-4" />
          <p className="text-sm sm:text-base text-indigo-300">正在加载神秘案件档案...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-8 text-slate-100 shadow-xl animate-fade-in">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="relative">
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-indigo-300">神秘案件档案库</p>
        <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">AI海龟汤</h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-7 text-slate-300">
          欢迎来到侦探事务所。每张卡片都是一个待破解的悬疑案件，仔细阅读题面，提出聪明的问题，一步步逼近真相。
        </p>
      </div>

      <div className="relative mt-6 sm:mt-8">
        <h2 className="text-sm sm:text-base font-semibold text-indigo-300 mb-3">选择难度</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedDifficulty(option.value)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 active:scale-95 ${option.className} ${selectedDifficulty === option.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-8 relative">
          {totalPages > 1 && currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-indigo-900/80 text-white transition-all hover:bg-indigo-800 hover:scale-110`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className={`grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3 ${totalPages > 1 ? 'pl-12 pr-12' : ''}`}>
            {currentStories.map((story) => (
              <div key={story.id}>
                <GameCard story={story} />
              </div>
            ))}
          </div>

          {totalPages > 1 && currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-indigo-900/80 text-white transition-all hover:bg-indigo-800 hover:scale-110`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-indigo-300">
              第 {currentPage} 页，共 {totalPages} 页
            </p>
          </div>
        )}

        {filteredStories.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm sm:text-base text-slate-400">暂无该难度的谜题</p>
          </div>
        )}
      </div>
    </section>
  )
}
