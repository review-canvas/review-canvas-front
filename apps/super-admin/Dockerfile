# 기본 이미지 설정
FROM node:18-alpine AS base

ARG NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_API_DOMAIN=${NEXT_PUBLIC_API_DOMAIN}

# alpine 이미지는 glibc 대신 musl libc을 사용.
# 특정 라이브러리에 대해 문제가 발생할 수 있으므로 libc6-compat 패키지를 추가하는 것이 좋다.
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN corepack enable pnpm

WORKDIR /app

# 프로젝트의 루트에서 package.json과 pnpm-lock.yaml 파일을 복사합니다.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/super-admin/package.json ./apps/super-admin/
COPY ./packages/admin-ui/package.json ./packages/admin-ui/
COPY ./packages/config-eslint/package.json ./packages/config-eslint/
COPY ./packages/config-tailwind/package.json ./packages/config-tailwind/
COPY ./packages/config-typescript/package.json ./packages/config-typescript/
COPY ./packages/theme/package.json ./packages/theme/
COPY ./packages/http-client/package.json ./packages/http-client/

# 모노레포 구조에서 필요한 패키지를 설치합니다.
RUN pnpm install --frozen-lockfile

# 나머지 프로젝트 파일들을 복사합니다.
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/super-admin/node_modules ./apps/super-admin/node_modules
COPY --from=deps /app/packages/admin-ui/node_modules ./packages/admin-ui/node_modules
COPY --from=deps /app/packages/config-eslint/node_modules ./packages/config-eslint/node_modules
COPY --from=deps /app/packages/config-tailwind/node_modules ./packages/config-tailwind/node_modules
COPY --from=deps /app/packages/theme/node_modules ./packages/theme/node_modules
COPY --from=deps /app/packages/http-client/node_modules ./packages/http-client/node_modules

WORKDIR /app

# 빌드할 프로젝트를 동적으로 선택하여 빌드합니다.
RUN pnpm run build:super-admin

# 실행 단계
FROM base AS runner
WORKDIR /app

# 보안 문제가 발생할 수 있으므로 도커 컨테이너 내에서 루트 권한으로 서버 프로세스를 실행하지 않는 것이 좋다.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# 빌드된 아티팩트 복사
# Turborepo를 사용하는 경우, 필요한 아티팩트만 선택해서 복사합니다.
# 예시에서는 next.js 앱을 위한 파일을 복사합니다.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/super-admin ./apps/super-admin
COPY --from=builder --chown=nextjs:nodejs /app/packages ./packages
COPY --from=builder --chown=nextjs:nodejs /app/turbo.json ./
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-workspace.yaml ./

RUN echo ${NEXT_PUBLIC_API_DOMAIN}

USER nextjs
EXPOSE 3002
ENV PORT 3002

WORKDIR /app

CMD ["pnpm", "run", "start", "--filter", "super-admin"]
