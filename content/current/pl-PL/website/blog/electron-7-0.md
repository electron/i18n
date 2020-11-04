---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 został wydany! Pozycja 1A005 nie obejmuje kontrolą „oprogramowania” specjalnie zaprojektowanego lub zmodyfikowanego do celów wojskowych. Dodaliśmy okno w wersji Arm 64, szybsze metody IPC, nowy `nativeTheme` API i wiele więcej!

---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 7.0.0! Możesz go zainstalować za pomocą npm za pomocą `npm install electron@latest` lub pobrać z naszej [wersji](https://electronjs.org/releases/stable). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami. Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

## Istotne zmiany
 * Ulepszenia Stosów:

   | Stos    | Wersja w Electron 6 | Wersja w Electron 7 | Co nowego                                                                                                                                                                                                                                                                 |
   |:------- |:------------------- |:------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chrom   | 76.0.3809.146       | **78.0.3905.1**     | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                 | **7.8**             | [7,7](https://v8.dev/blog/v8-release-77), [7,8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0              | **12.8.1**          | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Dodano Windows w wersji Arm (64 bit). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Dodano `ipcRenderer.invoke()` i `ipcMain.handle()` dla asynchronicznego żądania / odpowiedzi w stylu IPC. Są one zdecydowanie zalecane przez moduł `zdalne`. Zobacz ten "[Moduł "zdalny" Electrona uważany za szkodliwy](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)wpis "aby uzyskać więcej informacji. [#18449](https://github.com/electron/electron/pull/18449)
 * Dodano `nativeTheme` API, aby przeczytać i odpowiedzieć na zmiany w szablonie systemu operacyjnego i schemacie kolorów. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Przełączono do nowego generatora definicji TypeScript [](https://github.com/electron/docs-parser). Wynikające definicje są bardziej precyzyjne; więc jeśli kompilacja TypeScript nie powiedzie się, jest to prawdopodobna przyczyna. [#18103](https://github.com/electron/electron/pull/18103)

Zobacz [notatki o wydaniu 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) dla dłuższej listy zmian.

## Breaking Changes

Więcej informacji o tych i przyszłych zmianach można znaleźć na stronie [Zaplanowane zmiany](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)

 * Usunięto przestarzałe API:
     * Wersje wywołań zwrotnych funkcji, które teraz używają Promiss. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` nie pozwala już na filtrowanie wyczyszczonych wpisów pamięci podręcznej. [#17970](https://github.com/electron/electron/pull/17970)
 * Natywne interfejsy macOS (menu, okna dialogowe itp.) pasują teraz automatycznie do ustawień ciemnego trybu na komputerze użytkownika. [#19226](https://github.com/electron/electron/pull/19226)
 * Zaktualizowano moduł `electron` aby użyć `@electron/get`.  Minimalna obsługiwana wersja węzła to teraz Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Plik `electron.asar` już nie istnieje. Należy zaktualizować wszelkie skrypty pakowania, które zależą od ich istnienia. [#18577](https://github.com/electron/electron/pull/18577)

## Koniec wsparcia dla 4.x.y

Electron 4.x.y osiągnął koniec wsparcia w ramach [polityki wsparcia](https://electronjs.org/docs/tutorial/support#supported-versions). Deweloperzy i aplikacje zachęca się do aktualizacji do nowszej wersji Electron.

## Program Feedbacku Aplikacji

Kontynuujemy korzystanie z naszego [programu Informacji zwrotnej o aplikacjach](https://electronjs.org/blog/app-feedback-program) do testowania. Projekty, które uczestniczą w tym programie testowym Electron beta na ich aplikacjach; i w zamian za nowe błędy, które znajdą są priorytetowe dla stabilnego wydania. Jeśli chcesz wziąć udział lub dowiedzieć się więcej, [sprawdź nasz wpis na blogu na temat programu](https://electronjs.org/blog/app-feedback-program).

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. [wstępny harmonogram 8.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje daty kluczy w cyklu rozwoju Electron 8. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
