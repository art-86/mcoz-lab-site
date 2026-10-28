const money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
const key='mcoz-cart';
let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]');}catch{}
if(!Array.isArray(saved))saved=[];
const cart=new Map([...catalogData,...programs].filter(t=>saved.includes(t.id)).map(t=>[t.id,t]));
const groups=Object.fromEntries(catalogData.map(t=>[t.id,t.group]));let page=1;const pageSize=20;
let category='Все анализы';
const landingId=new URLSearchParams(location.search).get('test');
let focusedTest=catalogData.some(t=>t.id===landingId)?landingId:null;
function clearLanding(){
 focusedTest=null;
 const url=new URL(location.href);url.searchParams.delete('test');history.replaceState(null,'',url);
}
const landingNotice=document.createElement('div');
landingNotice.className='catalog-landing';
document.querySelector('#catalog-results').before(landingNotice);
document.addEventListener('click',e=>{
 if(e.target.closest('[data-show-all],[data-category],[data-reset],#promo-filter')){
  clearLanding();
  if(e.target.closest('[data-show-all]')){category='Все анализы';page=1;updateSections();document.querySelector('#catalog-query').value='';document.querySelector('#catalog-sale').checked=false;document.querySelector('#catalog-fast').checked=false;render();}
 }
},true);
for(const event of ['input','change'])document.addEventListener(event,e=>{if(e.target.matches('#catalog-query,#catalog-sort,#catalog-section,#catalog-fast,#catalog-sale'))clearLanding();},true);

