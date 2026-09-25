(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const STORAGE = {
    favorites: 'temporada-pb-favorites-v1',
    language: 'temporada-pb-language-v1'
  };

  const I18N = {
    pt: {
      heroEyebrow: 'Paraíba',
      heroTitle: 'Hospedagens para pesquisar com mais facilidade.',
      heroText: 'Reunimos referências públicas em um só lugar. Você consulta as opções e segue para a fonte original para confirmar todos os detalhes.',
      heroCta: 'Pesquisar hospedagens',
      welcomeEyebrow: 'Outras opções para você',
      welcomeTitle: 'Não encontrou a hospedagem que procurava? Ah, que pena!',
      welcomeText: 'Para não deixar você sem opções, reunimos algumas referências públicas que podem ajudar na pesquisa. Consulte sempre a fonte original antes de reservar.',
      searchEyebrow: 'Encontre mais rápido',
      searchTitle: 'Onde você quer ficar?',
      clear: 'Limpar',
      all: 'Todas',
      search: 'Buscar',
      sort: 'Ordenar',
      sortDefault: 'Ordem padrão',
      sortName: 'Nome A–Z',
      sortRating: 'Melhor avaliação',
      sortCapacity: 'Maior capacidade',
      moreFilters: '+ Mais filtros',
      lessFilters: '– Menos filtros',
      region: 'Região',
      type: 'Tipo',
      guests: 'Hóspedes',
      pool: 'Piscina',
      parking: 'Estacionamento',
      air: 'Ar-condicionado',
      favorites: 'Favoritos',
      options: 'opções',
      houses: 'casas',
      apartments: 'apartamentos',
      studios: 'estúdios',
      resultsEyebrow: 'Resultados',
      resultsTitle: 'Hospedagens encontradas',
      noticeEyebrow: 'Transparência',
      noticeTitle: 'Sobre o Temporada PB',
      noticeText: 'O Temporada PB apenas organiza links e informações públicas. Não representa, administra ou intermedeia as hospedagens exibidas e não recebe pagamento ou benefício pela presença das opções. Disponibilidade, valores, localização, regras e contratação devem ser confirmados exclusivamente na fonte original.',
      learnMore: 'Entenda como funciona',
      footerText: 'Referências públicas de hospedagem na Paraíba.',
      noResultsTitle: 'Nenhuma opção encontrada com esses filtros.',
      noResultsText: 'Tente retirar um filtro ou pesquisar outra região.',
      details: 'Ver detalhes',
      openSource: 'Abrir fonte',
      share: 'Compartilhar',
      favorite: 'Favoritar',
      unfavorite: 'Remover favorito',
      copied: 'Link copiado',
      countOne: 'opção',
      countMany: 'opções',
      notInSource: 'Não informado na fonte',
      source: 'Fonte',
      lastCheck: 'Última conferência',
      capacity: 'Capacidade',
      rooms: 'Quartos',
      baths: 'Banheiros',
      rating: 'Avaliação',
      detailNote: 'O Temporada PB não realiza reservas, não recebe pagamentos e não intermedeia contratos. Confirme todos os detalhes diretamente na fonte original.',
      infoTitle: 'Como o Temporada PB funciona',
      infoText1: 'O projeto reúne referências públicas de hospedagem para facilitar a pesquisa.',
      infoText2: 'A presença de uma opção não representa parceria, preferência, administração ou intermediação.',
      infoText3: 'Para reservar, pagar ou confirmar qualquer condição, use exclusivamente o canal indicado na fonte original.',
      online: '● Online',
      offline: '● Offline',
      installed: 'App pronto para instalar'
    },
    es: {
      heroEyebrow: 'Paraíba',
      heroTitle: 'Alojamientos para buscar con más facilidad.',
      heroText: 'Reunimos referencias públicas en un solo lugar. Consulta las opciones y sigue a la fuente original para confirmar todos los detalles.',
      heroCta: 'Buscar alojamientos',
      welcomeEyebrow: 'Otras opciones para ti',
      welcomeTitle: '¿No encontraste el alojamiento que buscabas? ¡Qué pena!',
      welcomeText: 'Para que no te quedes sin opciones, reunimos algunas referencias públicas que pueden ayudar en la búsqueda. Consulta siempre la fuente original antes de reservar.',
      searchEyebrow: 'Encuentra más rápido',
      searchTitle: '¿Dónde quieres alojarte?',
      clear: 'Limpiar',
      all: 'Todas',
      search: 'Buscar',
      sort: 'Ordenar',
      sortDefault: 'Orden original',
      sortName: 'Nombre A–Z',
      sortRating: 'Mejor valoración',
      sortCapacity: 'Mayor capacidad',
      moreFilters: '+ Más filtros',
      lessFilters: '– Menos filtros',
      region: 'Región',
      type: 'Tipo',
      guests: 'Huéspedes',
      pool: 'Piscina',
      parking: 'Estacionamiento',
      air: 'Aire acondicionado',
      favorites: 'Favoritos',
      options: 'opciones',
      houses: 'casas',
      apartments: 'apartamentos',
      studios: 'estudios',
      resultsEyebrow: 'Resultados',
      resultsTitle: 'Alojamientos encontrados',
      noticeEyebrow: 'Transparencia',
      noticeTitle: 'Sobre Temporada PB',
      noticeText: 'Temporada PB solo organiza enlaces e información pública. No representa, administra ni intermedia los alojamientos mostrados y no recibe pagos ni beneficios por la presencia de las opciones. Disponibilidad, precios, ubicación, reglas y contratación deben confirmarse exclusivamente en la fuente original.',
      learnMore: 'Cómo funciona',
      footerText: 'Referencias públicas de alojamiento en Paraíba.',
      noResultsTitle: 'No encontramos opciones con esos filtros.',
      noResultsText: 'Prueba quitar un filtro o buscar otra región.',
      details: 'Ver detalles',
      openSource: 'Abrir fuente',
      share: 'Compartir',
      favorite: 'Favorito',
      unfavorite: 'Quitar favorito',
      copied: 'Enlace copiado',
      countOne: 'opción',
      countMany: 'opciones',
      notInSource: 'No informado en la fuente',
      source: 'Fuente',
      lastCheck: 'Última revisión',
      capacity: 'Capacidad',
      rooms: 'Habitaciones',
      baths: 'Baños',
      rating: 'Valoración',
      detailNote: 'Temporada PB no realiza reservas, no recibe pagos y no intermedia contratos. Confirma todos los detalles directamente en la fuente original.',
      infoTitle: 'Cómo funciona Temporada PB',
      infoText1: 'El proyecto reúne referencias públicas de alojamiento para facilitar la búsqueda.',
      infoText2: 'La presencia de una opción no representa asociación, preferencia, administración ni intermediación.',
      infoText3: 'Para reservar, pagar o confirmar cualquier condición, utiliza exclusivamente el canal indicado en la fuente original.',
      online: '● Online',
      offline: '● Offline',
      installed: 'App listo para instalar'
    }
  };

  let data = [];
  let meta = {};
  let language = localStorage.getItem(STORAGE.language) === 'es' ? 'es' : 'pt';
  let city = '';
  let deferredInstall = null;

  const t = key => I18N[language][key] || I18N.pt[key] || key;

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function favorites() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE.favorites) || '[]'));
    } catch {
      return new Set();
    }
  }

  function saveFavorites(set) {
    localStorage.setItem(STORAGE.favorites, JSON.stringify([...set]));
  }

  function toggleFavorite(id) {
    const set = favorites();
    set.has(id) ? set.delete(id) : set.add(id);
    saveFavorites(set);
    render();
  }

  function translateStatic() {
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (el.tagName === 'OPTION') {
        el.textContent = t(key);
      } else {
        el.textContent = t(key);
      }
    });

    $('#q').placeholder = language === 'es' ? 'Nombre, región o ciudad' : 'Nome, região ou cidade';
    $('#networkBadge').textContent = navigator.onLine ? t('online') : t('offline');
    document.documentElement.lang = language === 'es' ? 'es' : 'pt-BR';

    $$('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === language));

    const expanded = $('#moreFiltersBtn').getAttribute('aria-expanded') === 'true';
    $('#moreFiltersBtn').textContent = expanded ? t('lessFilters') : t('moreFilters');
  }

  function setLanguage(next) {
    language = next === 'es' ? 'es' : 'pt';
    localStorage.setItem(STORAGE.language, language);
    translateStatic();
    render();
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  function populateRegions() {
    const select = $('#reg');
    const current = select.value;
    const filtered = city ? data.filter(item => item.cidade === city) : data;
    const regions = uniqueSorted(filtered.map(item => item.regiao));

    select.innerHTML = `<option value="">${language === 'es' ? 'Todas' : 'Todas'}</option>` +
      regions.map(region => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`).join('');

    if (regions.includes(current)) select.value = current;
  }

  function summary() {
    $('#totalCount').textContent = data.length;
    $('#houseCount').textContent = data.filter(x => x.tipo === 'Casa').length;
    $('#apartmentCount').textContent = data.filter(x => x.tipo === 'Apartamento').length;
    $('#studioCount').textContent = data.filter(x => x.tipo === 'Estúdio').length;
  }

  function activeFilterPills() {
    const pills = [];
    if (city) pills.push(city);
    if ($('#q').value.trim()) pills.push($('#q').value.trim());
    if ($('#reg').value) pills.push($('#reg').value);
    if ($('#type').value) pills.push($('#type').value);
    if (+$('#cap').value) pills.push(`${$('#cap').value}+ ${t('guests').toLowerCase()}`);
    if ($('#pool').checked) pills.push(t('pool'));
    if ($('#pet').checked) pills.push('Pet');
    if ($('#parking').checked) pills.push(t('parking'));
    if ($('#air').checked) pills.push(t('air'));
    if ($('#fav').checked) pills.push(t('favorites'));

    $('#activeFilters').innerHTML = pills.map(pill => `<span class="filter-pill">${escapeHtml(pill)}</span>`).join('');
  }

  function sortList(list) {
    const mode = $('#sort').value;
    const copy = [...list];

    if (mode === 'name') return copy.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    if (mode === 'rating') return copy.sort((a, b) => (b.nota || 0) - (a.nota || 0));
    if (mode === 'capacity') return copy.sort((a, b) => (b.hospedes || 0) - (a.hospedes || 0));

    return copy;
  }

  function cardIcon(type) {
    if (type === 'Casa') return '⌂';
    if (type === 'Estúdio') return '◫';
    return '▦';
  }

  function cardHtml(item) {
    const fav = favorites().has(item.id);
    const features = [];
    if (item.piscina === true) features.push(t('pool'));
    if (item.pet === true) features.push('Pet');
    if (item.estacionamento === true) features.push(t('parking'));
    if (item.ar === true) features.push(t('air'));

    const media = item.imagem
      ? `<img src="${escapeHtml(item.imagem)}" alt="${escapeHtml(item.nome)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
      : `<div class="card-placeholder" aria-hidden="true">${cardIcon(item.tipo)}</div>`;

    const stats = [];
    if (item.hospedes != null) stats.push(`${item.hospedes >= 17 ? '16+' : item.hospedes} ${t('guests').toLowerCase()}`);
    if (item.quartos != null) stats.push(`${item.quartos} ${language === 'es' ? 'hab.' : 'quarto(s)'}`);
    if (item.banheiros != null) stats.push(`${item.banheiros} ${language === 'es' ? 'baño(s)' : 'banheiro(s)'}`);

    return `<article class="card" data-id="${escapeHtml(item.id)}">
      <div class="card-media">
        ${media}
        <span class="source-tag">${escapeHtml(item.fonte)}</span>
      </div>
      <div class="card-body">
        <div class="location">📍 ${escapeHtml(item.regiao)} · ${escapeHtml(item.cidade)}</div>
        <h3>${escapeHtml(item.nome)}</h3>
        <p class="card-description">${escapeHtml(item.detalhe || '')}</p>
        ${stats.length ? `<div class="stats">${stats.map(x => `<span class="stat">${escapeHtml(x)}</span>`).join('')}</div>` : ''}
        ${features.length ? `<div class="features">${features.map(x => `<span class="feature">${escapeHtml(x)}</span>`).join('')}</div>` : ''}
        ${item.nota != null ? `<div class="rating"><b>★ ${String(item.nota).replace('.', ',')}</b>${item.reviews != null ? ` <span>(${item.reviews})</span>` : ''}</div>` : ''}
        <div class="card-actions">
          <button class="details-btn" type="button" data-action="details">${t('details')}</button>
          <a class="source-btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${t('openSource')} ↗</a>
          <button class="icon-btn" type="button" data-action="share" aria-label="${t('share')}">↗</button>
          <button class="icon-btn" type="button" data-action="favorite" aria-label="${fav ? t('unfavorite') : t('favorite')}">${fav ? '♥' : '♡'}</button>
        </div>
      </div>
    </article>`;
  }

  function filteredList() {
    const favs = favorites();
    const q = $('#q').value.trim().toLowerCase();
    const region = $('#reg').value;
    const type = $('#type').value;
    const cap = +$('#cap').value;

    return data.filter(item => {
      const haystack = `${item.nome} ${item.regiao} ${item.cidade} ${item.tipo} ${item.fonte}`.toLowerCase();

      return (!city || item.cidade === city)
        && (!q || haystack.includes(q))
        && (!region || item.regiao === region)
        && (!type || item.tipo === type)
        && (!cap || item.hospedes == null || item.hospedes >= cap)
        && (!$('#pool').checked || item.piscina === true)
        && (!$('#pet').checked || item.pet === true)
        && (!$('#parking').checked || item.estacionamento === true)
        && (!$('#air').checked || item.ar === true)
        && (!$('#fav').checked || favs.has(item.id));
    });
  }

  function render() {
    activeFilterPills();
    const list = sortList(filteredList());
    $('#resultCount').textContent = `${list.length} ${list.length === 1 ? t('countOne') : t('countMany')}`;

    if (!list.length) {
      $('#results').innerHTML = `<div class="empty"><b>${t('noResultsTitle')}</b><p>${t('noResultsText')}</p></div>`;
      return;
    }

    $('#results').innerHTML = list.map(cardHtml).join('');
  }

  function resetFilters() {
    city = '';
    $('#q').value = '';
    $('#reg').value = '';
    $('#type').value = '';
    $('#cap').value = '0';
    $('#sort').value = 'default';
    ['pool', 'pet', 'parking', 'air', 'fav'].forEach(id => { $('#' + id).checked = false; });
    $$('.city-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.city === ''));
    populateRegions();
    render();
  }

  function unknown(value) {
    return value == null || value === '';
  }

  function detailValue(value, suffix = '') {
    return unknown(value) ? t('notInSource') : `${value}${suffix}`;
  }

  function openDetails(id) {
    const item = data.find(x => x.id === id);
    if (!item) return;

    const fav = favorites().has(item.id);
    const body = $('#detailBody');

    const image = item.imagem
      ? `<img class="detail-photo" src="${escapeHtml(item.imagem)}" alt="${escapeHtml(item.nome)}" loading="lazy" referrerpolicy="no-referrer">`
      : '';

    const rating = item.nota != null
      ? `★ ${String(item.nota).replace('.', ',')}${item.reviews != null ? ` · ${item.reviews}` : ''}`
      : t('notInSource');

    body.innerHTML = `
      ${image}
      <div class="detail-kicker">📍 ${escapeHtml(item.regiao)} · ${escapeHtml(item.cidade)}</div>
      <h2 id="detailTitle" class="detail-title">${escapeHtml(item.nome)}</h2>
      <p>${escapeHtml(item.detalhe || '')}</p>

      <div class="detail-grid">
        <div class="detail-box"><b>${t('capacity')}</b><span>${detailValue(item.hospedes, ` ${t('guests').toLowerCase()}`)}</span></div>
        <div class="detail-box"><b>${t('rooms')}</b><span>${detailValue(item.quartos)}</span></div>
        <div class="detail-box"><b>${t('baths')}</b><span>${detailValue(item.banheiros)}</span></div>
        <div class="detail-box"><b>${t('rating')}</b><span>${escapeHtml(rating)}</span></div>
        <div class="detail-box"><b>${t('source')}</b><span>${escapeHtml(item.fonte)}</span></div>
        <div class="detail-box"><b>${t('lastCheck')}</b><span>${escapeHtml(item.verificado || t('notInSource'))}</span></div>
      </div>

      <div class="detail-actions">
        <a class="detail-primary" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${t('openSource')} ↗</a>
        <button class="detail-secondary" type="button" data-detail-action="favorite" data-id="${escapeHtml(item.id)}">${fav ? '♥ ' + t('unfavorite') : '♡ ' + t('favorite')}</button>
        <button class="detail-share" type="button" data-detail-action="share" data-id="${escapeHtml(item.id)}">${t('share')}</button>
      </div>

      <div class="detail-note">${t('detailNote')}</div>
    `;

    openModal($('#detailModal'));
  }

  async function shareItem(id) {
    const item = data.find(x => x.id === id);
    if (!item) return;

    const text = `Temporada PB\n${item.nome}\n${item.regiao} · ${item.cidade}\n${item.url}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: item.nome, text: 'Temporada PB', url: item.url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast(t('copied'));
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') showToast(language === 'es' ? 'No se pudo compartir' : 'Não foi possível compartilhar');
    }
  }

  function openInfo() {
    $('#infoBody').innerHTML = `
      <span class="eyebrow">${t('noticeEyebrow')}</span>
      <h2 id="infoTitle" class="info-title">${t('infoTitle')}</h2>
      <p>${t('infoText1')}</p>
      <p>${t('infoText2')}</p>
      <p>${t('infoText3')}</p>
    `;
    openModal($('#infoModal'));
  }

  function openModal(modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.modal-close', modal)?.focus(), 0);
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('hidden'), 2300);
  }

  function setupEvents() {
    $$('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

    $$('.city-btn').forEach(btn => btn.addEventListener('click', () => {
      city = btn.dataset.city;
      $$('.city-btn').forEach(x => x.classList.toggle('active', x === btn));
      populateRegions();
      render();
    }));

    ['q', 'reg', 'type', 'cap', 'sort', 'pool', 'pet', 'parking', 'air', 'fav'].forEach(id => {
      const el = $('#' + id);
      const eventName = el?.matches('input[type="search"]') ? 'input' : 'change';
      el?.addEventListener(eventName, render);
    });

    $('#resetFilters').addEventListener('click', resetFilters);

    $('#moreFiltersBtn').addEventListener('click', () => {
      const box = $('#advancedFilters');
      const open = box.hidden;
      box.hidden = !open;
      $('#moreFiltersBtn').setAttribute('aria-expanded', String(open));
      $('#moreFiltersBtn').textContent = open ? t('lessFilters') : t('moreFilters');
    });

    $('#results').addEventListener('click', event => {
      const card = event.target.closest('.card');
      const button = event.target.closest('[data-action]');
      if (!card || !button) return;

      const id = card.dataset.id;
      if (button.dataset.action === 'details') openDetails(id);
      if (button.dataset.action === 'favorite') toggleFavorite(id);
      if (button.dataset.action === 'share') shareItem(id);
    });

    $('#detailBody').addEventListener('click', event => {
      const button = event.target.closest('[data-detail-action]');
      if (!button) return;
      const id = button.dataset.id;

      if (button.dataset.detailAction === 'favorite') {
        toggleFavorite(id);
        openDetails(id);
      }
      if (button.dataset.detailAction === 'share') shareItem(id);
    });

    $$('[data-close-detail]').forEach(el => el.addEventListener('click', () => closeModal($('#detailModal'))));
    $$('[data-close-info]').forEach(el => el.addEventListener('click', () => closeModal($('#infoModal'))));
    $('#aboutBtn').addEventListener('click', openInfo);

    $('#backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => $('#backToTop').classList.toggle('show', window.scrollY > 650), { passive: true });

    $('#menuBtn').addEventListener('click', () => {
      const menu = $('#headerActions');
      const open = menu.classList.toggle('open');
      $('#menuBtn').setAttribute('aria-expanded', String(open));
    });

    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
  }

  function updateNetwork() {
    const online = navigator.onLine;
    $('#networkBadge').textContent = online ? t('online') : t('offline');
    $('#offlineBanner').classList.toggle('hidden', online);
  }

  function setupInstall() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstall = event;
      $('#installBtn').classList.remove('hidden');
    });

    $('#installBtn').addEventListener('click', async () => {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      await deferredInstall.userChoice;
      deferredInstall = null;
      $('#installBtn').classList.add('hidden');
    });
  }

  async function init() {
    setupEvents();
    setupInstall();
    translateStatic();
    updateNetwork();

    try {
      const [items, metadata] = await Promise.all([
        fetch('data/imoveis.json', { cache: 'no-store' }).then(r => {
          if (!r.ok) throw new Error('Falha ao carregar hospedagens');
          return r.json();
        }),
        fetch('data/meta.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : {})
      ]);

      data = Array.isArray(items) ? items : [];
      meta = metadata || {};
      $('#loadingCards')?.remove();
      populateRegions();
      summary();
      render();
    } catch {
      $('#loadingCards')?.remove();
      $('#results').innerHTML = '<div class="empty"><b>Não foi possível carregar as hospedagens.</b><p>Tente atualizar a página.</p></div>';
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  init();
})();
