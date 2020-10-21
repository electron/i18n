---
title: Co nowego w Electronie
author: jlord
date: '2015-10-15'
---

Niedawno pojawiły się interesujące aktualizacje i rozmowy na temat Electrona, oto pojedynek.

---

## Źródło

Electron jest teraz aktualny z Chrome 45 od `v0.32.0`. Inne aktualizacje zawierają...

### Lepsza dokumentacja

![nowe dokumenty](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Zrestrukturyzowaliśmy i standaryzowaliśmy dokumentację, aby lepiej wyglądać i lepiej czytać. Istnieją również tłumaczenia dokumentacji, na przykład japońskiego i koreańskiego.

Powiązane żądania ściągnięcia: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557) [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725) [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649)

### Node.js 4.1.0

Od `v0.33.0` Elektroniczne statki z Node.js 4.1.0.

Powiązane żądanie pull: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### węzeł-pregip

Moduły oparte na `node-pregyp` mogą być teraz skompilowane z Electronem podczas budowy ze źródła.

Powiązane żądanie ściągnięcia: [mapbox/node-pregyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Wsparcie ARM

Electron dostarcza teraz wersje dla Linux na ARMv7. Działa na popularnych platformach, takich jak Chromebook i Raspberry Pi 2.

Powiązane problemy: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366)

### Okno bez ramek w stylu Yosemite

![okno bez ramki](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Plaster [@jaanus](https://github.com/jaanus) został połączony, podobnie jak inne wbudowane aplikacje OS X, pozwala na tworzenie okien bez ramek z włączonymi światłami systemowymi na OS X Yosemite i później.

Powiązane pull request: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Obsługa Google Letnie Kodowania Drukowania

Po lecie Kodowania Google połączyliśmy patchy przez [@hokein](https://github.com/hokein) , aby ulepszyć obsługę druku, i dodaj możliwość wydrukowania strony do plików PDF.

Powiązane problemy: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532) [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669) [electron/electron#1835](https://github.com/electron/electron/pull/1835)

## Atom

Atom został zaktualizowany do Electron `v0.30.6` uruchamia Chrome 44. Aktualizacja do `v0.33.0` trwa na [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Rozmowy

GitHubber [Amy Palamountain](https://github.com/ammeep) wygłosił wspaniałe wprowadzenie Electronowi w rozmowie pod adresem [Nordic.js](https://nordicjs2015.confetti.events). Stworzyła również bibliotekę [electron-accelerator](https://github.com/ammeep/electron-accelerator).

#### Tworzenie natywnych aplikacji z Electronem przez Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Ben Ogle](https://github.com/benogle), również w zespole Atom rozmowa Electrona w [YAPC Asia](http://yapcasia.org/2015/):

#### Tworzenie aplikacji desktopowych z Web Technologies przez Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Członek zespołu Atom [Kevin Sawicki](https://github.com/kevinsawicki) i inni dali rozmowy na temat Electrona na spotkaniu [Zatoka](http://www.meetup.com/Bay-Area-Electron-User-Group/) z grupą użytkowników. [filmy](http://www.wagonhq.com/blog/electron-meetup) zostały opublikowane, tutaj są pary:

#### Historia Electrona Kevina Sawickiego

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Spraw, aby aplikacja internetowa czuje się natywna przez Ben Gotow

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

