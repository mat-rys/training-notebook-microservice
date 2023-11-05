-- Tworzenie bazy danych
CREATE DATABASE notes;

-- Tworzenie użytkownika
CREATE USER postgres WITH PASSWORD '1234';

-- Nadawanie uprawnień użytkownikowi dla bazy danych
GRANT ALL PRIVILEGES ON DATABASE notes TO postgres;

-- psql -U postgres -f notes.sql