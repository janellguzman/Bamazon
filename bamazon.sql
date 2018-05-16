CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL default 0,
  stock_quantity VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);
