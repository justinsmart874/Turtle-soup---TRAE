# 部署文档

## 项目结构

```
/Users/mac/Coding/Turtle soup - TRAE/
├── client/          # 前端项目
│   ├── dist/        # 前端构建产物
│   ├── src/         # 前端源代码
│   └── package.json # 前端依赖配置
├── server/          # 后端项目
│   ├── dist/        # 后端构建产物
│   ├── src/         # 后端源代码
│   └── package.json # 后端依赖配置
└── .gitignore       # Git忽略文件
```

## 部署前准备

### 环境要求

- **前端**：Node.js 16+，npm 7+
- **后端**：Node.js 16+，npm 7+
- **服务器**：推荐使用 Linux 系统（Ubuntu 20.04+）
- **数据库**：本项目暂不需要数据库
- **网络**：确保服务器可以访问外部 API（DeepSeek API）

### 环境变量配置

#### 后端环境变量 (`server/.env`)

```env
# DeepSeek API 密钥
API_KEY=your_deepseek_api_key

# CORS 配置
CORS_ORIGINS=http://localhost:5176,https://your-frontend-domain.com

# API 超时设置（毫秒）
API_TIMEOUT=30000

# 服务器端口
PORT=3001
```

#### 前端环境变量 (`client/.env`)

```env
# 后端 API 地址
VITE_API_URL=http://localhost:3001/api
```

## 部署步骤

### 1. 前端部署

#### 方法一：使用 Vercel 部署（推荐）

1. **登录 Vercel**：https://vercel.com/
2. **导入项目**：选择 `client` 目录
3. **配置**：
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: 添加 `VITE_API_URL`
4. **部署**：点击 "Deploy"

#### 方法二：使用 Netlify 部署

1. **登录 Netlify**：https://app.netlify.com/
2. **导入项目**：选择 `client` 目录
3. **配置**：
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables: 添加 `VITE_API_URL`
4. **部署**：点击 "Deploy site"

#### 方法三：使用 Nginx 部署

1. **构建前端**：
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **配置 Nginx**：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/client/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **重启 Nginx**：
   ```bash
   sudo systemctl restart nginx
   ```

### 2. 后端部署

#### 方法一：使用 Railway 部署（推荐）

1. **登录 Railway**：https://railway.app/
2. **新建项目**：选择 "Deploy from GitHub repo"
3. **配置**：
   - 选择 `server` 目录
   - 环境变量：添加 `API_KEY`、`CORS_ORIGINS`、`API_TIMEOUT`、`PORT`
   - 启动命令：`npm start`
4. **部署**：点击 "Deploy"

#### 方法二：使用 AWS EC2 部署

1. **创建 EC2 实例**：选择 Ubuntu 20.04 LTS
2. **连接实例**：使用 SSH 连接
3. **安装依赖**：
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```
4. **克隆项目**：
   ```bash
   git clone <your-repo-url> turtle-soup
   cd turtle-soup/server
   ```
5. **安装依赖**：
   ```bash
   npm install
   ```
6. **构建项目**：
   ```bash
   npm run build
   ```
7. **创建环境变量文件**：
   ```bash
   nano .env
   # 添加环境变量
   ```
8. **启动服务**：
   ```bash
   npm start
   ```

#### 方法三：使用 PM2 管理进程

1. **安装 PM2**：
   ```bash
   npm install -g pm2
   ```

2. **启动服务**：
   ```bash
   cd server
   pm2 start dist/index.js --name turtle-soup-server
   ```

3. **设置自启动**：
   ```bash
   pm2 startup
   pm2 save
   ```

## 配置 HTTPS

### 前端

- **Vercel/Netlify**：自动提供 HTTPS
- **Nginx**：使用 Let's Encrypt 配置 HTTPS
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d your-domain.com
  ```

### 后端

- **Railway**：自动提供 HTTPS
- **EC2**：使用 Let's Encrypt 配置 HTTPS 或通过 Nginx 反向代理

## 监控与维护

### 日志管理

- **前端**：查看 Vercel/Netlify 控制台日志
- **后端**：
  - Railway：查看 Railway 控制台日志
  - EC2：使用 `pm2 logs` 查看日志

### 常见问题

1. **API 调用失败**：
   - 检查 API_KEY 是否正确
   - 检查网络连接是否正常
   - 检查 API 超时设置

2. **CORS 错误**：
   - 检查 `CORS_ORIGINS` 环境变量是否包含前端域名

3. **部署失败**：
   - 检查依赖是否安装成功
   - 检查环境变量是否正确配置
   - 检查构建命令是否执行成功

## 性能优化

1. **前端优化**：
   - 启用 Gzip 压缩
   - 静态资源缓存
   - 代码分割

2. **后端优化**：
   - 启用 API 响应缓存
   - 优化 DeepSeek API 调用
   - 使用进程管理工具（如 PM2）

## 安全措施

1. **API 密钥保护**：
   - 不在前端存储 API 密钥
   - 使用环境变量管理 API 密钥
   - 定期更换 API 密钥

2. **内容安全**：
   - 对用户输入进行验证
   - 对 AI 输出进行过滤

3. **网络安全**：
   - 使用 HTTPS
   - 配置适当的 CORS 策略
   - 限制 API 调用频率

## 版本管理

- **前端**：使用 `npm version` 管理版本
- **后端**：使用 `npm version` 管理版本
- **部署**：建议使用 CI/CD 自动化部署

## 回滚策略

1. **前端**：
   - Vercel/Netlify：使用 "Rollbacks" 功能
   - Nginx：备份旧的 `dist` 目录

2. **后端**：
   - Railway：使用 "Deployments" 历史
   - EC2：备份旧的 `dist` 目录

## 联系与支持

- **项目维护者**：[Your Name]
- **技术支持**：[Your Email]
- **文档更新**：本文档会根据项目进展持续更新

---

**部署完成后，请访问：**
- 前端：https://your-frontend-domain.com
- 后端：https://your-backend-domain.com
- API 文档：https://your-backend-domain.com/api/docs
