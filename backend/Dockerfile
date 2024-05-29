FROM node:18-alpine3.18

WORKDIR /app

RUN apk add --no-cache python3 make g++ 


COPY package*.json ./
COPY prisma/schema.prisma ./prisma/


RUN npm install


RUN npm rebuild bcrypt --build-from-source


RUN npx prisma generate


COPY . .

EXPOSE 8000

CMD ["npm", "start"]
