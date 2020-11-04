---
title: 'Electron Wenals: Budowanie chromu jako biblioteki'
author: zcbenz
date: '2017-03-03'
---

Electron is based on Google's open-source Chromium, a project that is not necessarily designed to be used by other projects. Ten post wprowadza jak Chromium jest zbudowany jako biblioteka do użytku Electron'a i jak system budowy ewoluował na przestrzeni lat.

---

## Używanie CEF

Chromium Embedded Framework (CEF) jest projektem, który zamienia Chromium w bibliotekę i zapewnia stabilne API na podstawie kodecznej bazy Chromium. Bardzo wczesnych wersji edytora Atom i NW.js użyto CEF.

Aby zachować stabilne API, CEF ukrywa wszystkie szczegóły Chromium i pakuje API Chromium z własnym interfejsem. Więc kiedy potrzebowaliśmy dostępu do podstawowych API Chromium, takich jak włączanie Node.js do stron internetowych, zalety CEF stały się blokadami.

So in the end both Electron and NW.js switched to using Chromium's APIs directly.

## Budynek jako część chromu

Mimo że Chromium nie wspiera oficjalnie projektów zewnętrznych, baza kodowa jest modułowa i łatwo jest zbudować minimalną przeglądarkę opartą na Chromium. Moduł główny dostarczający interfejs przeglądarki nazywany jest Modułem Treści.

Aby stworzyć projekt z Modułem Treści, najprostszym sposobem jest zbudowanie projektu w ramach Chromium. Można to zrobić najpierw sprawdzając kod źródłowy Chromium, a następnie dodając projekt do pliku `DEPS`.

NW.js i bardzo wczesne wersje Electron używają tej drogi do budowania.

W dół, Chromium jest bardzo dużą bazą kodową i wymaga bardzo potężnych maszyn do budowy. W przypadku zwykłych laptopów może to trwać dłużej niż 5 godzin. Tak więc to ma ogromny wpływ na liczbę programistów, którzy mogą przyczynić się do realizacji projektu , a także spowalnia rozwój.

## Budowanie Chromium jako pojedynczej wspólnej biblioteki

Jako użytkownik modułu Treści, Electron nie musi modyfikować kodu Chromium w większości przypadków, więc oczywistym sposobem na ulepszenie budowy Electrona jest zbudowanie Chromium jako wspólnej biblioteki, a następnie połącz z nim w Electron. W ten deweloperzy nie muszą już budować chromu przy Electron.

