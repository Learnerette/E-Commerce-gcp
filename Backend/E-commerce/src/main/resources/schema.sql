-- schema.sql
CREATE TABLE products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255),
                          quantity INTEGER,
                          price DECIMAL(10, 2),
                          description VARCHAR(255),
                          category VARCHAR(255)
);
