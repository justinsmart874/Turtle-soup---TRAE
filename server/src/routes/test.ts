import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: '测试接口正常工作',
    status: 'success',
    data: {
      timestamp: new Date().toISOString(),
      server: 'Node.js + Express',
      version: '1.0.0'
    }
  })
})

export default router
