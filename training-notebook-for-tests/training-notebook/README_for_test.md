# java-is-23-mr

## **🚀 The project model I aimed to implement is as follows, and the ports in the test remain the same:**
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/b334bb03-0166-4de2-a15e-dab975d6e9d6)

I added a folder named "training-notebook-for-tests" containing the project for tests that fulfill the task requirements. Additionally, I made the following modifications:
* Removed security-related elements such as dependencies and configuration classes.
* Eliminated token elements.
* Adjusted controllers and tests to ensure that security-related data does not interfere with the methods.


## **🛠️ How to use:**

1.Create databse 
a.Provided a script in the "SqlDataBase" folder to create the necessary databases for the project. You can simply execute the script in the psql shell. The database is in PostgreSQL.
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/36fe8b3e-c5b7-438b-bd67-11645ede6e1a)

b.The tables will be automatically created if the databases exist when starting the services through Liquibase.

2.The order to run the components of the project:
* nr.1 config-server
* nr.2 discovery
* nr.3 gateway
* nr.4 services like notes and calcualtor

3.If you wanna used ZIPKIN (Nedded docker on desktop)
a.go to the file of zipkin in terminal
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/08077622-f2ac-4aee-8bfb-7c60d47128b8)

b.write in console "docker-compose up"
c.Now you have zipkin on port 9411
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/3a89ded1-9d21-4a3c-8ac5-b60aa0c50a37)


4.If you wanna used GRAFANA (Nedded docker on desktop, needed zipkin first) login=admin password=admin
a.go to the file of grafana in terminal

![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/2c61f517-57d2-4b28-b4b9-cb40d2f6ebaf)

b.write in console "docker-compose up"
c.Now you have grafana on port 3000

GRAFANA USE:
a. CLICK ON CREATE DASCHBOARD
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/ec20f66d-8687-462b-91e9-3d6d0974fde8)
b.Create visualization

c.Then new configration -> chose ZIPKIN -> and put data like this under 
![image](https://github.com/softwarehutpl/java-is-23-mr/assets/98847639/776acafb-1b5b-44da-a651-625f5765f38e)

c.Now if you get back to the start of point c. you will have a correct connection with zipkin to chose 





## **📚 Summary: If you have completed all the previous steps:**

PORT 8222 API GATEWAY acting as an intermediary between services.

PORT 8222 SWAGGER  http://localhost:8222/webjars/swagger-ui/4.15.5/index.html?urls.primaryName=calculator

PORT 8761 EUREKA SERVER http://localhost:8761/

PORT 8090 CALCUALTOR SERVICE

PORT 8070 NOTES SERVICE

PORT 9411 ZIPKIN  http://localhost:9411/zipkin/

PORT 3000 GRAFANA http://localhost:3000/?orgId=1

