# Usa un'immagine di base di Node.js per l'applicazione Angular
FROM node:latest AS frontend-builder

# Imposta la directory di lavoro nell'immagine
WORKDIR /app/frontend

# Copia il codice sorgente della frontend nella directory di lavoro
COPY . .

# Installa le dipendenze Node.js
RUN npm install

# Espone la porta 4200 su cui sarà in ascolto l'applicazione Angular
EXPOSE ${FRONTEND_PORT}

# Comando per avviare l'applicazione Angular durante l'esecuzione del container
CMD ["npm", "run", "start"]
