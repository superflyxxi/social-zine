FROM node:16.10.0-alpine3.11
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV NODE_ENV=production
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
COPY ./ /common/
RUN cd /common && npm install
