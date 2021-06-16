SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE users (
    "_id" SERIAL PRIMARY KEY,
    "token" TEXT,
    "username" TEXT,
    "password_digest" TEXT,
    "email" TEXT,
    "gender" TEXT,
    "birthdate" TEXT,
    "skill_level" TEXT,
    "bio" TEXT,
    "location" TEXT
);

CREATE TABLE users_instruments (
  "_id" SERIAL PRIMARY KEY,
  "user_id" BIGINT,
  "instrument_id" BIGINT
);

CREATE TABLE users_genres (
  "_id" SERIAL PRIMARY KEY,
  "user_id" BIGINT,
  "genre_id" BIGINT
);

CREATE TABLE genre (
  "_id" SERIAL PRIMARY KEY,
  "genre_name" TEXT
);

CREATE TABLE instruments (
  "_id" SERIAL PRIMARY KEY,
  "instrument_name" TEXT
);

-- psql -d postgres://obzhuzsf:kY_Ho0WRyGVLNlo--Akm8P4VpDR87oDD@batyr.db.elephantsql.com/obzhuzs -f bandmates_postgres_db.sql

-- postgres://obzhuzsf:kY_Ho0WRyGVLNlo--Akm8P4VpDR87oDD@batyr.db.elephantsql.com/obzhuzsf

-- psql -d postgres://obzhuzsf:kY_Ho0WRyGVLNlo--Akm8P4VpDR87oDD@batyr.db.elephantsql.com/obzhuzsf -f bandmates_postgres_db.sql

-- psql -d postgres://obzhuzsf:kY_Ho0WRyGVLNlo--Akm8P4VpDR87oDD@batyr.db.elephantsql.com/obzhuzsf -f bandmates_postgres_db.sql