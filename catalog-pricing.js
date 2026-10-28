// Exact, reviewed matches to the published promotion; no category-wide discount.
const saleIds=new Set(['urinalysis','glucose','lab-f5068e805660','lab-6be048435a32','lab-b362296bd130','lab-c11aa9f8c98c','lab-5c215d986f9c','lab-0a5d07885c7d','lab-1e08298aa060','lab-61ff222b75ca','lab-84d161a7d6a3','lab-794f18648c0e','lab-125e11e762c8','lab-6265cc9bf2ec','lab-9acd5ee2b356','lab-39e6c5e11c57','lab-cfb1acef3403','lab-747a0aacd387','lab-961c3881a7f8','lab-3b3a0fb420fe','lab-fe69237e5f31']);
catalogData.forEach(t=>{if(saleIds.has(t.id)){t.old=t.price;t.price=Math.round(t.price*70)/100;t.discount=30;}if(t.group==='Общий анализ крови'||/гинеколог|отделяемого (цервикального|влагалища|урогенитального)/i.test(t.title))t.promoCheck=true;});

tests.forEach(t=>{const full=catalogData.find(x=>x.id===t.id);if(full){t.price=full.price;t.old=full.old;t.discount=full.discount;}});
