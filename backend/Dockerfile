# 使用 Python 3.11 镜像作为基础镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 安装系统依赖 (如有需要，例如 build-essential 等)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件并安装
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制后端代码
COPY . .

# 暴露端口 (FastAPI 默认端口)
EXPOSE 8000

# 启动命令
# 注意：使用 app.main:app，因为 main.py 在 app 文件夹下
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
