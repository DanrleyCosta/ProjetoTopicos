// Define o nome do cache atual, considerando a sua versão.
var cacheName = 'gg-v1.0';

// Armazena todos os arquivos no cache atual
self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/manifest.json',
      '/src/assets/css/styles.css',
      /* ---- Bootstrap Select ---- */
      '/src/assets/js/bootstrap-select/css/bootstrap-select.css',
      '/src/assets/js/bootstrap-select/css/bootstrap-select.css.map',
      '/src/assets/js/bootstrap-select/css/bootstrap-select.min.css',
      /* ---- Libs ---- */
      '/src/assets/js/libs/bootstrap-datepicker.min.js',
      '/src/assets/js/libs/bootstrap-switch.js',
      '/src/assets/js/libs/bootstrap.bundle.js.map',
      '/src/assets/js/libs/bootstrap.bundle.min.js',
      '/src/assets/js/libs/bootstrap.bundle.min.js.map',
      '/src/assets/js/libs/bootstrap.min.js',
      '/src/assets/js/libs/datetimepicker.js',
      '/src/assets/js/libs/jquery.mask.js',
      '/src/assets/js/libs/jquery.min.js',
      '/src/assets/js/libs/moment.min.js',
      '/src/assets/js/libs/lottie-player.js',
      /* ---- Translate ---- */
      '/src/assets/js/l10n/pt-br.js',
      /* ---- Controllers ---- */
      '/src/assets/js/client.js',
      '/src/assets/js/ingredients.js',
      '/src/assets/js/products.js',
      '/src/assets/js/requisition.js',
      '/src/assets/js/template.js',
      /* ---- Images ---- */
      '/src/assets/image/breakfast.svg',
      '/src/assets/image/event_checked.svg',
      '/src/assets/image/food-salad.svg',
      '/src/assets/image/github.svg',
      '/src/assets/image/receipt_long.svg',
      '/src/assets/image/user.svg',
      '/src/assets/image/west_arrow.svg',
      /* ---- Icons ---- */
      '/src/assets/image/icons/logo144144.png',
      '/src/assets/image/icons/android-icon-192-192.png',
      '/src/assets/image/icons/android-icon-48-48.png',
      '/src/assets/image/icons/android-icon-512-512.png',
      '/src/assets/image/icons/android-icon-72-72.png',
      '/src/assets/image/icons/android-icon-96-96.png',
      '/src/assets/image/icons/apple-icon-114x114.png',
      '/src/assets/image/icons/apple-icon-152x152.png',
      '/src/assets/image/icons/apple-icon-180x180.png',
      '/src/assets/image/icons/apple-icon-72x72.png',
      '/src/assets/image/icons/favicon.ico',
      /* ---- View Requisitions ---- */
      '/index.html',
      '/src/views/Requisitions/requisitionForm.html',
      '/src/views/Requisitions/requisitionDetails.html',
      '/src/views/Requisitions/requisitionCompleted.html',
      /* ---- View Produtcs ---- */
      '/src/views/Products/index.html',
      '/src/views/Products/productForm.html',
      /* ---- View Ingredients ---- */
      '/src/views/Ingredients/index.html',
      '/src/views/Ingredients/ingredientsForm.html',
      /* ---- View Clients ---- */
      '/src/views/Clients/index.html',
      '/src/views/Clients/formClients.html',
      '/src/views/Clients/detailsClients.html'
    ]);
  });
});

// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});