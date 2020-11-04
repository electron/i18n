---
title: 'Projekt Tygodnia: WebTorrent'
author:
  - '[PLACEHOLDER] feross'
  - zeke
date: '2017-03-14'
---

W tym tygodniu dotarliśmy do [@feross](https://github.com/feross) i [@dcposch](https://github.com/dcposch) , aby porozmawiać o WebTorrent, zasilany przez sieć klient torrentów, który łączy użytkowników w celu utworzenia rozproszonej, zdecentralizowanej sieci przeglądarki do przeglądarki.

---

## Co to jest WebTorrent?

[WebTorrent](https://webtorrent.io) jest pierwszym klientem torrentów, który działa w przeglądarce. Jest napisany całkowicie w JavaScript i może używać WebRTC do transportu peer-to-peer. Brak wtyczki, rozszerzenia przeglądarki lub instalacja nie jest wymagana.

Korzystając ze standardów otwartych stron internetowych, WebTorrent łączy użytkowników stron internetowych razem w celu utworzenia rozproszonej, zdecentralizowanej sieci przeglądarki w celu skutecznego transferu plików.

Tutaj możesz zobaczyć demo WebTorrent w akcji: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="strona domowa webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Dlaczego jest to fajne?

Wyobraź sobie stronę wideo taką jak YouTube, ale gdzie odwiedzający pomagają hostować zawartość witryny. Im więcej osób korzysta ze strony internetowej napędzanej przez WebTorrent, tym szybciej i bardziej odpornie.

Komunikacja pomiędzy przeglądarką wycisza pośrednika i pozwala ludziom komunikować się na własny sposób. Nie ma więcej klientów/serwerów - tylko sieć równorzędnych partnerów. WebTorrent jest pierwszym krokiem w podróży, aby ponownie zdecentralizować Internet.

## Gdzie Electron wchodzi na zdjęcie?

Około rok temu zdecydowaliśmy się zbudować [pulpitu WebTorrent](https://webtorrent.io/desktop/), wersję WebTorrent, która działa jako aplikacja stacjonarna.

[![Okno odtwarzacza WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Utworzyliśmy pulpit WebTorrent z trzech powodów:

1. Chcieliśmy czystego, lekkiego bez reklam, otwartego oprogramowania do torrentów
2. Chcieliśmy aplikacji torrent z dobrym wsparciem dla streamingu
3. Potrzebujemy „klienta hybrydowego”, który łączy sieci BitTorrent i WebTorrent

## Jeśli już możemy pobrać torrenty w mojej przeglądarce, to dlaczego aplikacja stacjonarna?

Najpierw trochę tła na temat projektu WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logo pulpitu webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

W pierwszych dniach BitTorrent wykorzystywał TCP jako swój protokół transportowy. Później uTP osiągnął obiecujące lepsze wyniki i dodatkową przewagę nad TCP. Każdy główny klient torrentów ostatecznie przyjął uTP, a dziś możesz używać BitTorrent za pomocą jednego z protokołów. Protokół WebRTC jest kolejnym logicznym krokiem. Przynosi on obietnicę interoperacyjności z przeglądarkami internetowymi – jedną gigantyczną sieć P2P złożoną ze wszystkich klientów BitTorrent i milionów przeglądarek internetowych.

„Web peers” (torrent peery działające w przeglądarce internetowej) wzmacnia sieć BitTorrent, dodając miliony nowych peerów, i rozprzestrzeniać BitTorrent na dziesiątki nowych przypadków użycia. WebTorrent jak najdokładniej podąża za specyfikacją BitTorrent, aby ułatwić istniejącym klientom BitTorrent dodanie wsparcia dla WebTorrent.

Niektóre aplikacje torrentów, takie jak [Vuze](https://www.vuze.com/) obsługują już strony internetowe, ale nie chcieliśmy czekać na resztę aby dodać wsparcie. **Zasadniczo komputer WebTorrent był naszym sposobem na przyspieszenie przyjęcia protokołu WebTorrent.** Tworząc niesamowitą aplikację z torrentami, którą ludzie naprawdę chcą użyć, zwiększamy liczbę rówieśników w sieci, którzy mogą dzielić się torrentami z uczestnikami sieci (i. . użytkowników na stronach internetowych).

## Jakie są interesujące przypadki użycia torrentów poza tym, co ludzie już wiedzą, że mogą robić?

Jednym z najbardziej interesujących zastosowań WebTorrent jest dostawa wspomagana wzajemnie. Projekty nienastawione na zysk, takie jak [Wikipedia](https://www.wikipedia.org/) i [Archiwum Internetowe](https://archive.org/) mogą zmniejszyć koszty transferu i hostingu, umożliwiając odwiedzającym chip. Popularne treści mogą być przeglądane w przeglądarce, szybko i tanio. Rzadko dostępne treści mogą być obsługiwane przez HTTP z serwera źródłowego.

Archiwum Internetu faktycznie zaktualizowało swoje pliki torrentów, więc świetnie współpracują z WebTorrent. Więc jeśli chcesz osadzić zawartość archiwum internetowego na swojej stronie, możesz to zrobić w sposób zmniejszający koszty hostowania archiwum, umożliwienie im poświęcenia większej ilości pieniędzy na faktyczną archiwizację sieci!

Istnieją również ekscytujące przypadki zastosowań biznesowych, od CDN po dostarczanie aplikacji przez P2P.

## Jakie są twoje ulubione projekty, które używają WebTorrent?

![zrzut ekranu gaii](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Najfajniejsza rzecz zbudowana z WebTorrent, jest prawdopodobnie [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). To poślizgowa interaktywna symulacja 3D Mleko-drogi. Ładowanie danych z torrentu, bezpośrednio w przeglądarce. Przelot przez nasz system gwiazdkowy jest niesamowitym inspiracją i uświadomienie sobie, jak mało ludzi jest w porównaniu z bogactwem naszego wszechświata.

Możesz przeczytać o tym, jak to zostało zrobione w [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), wpis na blogu, w którym autor, Charlie Hoey, wyjaśnia, w jaki sposób zbudował mapę gwiazdek z WebGL i WebTorrent.

<a href="https://brave.com/">
  <img alt="logo brave" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Jesteśmy również ogromnymi fanami [Brave](https://brave.com/). Brave to przeglądarka, która automatycznie blokuje reklamy i trackery w celu szybszego i bezpieczniejszego korzystania z Internetu. Odwaga niedawno dodana do obsługi torrentów, dzięki czemu możesz [przeglądać tradycyjne torrenty bez użycia oddzielnej aplikacji](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Funkcja ta jest wspierana przez WebTorrent.

Tak więc jak większość przeglądarek może renderować pliki PDF, Brave może renderować linki magnet i pliki torrentów. Są to tylko inny rodzaj treści wspierany przez przeglądarkę.

Jednym ze współzałożycieli Brave jest w rzeczywistości Brendan Eich, twórca JavaScript, język, w którym napisaliśmy WebTorrent, więc uważamy, że to dość fajne, że Brave zdecydował się zintegrować WebTorrent.

## Dlaczego zdecydowałeś się zbudować pulpit WebTorrent na Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Główne okno pulpitu WebTorrent" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Istnieje mem, że aplikacje Electron są "blokowane", ponieważ zawierają cały moduł zawartości Chrome w każdej aplikacji. W niektórych przypadkach jest to częściowo prawdziwe (instalator aplikacji Electron jest zazwyczaj ~40MB, gdzie instalatorem aplikacji dla OS, zazwyczaj jest ~20MB).

Jednak w przypadku pulpitu WebTorrent używamy prawie każdej funkcji Electron i wielu dziesiątek funkcji Chrome w trakcie normalnej pracy. Jeśli chcieliśmy wdrożyć te funkcje od podstaw dla każdej platformy, zbudowanie naszej aplikacji zajęłoby wiele miesięcy lub wiele lat, albo udało nam się udostępnić tylko dla jednej platformy.

Aby uzyskać pomysł, używamy integracji dokującej [Electrona](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (aby pokazać postęp pobierania), [integracja z paskiem menu](https://electronjs.org/docs/api/menu) (do uruchomienia w tle), [rejestracja obsługi protokołu](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (aby otworzyć linki magnet), [oszczędzanie energii](https://electronjs.org/docs/api/power-save-blocker/) (aby zapobiec uśpieniu podczas odtwarzania wideo) i [automatycznej aktualizacji](https://electronjs.org/docs/api/auto-updater). Jeśli chodzi o funkcje Chrome, używamy znacznika: znacznik `<video>` (aby odtwarzać wiele różnych formatów wideo), tag `<track>` (dla wsparcia zamkniętych podpisów), przeciągnij i upuść podpórkę i WebRTC (które nie są triwialne do użycia w natywnej aplikacji).

Nie wspominaj: nasz silnik torrent jest napisany w JavaScript i zakłada istnienie wielu Node API, ale w szczególności `wymagaj ('net')` i `wymagaj ('dgram')` dla obsługi gniazd TCP i UDP .

Zasadniczo Electron jest tym, czego potrzebowaliśmy i posiadał dokładny zestaw funkcji, których potrzebowaliśmy aby wysłać solidną, wypolerowaną aplikację w nagraniu.

## Jakie są twoje ulubione rzeczy o Electron?

Biblioteka WebTorrent od dwóch lat jest w fazie rozwoju jako projekt typu open source. **Zrobiliśmy pulpit WebTorrent w ciągu czterech tygodni.** Electron jest głównym powodem, dla którego byliśmy w stanie tak szybko zbudować i wysłać naszą aplikację.

Tak jak Node. s udostępniły programowanie serwera dla jednej generacji programistów front-end jQuery, Electron sprawia, że natywny rozwój aplikacji jest dostępny dla każdego, kto zna sieć lub węzeł. na rozwój. Electron jest niezwykle emansujący.

## Czy strona internetowa i klient komputera dzielą się kodem?

Tak, [`webtorrent` npm pakiet](https://npmjs.com/package/webtorrent) działa w Node.js, w przeglądarce i w Electron. Dokładnie ten sam kod może działać we wszystkich środowiskach - jest to piękno JavaScript. To jest dzisiejsza uniwersalna pora. Java Applets obiecała aplikacje "Napisz raz, uruchom jakąś aplikację, ale ta wizja nigdy nie urzeczywistniła się z wielu powodów. Electron, bardziej niż jakakolwiek inna platforma, tak naprawdę przyciemnia się do tego ideału.

## Jakie wyzwania stoją przed Tobą podczas budowy WebTorrent?

We wczesnych wersjach aplikacji walczyliśmy o sprawne działanie interfejsu. Umieściliśmy silnik torrent w tym samym procesie renderowania, który rysuje główne okno aplikacji, które przewidywalnie, doprowadził do spowolnienia w dowolnym momencie, gdy silnik torrent był intensywny (jak weryfikacja elementów torrenta otrzymanych od peerów).

Naprawiliśmy to przenosząc silnik torrent do drugiego, niewidzialnego procesu renderowania, z którym komunikujemy się ponad [IPC](https://electronjs.org/docs/api/ipc-main/). W ten sposób, jeżeli w tym procesie użyto krótko wielu procesorów, wątek interfejsu użytkownika nie zostanie naruszony. Gładkie przewijanie i animacje są tak zadowolone.

Uwaga: musieliśmy umieścić silnik torrent w procesie renderowania zamiast procesu „głównego”, ponieważ potrzebujemy dostępu do sieci WebRTC (która jest dostępna tylko na stronie internetowej)

## W jakich obszarach należy ulepszyć Electron?

Jedną rzeczą, którą chcielibyśmy zobaczyć, jest lepsza dokumentacja dotycząca tego, jak budować i dostarczać aplikacje gotowe do produkcji, szczególnie wokół trudnych przedmiotów, takich jak podpisywanie i autoaktualizacja. Musieliśmy dowiedzieć się o najlepszych praktykach, kopając w kod źródłowy i pytając o to na Twitterze!

## Czy komputer WebTorrent jest gotowy? Jeśli nie, co nadejdzie dalej?

Uważamy, że obecna wersja pulpitu WebTorrent jest doskonała, ale zawsze istnieje pole do poprawy. Obecnie pracujemy nad poprawą pola, wydajności, obsługi napisów i kodeków wideo.

Jeśli jesteś zainteresowany zaangażowaniem w projekt, sprawdź [naszą stronę GitHub](https://github.com/feross/webtorrent-desktop)!

## Jakiekolwiek wskazówki dotyczące rozwoju Electrona, które mogą być przydatne dla innych programistów?

[Feross](http://feross.org/), jeden z współtwórców WebTorrent, niedawno wystosował rozmowę *"Rzeczywisty świat Electron: Budowanie międzyplatformowych aplikacji desktopowych z JavaScript"* w NodeConf Argentina, która zawiera przydatne wskazówki dotyczące wydania wypolerowanej aplikacji Electron. Rozmowa jest szczególnie przydatna, jeśli jesteś na etapie, na którym masz podstawową pracującą aplikację i próbujesz ją przenieść na następny poziom policji i profesjonalizmu.

[Obejrzyj tutaj](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Slajdy tutaj](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), inny współtwórca WebTorrent, napisał [listę kontrolną rzeczy, które możesz zrobić](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) , aby aplikacja czuła się wypolecona i natywna. Dostarcza przykładów kodu i obejmuje rzeczy takie jak integracja doku macOS, przeciąganie i upuszczenie, powiadomienia na pulpicie i sprawienie, aby aplikacja szybko się ładowała.

