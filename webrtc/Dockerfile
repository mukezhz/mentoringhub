ARG HOME_APP=/app
FROM node:lts-alpine as builder
ARG HOME_APP
WORKDIR ${HOME_APP}
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY tsconfig.json .
COPY src src
RUN npm run compile
COPY prisma prisma
COPY entrypoint.sh .
# CMD "npx prisma migrate deploy; node compile/index.js"

FROM node:lts-alpine
ARG HOME_APP
ENV NODE_ENV=production
WORKDIR /server
COPY --from=builder ${HOME_APP}/compile .
COPY --from=builder ${HOME_APP}/package.json .
COPY --from=builder ${HOME_APP}/package-lock.json .
COPY --from=builder ${HOME_APP}/prisma prisma
COPY --from=builder ${HOME_APP}/entrypoint.sh .
RUN npm i --only=prod
RUN sed -i 's/\r$//g' entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/server/entrypoint.sh" ]