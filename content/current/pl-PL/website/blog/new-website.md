---
title: "Nowa zglobalizowana strona internetowa Electron"
author: zeke
date: '2017-11-13'
---

Electron ma nową stronę internetową pod adresem [electronjs.org](https://electronjs.org)! Zastąpiliśmy naszą statyczną witrynę Jekyll Node. s webserver, dając nam elastyczność umiędzynarodowienia strony i torując drogę do większej ekscytacji nowych funkcji.

---

## 🌍 Tłumaczenia

Rozpoczęliśmy proces internacjonalizacji strony internetowej, mając na celu udostępnienie oprogramowania Electron globalnym odbiorcom programistów. Używamy platformy lokalizacyjnej o nazwie [Crowdin](https://crowdin.com/project/electron) , która integruje z GitHub, otwieranie i aktualizowanie pull requestów automatycznie, ponieważ zawartość jest przetłumaczona na różne języki.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav w języku chińskim">
    <figcaption>Electron Nav in Simplified Chinese</figcaption>
  </a>
</figure>

Mimo, że dotychczas cicho pracowaliśmy nad tym wysiłkiem, ponad 75 członków społeczności Electron odkryło już projekt organizacyjnie i dołączyło do niego w celu umiędzynarodowienia strony internetowej i przetłumienia dokumentacji Electrona na ponad 20 języków. Widzimy [dziennie wkład](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) od ludzi na całym świecie, z tłumaczeniami na języki, takimi jak francuski, wietnamski, indonezyjski i chiński kierujący tą drogą.

Aby wybrać swój język i zobaczyć postęp w tłumaczeniu, odwiedź [electronjs.org/language](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Bieżące języki docelowe na Crowdin">
    <figcaption>Trwa tłumaczenie na Crowdin</figcaption>
  </a>
</figure>

Jeśli jesteś wielojęzyczny i jesteś zainteresowany pomocą w tłumaczeniu dokumentów Electrona i strony internetowej, odwiedź [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) repo, lub skocz bezpośrednio do tłumaczenie na [Crowdin](https://crowdin.com/project/electron), gdzie możesz zalogować się za pomocą konta GitHub.

Obecnie włączono 21 języków dla projektu Electron w Crowdin. Dodawanie wsparcia dla większej liczby języków jest łatwe, więc jeśli jesteś zainteresowany pomocą w tłumaczeniu, ale nie widzisz swojego języka na liście, [daj nam znać](https://github.com/electron/electronjs.org/issues/new) i włączymy.

## Surowe przetłumaczone dokumenty

Jeśli wolisz przeczytać dokumentację w nieprzetworzonych plikach markdown możesz to zrobić w dowolnym języku:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Strony aplikacji

Od dziś każda aplikacja Electron może z łatwością mieć swoją własną stronę na stronie Electron . Na kilka przykładów sprawdź [Etcher](https://electronjs.org/apps/etcher), [1CSchowek](https://electronjs.org/apps/1clipboard), lub [GraphQL Playground](https://electronjs.org/apps/graphql-playground), zdjęto tutaj w japońskiej wersji witryny:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

There are some incredible Electron apps out there, but they're not always easy to find, and not every developer has the time or resources to build a proper website to market and distribute their app.

Używając tylko [pliku ikony PNG i małej ilości metadanych aplikacji](https://github.com/electron/electron-apps/blob/master/contributing.md), jesteśmy w stanie zebrać wiele informacji o danej aplikacji. Korzystając z danych zebranych z GitHub, strony aplikacji mogą teraz wyświetlać zrzuty ekranu, linki do pobierania, wersje, notatki i README dla każdej aplikacji, która ma publiczne repozytorium. Używając palety kolorów wyodrębnionej z ikony każdej aplikacji, możemy produkować [pogrubionych i dostępnych kolorów](https://github.com/zeke/pick-a-good-color) aby dać każdej aplikacji rozróżnienie wizualne.

[strona indeksu aplikacji](https://electronjs.org/apps) ma teraz także kategorie i filtr słów kluczowych do znalezienia ciekawych aplikacji takich jak [graficzne GUI](https://electronjs.org/apps?q=graphql) i [p2p narzędzi](https://electronjs.org/apps?q=graphql).

Jeśli masz aplikację Electron, którą chciałbyś polecić na stronie, otwórz pull request w repozytorium [electron/electron-apps](https://github.com/electron/electron-apps).

## Jedna instalacja z Homebrew

[Homebrew](https://brew.sh) Menedżer pakietów dla macOS ma podpolecenie o nazwie [cask](https://caskroom.github.io) , które ułatwia instalowanie aplikacji desktopowych przy użyciu pojedynczego polecenia w Twoim terminalu , Na przykład `brajskiego caska zainstaluj atom`.

Rozpoczęliśmy zbieranie nazw kasetowych Homebrew dla popularnych aplikacji Electron i teraz wyświetlamy komendę instalacji (dla odwiedzających macOS) na każdej stronie aplikacji , która ma kasę:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Opcje instalacji dostosowane do twojej platformy: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Aby wyświetlić wszystkie aplikacje, które mają homebrew beczki, odwiedź [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Jeśli znasz inne aplikacje z kasetami, których jeszcze nie zindeksowaliśmy, [dodaj je!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## :globe_z_meridians: Nowa domena

Przenieśliśmy witrynę z electron.atom.io do nowej domeny: [electronjs.org](https://electronjs.org).

Projekt Electron urodził się wewnątrz [Atom](https://atom.io), edytor tekstu na GitHubie zbudowany na technologiach sieciowych. Electron był pierwotnie nazywany `powłoką atomową`. Atom był pierwszą aplikacją, która z niego korzystała, ale nie zajęło to więcej czasu, aby ludzie zrozumieli, że ten magiczny Chromium + Node może być użyty do wszystkich rodzajów różnych aplikacji. Kiedy firmy takie jak Microsoft i Slack zaczęły korzystać z `powłoki atomowej`, stało się jasne, że projekt potrzebuje nowej nazwy.

Tak więc narodził się "Electron". Na początku 2016 r. GitHub złożył nowy zespół, który skoncentruje się konkretnie na rozwoju i konserwacji Electrona, oprócz Atom. W czasie odkąd Electron został przyjęty przez tysiące twórców aplikacji, i jest obecnie uzależniona od wielu dużych firm, z których wiele ma własne zespoły Electrona.

Wsparcie projektów Electron GitHub takich jak Atom i [GitHub Desktop](https://desktop.github.com) jest nadal priorytetem dla naszego zespołu, ale przechodząc do nowej domeny mamy nadzieję, że pomożemy uściślić techniczne rozróżnienie między Atom i Electronem.

## 🐢🚀 Node.js wszędzie

Poprzednia strona Electron została zbudowana z [Jekyll](https://jekyllrb.com), popularnym statycznym generatorem witryn bazującym na Ruby. Jekyll jest doskonałym narzędziem do tworzenia statycznych stron internetowych, ale strona zaczęła go rozwijać. Chcieliśmy więcej dynamicznych możliwości, takich jak prawidłowe przekierowanie i dynamiczne renderowanie treści, więc serwer [Node.js](https://nodejs.org) był oczywistym wyborem.

Ekosystem Electron zawiera projekty z komponentami napisanymi w wielu różnych językach programowania, od Pythona do C++ do Bash. Ale JavaScript jest fundamentem Electron i jest językiem najczęściej używanym w naszej społeczności.

Migrując stronę internetową z Ruby do Node.js, dążymy do obniżenia bariery do wpisu dla ludzi, którzy chcą wnieść swój wkład w stronę internetową.

## ⚡ Łatwiejsze uczestnictwo Open-Source

Jeśli masz [Node. s](https://nodejs.org) (8 lub więcej) i [git](https://git-scm.org) zainstalowany w Twoim systemie, możesz łatwo pobrać witrynę lokalnie:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Nowa strona internetowa jest hostowana na Heroku. Używamy rurociągów wdrażania i funkcji [Przejrzyj aplikacje](https://devcenter.heroku.com/articles/github-integration-review-apps) , która automatycznie tworzy uruchomioną kopię aplikacji dla każdego pull żądania. Ułatwia to recenzentom oglądanie rzeczywistych skutków pull request na żywym egzemplarzu witryny.

## 🙏 Podziękowania dla współtwórców

Chcielibyśmy szczególnie podziękować wszystkim ludziom na całym świecie, którzy przyczynili się do poprawy Electrona. Pasja społeczności open-source pomogła w osiągnięciu sukcesu Electrona. Dziękujemy!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>