const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = __dirname;
const output = path.join(root, '_site');
if (fs.existsSync(output)) throw new Error('Remove the previous _site build before rebuilding.');
const tracked = execFileSync('git', ['ls-files'], {cwd: root, encoding: 'utf8'}).trim().split(/\r?\n/);
const files = tracked.filter(file =>
  (/^[^/]+\.(html|css|js)$/.test(file) && file !== 'specification.html') ||
  /^assets\/.*\.(png|jpe?g|svg|webp|woff2?)$/i.test(file)
);
for (const file of files) {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  if (file.endsWith('.html')) {
    let html = fs.readFileSync(path.join(root, file), 'utf8');
    // Keep the hidden controls because existing scripts bind their handlers.
    html = html.replace(/<a\b[^>]*href="(?:wireframe\/[^" ]*|specification\.html)"[^>]*>[\s\S]*?<\/a>/g, '');
    html = html.replace('</head>', '<style>.reviewbar{display:none!important}</style></head>');
    fs.writeFileSync(target, html);
  } else fs.copyFileSync(path.join(root, file), target);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(output, file), 'utf8');
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|tel:|mailto:|data:|#)/.test(url)) continue;
    if (url.startsWith('/')) throw new Error(`Root-relative link in ${file}: ${url}`);
    const local = url.split(/[?#]/)[0];
    if (!fs.existsSync(path.join(output, local))) throw new Error(`Missing resource in ${file}: ${url}`);
  }
}
console.log(`GitHub Pages package: ${files.length} files, local links verified.`);
