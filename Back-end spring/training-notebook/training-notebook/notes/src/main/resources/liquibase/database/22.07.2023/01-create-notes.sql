--liquibase formatted sql
--changeset Mateusz:1
CREATE TABLE user_notes (
  note_id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  activity_type VARCHAR(255),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  description TEXT,
  user_id VARCHAR(255)
);



