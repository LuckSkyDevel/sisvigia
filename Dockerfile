FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código do projeto
COPY . .

# Expor a porta do servidor
EXPOSE 4000

# Comando de inicialização
CMD ["npm", "start"]