# Amigos da Vênus 🐈‍⬛ 🌿🌊

Guia independente de apoio à pesquisa de hospedagens no litoral sul da Paraíba.

## Versão atual

**V8.4**

## Como funciona

1. A **Casa de Praia Vênus** aparece primeiro.
2. Se não houver disponibilidade, o guia apresenta outras opções.
3. A reserva, o pagamento e a confirmação dos dados continuam sempre na fonte original.

## Recursos

- PWA instalável;
- funcionamento offline após o primeiro acesso;
- indicador online/offline;
- mapa esquemático por regiões;
- filtros rápidos e avançados;
- favoritos locais;
- cards com miniaturas quando a fonte disponibiliza imagem pública;
- lazy loading de imagens;
- detalhes com alto contraste;
- compartilhamento nativo do celular;
- botão direto para a fonte original;
- agrupamento entre perfis oficiais e anúncios em plataformas;
- resumo por tipo de hospedagem;
- botão voltar ao topo;
- suporte a redução de movimento;
- foco visível e atalhos de acessibilidade;
- preview social para WhatsApp e redes;
- arquivo `version.json`;
- rotina `scripts/verificar_links.ps1` para ajudar na manutenção.

## Foto principal da Casa de Praia Vênus

Se existir:

`icons/casa-venus-destaque.jpg`

ela é usada como foto principal.

Caso o arquivo não exista, o aplicativo usa o logotipo como fallback.

## Manutenção dos links

Execute:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\verificar_links.ps1"
```

Será criado o arquivo `LINKS_A_REVISAR.md`.

A verificação automática é apenas um apoio: algumas plataformas podem bloquear requisições automatizadas mesmo quando o anúncio continua funcionando normalmente.

## Independência

O Amigos da Vênus:
- não realiza reservas;
- não recebe pagamentos;
- não intermedeia contratos;
- não garante disponibilidade;
- não possui vínculo comercial com hospedagens alternativas, salvo quando isso estiver expressamente indicado.

## Produção

https://temporada-pb.vercel.app/
