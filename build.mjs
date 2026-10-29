// يجمّع src/ في: www/ (للـ APK والـ PWA) و dist/azkari-preview.html (نسخة صفحة واحدة للعرض)
import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const css = read('src/style.css');
const body = read('src/body.html');
const js = read('src/app.js');

fs.mkdirSync(path.join(root, 'www/fonts'), { recursive: true });
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });

// الخطوط تُنسخ محلياً حتى يشتغل التطبيق بدون إنترنت
const fonts = [
  ['Amiri', 400, '@fontsource/amiri', 'amiri-arabic-400-normal'],
  ['Readex Pro', 400, '@fontsource/readex-pro', 'readex-pro-arabic-400-normal'],
  ['Readex Pro', 500, '@fontsource/readex-pro', 'readex-pro-arabic-500-normal'],
  ['Readex Pro', 600, '@fontsource/readex-pro', 'readex-pro-arabic-600-normal'],
];
let fontFaces = '';
const fontFiles = [];
for (const [family, weight, pkg, file] of fonts) {
  const src = path.join(root, 'node_modules', pkg, 'files', file + '.woff2');
  fs.copyFileSync(src, path.join(root, 'www/fonts', file + '.woff2'));
  fontFiles.push('./fonts/' + file + '.woff2');
  fontFaces += `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(fonts/${file}.woff2) format('woff2');}\n`;
}

// ---------- النسخة المستقلة (APK / PWA) ----------
const standalone = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#FBFDFB">
<meta name="color-scheme" content="light dark">
<title>أذكاري</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-192.png">
<style>
${fontFaces}
:root{color-scheme:light;padding-top:max(env(safe-area-inset-top,0px),var(--safe-area-inset-top,0px));padding-bottom:max(env(safe-area-inset-bottom,0px),var(--safe-area-inset-bottom,0px))}
[hidden]{display:none!important}
</style>
<style>
${css}
</style>
<script>window.__PWA=true;</script>
</head>
<body>
${body}
<script>
${js}
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'www/index.html'), standalone);

fs.writeFileSync(path.join(root, 'www/manifest.webmanifest'), JSON.stringify({
  name: 'أذكاري',
  short_name: 'أذكاري',
  description: 'أذكار الصباح والمساء وبعد الصلاة والنوم، مع عدّاد تسبيح',
  start_url: './index.html',
  scope: './',
  display: 'standalone',
  orientation: 'portrait',
  dir: 'rtl',
  lang: 'ar',
  background_color: '#FBFDFB',
  theme_color: '#1B7F4C',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));

const precache = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png', ...fontFiles];
fs.writeFileSync(path.join(root, 'www/sw.js'), `// يخزّن ملفات التطبيق لتعمل بدون إنترنت
const CACHE = 'azkari-v1';
const FILES = ${JSON.stringify(precache)};
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
`);

// ---------- نسخة العرض (صفحة واحدة، الخطوط من Google Fonts) ----------
const preview = `<title>أذكاري</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400&family=Readex+Pro:wght@400;500;600&display=swap">
<style>
${css}
</style>
${body}
<script>
${js}
</script>
`;
fs.writeFileSync(path.join(root, 'dist/azkari-preview.html'), preview);

console.log('built: www/index.html', Math.round(standalone.length / 1024) + 'KB, dist/azkari-preview.html', Math.round(preview.length / 1024) + 'KB');