Projekt [libchromiumcontent](https://github.com/electron/libchromiumcontent) został stworzony przez [@aroben](https://github.com/aroben) w tym celu. Tworzy moduł Treści Chromium jako wspólną bibliotekę, a następnie udostępnia nagłówki Chromium i wstępnie wbudowane pliki binarne do pobrania. Kod wersji początkowej libchromiumcontent można znaleźć [w tym linku](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Projekt [brightray](https://github.com/electron/brightray) powstał również jako część zawartości libchromu , który zapewnia cienką warstwę wokół Modułu Treści.

Używając libchromiumcontent i jaskrawych treści, deweloperzy mogą szybko zbudować przeglądarkę bez wchodzenia w szczegóły budowy Chromium. I usuwa wymóg szybkiej sieci i potężnej maszyny do budowy projektu.

Oprócz Electrona, w ten stworzono również inne projekty oparte na Chromium, takie jak [przeglądarka internetowa](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrowanie eksportowanych symboli

W systemie Windows istnieje ograniczenie ilości symboli które jedna wspólna biblioteka może eksportować. W miarę wzrostu zakresu kodowego chromu liczba symboli wyeksportowanych w zawartości libchromiumcontent wkrótce przekroczyła limit.

Rozwiązaniem było filtrowanie niepotrzebnych symboli podczas generowania pliku DLL. Zadziałał on przez [dostarczanie `. ef` plik do linkera](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), a następnie użyj skryptu do [oceny, czy symbole w przestrzeni nazw powinny być eksportowane](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Przyjmując to podejście, Chromium nadal dodawał nowe eksportowane symbole, libchromiumcontent może nadal generować pliki biblioteki udostępniając więcej symboli.

## Komponent

Zanim porozmawiamy o kolejnych krokach podjętych w przypadku zawartości libchromium, ważne jest, aby najpierw wprowadzić koncepcję budowy składnika w Chromium.

Jako ogromny projekt łącznik zajmuje bardzo długo Chromium podczas budowy. Zwykle gdy programista dokona niewielkiej zmiany, zobaczenie końcowego wyjścia może potrwać 10 minut. Aby to rozwiązać, Chromium wprowadza kompilację komponentów, która buduje każdy moduł w Chromium jako oddzielone wspólne biblioteki, więc czas spędzony w ostatnim kroku połączenia staje się niezauważalny.

## Dostawa nieprzetworzonych plików binarnych

Przy ciągłym wzroście chromu W Chromium było tak wielu eksportowanych symboli, że nawet symbole modułu zawartości i zestawu Webkit były większe niż ograniczenia . Nie można było wygenerować użytecznej biblioteki za pomocą tylko symboli usuwania nadkładu.

Ostatecznie musieliśmy [dostarczyć surowce binarne Chromium](https://github.com/electron/libchromiumcontent/pull/98) zamiast generować jedną wspólną bibliotekę.

Jak wprowadzono wcześniej, istnieją dwa tryby budowania w Chromium. W wyniku wysyłania nieprzetworzonych binarów, musimy wysyłać dwa różne rozkłady plików binarnych w libchromiumcontent. Jeden nazywa się `static_library` , który obejmuje wszystkie biblioteki statyczne każdego modułu generowanego przez normalną budowę Chromium. Drugie to `shared_library`, który zawiera wszystkie współdzielone biblioteki każdego modułu generowanego przez kompilację komponentu.

W Electron wersja Debug jest połączona z wersją `shared_library` libchromiumcontent. ponieważ jest mała do pobrania i zajmuje mało czasu podczas łączenia ostatecznego pliku wykonywalnego. A wersja Release Electron jest połączona z wersją `static_library` libchromiumcontent. aby kompilator mógł wygenerować pełne symbole, które są ważne dla debugowania, i łącznik może zrobić znacznie lepszą optymalizację, ponieważ wie, które pliki obiektów są potrzebne a które nie.

Tak więc dla normalnego rozwoju, deweloperzy muszą zbudować wersję Debug, która nie wymaga dobrej sieci ani silnej maszyny. Mimo że wersja wydania wymaga znacznie lepszego sprzętu, aby budować, może wygenerować lepsze zoptymalizowane pliki binarne.

## Aktualizacja `gn`

Jako jeden z największych projektów na świecie, najbardziej normalne systemy nie nadają się do budowy chromu a zespół Chromium opracowuje własne narzędzia do budowania .

Wcześniejsze wersje Chromium używały `gips` jako systemu budowy, ale uszkadzają z powodu powolności, i jego plik konfiguracyjny staje się trudny do zrozumienia dla złożonych projektów. Po latach rozwoju Chromium przełączył się na `gn` jako system budowy , który jest znacznie szybszy i posiada jasną strukturę.

Jednym z ulepszeń `gn` jest wprowadzenie `source_set`, co reprezentuje grupę plików obiektów. W `gyp`każdy moduł był reprezentowany przez `static_library` lub `shared_library`, i dla normalnej budowy Chromium, każdy moduł wygenerował bibliotekę statyczną i został połączony ze sobą w pliku wykonywalnym . Używając `gn`każdy moduł generuje teraz tylko pliki obiektów, i ostateczny plik wykonywalny tylko łączy wszystkie pliki obiektów razem , więc pośrednie pliki statyczne nie są już generowane.

Ta poprawa sprawiła jednak ogromny problem z zawartością libchromiumcontent, ponieważ pliki biblioteki statycznej pośredniej były rzeczywiście potrzebne przez libchromiumcontent.

Pierwsza próba rozwiązania to [patch `gn` aby wygenerować pliki biblioteki statycznej ](https://github.com/electron/libchromiumcontent/pull/239), który rozwiązał problem, ale był daleki od przyzwoitego rozwiązania .

Druga próba została wykonana przez [@alespergl](https://github.com/alespergl) aby [stworzyć niestandardowe biblioteki statyczne z listy plików obiektów](https://github.com/electron/libchromiumcontent/pull/249). Użył sztuczki do pierwszego uruchomienia kompilacji manekina do zebrania listy wygenerowanych plików obiektów, a następnie stwórz bibliotekę statyczną, dostarczając `gn` listą. Dokonano jedynie niewielkich zmian w kodzie źródłowym Chromium i zachowano architekturę konstrukcji Electrona.

## Podsumowanie

Jak widzisz, w porównaniu z budową Electrona jako części chromu budowa Chromium jako biblioteka podejmuje większe wysiłki i wymaga ciągłej konserwacji. Jednakże ten ostatni usuwa wymóg potężnego sprzętu do budowy Electrona, umożliwiając w ten sposób znacznie szerszej gamy programistów budowanie i przyczynianie się do Electron. Wysiłki są w pełni warte tego wysiłku.

