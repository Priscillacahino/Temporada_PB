# Testes — Temporada PB V9.2.2

Data da revisão: **25/09/2026**

## Escopo da auditoria

A versão 9.2.2 consolida a busca por cidade, a ordenação por distância aproximada, a responsividade e a manutenção do PWA sem adicionar novas funções ao projeto.

## Verificações estruturais

- `manifest.json`, `version.json`, `data/meta.json` e `data/imoveis.json` válidos;
- **27 registros** preservados;
- `data/meta.json` alinhado automaticamente com a quantidade real da base;
- IDs, nomes e URLs sem duplicidade exata;
- campos essenciais de nome, cidade, região, fonte e URL presentes;
- região `Zona Sul / acesso PB-008` padronizada;
- nenhuma imagem externa incorporada à base de hospedagens;
- busca com João Pessoa e Conde dentro do campo **Buscar**;
- ordenação **Distância: mais próximos primeiro** habilitada após a seleção da cidade;
- distâncias identificadas como aproximadas;
- filtros de capacidade excluem registros sem capacidade conhecida quando há mínimo selecionado;
- CSS consolidado em `styles.css`;
- Service Worker com cache atualizado;
- favoritos, detalhes, compartilhamento, idiomas e instalação PWA preservados;
- identidade pública `Temporada PB`;
- nenhuma dependência de backend ou serviço pago.

## Teste funcional recomendado após publicação

### Computador

1. Abrir o site em janela anônima.
2. Selecionar João Pessoa em **Buscar**.
3. Selecionar **Distância: mais próximos primeiro**.
4. Conferir se os resultados começam pelos imóveis mais próximos do endereço-base de João Pessoa.
5. Limpar e repetir com Conde.
6. Testar região, tipo, hóspedes e comodidades.
7. Abrir detalhes, fonte, favorito e compartilhar.
8. Trocar português/espanhol.

### Celular

1. Abrir em navegador móvel.
2. Conferir busca e lista de sugestões.
3. Abrir e fechar **+ Mais filtros**.
4. Testar rolagem sem conteúdo saindo da largura da tela.
5. Testar os botões dos cards.
6. Instalar como PWA quando o navegador oferecer essa opção.
7. Abrir uma segunda vez sem conexão para validar o cache disponível.

## Observação

As informações das hospedagens podem mudar e devem ser confirmadas diretamente na fonte original. As distâncias são estimativas por bairro/região e não representam rota GPS exata.