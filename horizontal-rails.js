// Mouse dragging and wheel scrolling; touch and trackpad keep native scrolling.
document.querySelectorAll('.stories, #popular .test-grid').forEach(rail=>{
 let gesture=null, suppressClick=false, wheelTimer;
 const canScroll=()=>rail.scrollWidth>rail.clientWidth+1;
 rail.addEventListener('dragstart',event=>event.preventDefault());
 rail.addEventListener('pointerdown',event=>{
  suppressClick=false;
  if(event.pointerType!=='mouse'||event.button!==0||!canScroll())return;
  gesture={id:event.pointerId,x:event.clientX,start:rail.scrollLeft,dragging:false};
 });
 window.addEventListener('pointermove',event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  const distance=event.clientX-gesture.x;
  if(!gesture.dragging&&Math.abs(distance)<6)return;
  if(!gesture.dragging){
   gesture.dragging=true;
   rail.setPointerCapture(event.pointerId);
   rail.classList.add('rail-dragging');
  }
  event.preventDefault();
  rail.scrollLeft=gesture.start-distance;
 });
 const finish=event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  suppressClick=gesture.dragging;
  if(rail.hasPointerCapture(event.pointerId))rail.releasePointerCapture(event.pointerId);
  gesture=null;
  rail.classList.remove('rail-dragging');
 };
 window.addEventListener('pointerup',finish);
 window.addEventListener('pointercancel',finish);
 rail.addEventListener('click',event=>{
  if(!suppressClick||event.detail===0)return;
  suppressClick=false;
  event.preventDefault();
  event.stopImmediatePropagation();
 },true);
 rail.addEventListener('wheel',event=>{
  if(event.ctrlKey||!canScroll()||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?rail.clientWidth:1);
  if(!delta||(delta<0&&rail.scrollLeft<=0)||(delta>0&&rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-1))return;
  event.preventDefault();
  rail.classList.add('rail-wheeling');
  rail.scrollLeft+=delta;
  clearTimeout(wheelTimer);
  wheelTimer=setTimeout(()=>rail.classList.remove('rail-wheeling'),180);
 },{passive:false});
});
