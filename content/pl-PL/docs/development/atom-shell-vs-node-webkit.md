# Techniczne różnice pomiędzy electronem a NW.js (dawniej node-webkit)

**Uwaga: Electron wcześniej nazywał się Atom Shell.**

Jak NW.js Electron zapewnia platformę do pisania desktopowych aplikacji z użyciem technologii JavaScript, HTML oraz integrację z Node, aby udzielić dostępu do niskiego poziomu systemu od strony sieci web.

Ale istnieją również zasadnicze różnice między tymi dwoma projektami, które sprawiają, że Electron jest całkowicie oddzielnym produktem od NW.js:

**1. Punkt wejściowy aplikacji**

W NW.js punkt wejścia głównego aplikacji to strona sieci web lub skrypt JS. Określ plik html lub js w pliku `package.json` i jest on otwarty w oknie przeglądarki jako główne okno aplikacji (w przypadku html entrypoint) lub gdy skrypt jest wykonany.

W Electron, głównym punktem jest skrypt JavaScript. Zamiast podawać adres URL bezpośrednio, możesz ręcznie tworzyć okno przeglądarki i ładować pliki HTML przy użyciu interfejsu API. Musisz również nasłuchiwać zdarzeń w oknie aby decydować kiedy zamknąć aplikacje.

Electron działa bardziej jak w czasie wykonywania Node.js Interfejsy API Electron'a są na niższym poziomie, więc możesz używać go do testowania zamiast [PhantomJS](http://phantomjs.org/).

**2. Budowanie systemu**

W celu uniknięcia złożoności budowania całego Chromium, Electron używa [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) aby mieć dostęp do Zawartości Chromium Interfejsu API. `libchromiumcontent` jest to pojedyncza współdzielona biblioteka która zawiera moduł Chromium Content oraz wszystkie jego zależności. Użytkownicy nie potrzebują potężnych maszyn, aby zbudować Electron'a.

**3. Integracja node'a**

W przypadku NW.js, integracja Node dla stron internetowych wymaga patchowania Chromium, w celu prawidłowego działania. W Electronie zastosowaliśmy inny sposób integtacji pętli libuv dla każdej platformy, aby zapobiec dodatkowemu patchowaniu Chromium. Zobacz kod [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) jak to się stało.

**4. Multi-kontekst**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.