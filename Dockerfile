FROM node:latest

WORKDIR /usr/app

COPY . .
RUN apt-get update && apt-get install cpio
RUN npm install
RUN npm run build
RUN ls

EXPOSE 8080

CMD ["npm", "start"]
