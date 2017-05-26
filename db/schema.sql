CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;

# Create the burgers table
CREATE TABLE user (
id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE answers (
client_id int NOT NULL,
answer1 varchar(255) NOT NULL,
answer2 varchar(255) NOT NULL,
answer3 varchar(255) NOT NULL,
answer4 varchar(255) NOT NULL,
answer5 varchar(255) NOT NULL,
PRIMARY KEY (id)
);