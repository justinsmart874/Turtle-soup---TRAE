import type { Story } from '../constants/stories'

export async function askAI(
  question: string,
  story: Story,
  questionCount: number = 0
): Promise<{ reply: string; isSolved: boolean }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        story,
        questionCount,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('API 请求失败:', response.status, errorData)
      return { reply: '侦探助理去查资料啦，请稍等~', isSolved: false }
    }

    const data = await response.json()
    return {
      reply: data.reply,
      isSolved: data.isSolved,
    }
  } catch (error) {
    console.error('AI 调用出错:', error)
    return { reply: '侦探助理去查资料啦，请稍等~', isSolved: false }
  }
}

export async function getStories(): Promise<Story[]> {
  try {
    const response = await fetch('/api/stories')
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('获取谜题列表失败:', response.status, errorData)
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('获取谜题列表出错:', error)
    return []
  }
}

export async function getStoryById(id: string): Promise<Story | null> {
  try {
    const response = await fetch(`/api/stories/${id}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('获取谜题详情失败:', response.status, errorData)
      return null
    }
    
    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('获取谜题详情出错:', error)
    return null
  }
}