const modal=document.querySelector('#modal'),content=document.querySelector('#dialog-content');
const normalize=s=>s.toLowerCase().replaceAll('ё','е').replaceAll('а','a').replaceAll('в','b').replace(/[.,()\-]/g,' ').replace(/\s+/g,' ').trim().replace(/[а-яa-z]{5,}/g,w=>/[а-я]/.test(w)?w.replace(/(ого|ому|ами|ями|ий|ый|ой|ая|ые|ов|a|ы|е|у|я|и)$/,''):w);
function render(){
 landingNotice.hidden=!focusedTest;landingNotice.innerHTML=focusedTest?'<div><strong>Выбранный анализ</strong><p>Можно снова открыть подробности или добавить анализ в корзину.</p></div><button data-show-all>Показать все анализы</button>':'';
 const q=normalize(document.querySelector('#catalog-query').value);
 const codeQuery=/^[ABАВ]\.?\d/i.test(document.querySelector('#catalog-query').value.trim());const sub=document.querySelector('#catalog-section').value,fast=document.querySelector('#catalog-fast').checked,sale=document.querySelector('#catalog-sale').checked;
 const rows=catalogData.filter(t=>(!focusedTest||t.id===focusedTest)&&(category==='Все анализы'||t.group===category)&&(!sub||t.section===sub)&&(!fast||(t.days!==null&&t.days<=1))&&(!sale||t.discount)&&(codeQuery?normalize(t.code).includes(q):q.split(/\s+/).filter(Boolean).every(token=>normalize(t.sourceTitle+' '+t.keywords+' '+t.code+' '+t.group+' '+t.section).includes(token))));
 const sort=document.querySelector('#catalog-sort').value;
 if(sort==='popular'){const priority=['cbc','ferritin','tsh','vitd','glucose','urinalysis'];rows.sort((a,b)=>(priority.includes(a.id)?priority.indexOf(a.id):100)-(priority.includes(b.id)?priority.indexOf(b.id):100)||a.sourceIndex-b.sourceIndex);}if(sort==='fast')rows.sort((a,b)=>(a.days??999)-(b.days??999));if(sort==='cheap')rows.sort((a,b)=>a.price-b.price);if(sort==='name')rows.sort((a,b)=>a.title.localeCompare(b.title,'ru'));
 document.querySelector('#results-count').textContent='Найдено исследований: '+rows.length;
 page=Math.min(page,Math.max(1,Math.ceil(rows.length/pageSize)));document.querySelector('#catalog-results').innerHTML=rows.length?rows.slice((page-1)*pageSize,page*pageSize).map(t=>`<article class="catalog-row ${t.id===focusedTest?'catalog-row-focused':''}"><div><small>${groups[t.id]} · ${t.code?'Код '+t.code:'Код не указан'}</small><button class="test-title" data-detail="${t.id}">${t.title}</button><div class="catalog-tags"><span>${t.duration}</span><span>${t.material}</span></div></div><div class="catalog-buy"><div class="catalog-price"><strong>${money(t.price)}</strong>${t.discount?`<s>${money(t.old)}</s><span class="sale-badge">−30%</span>`:""}</div><button class="catalog-add ${cart.has(t.id)?'selected':''}" data-add="${t.id}">${cart.has(t.id)?'В корзине ✓':'В корзину +'}</button></div></article>`).join(''):'<div class="catalog-empty"><h3>Ничего не найдено</h3><p>Попробуйте другое название или выберите все категории.</p><button data-reset>Сбросить поиск</button></div>';
 document.querySelector('.category-list').innerHTML=['Все анализы',...new Set(Object.values(groups))].map(g=>`<button data-category="${g}" aria-pressed="${g===category}">${g}<span>${g==='Все анализы'?catalogData.length:catalogData.filter(t=>groups[t.id]===g).length}</span></button>`).join('');
 renderPages(rows.length);const total=[...cart.values()].reduce((a,t)=>a+(t.price||0),0);
 document.querySelectorAll('.count').forEach(e=>e.textContent=cart.size);
 document.querySelector('#order-sum').textContent=document.querySelector('#mobile-sum').textContent=money(total);
 document.querySelector('#order-caption').textContent=cart.size?'Выбрано позиций: '+cart.size:'Добавляйте анализы — здесь появится сумма.';
 document.querySelector('#mobile-caption').textContent=cart.size?'Позиций: '+cart.size:'Ваш список пуст';
 document.querySelector('#order-open').disabled=!cart.size;
 try{localStorage.setItem(key,JSON.stringify([...cart.keys()]));}catch{}
}
function open(html){content.innerHTML=html;if(!modal.open)modal.showModal();modal.scrollTop=0;content.scrollTop=0;}
function showCart(){const list=[...cart.values()];open(`<h2>Ваш заказ</h2>${list.length?list.map(t=>`<div class="cart-row"><div><b>${t.title}</b><small>${t.price===null?'Цена по запросу':money(t.price)}</small></div><button data-remove="${t.id}" aria-label="Убрать ${t.title}">Убрать</button></div>`).join('')+`<div class="order-total"><span>Исследования и программы</span><strong>${money(list.reduce((a,t)=>a+(t.price||0),0))}</strong></div><p class="small">Забор биоматериала и позиции без указанной цены не включены в сумму. Полную стоимость подтвердит администратор.</p><button class="primary" data-checkout>Оформить без оплаты</button>`:'<p>Выберите анализы из каталога.</p>'}`);}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.category){category=b.dataset.category;page=1;updateSections();render();}
 if(b.hasAttribute('data-reset')){document.querySelector('#catalog-sale').checked=false;document.querySelector('#catalog-fast').checked=false;category='Все анализы';page=1;updateSections();document.querySelector('#catalog-query').value='';render();}
 if(b.dataset.add){if(cart.has(b.dataset.add)){showCart();return;}const t=catalogData.find(t=>t.id===b.dataset.add);cart.set(t.id,t);render();if(modal.open)showCart();}
 if(b.dataset.remove){cart.delete(b.dataset.remove);render();showCart();}
 if(b.hasAttribute('data-cart'))showCart();if(b.dataset.page){page=Number(b.dataset.page);render();document.querySelector('.catalog-toolbar').scrollIntoView({block:'start'});}
 if(b.dataset.detail){const t=catalogData.find(t=>t.id===b.dataset.detail);open(`<p class="small">${groups[t.id]} · ${t.code}</p><h2>${t.title}</h2><p class="small">${t.section}</p><div class="detail-grid"><div><small>Биоматериал</small>${t.material}</div><div><small>Срок готовности</small>${t.duration}</div></div>${fullPreparation(t)}<details class="source-title"><summary>Полное название в прайсе</summary><p>${t.sourceTitle}</p></details><div class="order-total"><div class="catalog-price"><strong>${money(t.price)}</strong>${t.discount?`<s>${money(t.old)}</s><span class="sale-badge">−30%</span>`:""}</div><button class="catalog-add" data-add="${t.id}">${cart.has(t.id)?'Посмотреть корзину':'В корзину +'}</button></div><p class="small">Забор биоматериала оплачивается отдельно.</p>`);}
 if(b.hasAttribute('data-checkout'))open('<h2>Оформление заказа</h2><p>Администратор подтвердит состав, стоимость и время визита.</p><form id="catalog-checkout" class="checkout"><p class="demo-note">Демонстрация: данные не отправляются. Используйте вымышленные данные.</p><label>Имя<input name="name" required autocomplete="off"></label><label>Телефон<input name="phone" type="tel" required autocomplete="off"></label><label class="consent"><input type="checkbox" name="consent" required><span>Даю <a href="consent.html" target="_blank" rel="noopener">согласие на обработку данных</a> для связи по заявке. <a href="privacy.html" target="_blank" rel="noopener">Политика обработки данных</a>.</span></label><button class="primary" disabled>Посмотреть подтверждение</button></form>');
 if(b.id==='close')modal.close();
 if(b.id==='mobile'){document.querySelector('#preview').classList.add('preview-mobile');document.querySelector('#mobile').setAttribute('aria-pressed','true');document.querySelector('#desktop').setAttribute('aria-pressed','false');document.querySelector('.catalog-categories').open=false;}
 if(b.id==='desktop'){document.querySelector('#preview').classList.remove('preview-mobile');document.querySelector('#desktop').setAttribute('aria-pressed','true');document.querySelector('#mobile').setAttribute('aria-pressed','false');document.querySelector('.catalog-categories').open=true;}
 if(b.hasAttribute('data-yandex-story'))open('<h2>Оценки пациентов</h2><p>5,0 на Яндекс Картах · 895 отзывов</p><p>Клиника отмечена наградой «Хорошее место».</p><a href="https://yandex.ru/maps/-/CXujrBi4" target="_blank" rel="noopener">Посмотреть отзывы на Яндекс Картах ↗</a>');
});
document.querySelector('#catalog-query').addEventListener('input',()=>{page=1;render();});
document.querySelector('#catalog-sort').addEventListener('change',()=>{page=1;render();});
document.addEventListener('submit',e=>{if(e.target.id==='catalog-checkout'){e.preventDefault();open('<h2>Так будет выглядеть подтверждение</h2><p>Заказ получен. Администратор свяжется с вами для подтверждения.</p><p class="demo-note">Это макет: заявка не отправлена.</p>');}});
if(matchMedia('(max-width:600px)').matches)document.querySelector('.catalog-categories').open=false;
updateSections();render();

