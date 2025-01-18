FROM maven:3.9.6-openjdk AS build

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/dm-be-0.0.1-SNAPSHOT.jar /disastermaster.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "/disastermaster.jar" ]