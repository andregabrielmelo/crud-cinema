-- Create 'salas' table
USE cinema;

INSERT INTO salas (bloco, numero, total_de_assentos) 
VALUES 
('A', 1, 100),
('B', 2, 150),
('C', 3, 200);

-- Create 'assentos' table (populate with some data for each 'sala')
INSERT INTO assentos (id_sala, codigo, vip) 
VALUES 
(1, 'A1', false),
(1, 'A2', false),
(1, 'A3', true),
(2, 'B1', false),
(2, 'B2', false),
(2, 'B3', true),
(3, 'C1', false),
(3, 'C2', true),
(3, 'C3', false);

-- Create 'produtos' table
INSERT INTO produtos (nome, preco) 
VALUES 
('Pipoca', 15.50),
('Refrigerante', 8.00),
('Candy', 5.00);

-- Create 'sessoes' table
INSERT INTO sessoes (id_sala, nome_do_filme, horario_inicial, horario_final) 
VALUES 
(1, 'Movie 1', '2024-11-17 14:00:00', '2024-11-17 16:00:00'),
(2, 'Movie 2', '2024-11-17 16:30:00', '2024-11-17 18:30:00'),
(3, 'Movie 3', '2024-11-17 19:00:00', '2024-11-17 21:00:00');

-- Create 'ingressos' table
INSERT INTO ingressos (id_sessao, id_assento, preco, horario_venda) 
VALUES 
(1, 1, 30.00, '2024-11-16 10:00:00'),
(1, 2, 30.00, '2024-11-16 10:30:00'),
(2, 4, 35.00, '2024-11-16 12:00:00'),
(2, 5, 35.00, '2024-11-16 12:30:00'),
(3, 7, 40.00, '2024-11-16 14:00:00'),
(3, 8, 40.00, '2024-11-16 14:30:00');

-- Create 'vendas' table
INSERT INTO vendas (descricao, preco, horario_venda) 
VALUES 
('Ticket Sale - Movie 1', 30.00, '2024-11-16 10:00:00'),
('Ticket Sale - Movie 1', 30.00, '2024-11-16 10:30:00'),
('Ticket Sale - Movie 2', 35.00, '2024-11-16 12:00:00'),
('Ticket Sale - Movie 2', 35.00, '2024-11-16 12:30:00'),
('Ticket Sale - Movie 3', 40.00, '2024-11-16 14:00:00'),
('Ticket Sale - Movie 3', 40.00, '2024-11-16 14:30:00');