window.addEventListener('pageshow',()=>{let ids=[];try{ids=JSON.parse(localStorage.getItem(key)||'[]');}catch{}if(!Array.isArray(ids))ids=[];cart.clear();[...catalogData,...programs].filter(t=>ids.includes(t.id)).forEach(t=>cart.set(t.id,t));render();});



document.addEventListener('change',e=>{if(e.target.closest('#catalog-checkout')){const form=e.target.closest('form');form.querySelector('button.primary').disabled=!form.elements.consent.checked;}});
const queryParams=new URLSearchParams(location.search);if(queryParams.has('q'))document.querySelector('#catalog-query').value=queryParams.get('q');if(queryParams.get('sale')==='1')document.querySelector('#catalog-sale').checked=true;render();if(queryParams.get('cart')==='1')showCart();if(focusedTest){document.querySelector('#catalog-query').value='';document.querySelector('#catalog-sale').checked=false;render();}
const requestedTest=queryParams.get('test');if(requestedTest&&catalogData.some(t=>t.id===requestedTest)){const button=document.createElement('button');button.dataset.detail=requestedTest;button.hidden=true;document.body.append(button);button.click();button.remove();}

modal.addEventListener('close',()=>{if(focusedTest){const title=document.querySelector('.catalog-row-focused .test-title');title?.focus({preventScroll:true});landingNotice.scrollIntoView({block:'center',behavior:'instant'});}});
