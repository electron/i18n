---
title: Mac App Store i Windows Auto Updater na Electron
author: jlord
date: '2015-11-05'
---

Ostatnio Electron dodał dwie ekscytujące funkcje: kompilację kompatybilną ze sklepem Mac App Store i wbudowaną automatyczną aktualizację Windows.

---

## Obsługa Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Od `v0.34.0` każda wersja Electron zawiera kompilację kompatybilną z Mac App Store. Wcześniej aplikacja zbudowana na Electronie nie byłaby zgodna z wymogami Apple dla Mac App Store. Większość z tych wymogów wiąże się z korzystaniem z prywatnych API. Aby piaskownica Electron spełniała wymogi, należy usunąć dwa moduły:

- `zgłaszający awarii`
- `auto-aktualizacja`

Ponadto niektóre zachowania uległy zmianie w odniesieniu do wykrywania zmian DNS, przechwytywania wideo i funkcji dostępności. Możesz przeczytać więcej o zmianach i [przesłać aplikację do sklepu aplikacji Mac](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) w dokumentacji. Dystrybucje można znaleźć na [stronie wydań Electrona](https://github.com/electron/electron/releases), poprzedzonej `mas-`.

Powiązane żądania Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Auto aktualizacja Windows

W Electron `v0.34.1` moduł `auto-updater` został ulepszony, aby pracować z [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Oznacza to, że Electron pływa z łatwymi sposobami na automatyczną aktualizację aplikacji w systemie OS X i Windows. Więcej informacji na temat [konfiguracji aplikacji do automatycznej aktualizacji w systemie Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) można znaleźć w dokumentacji.

Powiązane Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

