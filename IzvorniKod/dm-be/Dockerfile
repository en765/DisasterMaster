# Use an official Maven image as the base image
FROM maven:3.9.6-amazoncorretto-17 AS build
# Set the working directory in the container
WORKDIR /dm-be
# Copy the pom.xml and the project files to the container
COPY IzvorniKod/dm-be .
# Build the application using Maven
RUN mvn clean package -DskipTests
# Use an official OpenJDK image as the base image
FROM amazoncorretto:17-alpine3.19
# Set the working directory in the container
WORKDIR /dm-be
# Copy the built JAR file from the previous stage to the container
COPY --from=build /dm-be/target/backend-0.0.1.jar .
EXPOSE 8080
# Set the command to run the application
CMD ["java", "-jar", "backend-0.0.1.jar"]