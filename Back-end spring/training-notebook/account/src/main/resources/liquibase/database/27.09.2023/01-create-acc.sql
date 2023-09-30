--liquibase formatted sql
--changeset Mateusz:1

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    account_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    account_role VARCHAR(255) NOT NULL
);



