# Temporada PB — V7

Versão de consolidação dos itens 6 a 9 do projeto.

## 6. Filtros e navegação
- Hóspedes, quartos e banheiros.
- Tipo de hospedagem, região e origem (perfil oficial/anúncio externo).
- Piscina, estacionamento, ar-condicionado, pet friendly e favoritos.
- Ordenação por recomendação, avaliação, capacidade ou nome.
- Chips com filtros ativos e navegação inferior no celular.

## 7. Manutenção da base
- Cada registro possui `ultimaVerificacaoISO`.
- Até 30 dias: **Ativo**.
- 31 a 60 dias: **Revisar**.
- Mais de 60 dias: **Desatualizado**.
- Painel de manutenção e filtro por estado.
- Política centralizada em `data/meta.json`.

## 8. Identidade visual
- Paleta própria inspirada em mar, areia e litoral.
- Nova abertura, marca, cards, mapa e versão móvel.
- Sem dependências externas para manter o app leve e offline.

## 9. PWA
- Manifesto aprimorado.
- Ícones 192, 512 e maskable.
- Service Worker com cache do shell, dados, metadados e ícones.
- Indicador online/offline.
- Favoritos continuam locais e funcionam sem conta.

## Base
- 27 hospedagens cadastradas.
- Base revisada em 24/09/2026.
- Reserva e pagamento permanecem sempre na plataforma/perfil de origem.


## Status do projeto

**Versão atual:** V7

Base inicial com 27 hospedagens verificadas e estrutura PWA pronta para publicação.

### Recursos atuais

- mapa esquemático do corredor;
- filtro “Perto de…”;
- pesquisa por região e hospedagem;
- filtros por capacidade, quartos, tipo e comodidades;
- favoritos locais;
- tela interna de detalhes;
- status de atualização dos anúncios;
- funcionamento PWA/offline;
- links direcionando para as fontes originais.

### Próxima etapa

Publicar o repositório no GitHub e realizar a primeira implantação no Vercel.

## Logotipo oficial

O logotipo do Amigos da Vênus é armazenado dentro do próprio repositório.

Ele é utilizado:
- no canto superior da aplicação;
- como ícone da PWA em 192×192;
- como ícone da PWA em 512×512;
- como ícone maskable para Android.

O projeto não depende de links externos para carregar o logotipo depois da publicação.
