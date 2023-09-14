# Użyj obrazu OpenJDK 11
FROM openjdk:11-jre-slim

# Skopiuj aplikację do kontenera
COPY target/notes.jar /app.jar

# Ustaw zmienne środowiskowe
ENV SPRING_PROFILES_ACTIVE=production

# Expose port, na którym działa Twoja aplikacja Spring Boot
EXPOSE 8070

# Uruchom aplikację Spring Boot po uruchomieniu kontenera
CMD ["java", "-jar", "/app.jar"]
