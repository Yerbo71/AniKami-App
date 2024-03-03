# AnimeKami Project

## anime-app - Frontend React Application

### Dependencies

- **[@chakra-ui/react](https://github.com/chakra-ui/chakra-ui):** ^2.8.2
- **@emotion/react:** ^11.11.3
- **@emotion/styled:** ^11.11.0
- **axios:** ^1.6.7
- **formik:** ^2.4.5
- **framer-motion:** ^11.0.3
- **jsonwebtoken:** ^9.0.2
- **jwt-decode:** ^4.0.0
- **lodash:** ^4.17.21
- **react:** ^18.2.0
- **react-dom:** ^18.2.0
- **react-icons:** ^5.0.1
- **react-router-dom:** ^6.22.0
- **react-slick:** ^0.30.2
- **slick-carousel:** ^1.8.1

### DevDependencies

- **@types/react:** ^18.2.43
- **@types/react-dom:** ^18.2.17
- **@vitejs/plugin-react-swc:** ^3.5.0
- **eslint:** ^8.55.0
- **eslint-plugin-react:** ^7.33.2
- **eslint-plugin-react-hooks:** ^4.6.0
- **eslint-plugin-react-refresh:** ^0.4.5
- **vite:** ^5.0.8

### Instructions

1. Navigate to the `anime-app` directory: `cd anime-app`
2. Install dependencies: `npm install`
3. Run the application: `npm run dev`

---

## SpringSecurity - Backend Java-Spring Application

### Install

- Java
- PostgreSQL

### Database

```sql
CREATE TABLE users (
    id integer not null,
    email varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    password varchar(255),
    role varchar(255) check (role in ('USER','ADMIN')),
    primary key (id)
);
