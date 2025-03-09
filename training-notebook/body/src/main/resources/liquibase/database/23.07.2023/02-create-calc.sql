--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE photo_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    photo_url VARCHAR(255)
);





