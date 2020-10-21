---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 5.0.0! Możesz zainstalować go za pomocą npm za pomocą `npm install electron@latest` lub pobrać łańcuch z [naszej strony wydań](https://github.com/electron/electron/releases/tag/v5.0.0). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami. Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

---

## Co nowego?

Duża część funkcjonalności Electronu jest zapewniona przez główne komponenty Chromium, Node.js i V8. Electron na bieżąco aktualizuje te projekty, aby zapewnić naszym użytkownikom nowe funkcje JavaScript, ulepszenia wydajności i poprawki bezpieczeństwa. Każdy z tych pakietów ma duży skok wersji w Electron 5:

- Chrom `73.0.3683.119`
  - [Nowe w 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nowe w 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nowy w 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nowe w 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Węzeł 12 wpisu](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Nowe funkcje JS](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 obejmuje również ulepszenia API specyficzne dla elektronów. Podsumowanie głównych zmian znajduje się poniżej; dla pełnej listy zmian sprawdź [Notatki wydania Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 kontynuuje inicjatywę [Promisification](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) w celu konwersji API Electron do korzystania z Promises. Te API zostały przekonwertowane dla Electron 5:
* `app.getFileIcon`
* `Kategorie zawartości`
* `Rozpoczęcie nagrywania`
* `Zapis zawartości Tracing.stop`
* `debugger.sendCommand`
* API ciasteczek
* `Otwarty Zewnętrzny`
* `Plik webContents.load:`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `win.capturePage`

### Dostęp do kolorów systemowych dla macOS

Te funkcje zostały zmienione lub dodane do `SystemPreferences` aby uzyskać dostęp do kolorów systemów macOS:
* `SystemPreferences.getAccentColor`
* `SystemPreferences.getColor`
* `SystemPreferencje.getSystemColor`

### Informacje o pamięci procesu

Funkcja `process.getProcessMemoryInfo` została dodana, aby uzyskać statystyki wykorzystania pamięci o bieżącym procesie.

### Dodatkowe filtrowanie zdalnego interfejsu API

Aby zwiększyć bezpieczeństwo `zdalnego` API, dodano nowe zdalne zdarzenia tak, że `zdalne. etBuiltin`, `zdalny. etCurrentWindow`, `remote.getCurrentWebContents` i `<webview>.getWebContents` może być [filtrowane](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Wiele przeglądarek w oknie przeglądarki

BrowserWindow obsługuje teraz zarządzanie wieloma widokami przeglądarki w tym samym oknie przeglądarki.

## Breaking Changes

### Domyślne dla spakowanych aplikacji

Aplikacje spakowane zachowują się teraz tak samo jak domyślna aplikacja: zostanie utworzone domyślne menu aplikacji, chyba że aplikacja ma jedno i zdarzenie `okno zamknięte` zostanie automatycznie obsługiwane, chyba że aplikacja obsługuje to wydarzenie.

### Mieszanka piaskowa

Tryb mieszany sandbox jest teraz domyślnie włączony. Renderer uruchomiony z `sandbox: true` będzie teraz w rzeczywistości piaskownicą, gdzie wcześniej byłyby piaskowane, tylko jeśli włączony jest również tryb mieszanego piaskowca.

### Poprawa bezpieczeństwa
Domyślne wartości `nodeIntegration` i `webtag` są teraz `false` , aby poprawić bezpieczeństwo.

### Sprawdzacz pisowni jest teraz asynchroniczny

API SpellCheck zostało zmienione, aby dostarczyć [asynchronicznych wyników](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Deprekacje

Następujące API są nowo przestarzałe w Electron 5.0.0 i planowane do usunięcia w wersji 6.0.0:

### Pliki binarne Mksnapshot dla ramion i arm64
Natywne binary mksnapshot dla ramion i arm64 są przestarzałe i zostaną usunięte w 6. .0. Zrzuty stanu mogą być tworzone dla ramion i arm64 przy użyciu binarów x64.

### API wątku usługowego w zawartości stron internetowych
Przestarzałe API Wątku Usługowego na WebContents w ramach przygotowań do ich usunięcia.
* `webContents.hasServiceWorker`
* `webContents.unregisterServiceWorker`

### Automatyczne moduły z piaskowanymi treściami
W celu poprawy bezpieczeństwa, następujące moduły są przestarzałe do użytku bezpośrednio przez `wymagają` i zamiast tego będą musiały być zawarte przez `pilota. załóż` w piaskownicach treści:
* `Ekran`
* `child_process`
* `fs`
* `os`
* `ścieżka`

## webFrame Isolated World APIs
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` zostały przestarzałe na korzyść `webFrame.setIsolatedWorldInfo`.

### Mieszanka piaskowa
`enableMixedSandbox` i `--enable-mixed-sandbox` przełącznik wiersza poleceń nadal istnieje dla kompatybilności, ale są przestarzałe i nie mają żadnego efektu.

## Koniec wsparcia dla 2.0.x

Na nasze [obsługiwane wersje](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x już się skończył.

## Program Feedbacku Aplikacji

Kontynuujemy korzystanie z naszego [programu Informacji zwrotnej o aplikacjach](https://electronjs.org/blog/app-feedback-program) do testowania. Projekty, które uczestniczą w tym programie testują Electrona betas na swoich aplikacjach; i w zamian za nowe błędy, które znajdą są priorytetowe dla stabilnego wydania. Jeśli chcesz wziąć udział lub dowiedzieć się więcej, [sprawdź nasz wpis na blogu dotyczący programu](https://electronjs.org/blog/app-feedback-program).

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. [wstępny harmonogram 6.0.0](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) mapuje daty kluczy w cyklu rozwoju Electron 6. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
