(() => {
const items = [
{label:'Отзывы',tag:'Яндекс Карты · Хорошее место',title:'5,0 — рейтинг нашей клиники',text:'895 отзывов и 1 144 оценки пациентов на Яндекс Картах. В карточке отмечены медицинский центр, лаборатория и медицинская реабилитация.',note:'Москва, Октябрьская улица, 2. Метро «Достоевская» — 400 м пешком. Данные проверены 11 октября 2026 года.',cta:'Подробнее о клинике на Картах',action:'yandex',badge:'5,0 ★',tone:'yandex'},
{label:'Анализы',tag:'Соберите свой список',title:'Нужные анализы — в одном заказе',text:'Найдите исследование по названию, добавьте в корзину и посмотрите стоимость выбранных позиций.',note:'Заявка без онлайн-оплаты. Состав и итоговую сумму подтвердит администратор.',cta:'Выбрать анализы',action:'catalog',art:'heart-smooth.png',tone:'peach'},
{label:'Чекапы',tag:'Программы обследования',title:'Выберите программу под вашу задачу',text:'Лабораторные комплексы, мужское и женское здоровье, обследования перед операцией. Состав и цена — в карточке программы.',note:'Подходящий объём обследования определяют с учётом назначения врача.',cta:'Посмотреть чекапы',target:'checkups',art:'hormones-adult.png',tone:'violet'},
{label:'−30% на анализы',tag:'До 30 ноября 2026',title:'Скидка 30% на участвующие анализы',text:'В перечне акции — общий анализ крови и мочи, глюкоза, показатели липидного обмена и ряд биохимических исследований.',note:'На исследования из перечня собственной лаборатории. Скидки не суммируются; участие конкретной позиции уточните при записи.',cta:'Уточнить условия',action:'discount',badge:'−30%',tone:'violet'},
{label:'Предложения',tag:'Больше возможностей',title:'Приём и обследования в одной программе',text:'Приём врача-гинеколога и УЗИ малого таза — 6 960 ₽. Состав программы и условия можно посмотреть прямо здесь.',note:'Предложение для первичных пациентов. До 30 ноября 2026 года.',cta:'Что входит в программу',action:'gyn',art:'gyn-adult.png',tone:'pink'},
{label:'О клинике',tag:'20 лет опыта',title:'Не просто лаборатория',text:'Многопрофильная клиника, собственная лаборатория и врачи разных специальностей. Клиническая база университета Пирогова.',note:'Рассказываем об оборудовании и системе менеджмента качества ISO 9001:2015.',cta:'Познакомиться с клиникой',target:'about',photo:true,tone:'mint'},
{label:'Перед визитом',tag:'Спланируйте визит',title:'Есть назначение врача? Поможем со списком',text:'Администратор уточнит названия исследований, стоимость, время забора и подготовку к выбранным анализам.',note:'Условия подготовки зависят от исследования. Уточните их до посещения клиники.',cta:'Попросить помочь',action:'help',badge:'Подготовка',tone:'blue'}
];
const rail=document.querySelector('.stories');
const yandexDetails=()=>openModal('Клиника на Яндекс Картах','<p><b>Хорошее место · 5,0 из 5</b><br>895 отзывов · 1 144 оценки</p><h3>Как добраться</h3><p>Москва, Октябрьская улица, 2.<br>От метро «Достоевская» — 400 м пешком.<br>От остановки «Центральный театр Российской Армии» — 170 м.</p><h3>Что есть в карточке</h3><p>Медицинский центр, медицинская лаборатория, медицинская реабилитация. Указаны парковка и туалет для людей с инвалидностью. Доступность нужного входа уточните перед визитом.</p><p>Регистратура: <a href="tel:+74951208899">+7 (495) 120-88-99</a></p><p class="small">Источник — карточка Яндекс Карт. Проверено 11 октября 2026 года; рейтинг и количество отзывов могут меняться.</p><a class="primary yandex-original" href="https://yandex.ru/maps/-/CXujrBi4" target="_blank" rel="noopener noreferrer">Отзывы и маршрут в Яндекс Картах ↗</a>','Рейтинг и отзывы');
const visual=(s,cover=false)=>s.action==="yandex"?`<b class="yandex-score">5,0<span class="yandex-stars">${cover?"★":"★★★★★"}</span></b>`:s.photo?'<img src="assets/laboratory-original.jpg" alt="">':s.art?`<img src="assets/checkups/${s.art}" alt="">`:`<b>${cover && s.action==="help"?"Помощь":s.badge}</b>`;
rail.setAttribute('aria-label','Истории клиники');
rail.innerHTML=items.map((s,i)=>`<button type="button" data-story="${i}" aria-label="История: ${s.label}"><span class="story-ring"><span class="story-cover ${s.tone}">${visual(s,true)}</span></span><span>${s.label}</span></button>`).join('');
const dialog=document.createElement('dialog');dialog.id='story-viewer';dialog.setAttribute('aria-labelledby','story-title');
dialog.innerHTML='<div class="story-progress" aria-label="Выбор истории"></div><header class="story-header"><span>МЦОЗ · Истории</span><button type="button" class="story-pause" aria-label="Приостановить истории"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg></button><button type="button" class="story-close" aria-label="Закрыть истории"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="story-body" aria-live="polite"></div><div class="story-controls"><button type="button" class="story-prev" aria-label="Предыдущая история"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><span class="story-counter"></span><button type="button" class="story-next" aria-label="Следующая история"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>';
document.body.append(dialog);let current=0,opener;
const duration=10000;
let frame=0,lastTime=0,elapsed=0,paused=false,holding=false;
function tick(now){
 if(!dialog.open)return;
 if(lastTime && !paused && !holding && !document.hidden)elapsed+=now-lastTime;
 lastTime=now;
 dialog.querySelector('[aria-current]')?.style.setProperty('--progress',Math.min(elapsed/duration,1));
 if(elapsed>=duration){if(current<items.length-1)show(current+1);else{close();return;}}
 frame=requestAnimationFrame(tick);
}
function start(){cancelAnimationFrame(frame);lastTime=0;frame=requestAnimationFrame(tick);}
function resetPlayback(){elapsed=0;lastTime=0;paused=false;holding=false;const b=dialog.querySelector('.story-pause');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';b.setAttribute('aria-label','Приостановить истории');}
function show(i){resetPlayback();current=i;const s=items[i];dialog.className=s.tone;dialog.querySelector('.story-progress').innerHTML=items.map((_,n)=>`<button type="button" data-slide="${n}" aria-label="История ${n+1}: ${items[n].label}" ${n===i?'aria-current="true"':''}></button>`).join('');dialog.querySelector('.story-body').innerHTML=`<span class="story-tag">${s.tag}</span><div class="story-art ${s.photo?'is-photo':''}" aria-hidden="true">${visual(s)}</div><h2 id="story-title">${s.title}</h2><p>${s.text}</p><small>${s.note}</small><button type="button" class="story-cta">${s.cta} <span aria-hidden="true">↗</span></button>`;dialog.querySelector('.story-counter').textContent=`${i+1} / ${items.length}`;dialog.querySelector('.story-prev').disabled=i===0;dialog.querySelector('.story-next').disabled=i===items.length-1;dialog.querySelectorAll('[data-slide]').forEach((b,n)=>b.classList.toggle('completed',n<i));rail.querySelector(`[data-story="${i}"]`).classList.add('seen');}
function close(){cancelAnimationFrame(frame);dialog.close();opener?.focus();}
rail.addEventListener('click',e=>{const b=e.target.closest('[data-story]');if(!b)return;opener=b;show(+b.dataset.story);dialog.showModal();start();});
dialog.addEventListener('click',e=>{const b=e.target.closest('button');if(!b){if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}return;}if(b.matches('.story-close'))close();if(b.matches('[data-slide]'))show(+b.dataset.slide);if(b.matches('.story-prev')&&current>0)show(current-1);if(b.matches('.story-next')&&current<items.length-1)show(current+1);if(b.matches('.story-cta')){const s=items[current];close();if(s.target){document.getElementById(s.target).scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+s.target);}else if(s.action==='yandex')yandexDetails();else if(s.action==='gyn')program('gyn');else if(s.action==='help')help();else if(s.action==='catalog')location.href='catalog.html';else showRoute('Акция на анализы');}});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&current<items.length-1){e.preventDefault();show(current+1);}if(e.key==='ArrowLeft'&&current>0){e.preventDefault();show(current-1);}});
dialog.addEventListener('close',()=>{cancelAnimationFrame(frame);lastTime=0;opener?.focus();});
dialog.querySelector('.story-pause').addEventListener('click',e=>{paused=!paused;e.currentTarget.innerHTML=paused?'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';e.currentTarget.setAttribute('aria-label',paused?'Продолжить истории':'Приостановить истории');});
dialog.querySelector('.story-body').addEventListener('pointerdown',e=>{if(!e.target.closest('button,a'))holding=true;});
window.addEventListener('pointerup',()=>holding=false);
window.addEventListener('pointercancel',()=>holding=false);
document.addEventListener('visibilitychange',()=>lastTime=0);
document.querySelector('[data-yandex-story]').addEventListener('click',e=>{opener=e.currentTarget;show(0);dialog.showModal();start();});
})();






