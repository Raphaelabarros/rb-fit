/* RB Fit — service worker: abre o app sem internet e guarda as animações já vistas */
const APP = "rbfit-app-v9", MIDIA = "meutreino-midia-v1";
const ARQUIVOS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(APP).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== APP && k !== MIDIA).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // API do GitHub: nunca guardar (dados sempre frescos)
  if (url.hostname === "api.github.com") return;
  // Mídia externa (GIFs e fotos): usa a cópia guardada, busca só se não tiver
  if (url.hostname === "static.exercisedb.dev" || url.hostname === "upload.wikimedia.org") {
    e.respondWith(caches.open(MIDIA).then(async c => { const hit = await c.match(req); if (hit) return hit;
      try { const r = await fetch(req); if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; } catch (err) { return hit || Response.error(); } }));
    return;
  }
  // O próprio app: tenta a versão nova, e sem internet usa a guardada
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(APP).then(c => c.put(req, cp)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
  }
});
