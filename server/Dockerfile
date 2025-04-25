FROM eclipse-temurin:24-jdk

WORKDIR /usr/src/app

ARG JAR_FILE=server/target/server-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
