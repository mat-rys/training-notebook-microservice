FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} calculator.jar
ENTRYPOINT ["java","-jar","/calculator.jar"]
EXPOSE  8090