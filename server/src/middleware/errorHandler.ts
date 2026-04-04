import type { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  code?: string
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500
  const message = err.message || '服务器内部错误'
  const code = err.code || 'INTERNAL_ERROR'

  console.error(`[Error] ${code}: ${message}`)
  console.error(err.stack)

  res.status(statusCode).json({
    error: {
      code,
      message: statusCode === 500 ? '服务器内部错误' : message,
      timestamp: new Date().toISOString(),
    },
  })
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `接口 ${req.originalUrl} 不存在`,
      timestamp: new Date().toISOString(),
    },
  })
}
