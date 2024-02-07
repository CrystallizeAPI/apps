FROM node:20-slim as base
LABEL fly_launch_runtime="Remix"
RUN mkdir /app
WORKDIR /app
ARG PNPM_VERSION=8.15.1
RUN npm install -g pnpm@$PNPM_VERSION
COPY . .
RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm build
ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80
CMD [ "pnpm", "start" ]
