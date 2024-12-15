FROM node:22.12.0-alpine3.20
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV NODE_ENV=production
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
COPY ./ /common/
RUN cd /common && npm install
