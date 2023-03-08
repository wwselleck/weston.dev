FROM node:latest

WORKDIR /usr/app

COPY . .
RUN apt-get update && apt-get install cpio
RUN npm install
RUN npm run build
RUN ls

CMD ["npm", "start"]
