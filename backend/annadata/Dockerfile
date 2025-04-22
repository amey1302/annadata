# Use OpenJDK base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar file (update name if different)
COPY target/annadata-0.0.1-SNAPSHOT.jar app.jar

# Expose port (optional)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
