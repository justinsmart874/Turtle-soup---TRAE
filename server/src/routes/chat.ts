import express from 'express'
import { askAI } from '../services/aiService'
import type { ChatRequest, ChatResponse } from '../types'

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { question, story, questionCount = 0 }: ChatRequest = req.body

    if (!question || !story) {
      return res.status(400).json({
        error: '缺少必要参数：question 和 story'
      })
    }

    if (!question.trim()) {
      return res.status(400).json({
        error: '问题不能为空'
      })
    }

    const result = await askAI(question, story, questionCount)
    
    const response: ChatResponse = {
      reply: result.reply,
      isSolved: result.isSolved
    }

    res.json(response)
  } catch (error) {
    console.error('Chat 接口错误:', error)
    res.status(500).json({
      reply: '侦探助理去查资料啦，请稍等~',
      isSolved: false
    })
  }
})

export default router
