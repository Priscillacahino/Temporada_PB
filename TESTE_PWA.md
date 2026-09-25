# Testes — Temporada PB V9.4.3

Data da revisão: **25/09/2026**

## Escopo da auditoria

Esta revisão parte da versão atualmente publicada do Temporada PB e verifica apenas os pontos ainda pendentes após a consolidação da identidade independente.

## Verificações estruturais

- `manifest.json`, `version.json`, `data/meta.json` e `data/imoveis.json` válidos;
- 27 registros preservados;
- IDs, nomes e URLs sem duplicidade exata;
- campos essenciais de nome, cidade, região, fonte e URL presentes;
- nenhuma imagem externa incorporada à base de hospedagens;
- Service Worker atualizado;
- identidade pública `Temporada PB`;
- subtítulo `Sugestão de hospedagem Paraíba`;
- nenhuma referência ativa à identidade pública anterior;
- nenhum vínculo funcional com projetos ou repositórios externos;
- favoritos, filtros, compartilhamento, idiomas e instalação PWA preservados.

## Validação recomendada após publicação

Abra o site no celular e no computador e teste busca, filtros, favoritos, detalhes, links externos, troca de idioma, instalação PWA e uma segunda abertura offline.

As informações das hospedagens podem mudar e devem ser confirmadas diretamente na fonte original.
