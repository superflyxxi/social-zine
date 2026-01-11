ARG NODE_VERSION=missing
FROM node:${NODE_VERSION}-alpine
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV NODE_ENV=production
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
COPY ./ /common/
RUN cd /common && npm install
