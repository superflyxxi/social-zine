FROM node:16.10.0-alpine3.11
ENV NODE_ENV=test
ENTRYPOINT ["npm"]
CMD ["test"]
ADD int-test /app/int-test
RUN npm install
