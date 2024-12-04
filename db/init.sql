-- Create the user with caching_sha2_password authentication plugin
CREATE USER 'admin'@'%' IDENTIFIED WITH caching_sha2_password BY 'admin';

-- Grant necessary privileges
GRANT ALL PRIVILEGES ON cinema.* TO 'admin'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

CREATE DATABASE cinema;

use cinema;

CREATE TABLE salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bloco CHAR(1) NOT NULL,
    numero INT NOT NULL,
    total_de_assentos INT NOT NULL
);

CREATE TABLE assentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sala INT NOT NULL,
    codigo VARCHAR(5) NOT NULL,
    vip BOOLEAN NOT NULL,
    CONSTRAINT assentos_ibfk_1 FOREIGN KEY (id_sala) REFERENCES salas (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    INDEX id_sala (id_sala)
);

CREATE TABLE sessoes (
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_sala INT NOT NULL,
   nome_do_filme VARCHAR(20),
   horario_inicial TIMESTAMP(0) NOT NULL,
   horario_final TIMESTAMP(0) NOT NULL,
   CONSTRAINT sessoes_ibfk_1 FOREIGN KEY (id_sala) REFERENCES salas (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
   INDEX id_sala (id_sala)
);

CREATE TABLE ingressos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sessao INT NOT NULL,
    id_assento INT NOT NULL,
    preco DECIMAL(5, 2),
    horario_venda TIMESTAMP(0) NOT NULL,
    CONSTRAINT ingressos_ibfk_1 FOREIGN KEY (id_sessao) REFERENCES sessoes (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT ingressos_ibfk_2 FOREIGN KEY (id_assento) REFERENCES assentos (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    INDEX id_sessao (id_sessao),
    INDEX id_assento (id_assento)
);

CREATE TABLE produtos (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(50) NOT NULL,
     preco DECIMAL(5, 2) NOT NULL
);

CREATE TABLE vendas (
     id INT AUTO_INCREMENT PRIMARY KEY,
     descricao VARCHAR(50) NOT NULL,
     preco DECIMAL(5, 2) NOT NULL,
     horario_venda TIMESTAMP(0) NOT NULL
);

-- Preenchendo o banco de dados
source /docker-entrypoint-initdb.d/populate.sql;