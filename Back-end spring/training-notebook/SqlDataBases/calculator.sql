-- Tworzenie bazy danych
CREATE DATABASE calculator;

-- Tworzenie użytkownika
CREATE USER postgres WITH PASSWORD '1234';

-- Nadawanie uprawnień użytkownikowi dla bazy danych
GRANT ALL PRIVILEGES ON DATABASE calculator TO postgres;

-- psql -U postgres -f calculator.sql
