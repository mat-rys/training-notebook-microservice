--liquibase formatted sql
--changeset Mateusz:2
CREATE TABLE limits_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    limit_calories INTEGER,
    limit_carbs INTEGER,
    limit_fats INTEGER,
    limit_proteins INTEGER
);
