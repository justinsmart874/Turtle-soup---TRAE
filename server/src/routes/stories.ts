import { Router, type Request, type Response } from 'express'
import { stories, type Story } from '../constants/stories'

const router = Router()

// 获取所有谜题
router.get('/', (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: stories,
    message: '获取谜题列表成功'
  })
})

// 获取单个谜题
router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params
  const story = stories.find((s: Story) => s.id === id)
  
  if (story) {
    res.json({
      success: true,
      data: story,
      message: '获取谜题成功'
    })
  } else {
    res.status(404).json({
      success: false,
      data: null,
      message: '谜题不存在'
    })
  }
})

export default router
