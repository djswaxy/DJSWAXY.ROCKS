# Vi starter med en lettvektsversjon av Node.js
FROM node:18-alpine

# Lag en arbeidsmappe inni containeren
WORKDIR /app

# Kopier package.json først (for å installere dependencies effektivt)
COPY package.json ./

# Installer nødvendige pakker (express osv.)
RUN npm install

# Kopier resten av filene dine (html, css, js, bilder) inn i containeren
COPY . .

# Fortell Docker at appen bruker port 3000
EXPOSE 3000

# Kommandoen som starter serveren
CMD ["node", "server.js"]