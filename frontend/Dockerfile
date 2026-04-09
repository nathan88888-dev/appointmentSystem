# 第一阶段：构建应用
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装
COPY package*.json ./
RUN npm install

# 复制源代码并构建
COPY . .
RUN npm run build

# 第二阶段：使用 Nginx 提供服务
FROM nginx:stable-alpine

# 将构建好的静态文件复制到 Nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义 nginx 配置以支持 SPA 路由
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
