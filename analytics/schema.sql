DROP DATABASE IF EXISTS analytics;
CREATE DATABASE analytics;

USE analytics;

CREATE TABLE user_data (
  id INT NOT NULL,
  ratio DECIMAL(5, 4) NOT NULL,
  engagement DECIMAL(5, 4),
  category VARCHAR(200),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (id)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_categories (
  id INT AUTO_INCREMENT NOT NULL,
  userId INT NOT NULL,
  categoryId INT NOT NULL,
  clicks INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user_data(id),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE fake_client (
  userId INT,
  engagement DECIMAL(5, 4),
  calcualte TINYINT(1),
  food INT,
  fashion INT, 
  products INT,
  travel INT,
  events INT,
  design INT,
  entertainment INT,
  crafts INT,
  photography INT
);

INSERT INTO categories (name) VALUES 
  ("food"), ("fashion"), ("products"), ("sports"), ("travel"),
  ("events"), ("design"), ("entertainment"), ("DIY/crafts"), ("photography");