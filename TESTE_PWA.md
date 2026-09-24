# Testes — Temporada PB V7

Data: 24/09/2026
Resultado estrutural: **31/31 verificações aprovadas**.

## Verificações
- ✅ Arquivo index.html
- ✅ Arquivo styles.css
- ✅ Arquivo app.js
- ✅ Arquivo manifest.json
- ✅ Arquivo sw.js
- ✅ Arquivo data/imoveis.json
- ✅ Arquivo data/meta.json
- ✅ 27 registros — 27
- ✅ IDs únicos
- ✅ URLs externas HTTPS
- ✅ Tipos válidos
- ✅ Data ISO de manutenção
- ✅ Status base presente
- ✅ Manifest standalone
- ✅ Manifest scope/start
- ✅ 3 ícones PWA — 3
- ✅ Ícone 192x192 any
- ✅ Ícone 512x512 any
- ✅ Ícone 512x512 maskable
- ✅ Cache offline completo
- ✅ Service Worker install
- ✅ Service Worker activate
- ✅ Service Worker fetch
- ✅ Indicador online/offline
- ✅ Filtros de quartos/banheiros
- ✅ Ordenação
- ✅ Filtro manutenção
- ✅ Favoritos locais
- ✅ Navegação móvel
- ✅ Tela de detalhes
- ✅ Política 30/60

## Servidor local
- ✅ `index.html` respondeu HTTP 200 no servidor local.
- ✅ `data/meta.json` respondeu e foi lido corretamente.

## Observação sobre teste visual automatizado
O Chromium headless disponível neste ambiente não consegue inicializar corretamente nem em uma página vazia (`about:blank`) por limitação do runtime/DBus. Por isso, não foi possível concluir aqui a captura visual automatizada em viewport móvel nem simular a segunda abertura offline no navegador. O pacote foi validado estruturalmente para responsividade e PWA, mas a validação final de instalação/offline deve ser feita no navegador de um celular ou após publicação em HTTPS.

## Checklist recomendado após publicar
1. Abrir no Chrome/Android e usar “Adicionar à tela inicial”.
2. Abrir uma vez online e depois ativar modo avião.
3. Reabrir o app e confirmar que mapa, filtros, cards e dados continuam carregando.
4. Confirmar que links externos pedem internet e abrem a fonte original quando online.
5. Testar favoritos, filtros combinados e tela de detalhes.