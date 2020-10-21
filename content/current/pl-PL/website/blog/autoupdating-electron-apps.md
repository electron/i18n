---
title: Łatwiejsza Autoaktualizacja dla aplikacji Open-Source
author: zeke
date: '2018-05-01'
---

Dzisiaj publikujemy darmowe, open source, hosted [aktualizuje usługę sieciową](https://github.com/electron/update.electronjs.org) i kompanem [npm pakiet](https://github.com/electron/update-electron-app) aby umożliwić automatyczne aktualizacje dla aplikacji Electron open-source. Jest to krok w kierunku wzmocnienia uprawnień twórców aplikacji do myślenia mniej o wdrożeniu, a więcej o rozwijaniu wysokiej jakości doświadczeń dla ich użytkowników.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Zrzut ekranu aktualizacji">
    <figcaption>Nowy moduł aktualizacji w akcji</figcaption>
  </a>
</figure>

## Ułatwienie życia

Electron posiada [auto-Updater](https://electronjs.org/docs/tutorial/updates) API dający aplikacjom możliwość zużycia metadanych ze zdalnego punktu końcowego w celu sprawdzenia aktualizacji, pobierz w tle i zainstaluj je automatycznie.

Włączenie tych aktualizacji było kłopotliwym krokiem w procesie wdrażania dla wielu programistów aplikacji Electron, ponieważ wymaga wdrożenia serwera sieciowego i obsługi metadanych historii aplikacji.

Dziś ogłaszamy nowe rozwiązanie dla automatycznych aktualizacji aplikacji. Jeśli twoja aplikacja Electron jest w publicznym repozytorium GitHub i używasz wydań GitHub do publikowania kompilacji, możesz użyć tej usługi do dostarczania ciągłych aktualizacji aplikacji użytkownikom.

## Używanie nowego modułu

Aby zminimalizować konfigurację z Twojej strony, stworzyliśmy [aktualizuj elektron-app](https://github.com/electron/update-electron-app), moduł npm integrujący się z nową [update.electronjs.org](https://github.com/electron/update.electronjs.org) usługę sieciową.

Zainstaluj moduł:

```sh
npm install update-electron-app
```

Zadzwoń z dowolnego miejsca w [głównym procesie twojej aplikacji](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

To wszystko! Moduł będzie sprawdzał dostępność aktualizacji przy starcie aplikacji, a następnie co dziesięć minut. Gdy zostanie znaleziona aktualizacja, zostanie ona pobrana automatycznie w tle, a okno dialogowe zostanie wyświetlone po przygotowaniu aktualizacji.

## Migracja istniejących aplikacji

Aplikacje używające API autoUpdatera Electron mogą również korzystać z tej usługi. Aby to zrobić, możesz [dostosować `update-electron-app`](https://github.com/electron/update-electron-app) moduł lub [zintegrować bezpośrednio z update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternatywne

Jeśli używasz [electron-builder](https://github.com/electron-userland/electron-builder) do pakietu aplikacji, możesz użyć wbudowanego aktualizatora. Więcej szczegółów znajdziesz w [electron.build/auto-update](https://www.electron.build/auto-update).

Jeśli aplikacja jest prywatna, może być konieczne uruchomienie własnego serwera aktualizacji. Jest do tego wiele narzędzi open-source, w tym Zeit [Hazel](https://github.com/zeit/hazel) i Atlassian [Nucleus](https://github.com/atlassian/nucleus). Zobacz [Wdrożenie samouczka na serwerze aktualizacji](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) po więcej informacji.

## Dziękujemy

Dzięki [Julian Gruber](http://juliangruber.com/) za pomoc w projektowaniu i budowaniu tej prostej i skalowalnej usługi sieciowej. Podziękowania dla ludzi w [Zeit](https://zeit.co) za ich usługę open source [Hazel](https://github.com/zeit/hazel) , z której wyciągnęliśmy inspirację do projektu. Dzięki [Samuel Attard](https://www.samuelattard.com/) za recenzji kodu. Dzięki społeczności Electron za pomoc w przetestowaniu tej usługi .

🌲 Oto nieustannie zielona przyszłość dla aplikacji Electron!