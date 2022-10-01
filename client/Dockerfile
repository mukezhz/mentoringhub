ARG APP_HOME=/app
FROM node:alpine as builder
ARG APP_HOME
ENV APP_HOME=${APP_HOME}
WORKDIR ${APP_HOME}
COPY package.json .
COPY package-lock.json .
RUN npm i -g npm
RUN npm ci
COPY ./tsconfig.json .
COPY ./tsconfig.config.json .
COPY ./public public/
COPY ./src src/
COPY vite.config.ts vite.config.ts
COPY ./.env.local .
COPY nginx.conf .
COPY index.html .
COPY env.d.ts .
RUN npm run build
COPY ./.env_sample .

FROM nginx:alpine
ARG APP_HOME
COPY --from=builder ${APP_HOME}/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder ${APP_HOME}/dist .

EXPOSE 80

# CMD ["nginx -g \"daemon off;\""]