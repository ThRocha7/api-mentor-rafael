FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i 

RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libnss3 \
  libx11-xcb1 \
  libxdamage1 \
  libxfixes3 \
  libxext6 \
  libx11-6 \
  libglib2.0-0 \
  && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]