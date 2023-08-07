--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE bmi_records (
    bmi_id SERIAL PRIMARY KEY,
    height DOUBLE PRECISION NOT NULL,
    weight DOUBLE PRECISION NOT NULL,
    bmi_value DOUBLE PRECISION NOT NULL,
    bmi_category VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);




