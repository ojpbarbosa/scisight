FROM openjdk:17-jdk-alpine

RUN apk --no-cache add maven

COPY . /app

WORKDIR /app

RUN mvn clean install

COPY ./core/target/*.jar /app.jar

CMD ["java", "-jar", "/app.jar"]
