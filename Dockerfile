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
ARG ATLAS_URI
ENV ATLAS_URI ${ATLAS_URI}
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
ARG ACCESS_TOKEN_SECRET
ENV ACCESS_TOKEN_SECRET ${ACCESS_TOKEN_SECRET}
ARG REFRESH_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET ${REFRESH_TOKEN_SECRET}
ARG EMAIL_PASSWORD
ENV EMAIL_PASSWORD ${EMAIL_PASSWORD}

EXPOSE 80

CMD ["node", "server.js"]