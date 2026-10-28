(() => {
 'use strict';
 const key='mcoz-privacy-v1', config=window.siteConfig||{}, id=Number(config.metricaId)||0;
 let preference=null, started=false, banner;
 try{const v=JSON.parse(localStorage.getItem(key));if(v&&v.expires>Date.now()&&typeof v.analytics==='boolean')preference=v;}catch{}
 function save(analytics){preference={analytics,noticeDismissed:true,version:1,expires:Date.now()+180*864e5};try{localStorage.setItem(key,JSON.stringify(preference));}catch{}update();}
 function start(){
  if(started||!Number.isSafeInteger(id)||id<=0||preference?.analytics===false)return;
  if(!config.allowLocalAnalytics&&['localhost','127.0.0.1',''].includes(location.hostname))return;
  started=true;
  window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments);};window.ym.l=Date.now();
  const script=document.createElement('script');script.async=true;script.src='https://mc.yandex.ru/metrika/tag.js';script.id='metrica-script';document.head.append(script);
  // No query terms, selected tests, medical titles, form data or referrer queries.
  window.ym(id,'init',{defer:true,webvisor:false,clickmap:false,trackLinks:false,accurateTrackBounce:false});
  window.ym(id,'hit',location.origin+location.pathname,{title:'МЦОЗ · сайт лаборатории',referer:location.origin+'/'});
 }
 function stop(){if(started&&window.ym)window.ym(id,'destruct');started=false;document.querySelector('#metrica-script')?.remove();document.cookie.split(';').forEach(part=>{const name=part.split('=')[0].trim();if(!name.startsWith('_ym_'))return;const domains=[null,location.hostname,'.'+location.hostname];domains.forEach(domain=>{document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');});});}
 function update(){document.querySelectorAll('#analytics-status').forEach(el=>el.textContent=preference?.analytics===false?'Аналитика отключена в этом браузере.':id?'Аналитика разрешена настройками этого браузера.':'Номер счётчика ещё не задан. Аналитика не загружается.');}
 // Soft mode: launch immediately; the non-blocking notice follows first paint.
 start();
 function ready(){
  banner=document.createElement('aside');banner.className='cookie-banner';banner.setAttribute('aria-label','Cookies и аналитика');banner.innerHTML='<b>Сайт запоминает ваш выбор</b><p>Используем хранилище браузера для корзины и настроек. '+(id?'Яндекс Метрика загружается при открытии сайта для статистики посещений.':'Подключение Яндекс Метрики подготовлено, счётчик пока не задан.')+' <a href="cookies.html">Подробнее о cookies</a></p><div class="content-actions"><button class="primary" data-cookie-dismiss>Понятно</button><button class="secondary" data-analytics-disable>Без аналитики</button><a href="cookies.html">Настройки</a></div>';
  banner.hidden=!!preference?.noticeDismissed;document.body.append(banner);update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(()=>requestAnimationFrame(ready)),{once:true});else requestAnimationFrame(ready);
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-cookie-dismiss]')){save(preference?.analytics!==false);banner.hidden=true;}
  if(e.target.closest('[data-analytics-disable]')){save(false);stop();if(banner)banner.hidden=true;}
  if(e.target.closest('[data-analytics-enable]')){save(true);start();if(banner)banner.hidden=true;}
  if(e.target.closest('[data-clear-cart]')){try{localStorage.removeItem('mcoz-cart');}catch{}document.querySelector('#storage-status').textContent='Сохранённая корзина очищена.';}
 });
 window.addEventListener('storage',e=>{if(e.key!==key)return;try{const next=JSON.parse(e.newValue);if(next?.analytics===false){preference=next;stop();update();}}catch{}});
})();
