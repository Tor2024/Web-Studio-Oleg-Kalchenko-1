FROM node:22

WORKDIR /app

COPY apps/web/package*.json ./

RUN npm install --legacy-peer-deps

COPY apps/web/ ./

RUN npm run build

RUN cp -r src build/server/

EXPOSE 3000

CMD ["npm", "run", "start"]
