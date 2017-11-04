DROP DATABASE IF EXISTS analytics;
CREATE DATABASE analytics;

USE analytics;

CREATE TABLE user_data (
  id INT AUTO_INCREMENT NOT NULL,
  userId INT NOT NULL,
  ratio DECIMAL(5, 4) NOT NULL,
  engagement DECIMAL(5, 4),
  first VARCHAR(200),
  second VARCHAR(200),
  third VARCHAR(200),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (id)
);

CREATE TABLE interests (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_inputs (
  id INT AUTO_INCREMENT NOT NULL,
  usersId INT NOT NULL,
  categoryId INT NOT NULL,
  clicks INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (categoryId) REFERENCES interests(id)
);

CREATE INDEX inputId ON user_inputs (usersId);
CREATE INDEX id ON user_inputs (id DESC);
CREATE INDEX userId ON user_data (userId);

INSERT INTO interests (name) VALUES 
  ("food"), ("fashion"), ("products"), ("sports"), ("travel"),
  ("events"), ("design"), ("entertainment"), ("DIY/crafts"), ("photography");