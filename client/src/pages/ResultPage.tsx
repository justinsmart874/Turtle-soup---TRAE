import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { kittenAvatar, rabbitAvatar } from '../assets/avatars'
import { NameWithAvatar } from '../components/NameWithAvatar'
import { getStoryById } from '../services/api'
import type { Story } from '../constants/stories'

export function ResultPage() {
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
          <p className="text-sm sm:text-base text-indigo-300">正在揭晓真相...</p>
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
          返回游戏大厅
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto space-y-6 sm:space-y-8 rounded-2xl bg-brand-card p-4 sm:p-8 shadow-sm ring-1 ring-slate-200 animate-fade-in">
      {/* 页面标题 */}
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-primary">游戏结束</p>
        <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-800">恭喜你找到答案！</h1>
        <p className="mt-2 text-sm sm:text-base text-brand-subtext">称号：小小名侦探（20 步以内）</p>
      </div>

      {/* 海龟汤题目 */}
      <div className="rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 p-4 sm:p-6 text-white">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{story.title}</h2>
        <p className="text-sm sm:text-base text-slate-200">{story.surface}</p>
      </div>

      {/* 汤底揭晓 */}
      <div className="rounded-xl bg-emerald-50 p-4 sm:p-6 ring-1 ring-emerald-200">
        <div className="relative overflow-hidden">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-700 flex items-center gap-2">
              <span className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm sm:text-base">
                🔍
              </span>
              汤底揭晓
            </h2>
            
            <div className="mt-3 sm:mt-4 rounded-lg bg-white p-3 sm:p-4 ring-1 ring-emerald-100">
              <p className="text-sm sm:text-base text-slate-800 leading-7">{story.bottom}</p>
            </div>

            {/* 答案解析 */}
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">答案解析</h3>
              <div className="rounded-lg bg-white p-3 sm:p-4 ring-1 ring-slate-200">
                <p className="text-sm sm:text-base text-slate-600 leading-7">
                  这个故事告诉我们，有时候看似神秘的事情背后往往有很温暖的原因。通过仔细观察和逻辑推理，我们可以发现真相其实就在我们身边。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 对话区域 */}
      <div className="space-y-3 rounded-xl bg-slate-50 p-4 sm:p-5">
        <p className="rounded-xl bg-white p-3 ring-1 ring-slate-200 text-sm sm:text-base">
          <NameWithAvatar
            name="小兔叽"
            avatarSrc={rabbitAvatar}
            avatarAlt="小兔叽头像"
            className="mr-1 font-semibold"
          />
          ：你真的好棒呀！继续用聪明的小问题继续探索吧。
        </p>
        <p className="rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100 text-sm sm:text-base">
          <NameWithAvatar
            name="你"
            avatarSrc={kittenAvatar}
            avatarAlt="玩家幼猫头像"
            className="mr-1 font-semibold"
          />
          ：谢谢小兔叽！我下次还想挑战更难的疑案。
        </p>
      </div>

      {/* 底部按钮 */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="rounded-lg bg-brand-primary px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition-all text-sm sm:text-base"
        >
          再来一局
        </Link>
        <Link
          to="/"
          className="rounded-lg border border-slate-300 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all text-sm sm:text-base"
        >
          返回游戏大厅
        </Link>
      </div>
    </section>
  )
}
