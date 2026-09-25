let D=[],META={},near='all';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

if(!localStorage.getItem('tpb-v7-favs')){
  const old=localStorage.getItem('tpb-v6-favs')||localStorage.getItem('tpb-v5-favs');
  if(old)localStorage.setItem('tpb-v7-favs',old);
}

const favs=()=>new Set(JSON.parse(localStorage.getItem('tpb-v7-favs')||'[]'));

const NEAR={
  all:null,
  jose:['José Américo','Geisel','Entorno UNIPÊ / UFPB','Bancários / UFPB','Bancários','Jardim Cidade Universitária','Cristo Redentor / acesso ao corredor'],
  geisel:['Geisel','José Américo','Bancários','Bancários / UFPB','Entorno UNIPÊ / UFPB'],
  bancarios:['Bancários','Bancários / UFPB','Entorno UNIPÊ / UFPB','Jardim Cidade Universitária','José Américo'],
  mangabeira:['Mangabeira','Jardim Cidade Universitária','Portal do Sol','Paratibe / Litoral Sul'],
  quadramares:['Portal do Sol','Mangabeira','Seixas'],
  portal:['Portal do Sol','Seixas','Mangabeira'],
  penha:['Seixas','Portal do Sol','Barra de Gramame'],
  seixas:['Seixas','Portal do Sol','Barra de Gramame'],
  barra:['Barra de Gramame','Rota do Sol / Litoral Sul','Paratibe / Litoral Sul','Zona Sul / acesso PB-008'],
  pb008:['Rota do Sol / Litoral Sul','Paratibe / Litoral Sul','Zona Sul / acesso PB-008','Barra de Gramame','Jacumã','Praia do Amor / Jacumã','Carapibus'],
  conde:['Jacumã','Praia do Amor / Jacumã','Carapibus'],
  'casa-lina':['Jacumã','Praia do Amor / Jacumã','Carapibus']
};

const LABEL={
  all:'Outras opções para você',
  jose:'Perto de José Américo',
  geisel:'Perto do Geisel',
  bancarios:'Perto de Bancários / UFPB',
  mangabeira:'Perto de Mangabeira',
  quadramares:'Perto de Quadramares',
  portal:'Perto do Portal do Sol',
  penha:'Perto da Penha',
  seixas:'Perto do Seixas',
  barra:'Perto da Barra de Gramame',
  pb008:'Eixo PB-008 / Litoral Sul',
  conde:'Conde / Jacumã',
  'casa-lina':'Perto da Casa Lina'
};

function daysSince(iso){
  if(!iso)return 9999;
  return Math.floor((Date.now()-new Date(iso+'T12:00:00').getTime())/86400000);
}

function maintStatus(x){
  if(['Inativo','Indisponível'].includes(x.status))return 'Desatualizado';
  const d=daysSince(x.ultimaVerificacaoISO);
  if(d>60)return 'Desatualizado';
  if(d>30)return 'Revisar';
  return 'Ativo';
}

function statusLabel(s){
  return s==='Ativo'?'Informação conferida':s==='Revisar'?'Revisar':'Desatualizada';
}

function statusClass(s){
  return s==='Ativo'?'ok':s==='Revisar'?'review':'stale';
}

function unknown(v){
  return v===null||v===undefined||v==='';
}

function toggleFav(id){
  const f=favs();
  f.has(id)?f.delete(id):f.add(id);
  localStorage.setItem('tpb-v7-favs',JSON.stringify([...f]));
  render();
}

