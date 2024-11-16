SELECT * FROM cinema.salas;

SELECT * FROM cinema.assentos;

SELECT * FROM cinema.ingressos;

SELECT * FROM cinema.sessoes;

SELECT * FROM cinema.vendas;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE cinema.assentos;
SET FOREIGN_KEY_CHECKS = 1;