import type { Request, Response, NextFunction } from 'express'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()
  const timestamp = new Date().toISOString()

  res.on('finish', () => {
    const duration = Date.now() - start
    const method = req.method
    const url = req.originalUrl
    const status = res.statusCode
    const userAgent = req.get('user-agent') || 'unknown'

    console.log(`[${timestamp}] ${method} ${url} ${status} ${duration}ms - ${userAgent}`)
  })

  next()
}
