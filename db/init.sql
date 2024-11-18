-- Create the user with caching_sha2_password authentication plugin
CREATE USER 'admin'@'%' IDENTIFIED WITH caching_sha2_password BY 'admin';

-- Grant necessary privileges
GRANT ALL PRIVILEGES ON cinema.* TO 'admin'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;