import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import testRouter from './routes/test'
import chatRouter from './routes/chat'
import storiesRouter from './routes/stories'
import { requestLogger } from './middleware/logger'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176']

app.use(cors({
  origin: corsOrigins,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

app.use('/api/test', testRouter)
app.use('/api/chat', chatRouter)
app.use('/api/stories', storiesRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'AI海龟汤游戏后端服务',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      test: '/api/test',
      chat: '/api/chat',
      stories: '/api/stories',
      docs: '/api/docs'
    }
  })
})

app.get('/api/docs', (req, res) => {
  res.json({
    name: 'AI海龟汤游戏后端API',
    version: '1.0.0',
    description: '为AI海龟汤游戏提供AI对话服务',
    baseUrl: `http://localhost:${PORT}`,
    endpoints: [
      {
        path: '/api/test',
        method: 'GET',
        description: '测试接口，检查服务是否正常运行',
        response: {
          message: 'string',
          status: 'string',
          data: 'object'
        }
      },
      {
        path: '/api/chat',
        method: 'POST',
        description: 'AI对话接口，向DeepSeek API发送问题并获取回答',
        requestBody: {
          question: 'string - 用户提出的问题',
          story: {
            id: 'string',
            title: 'string',
            difficulty: 'easy | medium | hard',
            surface: 'string - 汤面（题面）',
            bottom: 'string - 汤底（真相）'
          },
          questionCount: 'number - 当前提问次数'
        },
        response: {
          reply: 'string - AI的回答',
          isSolved: 'boolean - 是否猜中答案'
        },
        errorResponses: [
          {
            code: 400,
            description: '缺少必要参数'
          },
          {
            code: 500,
            description: '服务器内部错误或AI服务调用失败'
          }
        ]
      },
      {
        path: '/api/stories',
        method: 'GET',
        description: '获取所有谜题列表',
        response: {
          success: 'boolean',
          data: 'Array<Story>',
          message: 'string'
        }
      },
      {
        path: '/api/stories/:id',
        method: 'GET',
        description: '获取单个谜题详情',
        response: {
          success: 'boolean',
          data: 'Story',
          message: 'string'
        },
        errorResponses: [
          {
            code: 404,
            description: '谜题不存在'
          }
        ]
      }
    ],
    environment: {
      corsOrigins: corsOrigins,
      timeout: `${process.env.API_TIMEOUT || 30000}ms`
    }
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`)
  console.log(`📝 测试接口: http://localhost:${PORT}/api/test`)
  console.log(`💬 聊天接口: http://localhost:${PORT}/api/chat`)
  console.log(`🧩 谜题接口: http://localhost:${PORT}/api/stories`)
  console.log(`📚 接口文档: http://localhost:${PORT}/api/docs`)
})
