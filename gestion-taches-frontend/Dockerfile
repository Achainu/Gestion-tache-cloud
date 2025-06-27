# Étape 1 : Construction de l'application React
FROM node:18-alpine AS build

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers source
COPY . .

# Build de l'application pour production
RUN npm run build

# Étape 2 : Déploiement avec Nginx
FROM nginx:stable-alpine

# Copie les fichiers compilés depuis l'étape build vers le dossier Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
