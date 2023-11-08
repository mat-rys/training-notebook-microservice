--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    calories DOUBLE PRECISION,
    carbs DOUBLE PRECISION,
    protein DOUBLE PRECISION,
    fat DOUBLE PRECISION,
    day DATE,
    meal_time TIME,
    user_id VARCHAR(255)
);




