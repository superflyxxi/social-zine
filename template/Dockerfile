FROM node:16.10.0-alpine3.11
EXPOSE 3000
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV \
 	NODE_ENV=production \
	DATA_DIR=/data
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
COPY package* /app/
RUN npm install
COPY src /app/src
