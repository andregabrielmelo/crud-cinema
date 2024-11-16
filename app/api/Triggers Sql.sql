drop trigger if exists recibo_ticket;
delimiter //
create trigger recibo_ticket 
	before insert on ingressos
	for each row
begin
	declare precoIngresso int default 40;
    declare isVip boolean;
    
    declare codigoAssento varchar(5);
    declare nomeFilme varchar(20);
    declare blocoSala char(1);
    declare numeroSala int;
    declare idSala int;
    declare idSala2 int;
    
    select vip, codigo, id_sala into isVip, codigoAssento, idSala
    from assentos a
    where a.id = new.id_assento;
    if isVip then
		set precoIngresso = 70;
	end if;
    select bloco, numero into blocoSala, numeroSala 
    from salas
    where id = idSala;
    
    select nome_do_filme, id_sala into nomeFilme, idSala2
    from sessoes
    where id = new.id_sessao;
    
    if idSala <> idSala2 then
        signal sqlstate '45000'
        set message_text = "Esse assento não pode ser reservado nesta sessão";
    end if;
    
    set new.preco = precoIngresso;
    
	insert into vendas (descricao, preco, horario_venda) values 
    (    
    CONCAT(
        'Venda de ingresso - ', 
        nomeFilme, ' - Assento ', 
        codigoAssento, ', Bloco ', 
        blocoSala, ' Sala ', 
        numeroSala, ', Sessão ', 
        new.id_sessao
    ), 
    precoIngresso, 
    now());
end
 //
delimiter ;

