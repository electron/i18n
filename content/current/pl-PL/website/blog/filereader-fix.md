---
title: Korekta wrażliwości na pliki Chromium
author: dźwięk marshallofsound
date: '2019-03-07'
---

Odkryto podatność na zagrożenia w Chrome, która wpływa na wszystkie oprogramowanie oparte na Chromie, w tym Electron.

Ta podatność została przypisana `CVE-2019-5786`.  Więcej na ten temat znajdziesz w [blogu Chrome](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Pamiętaj, że Chrome ma raporty o tej wrażliwości używanej w środowisku naturalnym, dlatego zdecydowanie zaleca się uaktualnienie Electron ASAP.

---

## Niniejsze rozporządzenie stosuje się od dnia 1 stycznia 2018 r.

Ma to wpływ na każdą aplikację Electron, która może uruchamiać niezaufaną obsługę JavaScriptu przez osoby trzecie.

## Łagodzenie skutków

Dotknięte aplikacje powinny uaktualnić się do zaktualizowanej wersji Electron.

Opublikowaliśmy nowe wersje Electrona, które zawierają poprawki dla tej podatności:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Najnowsza wartość beta Electron 5 śledziła Chromium 73 i dlatego jest już modyfikowana:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Inne informacje

Ta wrażliwość została odkryta przez Clement Lecigne z Google Analysis Group i zgłoszona do zespołu Chrome.  Wpis na blogu Chrome można znaleźć [tutaj](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Aby dowiedzieć się więcej o najlepszych praktykach, aby zachować bezpieczeństwo aplikacji Electron, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Jeśli chcesz zgłosić lukę w Electron, napisz na adres e-mail@electronjs.org.
