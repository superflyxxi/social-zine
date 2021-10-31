FROM node:16.10.0-alpine3.11
EXPOSE 3000
LABEL org.opencontainers.image.authors="SuperFlyXXI <superflyxxi@yahoo.com>"
ENV \
 	NODE_ENV=production \
	DATA_DIR=/data
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
COPY common/ /common/
RUN cd /common && npm install
COPY zine-generator/ /app/
RUN cd /app && npm install
