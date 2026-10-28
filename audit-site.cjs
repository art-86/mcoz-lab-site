const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const pages=['index.html','catalog.html','articles.html','article-preparation.html','article-choosing.html','article-results.html','privacy.html','consent.html','terms.html','cookies.html'];
const broken=[];
for(const page of pages){const html=fs.readFileSync(page,'utf8');for(const [,url]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|tel:|mailto:|data:)/.test(url))continue;const [file,hash]=url.split('#'),local=(file||page).split('?')[0];if(!fs.existsSync(local)){broken.push(page+' → '+url);continue;}if(hash&&local.endsWith('.html')&&!fs.readFileSync(local,'utf8').includes('id="'+hash+'"'))broken.push(page+' → missing #'+hash);}}
assert.deepEqual(broken,[]);
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('data.js','utf8')+fs.readFileSync('catalog-data.js','utf8')+fs.readFileSync('catalog-pricing.js','utf8')+';this.check={rows:catalogData.length,sale:catalogData.filter(t=>t.discount).length,ids:new Set(catalogData.map(t=>t.id)).size};',ctx);
assert.equal(ctx.check.rows,1035);assert.equal(ctx.check.sale,21);assert.equal(ctx.check.ids,1035);
for(const file of ['app.js','site-navigation.js'])assert(!/Планируемый адрес|Отдельная страница будет|Тема для будущей статьи|Полный каталог — следующий этап/.test(fs.readFileSync(file,'utf8')));
console.log('OK: links and anchors on 10 pages; 1,035 unique tests; 21 discounts; no old navigation stubs.');
