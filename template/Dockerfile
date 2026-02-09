ARG COMMON_IMAGE
FROM ${COMMON_IMAGE}
EXPOSE 3000
COPY package.json package-lock.json /app/
RUN cd /app && npm install --omit=dev
COPY . /app/
