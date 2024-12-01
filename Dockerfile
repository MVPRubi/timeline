# 使用Node.js官方镜像作为基础镜像，选择合适的版本，这里以18为例
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到工作目录，便于安装依赖
COPY . .

# 安装项目依赖，使用npm（你也可以替换为yarn等其他包管理器）
RUN yarn \
  & yarn build \
  & yarn cache clean

# 新阶段，使用nginx官方镜像作为基础镜像
FROM nginx:alpine

# 移除默认的nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将构建好的前端项目文件从构建阶段复制到nginx的html目录下，这里假设构建产物在/app/build目录（根据实际调整）
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的nginx配置文件到nginx配置目录，这里假设你的自定义配置文件名为nginx.conf且在本地同目录下（按需调整）
COPY nginx.conf /etc/nginx/conf.d/

# 暴露nginx默认的80端口，用于对外提供服务
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]