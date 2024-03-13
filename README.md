## Project Overview

The project is aimed at assisting users in their pursuit of physical fitness by providing a comprehensive suite of functionalities accessible in one place. Currently, it includes the following features:

- 💪 **Training Notes**: Allows users to keep track of their workout routines, progress, and performance metrics.
  
- 🍽️ **Meal and Product Management**: Facilitates planning and monitoring of dietary intake, enabling users to manage meals and track nutritional information for various products.
  
- 📊 **Nutritional Calculators**: Provides tools for calculating and analyzing nutritional values, aiding users in making informed dietary decisions.

In addition, the project is highly scalable and open to extensive future development. Planned enhancements include:

- 🚀 **Motivational Elements**: Incorporating motivational features to inspire and encourage users on their fitness journey.
  
- 📈 **Statistical Insights**: Offering detailed statistics and analytics to help users track their progress and identify areas for improvement.
  
- 🌐 **Community Engagement**: Creating a vibrant sports community within the platform, fostering interaction, support, and collaboration among users with similar fitness goals.


## **✏️ Important information:**
At the moment, the project is not ready for external use due to Keycloak. However, I will resolve this issue soon by making keycloak available in the cloud.

## **🚀 The project model:**
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/14bff766-9a38-4c97-a665-6a61e5dd68c9)

## **💻 Technologies:**
Back-end
![Java](https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white) ![Spring](https://img.shields.io/badge/-Spring-6DB33F?style=flat-square&logo=spring&logoColor=white) ![Hibernate](https://img.shields.io/badge/-Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white) ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![PostgreSql](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![InteliJ](https://img.shields.io/badge/-IntelliJ%20IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white) ![Maven](https://img.shields.io/badge/-Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) ![Keycloak](https://img.shields.io/badge/-Keycloak-0052CC?style=flat-square&logo=keycloak&logoColor=white) ![Zipkin and Grafana](https://img.shields.io/badge/-Zipkin%20%26%20Grafana-FFCA28?style=flat-square&logo=grafana&logoColor=black)

Front-end
![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white)

UI/UX
![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

## **🧩 Important Functionalities utilized in the Project**
* **Multi-threaded Routing API Gateway**: Distributes traffic across user services with multi-threaded routing capabilities.
* **Security Provided by External Tool Keycloak**: Ensures robust security, particularly beneficial for larger applications like microservices.
* **External Security Does Not Constrain Us During Component Operations**: External security measures do not limit our ability to operate any component.
* **Service Segmentation Allows Project to Function Despite Certain Components Being Non-Operational**: Division into services enables the project to continue functioning even if specific elements are non-operational.

## **🔒 Security**
* The project utilizes an authentication token that does not contain sensitive data.
* It employs the external tool Keycloak for authorization.
* The API gateway is open to requests, however, access to each service is not provided without authentication.
* Tokens are established in Keycloak, for example, temporally or based on scopes.

## **📚 Summary: The look of website:**
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/f14a0552-fa58-4a25-9c46-f0f5578ced1f)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/33de29d0-69e0-4466-9fb2-d335c44f1ecf)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/67a24285-62c6-42a2-918a-26e5b186014d)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/b2042712-9b3e-4f44-99ff-d6337df7f656)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/94877881-a3a3-4dfc-9ac1-739a2e8a5520)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/0538e4e8-ed6d-48cf-a085-082fced2b2f0)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/c07fbdee-b389-4db2-99a8-477927c4c042)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/9e80fb80-614d-47ef-99a2-ae9c846e3839)
![image](https://github.com/mat-rys/training-notebook-microservice/assets/98847639/f7ad49dd-b902-43f1-8eaa-98d818ca5e89)
