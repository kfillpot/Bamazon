DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(15),
    department_name VARCHAR(15),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dell Laptop", "Electronics", 750.00, 25),
("OnePlus 6", "Electronics", 550.00, 3),
("Nintendo Switch", "Electronics", 250.00, 12),
("Record Player", "Electronics", 124.99, 100),
("The Beach Boys", "Music", 19.99, 35),
("Black Jeans", "Clothing", 15.99, 50),
("Slip N' Slide", "Outdoors", 34.99, 20),
("Rechargable Batteries", "Electronics", 19.99, 60);


SELECT * FROM products;
