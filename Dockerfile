FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
# Provide a dummy DATABASE_URL so prisma generate doesn't crash
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN npx prisma generate
RUN npm run build

EXPOSE  3000
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && npm run start"
