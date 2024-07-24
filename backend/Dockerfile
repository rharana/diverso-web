FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
COPY uploads uploads
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080