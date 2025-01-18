# Step 1: Use an official JDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Step 2: Set the working directory inside the container
WORKDIR /IzvorniKod .

# Step 3: Copy the JAR file into the container
COPY target/dm-be-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose the port your Spring Boot app runs on
EXPOSE 8080

# Step 5: Specify the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
