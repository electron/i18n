---
title: Electron 10.0.0
author:
  - VerteDinde
  - sofianguy
date: '2020-08-25'
---

Electron 10.0.0 został wydany! Zawiera ulepszenia do Chromium `85`, V8 `8,5`i Node.js `12.16`. Dodaliśmy kilka nowych integracji i ulepszeń API. Przeczytaj poniżej, aby uzyskać więcej informacji!

---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 10.0.0! Możesz go zainstalować za pomocą npm za pomocą `npm install electron@latest` lub pobrać z naszej [wersji](https://electronjs.org/releases/stable). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami.

W wydaniu Electron 10 dokonaliśmy również zmiany w naszych notatkach o wydaniu. Aby łatwiej powiedzieć co jest nowe w Electron 10 i co mogło się zmienić między Electron 10 a poprzednimi wydaniami, umieściliśmy również zmiany, które zostały wprowadzone do Electron 10, ale poparte poprzednimi wydaniami. Mamy nadzieję, że ułatwi to aplikacjom znalezienie nowych funkcji i poprawek błędów podczas aktualizacji Electron.

Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

## Znaczące zmiany

### Zmiany stosu

* Chromium `85.0.4183.84`
    * [Nowość w Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Nowość w Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Węzeł 12.16.3 wpis na blogu](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [Wpis na blogu V8 8.4](https://v8.dev/blog/v8-release-84)
    * [Wpis na blogu V8 8.5](https://v8.dev/blog/v8-release-85)

### Podświetl funkcje

* Dodano metodę `contents.getBackgroundThrottling()` i `contents.backgroundThrottling`. [#21036]
* Wystawiono moduł `desktopCapturer` w głównym procesie. [#23548](https://github.com/electron/electron/pull/23548)
* Może teraz sprawdzić, czy dana sesja `` jest trwała wywołując `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Rozwiąż problemy z siecią, które uniemożliwiły połączenie połączeń RTC ze względu na zmiany adresu IP sieci i ICE. (wydanie bromu 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Zobacz [notatki o wydaniu 10.0.0](https://github.com/electron/electron/releases/tag/v10.0.0) , aby uzyskać pełną listę nowych funkcji i zmian.

## Breaking Changes

* Zmieniono domyślną wartość `enableRemoteModule` na `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * To jest część naszych planów deprekacji `zdalnego` modułu i przeniesienia go do użytkownika (userland). Możesz przeczytać i śledzić [ten problem](https://github.com/electron/electron/issues/21408) , który szczegółowo opisuje nasze przyczyny i zawiera proponowaną oś czasu dla deprekacji.
* Zmieniono domyślną wartość `app.allowRendererProcessReuse` na `true`. [#22336](https://github.com/electron/electron/pull/22336) (Także w [Electron 9](https://github.com/electron/electron/pull/22401))
   * Zapobiegnie to wczytywaniu nieuwzględnionych kontekstowo modułów natywnych w procesach renderowania.
   * Możesz przeczytać i śledzić [ten problem](https://github.com/electron/electron/issues/18397) , który szczegółowo opisuje nasze przyczyny i zawiera proponowaną oś czasu dla deprekacji.
* Naprawiono położenie przycisków okna na macOS, gdy ustawienia regionalne systemu operacyjnego są ustawione na język RTL (np. arabski lub hebrajski). Aplikacje okien bez ramek mogą wymagać uwzględnienia tej zmiany podczas stylowania ich okna. [#22016](https://github.com/electron/electron/pull/22016)

Więcej informacji o tych i przyszłych zmianach można znaleźć na stronie [Zaplanowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Zmiany API

* Sesja: Można teraz sprawdzić, czy dana sesja `` jest trwała wywołując `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Zawartość: Dodano metodę `contents.getBackgroundThrottling()` i `contents.backgroundThrottling` właściwości. [#21036](https://github.com/electron/electron/pull/21036)

### Przestarzałe API

Następujące API są teraz przestarzałe lub usunięte:

* Usunięto przestarzałą właściwość `currentlyLoggingPath` `netLog`. Dodatkowo, `netLog.stopLogging` nie zwraca już ścieżki do zapisanego logu. [#22732](https://github.com/electron/electron/pull/22732)
* Przestarzałe nieskompresowane przesyłanie awarii w `raportów awarii`. [#23598](https://github.com/electron/electron/pull/23598)

## Koniec wsparcia dla 7.x.y

Electron 7.x.y osiągnął koniec wsparcia zgodnie z [polityką wsparcia projektu](https://electronjs.org/docs/tutorial/support#supported-versions). Deweloperzy i aplikacje zachęca się do aktualizacji do nowszej wersji Electron.

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. The [tentative 11.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 11.0 development life cycle. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Ciągła praca dla `zdalnego` modułu (w Electron 11)
Rozpoczęliśmy pracę nad usunięciem modułu zdalnego w [Electron 9](https://www.electronjs.org/blog/electron-9-0) i kontynuujemy plany usunięcia `zdalnego` modułu. W Electron 11 planujemy kontynuować pracę refaktora, aby wdrożyć [WeakRef](https://v8.dev/features/weak-references) , tak jak to zrobiliśmy w Electron 10. Przeczytaj i przejdź do [tego problemu](https://github.com/electron/electron/issues/21408) , aby uzyskać pełne plany i szczegóły deprekacji.

### Ostateczny krok dla wymagania, aby moduły węzła natywnego były modułami kontekstowymi lub N-API (w Electron 11)
Począwszy od Electron 6, zrobimy grunt wymagając [natywnych modułów węzła](https://nodejs.org/api/addons.html) załadowanych w procesie renderowania, aby były [N-API](https://nodejs.org/api/n-api.html) lub [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Egzekwowanie tej zmiany pozwala na większe bezpieczeństwo, szybsze wyniki i zmniejszenie obciążenia pracą konserwacyjną. Ostatnim etapem tego planu jest usunięcie możliwości wyłączenia procesu renderowania w Electron 11. Przeczytaj [ten problem](https://github.com/electron/electron/issues/18397) w celu uzyskania pełnych szczegółów, w tym zaproponowanej osi czasu.
