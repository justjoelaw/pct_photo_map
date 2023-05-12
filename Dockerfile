# Stage1: Frontend Build
FROM node:14-slim AS frontend-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Stage2: Backend Build
FROM node:14-slim AS backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install
RUN ls

# Stage3: Packaging the app
FROM node:14-slim
WORKDIR /root/
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build
COPY --from=backend-build /usr/src/backend .
RUN ls

EXPOSE 80

CMD ["node", "server.mjs"]