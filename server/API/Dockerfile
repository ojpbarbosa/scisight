FROM openjdk:17-jdk-alpine

RUN apk --no-cache add maven

WORKDIR /app

COPY . .

RUN mvn clean install && \
    cp ./core/target/*.jar /app.jar

CMD ["java", "-jar", "/app.jar"]
