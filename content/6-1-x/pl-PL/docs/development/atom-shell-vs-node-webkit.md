# Techniczne różnice pomiędzy electronem a NW.js (dawniej node-webkit)

__Uwaga: Electron wcześniej nazywał się Atom Shell.__

Jak NW.js Electron zapewnia platformę do pisania desktopowych aplikacji z użyciem technologii JavaScript, HTML oraz integrację z Node, aby udzielić dostępu do niskiego poziomu systemu od strony sieci web.

Ale istnieją również zasadnicze różnice między tymi dwoma projektami, które sprawiają, że Electron jest całkowicie oddzielnym produktem od NW.js:

__1. Punkt wejściowy aplikacji__

W NW.js punkt wejścia głównego aplikacji to strona sieci web lub skrypt JS. Określ plik html lub js w pliku `package.json` i jest on otwarty w oknie przeglądarki jako główne okno aplikacji (w przypadku html entrypoint) lub gdy skrypt jest wykonany.

W Electron, głównym punktem jest skrypt JavaScript. Zamiast podawać adres URL bezpośrednio, możesz ręcznie tworzyć okno przeglądarki i ładować pliki HTML przy użyciu interfejsu API. Musisz również nasłuchiwać zdarzeń w oknie aby decydować kiedy zamknąć aplikacje.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Budowanie systemu__

W celu uniknięcia złożoności budowania całego Chromium, Electron używa [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) aby mieć dostęp do Zawartości Chromium Interfejsu API. `libchromiumcontent` jest to pojedyncza współdzielona biblioteka która zawiera moduł Chromium Content oraz wszystkie jego zależności. Użytkownicy nie potrzebują potężnych maszyn, aby zbudować Electron'a.

__3. Integracja node'a__

W przypadku NW.js, integracja Node dla stron internetowych wymaga patchowania Chromium, w celu prawidłowego działania. W Electronie zastosowaliśmy inny sposób integtacji pętli libuv dla każdej platformy, aby zapobiec dodatkowemu patchowaniu Chromium. Zobacz kod [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) jak to się stało.

__4. Multi-kontekst__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Nota: NW.js ma opcjonalne wsparcie dla wielokontekstowości od wersji 0.13.
