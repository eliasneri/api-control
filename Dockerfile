# Use a imagem base do Node.js
FROM node:16-alpine
# Instala as dependências do sistema
# RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates curl ttf-freefont

# Define o caminho do executável do Puppeteer
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Define para pular o download do Chromium pelo Puppeteer
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Define um diretório de trabalho no contêiner
WORKDIR /workspace

# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json ./

# Instale as dependências com cache e timeout aumentado
RUN yarn install --immutable --network-timeout 100000

# Copiar restante dos arquivos
COPY public ./public
COPY . .


# Expõe a porta que a aplicação vai usar (opcional)
EXPOSE 80

# Comando a ser executado ao iniciar o contêiner
CMD ["yarn", "start"]