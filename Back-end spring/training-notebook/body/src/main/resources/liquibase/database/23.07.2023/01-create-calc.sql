--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE body_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    weight DOUBLE PRECISION NOT NULL,
    height DOUBLE PRECISION NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    goals VARCHAR(255) NOT NULL
);





