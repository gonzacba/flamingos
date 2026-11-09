// Bump VERSION whenever you upload a changed index.html.
const VERSION = "flamingos-v6";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "flamingos-status").map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Field status and snacks: always ask the network; if offline, give the last saved copy marked as cached.
  const live = ["status.json", "snacks.json"].find(f => url.pathname.endsWith("/" + f));
  if (live) {
    e.respondWith(fetch(req, { cache: "no-store" }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open("flamingos-status").then(c => c.put(live, copy)); }
      return res;
    }).catch(() => caches.open("flamingos-status").then(c => c.match(live)).then(hit => {
      if (!hit) return new Response("{}", { status: 503 });
      const h = new Headers(hit.headers); h.set("x-flamingos-cached", "1");
      return hit.text().then(body => new Response(body, { status: 200, headers: h }));
    })));
    return;
  }
  // The page: network first so schedule changes show up, saved copy when offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Icons and fonts: saved copy first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => hit)));
});
