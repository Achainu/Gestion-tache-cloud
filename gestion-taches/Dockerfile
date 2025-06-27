# Utiliser une image Node officielle, version stable (ici la 18)
FROM node:18-alpine

# Définir le dossier de travail dans le container
WORKDIR /usr/src/app

# Copier les fichiers de dépendances package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

# Copier tout le reste des fichiers source de l'application
COPY . .

# Exposer le port utilisé par l'application (adapter si besoin)
EXPOSE 3000

# Commande pour démarrer le serveur Node.js
CMD ["node", "serveur.js"]
