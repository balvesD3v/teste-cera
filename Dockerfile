# Usar a imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Compilar o TypeScript
RUN npm run build

# Expor a porta que a aplicação usa (usualmente 3000)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:docker"]
