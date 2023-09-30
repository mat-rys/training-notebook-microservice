FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} notes.jar
ENTRYPOINT ["java","-jar","/notes.jar"]
EXPOSE  8070