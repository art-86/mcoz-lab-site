(() => {
 const section=document.querySelector('#checkups');
 const button=section.querySelector('[data-checkups-more]');
 button.addEventListener('click',()=>{
  section.classList.add('checkups-expanded');
  button.setAttribute('aria-expanded','true');
  section.querySelector('.program:nth-child(5)')?.focus({preventScroll:true});
 });
 section.querySelector('.filters').addEventListener('click',event=>{
  if(!event.target.closest('[data-filter]'))return;
  section.classList.remove('checkups-expanded');
  button.setAttribute('aria-expanded','false');
 });
})();
