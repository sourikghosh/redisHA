FROM node:14.15.4-alpine3.11

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY src ./

EXPOSE 3000
CMD ["npm","start"]

