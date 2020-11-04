---
title: Korekta wrażliwości SQLite
author: ckerr
date: '2018-12-18'
---

Odkryto podatność zdalnego wykonania kodu, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," wpływający na oprogramowanie oparte na SQLite lub Chromium, w tym na wszystkie wersje Electrona.

---

## Niniejsze rozporządzenie stosuje się od dnia 1 stycznia 2018 r.

Aplikacje Electron używające Web SQL są uderzone.


## Łagodzenie skutków

Dotknięte aplikacje powinny przestać używać Web SQL lub uaktualnić do zmodyfikowanej wersji Electron.

Opublikowaliśmy nowe wersje Electrona, które zawierają poprawki dla tej podatności:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Nie ma doniesień na ten temat w środowisku naturalnym; wzywa się jednak do łagodzenia skutków zastosowań.

## Inne informacje

Ta wrażliwość została odkryta przez zespół Tencent Blade, który opublikował [wpis na blogu, który omawia wrażliwość](https://blade.tencent.com/magellan/index_en.html).

Aby dowiedzieć się więcej o najlepszych praktykach, aby zachować bezpieczeństwo aplikacji Electron, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Jeśli chcesz zgłosić lukę w Electron, napisz na adres e-mail@electronjs.org.
