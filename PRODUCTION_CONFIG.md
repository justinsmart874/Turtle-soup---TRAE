# 生产环境部署配置

## 前端配置（Vercel）

### 环境变量

在Vercel项目设置中添加以下环境变量：

```
VITE_API_URL = https://turtle-soup-game-production-45c2.up.railway.app/api
```

**重要说明**：
- ✅ 正确：`https://xxx.railway.app/api`
- ❌ 错误：`https://xxx.railway.app/api/chat`
- ❌ 错误：`https://xxx.railway.app`

代码会自动拼接具体的接口路径，例如：
- `${VITE_API_URL}/chat` → `https://xxx.railway.app/api/chat`
- `${VITE_API_URL}/stories` → `https://xxx.railway.app/api/stories`

## 后端配置（Railway）

### 环境变量

在Railway项目设置中添加以下环境变量：

```
DEEPSEEK_API_KEY = your_deepseek_api_key_here
DEEPSEEK_API_URL = https://api.deepseek.com
API_TIMEOUT = 30000
PORT = 3001
CORS_ORIGINS = http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,https://turtle-soup-trae.vercel.app
```

**重要说明**：
- `CORS_ORIGINS` 必须包含前端域名（Vercel域名）
- 多个域名用逗号分隔，不要有空格
- 必须包含协议（`https://`）

## 部署步骤

### 1. 配置Railway后端

1. 登录 Railway：https://railway.app/
2. 选择项目：Turtle soup game
3. 进入 Variables 标签
4. 添加/更新环境变量：
   ```
   DEEPSEEK_API_KEY = your_api_key
   DEEPSEEK_API_URL = https://api.deepseek.com
   API_TIMEOUT = 30000
   PORT = 3001
   CORS_ORIGINS = http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,https://turtle-soup-trae.vercel.app
   ```
5. Railway会自动重新部署

### 2. 配置Vercel前端

1. 登录 Vercel：https://vercel.com/
2. 选择项目：turtle-soup-trae
3. 进入 Settings → Environment Variables
4. 添加/更新环境变量：
   ```
   VITE_API_URL = https://turtle-soup-game-production-45c2.up.railway.app/api
   ```
5. 重新部署项目

### 3. 验证部署

#### 验证后端API

访问以下URL验证后端是否正常：

1. **测试接口**：
   ```
   https://turtle-soup-game-production-45c2.up.railway.app/api/test
   ```
   应该返回：
   ```json
   {
     "message": "测试接口正常",
     "status": "success",
     "data": {
       "timestamp": "2026-04-05T...",
       "server": "AI海龟汤后端服务"
     }
   }
   ```

2. **谜题列表**：
   ```
   https://turtle-soup-game-production-45c2.up.railway.app/api/stories
   ```
   应该返回谜题列表

3. **API文档**：
   ```
   https://turtle-soup-game-production-45c2.up.railway.app/api/docs
   ```

#### 验证前端

1. 访问：https://turtle-soup-trae.vercel.app
2. 应该能看到游戏大厅页面
3. 应该能看到海龟汤问题卡片

## 常见问题排查

### 问题1：前端显示空白，没有卡片

**可能原因**：
- 前端环境变量名称错误
- API地址配置错误

**解决方案**：
1. 检查Vercel环境变量名称是否为 `VITE_API_URL`
2. 检查API地址是否为 `https://xxx.railway.app/api`（不要包含 `/chat`）

### 问题2：CORS错误

**可能原因**：
- 后端CORS配置缺少前端域名

**解决方案**：
1. 在Railway中添加 `https://turtle-soup-trae.vercel.app` 到 `CORS_ORIGINS`
2. 重新部署后端

### 问题3：API返回404

**可能原因**：
- 后端部署失败
- 环境变量配置错误

**解决方案**：
1. 检查Railway部署日志
2. 验证所有环境变量是否正确配置
3. 检查 `DEEPSEEK_API_KEY` 是否有效

### 问题4：API调用失败

**可能原因**：
- DeepSeek API密钥无效
- API超时设置不合理

**解决方案**：
1. 验证 `DEEPSEEK_API_KEY` 是否有效
2. 检查 `API_TIMEOUT` 设置（建议30000ms）

## 环境变量对照表

| 服务 | 变量名 | 值 | 说明 |
|------|--------|-----|------|
| **Vercel（前端）** | `VITE_API_URL` | `https://turtle-soup-game-production-45c2.up.railway.app/api` | 后端API地址 |
| **Railway（后端）** | `DEEPSEEK_API_KEY` | `your_api_key` | DeepSeek API密钥 |
| **Railway（后端）** | `DEEPSEEK_API_URL` | `https://api.deepseek.com` | DeepSeek API地址 |
| **Railway（后端）** | `API_TIMEOUT` | `30000` | API超时时间（毫秒） |
| **Railway（后端）** | `PORT` | `3001` | 服务器端口 |
| **Railway（后端）** | `CORS_ORIGINS` | `http://localhost:5173,...,https://turtle-soup-trae.vercel.app` | 允许的前端域名 |

## 安全注意事项

1. **API密钥保护**：
   - 不要在代码中硬编码API密钥
   - 不要将 `.env` 文件提交到Git
   - 定期更换API密钥

2. **CORS配置**：
   - 只添加必要的域名
   - 生产环境不要使用 `*`

3. **HTTPS**：
   - 确保所有域名都使用HTTPS
   - Vercel和Railway默认提供HTTPS

## 下一步

1. 按照上述步骤配置环境变量
2. 重新部署前后端
3. 验证API是否正常工作
4. 测试前端是否可以正常显示

如有问题，请检查：
- Railway部署日志
- Vercel部署日志
- 浏览器控制台错误信息
