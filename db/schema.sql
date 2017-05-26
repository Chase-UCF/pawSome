CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;

CREATE TABLE pets(
type varchar(50) NOT NULL,
name varchar(50) NOT NULL,
description varchar(50) NOT NULL,
age INT NOT NULL,
sex BOOLEAN NOT NULL,
img_url varchar(255)
);