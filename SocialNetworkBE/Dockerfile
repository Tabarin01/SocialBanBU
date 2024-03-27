# Usa un'immagine di base di OpenJDK per Java 17
FROM openjdk:17-jdk-alpine

# Imposta la directory di lavoro nell'immagine
WORKDIR /app

# Copia il file JAR dell'applicazione Spring Boot nella directory dell'immagine
COPY target/*.jar app.jar

# Esponi la porta 8080 su cui sarà in ascolto l'applicazione Spring Boot
EXPOSE ${BACKEND_PORT}

# Comando per avviare l'applicazione Spring Boot quando il container viene avviato
CMD ["java", "-jar", "app.jar"]