function setNear(key,scroll=true){
  near=key;
  $$('.near-chip').forEach(b=>b.classList.toggle('active',b.dataset.near===key));
  $$('.map-node').forEach(b=>b.classList.toggle('active',b.dataset.near===key));
  $('#contextLabel').textContent=LABEL[key]||'Outras opções para você';
  render();
  if(scroll)document.querySelector('.results-head')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function resetAll(){
  near='all';
  ['q','reg','type','source','maint'].forEach(id=>{if($('#'+id))$('#'+id).value=''});
  ['cap','beds','baths'].forEach(id=>{if($('#'+id))$('#'+id).value='0'});
  if($('#sort'))$('#sort').value='recommended';
  ['pool','parking','air','pet','fav'].forEach(id=>{if($('#'+id))$('#'+id).checked=false});

  $$('.near-chip').forEach(b=>b.classList.toggle('active',b.dataset.near==='all'));
  $$('.map-node').forEach(b=>b.classList.remove('active'));

  $('#contextLabel').textContent='Outras opções para você';
  render();
}

function iconFor(type){
  return type==='Casa'?'⌂':type==='Estúdio'?'◫':'▦';
}

function coverClass(type){
  return type==='Casa'?'house':type==='Estúdio'?'studio':'apartment';
}

function usefulBadges(x){
  const arr=[];

  if(x.nota>=4.8 && (x.reviews||0)>=10)arr.push('★ Boa avaliação');
  if((x.hospedes||0)>=10)arr.push('👥 Para grupos');
  if(x.pet===true)arr.push('🐾 Pet friendly');

  if(/100 m|570 m|praia|pé na areia|acesso à praia|acesso a praia/i.test(x.detalhe||'')){
    arr.push('🌊 Próximo da praia');
  }

  return arr.slice(0,2);
}

function activeFilterPills(){
  const pills=[];

  if(near!=='all')pills.push(LABEL[near]);

  [['reg','Região'],['type','Tipo'],['source','Onde encontramos'],['maint','Atualização']].forEach(([id,label])=>{
    const el=$('#'+id);
    if(el&&el.value)pills.push(label+': '+el.selectedOptions[0].text);
  });

  [['cap','Hóspedes'],['beds','Quartos'],['baths','Banheiros']].forEach(([id,label])=>{
    const el=$('#'+id);
    if(el&&+el.value)pills.push(label+': '+el.value+'+');
  });

  [['pool','Piscina'],['parking','Estacionamento'],['air','Ar-condicionado'],['pet','Pet'],['fav','Favoritos']].forEach(([id,label])=>{
    const el=$('#'+id);
    if(el&&el.checked)pills.push(label);
  });

  if($('#q')?.value.trim())pills.push('Busca: '+$('#q').value.trim());

  $('#activeFilters').innerHTML=pills.map(x=>`<span class="filter-pill">${x}</span>`).join('');
}

function sortList(list){
  const mode=$('#sort')?.value||'recommended';

  return list.sort((a,b)=>{
    if(mode==='rating')return (b.nota||0)-(a.nota||0);
    if(mode==='capacity')return (b.hospedes||0)-(a.hospedes||0);
    if(mode==='name')return a.nome.localeCompare(b.nome,'pt-BR');

    if((a.selo==='Perfil oficial')!==(b.selo==='Perfil oficial')){
      return a.selo==='Perfil oficial'?-1:1;
    }

    return (b.nota||0)-(a.nota||0);
  });
}

function cardPhoto(x){
  if(!x.imagem)return `<span class="cover-icon">${iconFor(x.tipo)}</span>`;

  return `<img class="card-photo"
               src="${x.imagem}"
               alt="Prévia de ${x.nome}"
               loading="lazy"
               decoding="async"
               referrerpolicy="no-referrer"
               onerror="this.remove();this.parentElement.classList.remove('has-photo')">
          <span class="card-photo-credit">Imagem da fonte original</span>`;
}

function cardHtml(x){
  const f=favs();
  const ms=maintStatus(x);
  const amenities=[];

  if(x.piscina)amenities.push('🏊 Piscina');
  if(x.estacionamento)amenities.push('🚗 Estacionamento');
  if(x.ar)amenities.push('❄️ Ar');
  if(x.pet)amenities.push('🐾 Pet');

  const badges=usefulBadges(x);

  return `<article class="card">
    <div class="card-cover ${coverClass(x.tipo)} ${x.imagem?'has-photo':''}">
      ${cardPhoto(x)}
      <div class="cover-top">
        <span class="type-badge">${x.tipo}</span>
        <span class="source-badge">${x.selo}</span>
      </div>
    </div>

    <div class="card-body">
      <div class="location">📍 ${x.regiao} · ${x.cidade}</div>
      <h3>${x.nome}</h3>

      ${badges.length?`<div class="helpful-badges">${badges.map(b=>`<span>${b}</span>`).join('')}</div>`:''}

      ${x.hospedes?`<div class="stats">
        <span>👥 ${x.hospedes>=17?'16+':x.hospedes}</span>
        ${!unknown(x.quartos)?`<span>🛏 ${x.quartos}</span>`:''}
        ${!unknown(x.banheiros)?`<span>🚿 ${x.banheiros}</span>`:''}
      </div>`:''}

      ${amenities.length?`<div class="chips">${amenities.slice(0,4).map(a=>`<span class="chip">${a}</span>`).join('')}</div>`:''}

      <p class="description">${x.detalhe}</p>

      ${x.nota?`<div class="rating"><b>★ ${String(x.nota).replace('.',',')}</b>${x.reviews!==null?` <span>(${x.reviews} avaliações)</span>`:''}</div>`:''}

      <div class="verify">${x.fonte} · <span class="${statusClass(ms)}">${statusLabel(ms)}</span></div>

      <div class="card-main-actions">
        <button class="details-btn" type="button" onclick="openDetails('${x.id}')">Ver detalhes</button>
        <a class="source-direct" href="${x.url}" target="_blank" rel="noopener">${x.selo==='Perfil oficial'?'Perfil ↗':'Anúncio ↗'}</a>
        <button class="share-btn" type="button" onclick="shareStay('${x.id}')" aria-label="Compartilhar ${x.nome}">↗</button>
        <button class="heart" type="button" onclick="toggleFav('${x.id}')" aria-label="Favoritar ${x.nome}">${f.has(x.id)?'♥':'♡'}</button>
      </div>
    </div>
  </article>`;
}

function groupHtml(title,subtitle,list,kind){
  if(!list.length)return '';

  return `<section class="result-group ${kind}">
    <div class="group-heading">
      <div>
        <span class="eyebrow">${subtitle}</span>
        <h3>${title}</h3>
      </div>
      <span class="group-count">${list.length}</span>
    </div>
    <div class="grid">${list.map(cardHtml).join('')}</div>
  </section>`;
}

function render(){
  const f=favs();

  const q=$('#q')?.value.trim().toLowerCase()||'';
  const region=$('#reg')?.value||'';
  const type=$('#type')?.value||'';
  const cap=+($('#cap')?.value||0);
  const beds=+($('#beds')?.value||0);
  const baths=+($('#baths')?.value||0);
  const source=$('#source')?.value||'';
  const maint=$('#maint')?.value||'';
  const allowed=NEAR[near];

  let list=D.filter(x=>{
    const hay=(x.nome+' '+x.regiao+' '+x.cidade+' '+x.tipo+' '+x.fonte).toLowerCase();
    const ms=maintStatus(x);

    return (!allowed||allowed.includes(x.regiao))
      &&(!q||hay.includes(q))
      &&(!region||x.regiao===region)
      &&(!type||x.tipo===type)
      &&(!cap||x.hospedes===null||x.hospedes>=cap)
      &&(!beds||x.quartos===null||x.quartos>=beds)
      &&(!baths||x.banheiros===null||x.banheiros>=baths)
      &&(!source||(source==='official'?x.selo==='Perfil oficial':x.selo!=='Perfil oficial'))
      &&(!maint||ms===maint)
      &&(!$('#pool')?.checked||x.piscina===true)
      &&(!$('#parking')?.checked||x.estacionamento===true)
      &&(!$('#air')?.checked||x.ar===true)
      &&(!$('#pet')?.checked||x.pet===true)
      &&(!$('#fav')?.checked||f.has(x.id));
  });

  sortList(list);
  activeFilterPills();

  $('#count').textContent=list.length+' '+(list.length===1?'opção':'opções');

  if(!list.length){
    $('#resultsGroups').innerHTML=`<div class="empty">
      <b>Não encontramos uma opção com todos esses filtros.</b>
      <p>Tente retirar um filtro ou escolher uma região próxima.</p>
    </div>`;
    return;
  }

  const official=list.filter(x=>x.selo==='Perfil oficial');
  const external=list.filter(x=>x.selo!=='Perfil oficial');

  $('#resultsGroups').innerHTML=
    groupHtml('Perfis oficiais','Contato direto com a hospedagem',official,'official-group')+
    groupHtml('Anúncios em plataformas','Airbnb, Vrbo e outras fontes externas',external,'external-group');
}

function updateMaintenance(){
  const counts={Ativo:0,Revisar:0,Desatualizado:0};

  D.forEach(x=>counts[maintStatus(x)]++);

  $('#activeCount').textContent=counts.Ativo;
  $('#reviewCount').textContent=counts.Revisar;
  $('#staleCount').textContent=counts.Desatualizado;
  $('#heroTotal').textContent=D.length;

  const r=META.politicaRevisao||{revisarAposDias:30,desatualizadoAposDias:60};

  $('#maintenanceText').textContent=`Após ${r.revisarAposDias} dias, a opção é marcada para nova conferência.`;
}

function updateSummary(){
  $('#countHouse').textContent=D.filter(x=>x.tipo==='Casa').length;
  $('#countApartment').textContent=D.filter(x=>x.tipo==='Apartamento').length;
  $('#countStudio').textContent=D.filter(x=>x.tipo==='Estúdio').length;
  $('#countOfficial').textContent=D.filter(x=>x.selo==='Perfil oficial').length;
}

function openDetails(id){
  const x=D.find(i=>i.id===id);
  if(!x)return;

  const m=$('#detailModal');
  const b=$('#detailBody');
  const f=favs();
  const ms=maintStatus(x);

  const amen=[];
  if(x.piscina)amen.push('🏊 Piscina');
  if(x.estacionamento)amen.push('🚗 Estacionamento');
  if(x.ar)amen.push('❄️ Ar-condicionado');
  if(x.pet)amen.push('🐾 Pet friendly');

  const cap=unknown(x.hospedes)?'Não informado na fonte':`${x.hospedes>=17?'16+':x.hospedes} hóspedes`;
  const rooms=unknown(x.quartos)?'Não informado na fonte':`${x.quartos} quarto${x.quartos==1?'':'s'}`;
  const baths=unknown(x.banheiros)?'Não informado na fonte':`${x.banheiros} banheiro${x.banheiros==1?'':'s'}`;
  const rating=x.nota
    ?`★ ${String(x.nota).replace('.',',')}${x.reviews!==null&&x.reviews!==undefined?` · ${x.reviews} avaliações`:''}`
    :'Não informado na fonte';

  b.innerHTML=`
    ${x.imagem?`<div class="detail-photo-wrap">
      <img class="detail-photo"
           src="${x.imagem}"
           alt="Prévia de ${x.nome}"
           loading="lazy"
           decoding="async"
           referrerpolicy="no-referrer"
           onerror="this.parentElement.remove()">
      <span class="detail-photo-credit">Imagem da fonte original</span>
    </div>`:''}

    <div class="detail-kicker">📍 ${x.regiao} · ${x.cidade}</div>
    <h2 id="detailTitle" class="detail-title">${x.nome}</h2>

    <div class="detail-badges">
      <span class="chip">${x.tipo}</span>
      <span class="chip">${x.selo}</span>
      <span class="chip">${statusLabel(ms)}</span>
      ${x.destaque?'<span class="chip">★ Destaque</span>':''}
    </div>

    <p>${x.detalhe||'Veja as informações disponíveis na fonte original.'}</p>

    <div class="detail-grid">
      <div class="detail-box"><b>Capacidade</b><span class="detail-value">${cap}</span></div>
      <div class="detail-box"><b>Quartos</b><span class="detail-value">${rooms}</span></div>
      <div class="detail-box"><b>Banheiros</b><span class="detail-value">${baths}</span></div>
      <div class="detail-box"><b>Avaliação</b><span class="detail-value">${rating}</span></div>
      <div class="detail-box"><b>Onde encontramos</b><span class="detail-value">${x.fonte}</span></div>
      <div class="detail-box"><b>Última conferência</b><span class="detail-value">${x.verificado}</span></div>
    </div>

    ${amen.length?`<div class="detail-badges">${amen.map(a=>`<span class="chip">${a}</span>`).join('')}</div>`:''}

    <div class="detail-actions">
      <a class="detail-primary" href="${x.url}" target="_blank" rel="noopener">${x.selo==='Perfil oficial'?'Abrir perfil oficial':'Ver anúncio original'} ↗</a>
      <button class="detail-secondary" type="button" onclick="toggleFav('${x.id}');openDetails('${x.id}')">${f.has(x.id)?'♥ Remover favorito':'♡ Favoritar'}</button>
      <button class="detail-share" type="button" onclick="shareStay('${x.id}')">Compartilhar esta opção</button>
    </div>

    <div class="detail-note">
      Este guia não realiza reservas nem recebe pagamentos. As informações seguem a fonte original e podem mudar. Confirme disponibilidade, valores, localização e regras diretamente com a hospedagem ou plataforma.
    </div>
  `;

  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';

  setTimeout(()=>m.querySelector('.modal-close')?.focus(),0);
}

function closeDetails(){
  const m=$('#detailModal');
  if(!m)return;

  m.classList.remove('open');
  m.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

async function shareStay(id){
  const x=D.find(i=>i.id===id);
  if(!x)return;

  const text=`Olha esta opção no Amigos da Vênus:\n${x.nome}\n${x.regiao} · ${x.cidade}\n${x.url}`;

  try{
    if(navigator.share){
      await navigator.share({
        title:x.nome,
        text:'Encontrei esta opção no Amigos da Vênus',
        url:x.url
      });
    }else{
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener');
    }
  }catch(e){
    if(e?.name!=='AbortError'){
      try{
        await navigator.clipboard.writeText(text);
        showToast('Link copiado para compartilhar');
      }catch{
        showToast('Não foi possível compartilhar agora');
      }
    }
  }
}

function showToast(message){
  document.querySelector('.toast')?.remove();

  const t=document.createElement('div');
  t.className='toast';
  t.textContent=message;
  t.setAttribute('role','status');

  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2400);
}

function openInfo(kind='how'){
  const m=$('#infoModal');
  const b=$('#infoBody');

  if(!m||!b)return;

  if(kind==='about'){
    b.innerHTML=`<span class="eyebrow">Sobre este guia</span>
      <h2 id="infoTitle">InformaÃ§Ã£o simples e transparente</h2>
      <p>O Temporada PB Ã© um guia independente de apoio Ã  pesquisa de hospedagens.</p>
      <p><b>NÃ£o possui vÃ­nculo com a marca VÃªnus e nÃ£o representa nenhuma hospedagem, empresa ou plataforma listada.</b></p>
      <p>NÃ£o fazemos reservas, nÃ£o recebemos pagamentos e nÃ£o garantimos disponibilidade. As informaÃ§Ãµes sÃ£o baseadas nas fontes originais cadastradas e podem mudar.</p>
      <p>Antes de reservar, confirme diretamente na fonte original valores, datas, regras, localizaÃ§Ã£o e comodidades.</p>`;
  }else{
    b.innerHTML=`<span class="eyebrow">Como funciona</span>
      <h2 id="infoTitle">TrÃªs passos e pronto</h2>
      <ol>
        <li><b>Pesquise e filtre as opÃ§Ãµes.</b></li>
        <li><b>Compare as informaÃ§Ãµes disponÃ­veis.</b></li>
        <li><b>Abra a fonte original e confirme tudo por lÃ¡.</b></li>
      </ol>
      <p>VocÃª pode filtrar por regiÃ£o, hÃ³spedes, piscina, pet e favoritos. Os demais filtros ficam em â€œMais filtrosâ€.</p>`;
  }

  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';

  setTimeout(()=>m.querySelector('.modal-close')?.focus(),0);
}

function closeInfo(){
  const m=$('#infoModal');
  if(!m)return;

  m.classList.remove('open');
  m.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

function updateNetwork(){
  const online=navigator.onLine;

  $('#networkBadge').textContent=online?'● Online':'● Offline';
  $('#networkBadge').classList.toggle('offline',!online);
  $('#networkBadge').classList.toggle('online',online);
  $('#offlineBanner').classList.toggle('hidden',online);
}

function setupMap(){
  const content=$('#mapContent');
  const btn=$('#toggleMap');

  if(!content||!btn)return;

  if(window.matchMedia('(max-width:700px)').matches){
    content.hidden=true;
    btn.textContent='Ver mapa';
    btn.setAttribute('aria-expanded','false');
  }

  btn.addEventListener('click',()=>{
    const willShow=content.hidden;

    content.hidden=!willShow;
    btn.textContent=willShow?'Ocultar mapa':'Ver mapa';
    btn.setAttribute('aria-expanded',String(willShow));
  });
}

function setupBackToTop(){
  const btn=$('#backToTop');

  window.addEventListener('scroll',()=>{
    btn.classList.toggle('show',window.scrollY>650);
  },{passive:true});

  btn.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

function setupInstallHint(){
  const hint=$('#installHint');
  const close=$('#installHintClose');

  if(localStorage.getItem('temporada-pb-install-hint-dismissed')==='1'){
    hint?.classList.add('hidden');
  }

  close?.addEventListener('click',()=>{
    hint.classList.add('hidden');
    localStorage.setItem('temporada-pb-install-hint-dismissed','1');
  });
}

async function loadVersion(){
  try{
    const v=await fetch('version.json',{cache:'no-store'}).then(r=>r.json());
    if(v?.version){
      $('#footerVersion').textContent='V'+v.version;
    }
  }catch{}
}

Promise.all([
  fetch('data/imoveis.json').then(r=>r.json()),
  fetch('data/meta.json').then(r=>r.json())
]).then(([d,m])=>{
  D=d;
  META=m;

  $('#loadingCards')?.remove();

  $('#reg').innerHTML += [...new Set(D.map(x=>x.regiao))]
    .sort((a,b)=>a.localeCompare(b,'pt-BR'))
    .map(x=>`<option value="${x}">${x}</option>`).join('');

  updateMaintenance();
  updateSummary();
  render();
}).catch(()=>{
  $('#loadingCards')?.remove();

  $('#resultsGroups').innerHTML=
    `<div class="empty">
      <b>Não foi possível atualizar a base agora.</b>
      <p>Se você já abriu o guia antes, tente novamente: parte das informações pode continuar disponível offline.</p>
    </div>`;
});

$$('.near-chip,.map-node').forEach(b=>b.addEventListener('click',()=>setNear(b.dataset.near)));

['q','reg','type','cap','beds','baths','source','maint','sort','pool','parking','air','pet','fav'].forEach(id=>{
  $('#'+id)?.addEventListener('input',render);
});

$('#resetFilters')?.addEventListener('click',resetAll);
$('#clearMap')?.addEventListener('click',()=>setNear('all'));

$('#moreFiltersBtn')?.addEventListener('click',()=>{
  const box=$('#advancedFilters');
  const btn=$('#moreFiltersBtn');
  const hidden=box.hasAttribute('hidden');

  if(hidden){
    box.removeAttribute('hidden');
    btn.textContent='− Menos filtros';
    btn.setAttribute('aria-expanded','true');
  }else{
    box.setAttribute('hidden','');
    btn.textContent='+ Mais filtros';
    btn.setAttribute('aria-expanded','false');
  }
});

$('#mobileFav')?.addEventListener('click',()=>{
  $('#fav').checked=true;
  render();
  document.querySelector('.results-head')?.scrollIntoView({behavior:'smooth'});
});

$('#howBtn')?.addEventListener('click',()=>openInfo('how'));
$('#aboutGuideBtn')?.addEventListener('click',()=>openInfo('about'));

document.addEventListener('click',e=>{
  if(e.target.closest('[data-close-detail]'))closeDetails();
  if(e.target.closest('[data-close-info]'))closeInfo();
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeDetails();
    closeInfo();
  }
});

window.addEventListener('online',updateNetwork);
window.addEventListener('offline',updateNetwork);

updateNetwork();
setupMap();
setupBackToTop();
setupInstallHint();
loadVersion();

let deferredPrompt;

window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredPrompt=e;
  $('#installBtn')?.classList.remove('hidden');
});

$('#installBtn')?.addEventListener('click',async()=>{
  if(!deferredPrompt)return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt=null;
  $('#installBtn')?.classList.add('hidden');
  $('#installHint')?.classList.add('hidden');
});

if('serviceWorker'in navigator){
  navigator.serviceWorker.register('sw.js');
}
