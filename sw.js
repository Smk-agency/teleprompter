/* Teleprompter SMK: service worker.
   - Páginas e arquivos do app: busca sempre a versão nova na rede; se não houver rede, usa a cópia guardada.
   - Bibliotecas de CDN e fontes (endereços com versão fixa): usa a cópia guardada e atualiza por trás.
   - Firestore e login do Firebase: nunca passam por aqui. */
var CACHE = "tp-v1";
var SHELL = ["./", "./index.html", "./manifest.json", "./icon.svg",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];
var CDN = /^https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com\/firebasejs|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = req.url;

  if (url.indexOf(self.registration.scope) === 0) {
    e.respondWith(fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || (req.mode === "navigate" ? caches.match("./index.html") : Response.error());
      });
    }));
    return;
  }

  if (CDN.test(url)) {
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; })
          .catch(function () { return hit || Response.error(); });
        return hit || net;
      });
    }));
  }
});
