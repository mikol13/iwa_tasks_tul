# UniGrade

UniGrade is a simple university web application for students, lecturers, subjects and grades. It has two role-specific views and uses JWT authentication.

## What the application does

- A student can see only their university group, subjects and grades.
- A student can search, filter and sort their grades.
- A lecturer (the administrator role in this project) can create a subject for a university group.
- A lecturer can assign grades only for their own subjects and students from the matching group.

## Technologies

- **Database:** PostgreSQL stores users, groups, students, lecturers, subjects and grades.
- **Back end:** Spring Boot exposes JSON REST endpoints. Spring Data JPA uses Hibernate to map Java entities and their relationships to PostgreSQL tables.
- **Security:** Spring Security verifies a JWT on protected endpoints and checks the `STUDENT` or `TEACHER` role.
- **Front end:** Angular uses standalone components, routing, validated forms and dependency-injected services. Components never call the REST API directly.

## Requirement checklist

| Requirement | Implementation |
| --- | --- |
| PostgreSQL | Configured in `backend/src/main/resources/application.properties` |
| Spring Boot REST API | `AuthController`, `StudentController` and `TeacherController` return JSON |
| At least four domain classes | `UserAccount`, `Student`, `Teacher`, `UniversityGroup`, `Subject` and `Grade` |
| JWT on back end and front end | JWT filter and Spring Security on the back end; token interceptor and route guards in Angular |
| Two role-specific views | `/student` and `/teacher` |
| Angular components and routing | Login, student dashboard, lecturer dashboard, header and protected routes |
| REST through services | `AuthService`, `StudentService` and `TeacherService` use dependency injection |
| Search and sort | Student grade search, subject filter and five sorting options |
| Five front-end events | `click`, `input`, `change`, `keyup.enter` and `ngSubmit` |
| Form validation | Login, subject creation and grade forms use Angular validation; requests are also validated on the back end |
| Intuitive CSS interface | Responsive dashboards, cards, tables, filters and clear form messages |

## Run the project

1. Start PostgreSQL and create database `IWA_3`. The default credentials are user `postgres` and password `postgres`. They can be changed in `backend/src/main/resources/application.properties`.
2. Start the back end:

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. Start the front end in a second terminal:

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open `http://localhost:4200`.

## Demo accounts

| Role | Username | Password |
| --- | --- | --- |
| Student | `jan.student` | `student123` |
| Student | `zosia.student` | `student123` |
| Lecturer | `anna.teacher` | `teacher123` |
| Lecturer | `marek.teacher` | `teacher123` |

On a fresh database, the back end creates university group `IWA-1`, demo accounts, two subjects and example grades. Registration is intentionally omitted to keep the project focused on the required student and lecturer workflows.
