# ========================================================
# MultiCloud Canvas Studio - Production Multi-stage Dockerfile
# ========================================================

# Stage 1: Build React SPA & Backend Server
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built artifacts and assets
COPY --from=builder /app/dist ./dist

# Copy firebase config if present
COPY --from=builder /app/firebase-applet-config.json* ./

EXPOSE 3000

USER node
CMD ["node", "dist/server.cjs"]
