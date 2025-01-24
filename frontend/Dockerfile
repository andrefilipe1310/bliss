# Etapa 1: Build da aplicação Ionic/Angular
FROM node:18-alpine AS build

# Configura o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o conteúdo do projeto para dentro do container
COPY . .

# Compila o projeto para produção
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração do Nginx para o container
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos compilados do Ionic/Angular para o diretório de publicação do Nginx
COPY --from=build /app/www /usr/share/nginx/html

# Exponha a porta onde o Nginx estará servindo (geralmente 80)
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]