import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Message } from './Message'
import { askAI } from '../services/api'
import { rabbitAvatar } from '../assets/avatars'
import type { Story } from '../constants/stories'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
}

interface ChatBoxProps {
  story: Story
}

export function ChatBox({ story }: ChatBoxProps) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showTransition, setShowTransition] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 首次进入页面时聚焦输入框
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // AI回答后自动聚焦输入框
  useEffect(() => {
    if (!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      inputRef.current?.focus()
    }
  }, [isLoading, messages])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isLoading) return

    setError(null)
    const userMessage: ChatMessage = { role: 'user', content: trimmedInput }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const currentCount = questionCount + 1
      const { reply: aiReply, isSolved } = await askAI(trimmedInput, story, currentCount)
      
      const aiMessage: ChatMessage = { role: 'assistant', content: aiReply }
      setMessages((prev) => [...prev, aiMessage])
      setQuestionCount(currentCount)
      
      // 如果游戏已解决，显示过渡动画后跳转到结果页
      if (isSolved) {
        setShowTransition(true)
        // 延迟跳转到结果页，让过渡动画有时间显示
        setTimeout(() => {
          navigate(`/result/${story.id}`)
        }, 1500)
      }
    } catch (err) {
      const errorMessage: ChatMessage = { 
        role: 'assistant', 
        content: '哎呀，侦探助理去查资料啦，请稍等一下再试试~',
        isError: true
      }
      setMessages((prev) => [...prev, errorMessage])
      setError('网络好像有点问题，请检查网络后重试')
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading, story, questionCount, navigate])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
      {/* 消息列表 */}
      <div className="flex-1 max-h-[400px] min-h-[200px] overflow-y-auto p-4 space-y-4">
        {/* 空状态 */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
            <div className="text-6xl mb-4">🐰</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">小兔叽侦探已就位！</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              你可以向小兔叽提问，它会用"是"、"不是"或"不相关"来回答你哦~
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setInputValue('这个事情和天气有关吗？')}
                className="px-3 py-1.5 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                和天气有关吗？
              </button>
              <button
                onClick={() => setInputValue('这是发生在学校的事情吗？')}
                className="px-3 py-1.5 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                发生在学校吗？
              </button>
              <button
                onClick={() => setInputValue('这和人有关吗？')}
                className="px-3 py-1.5 text-xs rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                和人有关吗？
              </button>
            </div>
          </div>
        )}

        {/* 消息列表 */}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        
        {/* 加载状态 - 显示在AI消息位置 */}
        {isLoading && (
          <div className="flex flex-row gap-2 sm:gap-3 items-start animate-slide-up">
            <div className="flex flex-col gap-1 shrink-0">
              <img
                src={rabbitAvatar}
                alt="小兔叽头像"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white ring-2 ring-slate-200 shadow-sm"
              />
              <span className="text-xs text-slate-500 text-center hidden sm:block">小兔叽</span>
            </div>
            <div className="max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-white text-slate-800 ring-1 ring-slate-200 flex items-center gap-3">
              <div className="animate-spin h-4 w-4 border-2 border-brand-primary border-t-transparent rounded-full" />
              <span className="text-sm font-medium">小兔叽正在思考中...</span>
            </div>
          </div>
        )}
        
        {/* 错误提示 */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 text-rose-600 text-sm animate-shake">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-rose-400 hover:text-rose-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
        
        {/* 游戏解决过渡动画 */}
        {showTransition && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-2xl">
              <div className="text-8xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold mb-2">恭喜你！</h2>
              <p className="text-lg mb-4">你成功破解了这个案件！</p>
              <p className="text-sm opacity-90">正在前往结果页...</p>
            </div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="border-t border-slate-200 p-3 sm:p-4 bg-slate-50">
        <div className="flex gap-2 sm:gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="rounded-lg bg-brand-primary px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="hidden sm:inline">发送中</span>
              </span>
            ) : (
              '发送'
            )}
          </button>
        </div>
        
        {/* 提问计数 */}
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span className="hidden sm:inline">按 Enter 发送</span>
          <span className="ml-auto">已提问 {questionCount} 次</span>
        </div>
      </div>
    </div>
  )
}
