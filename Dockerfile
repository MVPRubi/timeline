# 使用Node.js官方镜像作为基础镜像，选择合适的版本，这里以18为例
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到工作目录，便于安装依赖
COPY . .

# 安装依赖并构建
RUN yarn && \
    yarn build && \
    yarn cache clean

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/

# 暴露nginx默认的80端口，用于对外提供服务
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]