FROM node:16.10.0-alpine3.11
EXPOSE 3000
MAINTAINER SuperFlyXXI
ENV \
 	NODE_ENV=production \
	DATA_DIR=/data
WORKDIR /app
ENTRYPOINT ["npm"]
CMD ["start"]
ADD package* /app/
RUN npm install
ADD src /app/src
