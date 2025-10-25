FROM node:18

WORKDIR /usr/src/app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar ts-node-dev globalmente + dependencias
RUN npm install -g ts-node-dev
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar la API
CMD ["ts-node-dev", "--respawn", "--transpile-only", "--files", "src/index.ts"]

# Nota: Para construir y correr el contenedor, usar los siguientes comandos:
