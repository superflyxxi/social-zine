ARG NODE_VERSION=missing
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV=test
ENTRYPOINT ["npm"]
CMD ["test"]
WORKDIR /app/int-test
ADD . /app/int-test
RUN npm ci
