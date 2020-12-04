---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Jest to pierwsze stanowisko serii wyjaśnień wewnętrznych Electrona. Ten post wprowadza jak pętla zdarzeń Node jest zintegrowana z Chromium w Electron.

---

Było wiele prób użycia Node do programowania GUI, jak [node-gui](https://github.com/zcbenz/node-gui) dla powiązań GTK+ i [node-qt](https://github.com/arturadib/node-qt) dla bindingów QT. Ale żaden z nich nie działa w produkcji, ponieważ zestawy narzędzi GUI mają własne pętle , podczas gdy węzeł używa libuv dla własnej pętli zdarzeń, i główny wątek może uruchomić tylko jedną pętlę w tym samym czasie. Więc powszechną sztuczką do uruchomienia pętli wiadomości GUI w Node jest pompowanie pętli wiadomości w minutniku z bardzo małym przedziałem, który powoli reagowanie interfejsu GUI i zajmuje wiele zasobów procesora.

During the development of Electron we met the same problem, though in a reversed way: we had to integrate Node's event loop into Chromium's message loop.

## Główny proces i proces renderowania

Zanim przejdziemy do szczegółów integracji pętli wiadomości, wytłumaczę wieloprocesową architekturę Chromium.

W Electronie istnieją dwa rodzaje procesów: proces główny i proces renderowania (jest to w rzeczywistości niezwykle uproszczone, Aby uzyskać pełny widok zobacz [Wieloprocesową architekturę](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Główny proces jest odpowiedzialny za interfejs graficzny działa jak tworzenie okien podczas gdy proces renderowania tylko deale uruchomione i renderowane strony internetowe.

Electron pozwala za pomocą JavaScript kontrolować zarówno proces główny, jak i proces renderowania , co oznacza, że musimy zintegrować węzeł z obydwoma procesami.

## Zastępowanie pętli wiadomości Chromium na libuv

Moja pierwsza próba polegała na reimplementacji pętli wiadomości Chromium z libuv.

Było to łatwe w procesie renderowania, ponieważ jego pętla wiadomości słuchała tylko deskryptorów plików i timerów, i ja potrzebowałem tylko zaimplementować interfejs z libuv.

Było to jednak znacznie trudniejsze w przypadku głównego procesu. Każda platforma ma własny rodzaj pętli wiadomości GUI. macOS Chromium używa `NSRunLoop`, natomiast Linux używa glibu. Próbowałem rozpakować podstawowych deskryptorów plików z natywnych pętli komunikatów GUI, a następnie nakarmił ich do libuva w celu iteracji, ale nadal spotkałem skrajne przypadki, które nie zadziałałały.

W końcu dodałem minutnik do ankiety w pętli wiadomości GUI w małej przerwie. w wyniku tego proces wykonywał ciągłe użycie procesora, a niektóre operacje miały duże opóźnienia.

## Pętla zdarzeń węzła ankietowego w osobnym wątku

W miarę dojrzewania libuva możliwe było przyjęcie innego podejścia.

Koncepcja backend fd została wprowadzona do libuv, który jest deskryptorem pliku (lub uchwytą), który libuv ankiet dla jego pętli zdarzeń. Więc poprzez pobranie zaplecza jest możliwe otrzymanie powiadomienia o nowym wydarzeniu w libuv.

Tak więc w Electron utworzyłem osobny wątek do sprawdzania zaplecza fd, i ponieważ używałem systemowych wywołań do ankietowania zamiast libuv API, był to wątek bezpieczny. And whenever there was a new event in libuv's event loop, a message would be posted to Chromium's message loop, and the events of libuv would then be processed in the main thread.

W ten sposób uniknąłem patchowania chromu i węzła, a ten sam kod został użyty w zarówno procesach głównych, jak i renderowanych.

## Kod

Możesz znaleźć wzmiankę o integracji pętli wiadomości w plikach `node_bindings` pod [`electron/atom/common/`](https://github.com/electron/electron/tree/master/atom/common). Można go łatwo użyć ponownie dla projektów, które chcą zintegrować Node.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*
