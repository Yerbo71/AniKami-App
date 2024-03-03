# AnimeKami Project

## anime-app - Frontend React Application


### Pages

#### Login
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/4b1dcb6e-7b02-4b6e-93d3-38085552b15d)

#### Registration
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/9c00792b-629f-4a61-9abc-9870f50a12ea)

#### Main Page
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/6f43cc1d-1b4f-420c-9b64-0dbc5a102955)

#### AnimePage 
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/a85a5831-fca8-4f6c-85e4-3393710968e8)

#### Top Anime
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/be17b51f-a762-4dd0-90ef-8ad4426743f5)

#### Top Manga
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/88c81b7b-3827-4c93-881f-c58aaac1d1a4)

#### Modal Manga
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/2e537e0a-f3a5-4718-b0b1-c6e9d61d2cff)

#### Collection(Bookmark)
![image](https://github.com/Yerbo71/AniKami-App/assets/115892544/8ccc1e58-b323-4289-9de7-34e19ba15c27)

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
