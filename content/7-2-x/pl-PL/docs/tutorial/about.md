# O Electronie

[Electron](https://electronjs.org) jest otwartoźródłową biblioteką, stworzoną przez GitHub’a, która umożliwia tworzenie wieloplatformowych aplikacji z użyciem języków HTML, CSS oraz JavaScript. Electron osiąga to łącząc [Chromium](https://www.chromium.org/Home) oraz [Node.js](https://nodejs.org) w jednolite środowisko uruchomieniowe, którego aplikacje mogą być wydawane na MacOS, Windows oraz Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Kontynuuj czytanie, aby dowiedzieć się więcej o twórcach oraz wydaniach Electrona, albo zacznij tworzyć aplikacje w Electron [Szybki Start](quick-start.md).

## Zespół oraz współtwórcy

Electron jest rozwijany przez zespół Github i grupę [aktywnych kontrybutorów](https://github.com/electron/electron/graphs/contributors) ze społeczności. Niektórzy z twórców są to niezależne osoby pozostali pracują w większych firmach rozwijających produkt Electron. Jesteśmy zadowoleni, że możemy dodawać współtwórców jako osóby rozwijające projekt. Dowiedz się więcej o [współtworzeniu Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Wydania

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Aktualizacje Bibliotek

Biblioteka Electron w Chromium jest zazwyczaj aktualizowana w ciągu jednego lub dwóch tygodni po wydaniu nowej stabilnej wersji, w zależności od aktualizacji.

Po wydaniu nowej wersji Node.js, Electron zazwyczaj adaptuje ją po około miesiącu czekając na stabilizację wersji.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.

### Numer Wersji

Od wersji Electron 2.0 [stosowany jest `semver`](https://semver.org). Dla większości aplikacji używającej nowszych wersji npm, uruchomienie `$ npm install electron` wystarczy, aby działał poprawnie.

Proces aktualizacji jest dokładnie opisany w naszej [Specyfikacji wersji](electron-versioning.md).

### LTS

Nie istnieje aktualnie długoterminowe wsparcie do starszych wersji Electrona. Jeśli aktualna wersja Electron u Ciebie działa, możesz pozostać przy niej tak długo, jak będziesz chciał. Jeśli chciałbyś skorzystać z nowych funkcjonalności, w miarę ich pojawiania się, powinieneś zaktualizować swoją wersję programu do najnowszej.

Główne zmiany wchodzą z wersją `v1.0.0`. Jeśli nie używasz tej wersji programu, powinieneś [poczytać o zmianach w `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Główne założenia

Aby zachować niewielki (rozmiar pliku) oraz zrównoważony ( ilość zależności oraz APIs) projekt, ogranicza się on do głównych funkcjonalności.

Na przykład, Electron używa biblioteki renderowania Chromium zamiast całego Chromium. To powoduje, że łatwiej jest zaktualizować Chromium, ale oznacza również, że niektóre funkcjonalności z Google Chrome nie istnieją w Electron.

Nowe funkcjonalności dodawane w Electron powinny przede wszystkim być natywnymi API. Jeśli funkcja należy do modułu Node.js, prawdopodobnie powinna tam być. Spójrz na [narzędzia zbudowane przez społeczeństwo](https://electronjs.org/community).

## Historia

Poniżej przedstawiona jest historia Electron.

| :calendar:        | :tada:                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| **Kwiecień 2013** | [Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).  |
| **Maj 2014**      | [Atom Shell jako projekt open source](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html). |
| **Kwiecień 2015** | [Zmiana nazwy z Atom Shell na Electron](https://github.com/electron/electron/pull/1389).             |
| **Maj 2016**      | [Wypuszczenie wersji `v1.00`](https://electronjs.org/blog/electron-1-0).                             |
| **Maj 2016**      | [Kompatybilność Electron app z Mac App Store](mac-app-store-submission-guide.md).                    |
| **Sierpień 2016** | [Wsparcie Electron app przez Windows Store](windows-store-guide.md).                                 |
