-- OBS : Esse código não está mais sendo usado, apesar dos triggers estarem funcionando, foi optado substuir o trigger por uma validação no endpoint devido as compicações

drop trigger if exists recibo_ticket;
delimiter //
create trigger recibo_ticket 
	before insert on ingressos
	for each row
begin
	-- Declaração de variaveis
	declare precoIngresso int default 40;
    declare isVip boolean;
    
    declare codigoAssento varchar(5);
    declare nomeFilme varchar(20);
    declare blocoSala char(1);
    declare numeroSala int;
    declare idSala1 int;
    declare idSala2 int;
    declare ingressoExiste boolean;
    
    -- Pega os dados do assento e da sala
    select a.vip, a.codigo, a.id_sala, s.bloco, s.numero into isVip, codigoAssento, idSala1, blocoSala, numeroSala
    from assentos a
    natural join salas s
    where a.id = new.id_assento;
    if isVip then
		set precoIngresso = 70;
	end if;
    
    -- Pega os dados da sessao
    select nome_do_filme, id_sala into nomeFilme, idSala2
    from sessoes
    where id = new.id_sessao;
    
    -- Se a sala da sessao foi diferente da sala do assento
    if idSala <> idSala2 then
        signal sqlstate '45000'
        set message_text = "Esse assento não pode ser reservado nesta sessão";
    end if;
    
    -- checa se o ingresso ja foi vendido
    select count(*) into ingressoExiste
    from ingressos 
    where id_sessao = new.id_sessao
    and id_assento = new.id_assento;
    
    if ingressoExiste then
		signal sqlstate '45000'
        set message_text = "Esse ingresso ja foi vendido";
	end if;
    
    set new.preco = precoIngresso;
    
    
    -- inseri o extrado da venda
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


drop trigger if exists recibo_estorno_ticket;
delimiter //
create trigger recibo_estorno_ticket
	before delete on ingressos
    for each row
begin
	-- Declaração de variaveis
	declare precoIngresso int default 40;
    declare isVip boolean;
    
    declare codigoAssento varchar(5);
    declare nomeFilme varchar(20);
    declare blocoSala char(1);
    declare numeroSala int;
    declare ingressoExiste boolean;
    
    -- Pega os dados do assento e da sala
    select a.vip, a.codigo, a.id_sala, s.bloco, s.numero into isVip, codigoAssento, blocoSala, numeroSala
    from assentos a
    natural join salas s
    where a.id = old.id_assento;
    if isVip then
		set precoIngresso = 70;
	end if;
    
    -- Pega os dados da sessao
    select nome_do_filme into nomeFilme
    from sessoes
    where id = old.id_sessao;


    -- inseri o extrado da venda
	insert into vendas (descricao, preco, horario_venda) values 
    (    
    CONCAT(
        'Estorno de ingresso - ', 
        nomeFilme, ' - Assento ', 
        codigoAssento, ', Bloco ', 
        blocoSala, ' Sala ', 
        numeroSala, ', Sessão '
    ), 
    precoIngresso * -1, 
    now());
end //
    
delimiter ;



