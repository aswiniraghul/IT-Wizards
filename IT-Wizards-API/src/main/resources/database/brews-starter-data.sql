-- Starter Data

-- Category
INSERT INTO category (category_name)
VALUES("Accessories");

-- Product
INSERT INTO product (product_name, product_price, product_description, product_inventory, category_category_id)
VALUES ("The Coder's Caludron", 100.00, "This mystical toolkit is designed for the modern-day programmer who wants to blend their magical powers with technology. ", 12, 1);

INSERT INTO product (product_name, product_price, product_inventory, category_category_id)
VALUES("Programming Starter Kit", 75.00, 4, 1);

-- User

INSERT INTO user (username, first_name, last_name, password)
VALUES("theboywholived", "Harry", "Potter", "nimbus2000");

INSERT INTO user (username, first_name, last_name, password)
VALUES ("gandalfthegrey", "Gandalf", "Grey", "youshallnotpass");