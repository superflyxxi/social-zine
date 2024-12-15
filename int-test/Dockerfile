FROM node:22.12.0-alpine3.20
ENV NODE_ENV=test
ENTRYPOINT ["npm"]
CMD ["test"]
WORKDIR /app/int-test
ADD . /app/int-test
RUN npm install
