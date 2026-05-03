FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE  3000
CMD sh -c "npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run start"
