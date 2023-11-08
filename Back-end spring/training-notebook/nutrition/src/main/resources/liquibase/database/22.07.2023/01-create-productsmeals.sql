--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE products_meal (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    calories DOUBLE PRECISION,
    grams INT,
    carbs DOUBLE PRECISION,
    protein DOUBLE PRECISION,
    fat DOUBLE PRECISION,
    meal_id BIGINT,
    FOREIGN KEY (meal_id) REFERENCES meals (meal_id)
);





