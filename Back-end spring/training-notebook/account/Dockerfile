FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} account.jar
ENTRYPOINT ["java","-jar","/account.jar"]
EXPOSE 8100