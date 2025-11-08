FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN cp -r src build/server/

EXPOSE 3000

CMD ["npm", "run", "start"]
