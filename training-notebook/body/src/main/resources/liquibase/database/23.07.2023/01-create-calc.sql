--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE body_profile (
    id_user VARCHAR(255) PRIMARY KEY,
    weight DOUBLE PRECISION,
    height DOUBLE PRECISION,
    gender VARCHAR(255),
    age INTEGER,
    goals VARCHAR(255)
);

--changeset Mateusz:2
CREATE TABLE body_measurement (
    id BIGSERIAL PRIMARY KEY,
    id_user VARCHAR(255) NOT NULL,
    waist_circumference DOUBLE PRECISION,
    bicep_circumference DOUBLE PRECISION,
    chest_circumference DOUBLE PRECISION,
    thigh_circumference DOUBLE PRECISION,
    hip_circumference DOUBLE PRECISION,
    forearm_circumference DOUBLE PRECISION,
    calf_circumference DOUBLE PRECISION,
    neck_circumference DOUBLE PRECISION,
    wrist_circumference DOUBLE PRECISION,
    shoulder_circumference DOUBLE PRECISION,
    date_measured TIMESTAMP,
    CONSTRAINT fk_body_profile FOREIGN KEY (id_user) REFERENCES body_profile(id_user) ON DELETE CASCADE
);

--changeset Mateusz:3
CREATE INDEX idx_body_profile_id_user ON body_measurement(id_user);
