# Spring Boot OAuth2 React Template

A Spring Boot starter template that uses React using the frontend-maven-plugin. 

## Description

The React frontend is served under `src/main/ui`, after building the whole project, a production built
of the frontend is copied to `src/main/resources/built.js`. 

It's not necessary to build them separately. In fact, you just need to run 

    ./mvnw spring-boot:run   
    
If you just wanna build the project, run

    mvn clean install

to generate a production build. In the background it will run the specified
npm commands (see `pom.xml`) and build the spring boot project.

## Requirements

* MySQL (community server is fine)
* JDK 8 or above

## Setup
0. Adjust username, password and port number in `application.yml`.
1. Create a Database called `db_springreact`. Generate the table with some example data:

```mysql
CREATE TABLE employee (id INT UNSIGNED NOT NULL AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255), description VARCHAR(255), PRIMARY KEY(id));    

INSERT INTO employee (first_name, last_name, description) VALUES ('John', 'Doe', 'accountant');
INSERT INTO employee (first_name, last_name, description) VALUES ('Sam', 'Smith', 'manager');
```

2. 
