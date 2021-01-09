---
title: Użytkownicy Electron
author: zeke
date: '2016-12-20'
---

Dodaliśmy nową sekcję [użytkownika](https://electronjs.org/userland) do strony Electron, aby pomóc użytkownikom odkryć ludzi, pakiety i aplikacje, które tworzą nasz kwitnący ekosystemy open source.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Pochodzenie Użytkownika

Użytkownicy to miejsca, w których ludzie społeczności oprogramowania łączą się, aby dzielić się narzędziami i pomysłami. Określenie pochodzi ze społeczności Unix, gdzie odniósł się do dowolnego programu, który działa poza jądrem, ale dzisiaj oznacza coś więcej. Kiedy osoby w dzisiejszej społeczności Javascript odnoszą się do użytkownika, zazwyczaj mówią o rejestrze pakietów [npm](http://npm.im). W tym miejscu odbywa się większość eksperymentów i innowacji, podczas gdy węzeł i język JavaScript (taki jak kernel Unix) zachowują stosunkowo mały i stabilny zestaw podstawowych funkcji.

## Node i Electron

Podobnie jak Node, Electron ma mały zestaw podstawowych API. Zapewniają one podstawowych funkcji potrzebnych do rozwoju wieloplatformowych aplikacji stacjonarnych. Ta filozofia designu pozwala Electron'owi pozostać wszechstronnym narzędziem unikając zarazem nadmiernej normatywności odnośnie sposobu jego użycia.

Użytkownik jest odpowiednikiem "rdzenia", umożliwiając użytkownikom tworzenie i udostępnianie narzędzi, które rozszerzają funkcjonalność Electrona.

## Zbieranie danych

Aby lepiej zrozumieć tendencje w naszym ekosystemie, przeanalizowaliśmy metadane z 15, 00 publicznych repozytoriów GitHub , które zależą od `elektron` lub `elektron-wstępnie zbudowanych`

Użyliśmy [GitHub API](https://developer.github.com/v3/), [bibliotek. o API](https://libraries.io/api), i rejestr npm, aby zebrać informacje o zależnościach, zależności rozwojowe, zależności, autorzy pakietów, autorów repozytoriów, liczba pobierania, liczba forków, liczba stargazer itp.

Następnie wykorzystaliśmy te dane do wygenerowania następujących sprawozdań:

- [Zależności rozwoju aplikacji](https://electronjs.org/userland/dev_dependencies): Pakiety najczęściej wymieniane jako `devDeZależności` w aplikacjach Electron.
- [Współtwórcy GitHub](https://electronjs.org/userland/github_contributors): użytkownicy GitHub, którzy przyczynili się do licznych repozytoriów GitHub związanych z Electronem.
- [Zależności pakietów](https://electronjs.org/userland/package_dependencies): pakiety npm związane z elektronami, które są często uzależnione od innych pakietów npm.
- [Aplikacje oznaczone gwiazdką](https://electronjs.org/userland/starred_apps): Aplikacje Electron (które nie są pakietami npm) z licznymi stargazerami.
- [Większość pobranych pakietów](https://electronjs.org/userland/most_downloaded_packages): pakiety npm związane z elektronami, które są pobierane dużo.
- [Zależności aplikacji](https://electronjs.org/userland/dependencies): Pakiety najczęściej wymienione jako `zależności` w aplikacjach Electron.
- [Autorzy pakietów](https://electronjs.org/userland/package_authors): Najbardziej potężni autorzy pakietów npm związanych z elektronami.

## Filtrowanie wyników

Raporty takie jak [zależności aplikacji](https://electronjs.org/userland/dependencies) i [aplikacje oznaczone gwiazdką](https://electronjs.org/userland/starred_apps) , które zawierają listę pakietów, aplikacje i repozytoria mają tekst który może być użyty do filtrowania wyników.

Gdy wpisujesz to wejście, adres URL strony jest aktualizowany dynamicznie. pozwala skopiować adres URL reprezentujący określony wycinek danych użytkownika , a następnie podzielić się nim z innymi.

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Więcej do przyjrzenia

Ten pierwszy zestaw sprawozdań jest dopiero początkiem. Będziemy nadal zbierać danych o tym, jak społeczność buduje Electron, i dodamy nowe raporty do witryny.

Wszystkie narzędzia używane do zbierania i wyświetlania tych danych mają otwarte źródło:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Strona internetowa Electron.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Slices of data about packies, repos and users in Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Wszystkie publiczne repozytoria na GitHubie, które zależą od `elektron` lub `elektron-prebuilt`
- [electron/electron-npm-pack](https://github.com/zeke/electron-npm-packages): Wszystkie pakiety npm, które wymieniają `electron` w ich pliku `package.json`.

Jeśli masz pomysły na ulepszenie tych sprawozdań, poinformuj nas [o otwarciu problemu w repozytorium strony](https://github.com/electron/electronjs.org/issues/new) lub w którymkolwiek z wyżej wymienionych repozytoriów.

Dziękuję, społeczność Electrona, za uczynienie użytkownika tym, czym jest dziś!

