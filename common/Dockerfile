ARG NODE_VERSION=missing
FROM node:${NODE_VERSION}-alpine
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV NODE_ENV=production
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=5s CMD curl -f http://localhost:3000/api-docs/
RUN apk update && apk add curl=8.17.0-r1
COPY ./ /common/
