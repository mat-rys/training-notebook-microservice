--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE photo_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    photoUrl VARCHAR(255)
);





