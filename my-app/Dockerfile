FROM node:14.17.0
WORKDIR /usr/src/app
COPY package*.json ./

ENV MONGO_URL mongodb://localhost:27017/jianshu
ENV DB_NAME jianshu
ENV SECRET YOUR_SECRET
ENV EMAIL_SERVER smtp://appnoreply@126.com:SDEQVMDOVNBNRGLP@smtp.126.com:25
ENV EMAIL_FROM appnoreply@126.com

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "build"]