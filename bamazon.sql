DROP database if exists bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  brand VARCHAR(100) NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (brand, product_name, department_name, price, stock_quantity)
VALUES ("GoPro", "HERO5 Black", "Cameras", 399.99, 25),
        ("GoPro", "HERO5 Session", "Cameras", 299.99, 17),
        ("Scarpa", "Maestrale RS Alpine Touring Boot", "Ski Boots", 728.95, 5),
        ("DPS Skis", "Wailer 106 Alchemist Ski", "Ski", 1298.95, 4),
        ("Marker", "Jester 18 Pro Ski Binding", "Ski", 398.95, 10),
        ("Black Crows", "Atris Skis", "Ski", 769.95, 10),
        ("Marker", "Lord SP Ski Binding", "Ski", 379.00, 7),
        ("Brooks", "Cascadia 12 Trail Running", 129.95, 27),
        ("Smith", "Forefront Helmet", 220.00, 22),
        ("POC", "Tectal Helmet", 189.95, 12);
