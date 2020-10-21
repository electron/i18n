---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Zespół Electron jest podekscytowany, aby ogłosić, że pierwsze stabilne wydanie Electron 3 jest teraz dostępne od [elektronów. rg](https://electronjs.org/) i przez `npm zainstaluj electron@latest`! Jest zagłuszany z ulepszeniami, poprawkami i nowymi funkcjami i nie możemy czekać na to, co z nimi budujesz. Poniżej znajdują się szczegółowe informacje o tym wydaniu i witamy Twoją opinię podczas eksploracji.

---

## Proces Wydania

W miarę jak podjęliśmy się rozwoju `v3.0.`, staraliśmy się bardziej empirycznie zdefiniować kryteria stabilnego wydania poprzez sformalizowanie postępu opinii o postępowych wersjach beta. `v3.0.` nie byłoby możliwe bez naszych [App Feedback Program](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) partnerów, którzy dostarczyli wczesnych testów i informacji zwrotnych podczas cyklu beta. Dzięki Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code i innym członkom programu za ich pracę. Jeśli chcesz wziąć udział w przyszłych betach, napisz do nas pod adresem [info@electronjs.org](mailto:info@electronjs.org).

## Zmiany / Nowe funkcje

Główne uderzenia w kilka ważnych części łańcucha narzędzi Electrona, w tym Chrome `v66.0.3359.181`, Węzeł `v10.2.0`i V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] feat: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] feat: `win.moveTop()` aby przenieść okno z-order do góry
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: TextField and Button API
* [[#13068](https://github.com/electron/electron/pull/13068)] feat: netLog API dla dynamicznej kontroli logowania
* [[#13539](https://github.com/electron/electron/pull/13539)] feat: włącz `widok sieciowy` w renderer sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] feat: `fs.readSync` teraz działa z ogromnymi plikami
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: węzeł `fs` otoczki do stworzenia `fs.realpathSync.native` i `fs.realpath.native` dostępne

## Przerwanie zmian API

* [[#12362](https://github.com/electron/electron/pull/12362)] feat: aktualizacje kontroli pozycji menu
* [[#13050](https://github.com/electron/electron/pull/13050)] refaktor: usunięto udokumentowane przestarzałe API
  * Zobacz [dokumentację](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) po więcej szczegółów
* [[#12477](https://github.com/electron/electron/pull/12477)] refaktor: usunięto `did-get-response-details` i `did-get-redirect-request` zdarzenia
* [[#12655](https://github.com/electron/electron/pull/12655)] feat: domyślnie wyłącza nawigację po przeciąganiu/upuszczeniu
* [[#12993](https://github.com/electron/electron/pull/12993)] feat: węzeł `v4.x` lub większy jest wymagany użyj modułu `elektron` npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)]refakttor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refaktor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] feat: nie używaj JSON aby wysłać wynik `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: domyślnie ignoruj argumenty wiersza poleceń po URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refaktor: zmień nazwę `api::Okno` na `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] feat: Powiększenie wizualne wyłączone domyślnie
* [[#12408](https://github.com/electron/electron/pull/12408)] refaktor: zmień nazwę aplikacji komendy `media-play_pause` na `media-play-pauza`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] feat: wsparcie powiadomień obszaru roboczego
* [[#12496](https://github.com/electron/electron/pull/12496)] feat: `tray.setIgnoreDoubleClickEvents(ignorowanie)` aby zignorować zdarzenia podwójnego kliknięcia w tackę.
* [[#12281](https://github.com/electron/electron/pull/12281)] feat: funkcja myszy do przodu na macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] feat: blokada ekranu / odblokuj wydarzenia

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] feat: dodaj DIP do/z konwersji współrzędnych ekranu

**Nota Bene:** Przełączanie się do starszej wersji Electron po uruchomieniu tej wersji będzie wymagało usunięcia katalogu danych użytkownika, aby uniknąć awarii starszej wersji. Możesz uzyskać katalog danych użytkownika uruchamiając `console.log(app.getPath("userData"))` lub zobacz [docs](https://electronjs.org/docs/api/app#appgetpathname) , aby uzyskać więcej informacji.

## Poprawki błędów

* [[#13397](https://github.com/electron/electron/pull/13397)] naprawa: problem z `fs.statSyncNoException` rzucając wyjątki
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] naprawił: awaria podczas ładowania strony z jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] naprawa: awaria w `net::ClientSocketHandle` destruktor
* [[#14453](https://github.com/electron/electron/pull/14453)] naprawa: poinformuj o zmianie ostrości od razu, a nie o następnym ticku

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] poprawka: problem pozwalający na wybranie pakietów w `<input file="type">` otwórz okno dialogowe plików
* [[#12404](https://github.com/electron/electron/pull/12404)] naprawa: problem blokady głównego procesu podczas korzystania z okna dialogowego async
* [[#12043](https://github.com/electron/electron/pull/12043)] poprawka: menu kontekstowe kliknij przycisk wywołania zwrotnego
* [[#12527](https://github.com/electron/electron/pull/12527)] poprawka : zdarzenie wycieka przy ponownym użyciu elementu paska dotykowego
* [[#12352](https://github.com/electron/electron/pull/12352)] naprawa: haczyk
* [[#12327](https://github.com/electron/electron/pull/12327)] poprawka : regiony nieprzeciągalne
* [[#12809](https://github.com/electron/electron/pull/12809)] poprawka: aby zapobiec aktualizacji menu, gdy jest ona otwarta
* [[#13162](https://github.com/electron/electron/pull/13162)] fix: limit ikon tacki nie pozwala na wartości ujemne
* [[#13085](https://github.com/electron/electron/pull/13085)] poprawka: skrót tytułu nie odwraca po podświetleniu
* [[#12196](https://github.com/electron/electron/pull/12196)] wersja Mac: kompilacja kiedy `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] naprawi: dodatkowe problemy w oknach bez ramek z wilbrancy
* [[#13326](https://github.com/electron/electron/pull/13326)] naprawa: aby ustawić protokół mac na brak po wywołaniu `app.removeAsfaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] poprawka: nieprawidłowe użycie prywatnych API w budowie MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] naprawa: `tray.setContextMenu` awaria
* [[#14205](https://github.com/electron/electron/pull/14205)] poprawka: naciśnięcie ewakuacji na oknie dialogowym zamyka ją, nawet jeśli ustawiono `domyślny Id`

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] poprawka: `BrowserWindow.focus()` dla okien offscreerowych

## Inne uwagi

* Przeglądarka PDF obecnie nie działa, ale pracuje nad nim i wkrótce będzie funkcjonować ponownie
* `Textfield` i `Przycisk` API są eksperymentalne i dlatego są wyłączone domyślnie
  * Mogą być włączone z flagą kompilacji `enable_view_api`

# Co dalej

Zespół Electron w dalszym ciągu pracuje nad określeniem naszych procesów na rzecz szybszych i bardziej płynnych ulepszeń, ponieważ w ostatecznym rozrachunku staramy się utrzymać parytet z kadencjami rozwoju chromu, Węgiel i V8.
