--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE body_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    weight DOUBLE PRECISION ,
    height DOUBLE PRECISION ,
    gender VARCHAR(255) ,
    age INTEGER ,
    goals VARCHAR(255)
);
