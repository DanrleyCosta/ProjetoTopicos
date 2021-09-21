const cacheName = 'gg-conf-v1';
const staticAssets = ['./', './index.html', './assets/js/app.js', './assets/css/styles.css'];

self.addEventListener('install', async event => {
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
});

// Opcional: clents.claim () faz o service worker assumir a página atual
// em vez de esperar até o próximo carregamento. Útil se usar Service Worker para pré-buscar conteúdo
// que é necessário em outras rotas.

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	const req = event.request;

	if (/.*(json)$/.test(req.url)) {
		event.respondWith(networkFirst(req));
	} else {
		event.respondWith(cacheFirst(req));
	}
});

async function cacheFirst(req) {
	const cache = await caches.open(cacheName);
	const cachedResponse = await cache.match(req);
	return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
	const cache = await caches.open(cacheName);
	try {
		const fresh = await fetch(req);
		cache.put(req, fresh.clone());
		return fresh;
	} catch (e) {
		const cachedResponse = await cache.match(req);
		return cachedResponse;
	}
}