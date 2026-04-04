# 环境变量配置说明

## 前端环境变量

### 开发环境 (`client/.env`)

```env
# 后端 API 地址
VITE_API_URL=http://localhost:3001/api
```

### 生产环境 (`client/.env.production`)

```env
# 后端 API 地址（生产环境）
VITE_API_URL=https://your-backend-domain.com/api
```

## 后端环境变量 (`server/.env`)

```env
# DeepSeek API 密钥
DEEPSEEK_API_KEY=your_deepseek_api_key

# DeepSeek API URL（可选）
DEEPSEEK_API_URL=https://api.deepseek.com

# CORS 配置
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,https://your-frontend-domain.com

# API 超时设置（毫秒）
API_TIMEOUT=30000

# 服务器端口
PORT=3001
```

## 配置说明

### 前端配置

1. **开发环境**：
   - 创建 `client/.env` 文件
   - 设置 `VITE_API_URL=http://localhost:3001/api`
   - Vite 会自动使用代理，将 `/api` 请求转发到后端

2. **生产环境**：
   - 创建 `client/.env.production` 文件
   - 设置 `VITE_API_URL=https://your-backend-domain.com/api`
   - 构建时会将环境变量打包到前端代码中

3. **同域部署**：
   - 如果前后端部署在同一域名下，可以不设置 `VITE_API_URL`
   - 默认使用 `/api`，通过 Nginx 反向代理到后端

### 后端配置

1. **API 密钥**：
   - 从 DeepSeek 官网获取 API 密钥
   - 设置 `DEEPSEEK_API_KEY` 环境变量

2. **CORS 配置**：
   - 设置 `CORS_ORIGINS` 为允许访问的前端域名
   - 多个域名用逗号分隔

3. **超时设置**：
   - `API_TIMEOUT` 控制 API 请求超时时间
   - 默认 30 秒

## 部署示例

### Vercel + Railway 部署

1. **前端（Vercel）**：
   - 环境变量：`VITE_API_URL=https://your-railway-app.railway.app/api`

2. **后端（Railway）**：
   - 环境变量：
     - `DEEPSEEK_API_KEY=your_api_key`
     - `CORS_ORIGINS=https://your-vercel-app.vercel.app`
     - `API_TIMEOUT=30000`
     - `PORT=3001`

### Nginx 同域部署

1. **前端**：
   - 不设置 `VITE_API_URL`（使用默认 `/api`）

2. **后端**：
   - 设置 `CORS_ORIGINS` 为前端域名

3. **Nginx 配置**：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # 前端
       location / {
           root /path/to/client/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       # 后端 API
       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 安全注意事项

1. **不要提交 .env 文件**：
   - `.env` 文件已添加到 `.gitignore`
   - 确保 API 密钥不会被提交到代码仓库

2. **生产环境配置**：
   - 使用 HTTPS
   - 设置正确的 CORS 域名
   - 定期更换 API 密钥

3. **环境变量验证**：
   - 后端会检查 `DEEPSEEK_API_KEY` 是否存在
   - 前端会使用默认值 `/api` 作为后备

## 常见问题

1. **API 请求失败**：
   - 检查 `VITE_API_URL` 是否正确
   - 检查后端是否正常运行
   - 检查 CORS 配置是否包含前端域名

2. **环境变量不生效**：
   - 确保文件名正确（`.env` 或 `.env.production`）
   - 重启开发服务器
   - 清除浏览器缓存

3. **CORS 错误**：
   - 检查后端 `CORS_ORIGINS` 配置
   - 确保前端域名在允许列表中
