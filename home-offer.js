document.addEventListener('click',event=>{
 if(!event.target.closest('[data-list-request]'))return;
 openModal('Рассчитать анализы по списку','<p>Пришлите список анализов или назначение врача. Мы рассчитаем стоимость с учётом забора крови, уточним сроки готовности и расскажем о подготовке.</p>'+checkoutFields(),'Расчёт по списку');
 const form=content.querySelector('form');
 const label=document.createElement('label');label.className='list-request-field';label.innerHTML='Ваш список анализов<textarea name="analysisList" placeholder="Например: общий анализ крови, ферритин, ТТГ"></textarea>';
 form.prepend(label);content.querySelector('#send').textContent='Запросить расчёт';
 const attachment=document.createElement('div');
 attachment.className='list-attachment';
 attachment.innerHTML='<label class="list-attachment-button"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 11-8.5 8.5a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.4-8.4"/></svg><span>Прикрепить фото списка</span><input type="file" name="analysisPhotos" accept="image/*" multiple aria-label="Прикрепить фото списка"></label><p class="list-attachment-hint">Можно выбрать несколько фото вместо ввода вручную.</p><div class="list-attachment-selected" aria-live="polite"></div><button type="button" class="list-attachment-clear" hidden>Убрать файлы</button>';
 label.after(attachment);
 const input=attachment.querySelector('input');
 const selected=attachment.querySelector('.list-attachment-selected');
 const clear=attachment.querySelector('.list-attachment-clear');
 input.addEventListener('change',()=>{
  selected.replaceChildren();
  for(const file of input.files){
   const item=document.createElement('p');item.textContent=file.name;selected.append(item);
  }
  clear.hidden=!input.files.length;
 });
 clear.addEventListener('click',()=>{input.value='';selected.replaceChildren();clear.hidden=true;});
});
