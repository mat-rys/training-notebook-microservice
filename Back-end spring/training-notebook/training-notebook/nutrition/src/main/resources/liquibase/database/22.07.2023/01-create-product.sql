--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    calories DOUBLE PRECISION,
    grams INTEGER,
    carbs DOUBLE PRECISION,
    protein DOUBLE PRECISION,
    fat DOUBLE PRECISION
);





