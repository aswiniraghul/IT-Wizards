ALTER TABLE user 
ADD last_name VARCHAR(80);

ALTER TABLE user 
MODIFY COLUMN last_name VARCHAR(80) AFTER first_name;
