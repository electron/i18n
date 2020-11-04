---
title: 'Projekt Tygodnia: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

W tym tygodniu polecanym projektem jest [Dat](https://datproject.org/), [dotacja finansowana](https://changelog.com/rfc/6), open source, zdecentralizowane narzędzie do rozpowszechniania zbiorów danych. Dat jest zbudowany i utrzymywany przez [geodistrybucję](https://datproject.org/team), z których wielu pomogło napisać ten post.

---

[![Zrzut ekranu głównego widoku desktopu danych, pokazujący kilka wierszy udostępnionych
dat](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Po pierwsze, co to jest dane?

Chcieliśmy skierować najlepsze części partnera do systemów równorzędnych i rozproszonych do wymiany danych. Zaczęliśmy od wymiany danych naukowych, a następnie zaczęliśmy rozbijać się na instytucje badawcze, rząd, służby publiczne i zespoły open source.

Innym sposobem myślenia o tym jest synchronizacja i przesłanie aplikacji takiej jak Dropbox lub BitTorrent Sync, z wyjątkiem Dat jest [open source](https://github.com/datproject). Naszym celem jest stworzenie silnego, otwartego i nienastawionego na zysk oprogramowania do wymiany danych dla dużych, małych, średnich, małych partii i dużych partii.

Aby użyć narzędzia `dat` CLI, wystarczy wpisać to:

```sh
ścieżka/do/moj/katalog dat
```

A dat utworzy link, którego możesz użyć do wysłania tego folderu do kogoś innego - żadne serwery centralne ani osoby trzecie nie mają dostępu do Twoich danych. W przeciwieństwie do BitTorrent, nie można również sniff kto dzielił się tym, co ([zobacz szkic arkusza Dat](https://github.com/datproject/docs/blob/master/papers/dat-paper.md), aby uzyskać więcej szczegółów).

## Teraz wiemy, czym jest Dat. Jak pasuje pulpit Dat?

[Dat Desktop](https://github.com/datproject/dat-desktop) to sposób, aby Dat był dostępny dla ludzi, którzy nie mogą lub nie chcą używać wiersza poleceń. Możesz przechowywać wiele danych na komputerze i obsługiwać dane przez sieć.

## Czy potrafisz podzielić się fajnymi przypadkami?

### Data Refuge + projekt Svalbard

Pracujemy nad czymś kodowanym [Svalbard projektu](https://github.com/datproject/svalbard) , który jest związany z [DataRefuge](http://www.ppehlab.org/datarefuge), grupa wspierająca rządowe dane na temat klimatu zagrożone zniknięciem. Svalbard jest nazwany za Svalbard Global Seed Vault w Arktyce, która posiada dużą podziemną bibliotekę kopii zapasowych DNA roślin. Nasza wersja to duża wersja kontrolowanego gromadzenia publicznych zbiorów danych naukowych. Kiedy już znamy metadane i będziemy mogli zaufać, możemy tworzyć inne fajne projekty, takie jak [rozproszona sieć przechowywania danych wolontariuszy](https://github.com/datproject/datasilo/).

### Koalicja danych obywatelskich Kalifornia

[CACivicData](http://www.californiacivicdata.org/) jest otwartym archiwum obsługującym codzienne pobieranie z CAL-ACCESS, bazy danych California w polityce. Wykonują [codziennych wydań](http://calaccess.californiacivicdata.org/downloads/0), co oznacza przechowywanie wielu duplikatów danych w ich plikach zip. Pracujemy nad hostowaniem ich danych jako repozytorium Dat, które zmniejszy ilość problemów i przepustowości pasma potrzebnych do odniesienia do konkretnej wersji lub aktualizacji do nowszej wersji.

## Aktualizacje Electron

To nie jest jeszcze konkretne, ale uważamy, że zabawnym przypadkiem byłoby umieszczenie skompilowanej aplikacji Electron w repozytorium Dat, następnie za pomocą klienta Dat w Electronie, aby pociągnąć najnowsze delty wbudowanej aplikacji binarnej, aby zaoszczędzić czas pobierania, ale także zmniejszyć koszty przepustowości serwera.

## Kto powinien używać Dat Desktop?

Każdy, kto chce udostępniać i aktualizować dane w sieci p2p. Naukowcy w dziedzinie danych, hakerzy otwartych danych, badacze i twórcy. Jesteśmy bardzo otwarci na opinię, jeśli ktokolwiek ma fajny przypadek, o którym jeszcze nie myśleliśmy. Możesz wyrzucić przez nasz [czat na Gitterze](https://gitter.im/datproject/discussions) i zapytać nas czegoś!

## Co zbliża się do Dat i Dat Desktop?

Konta użytkowników i publikacja metadanych. Pracujemy nad aplikacją WWWW rejestru Dat, która ma być wdrożona w [projekcie danych. rg](https://datproject.org/) , który będzie zasadniczo „NPM dla zbiorów danych”, z wyjątkiem zastrzeżenia, że zamierzamy być tylko katalogiem metadanych, a dane mogą być dostępne w dowolnym miejscu online (w przeciwieństwie do NPM lub GitHub, gdzie wszystkie dane są przechowywane centralnie, ponieważ kod źródłowy jest wystarczająco mały, możesz go dopasować w jednym systemie). Ponieważ wiele zbiorów danych jest ogromnych, potrzebujemy rejestru federacyjnego (podobnego do tego, jak działają trackery BitTorrent). Chcemy ułatwić ludziom znajdowanie lub publikowanie zbiorów danych w rejestrze z Dat Desktop, aby proces wymiany danych był beztarty.

Inną funkcją jest foldery wielopisawcze/współpraca. Mamy duże plany wspólnego przepływu pracy, być może z gałęziami podobnymi do git, z wyjątkiem projektowanych wokół zbioru danych. Nadal jednak pracujemy nad ogólną stabilnością i standaryzacją naszych protokołów!

## Dlaczego zdecydowałeś się budować Dat Desktop na Electron?

Dat jest budowany przy użyciu Node.js, więc był to naturalny element naszej integracji. Poza tym nasi użytkownicy używają różnych maszyn ponieważ naukowcy, naukowcy i urzędnicy rządowi mogą być zmuszeni do korzystania z pewnych konfiguracji dla swoich instytucji – oznacza to, że musimy mieć możliwość kierowania się do systemów Windows i Linux oraz Mac. Dat Desktop daje nam to dość łatwo.

## Jakie są pewne wyzwania, przed którymi stoisz podczas budowy komputera Dat i Dat?

Wskazanie tego, czego chcą ludzie. Zaczęliśmy od tabelarycznych zbiorów danych, ale zdaliśmy sobie sprawę, że rozwiązanie tego problemu jest nieco skomplikowane, a większość ludzi nie korzysta z baz danych. Tak więc w połowie projektu przeprojektowaliśmy wszystko od zera, aby użyć systemu plików i nie patrzyliśmy wstecz.

Przekonaliśmy się również na pewne ogólne problemy związane z infrastrukturą Electrona, w tym:

- Telemetria - jak przechwytywać anonimowe statystyki użytkowania
- Aktualizacje - konfiguracja automatycznych aktualizacji jest rodzajem fragmentów i magii.
- Wydania - podpisywanie XCode, wydawanie budynków w Travis, tworzenie beta kompilacji, wszystkie były wyzwaniem.

Używamy również Browserify i niektórych fajnych przekształceń Browserify na kodzie 'front-end' w Dat Desktop (który jest swego rodzaju dziwny, ponieważ nadal pakujemy nawet jeśli mamy natywne `wymagamy` - ale to dlatego, że chcemy przekształceń). Aby lepiej zarządzać naszym CSS przełączyliśmy się z Sass na [sheetify](https://github.com/stackcss/sheetify). Pomogło nam to w znacznym stopniu modulować nasz CSS i ułatwić przeniesienie naszego interfejsu użytkownika do zorientowanej na komponent architektury ze wspólnymi zależnościami. Na przykład [kolory danych](https://github.com/Kriesse/dat-colors) zawierają wszystkie nasze kolory i są współdzielone pomiędzy wszystkie nasze projekty.

Zawsze byliśmy wielkim fanem standardów i minimalnych abstrakcji. Cały nasz interfejs jest budowany przy użyciu zwykłych węzłów DOM z kilkoma bibliotekami pomocniczymi. Zaczęliśmy przenosić niektóre z tych komponentów do [elementów podstawowych](https://base.choo.io), biblioteki niskiego poziomu komponentów wielokrotnego użytku. Podobnie jak w przypadku większości naszych technologii, ciągle powtarzamy się w tym zakresie, dopóki nie podejmiemy odpowiednich działań, ale jako drużyna mamy poczucie, że zmierzamy we właściwym kierunku.

## W jakich obszarach należy ulepszyć Electron?

Uważamy, że największym punktem bólowym są moduły natywne. Konieczność przebudowy modułów dla Electrona z npm zwiększa złożoność przepływu pracy. Nasz zespół opracował moduł o nazwie [`prebuild`](http://npmjs.org/prebuild) który obsługuje wstępnie zbudowane pliki binarne, który działał dobrze dla Node, ale przepływy pracy Electron nadal wymagały niestandardowego kroku po zainstalowaniu, zazwyczaj `npm uruchom przebuduj`. To było irytujące. Aby temu zaradzić, niedawno przestawiliśmy się na strategię, w ramach której łączymy wszystkie skompilowane wersje binarne wszystkich platform wewnątrz tarczy npm. Oznacza to, że piłki stołowe stają się większe (choć można to zoptymalizować za pomocą `. o` pliki - biblioteki współdzielone), podejście to pozwala uniknąć konieczności uruchamiania skryptów po instalacji i całkowicie unika `npm run rebuild`. Oznacza to, że `npm install` robi to poprawnie dla Electrona po raz pierwszy.

## Jakie są twoje ulubione rzeczy o Electron?

API wydaje się dość dobrze przemyślane, jest stosunkowo stabilne, i robi to całkiem dobrą robotę na bieżąco z wersjami węzłów znajdujących się na wcześniejszych etapach łańcucha dostaw. Nie możemy o to prosić!

## Jakiekolwiek wskazówki dla Electrona, które mogą być przydatne dla innych programistów?

Jeśli używasz natywnych modułów, podaj [prebuild](https://www.npmjs.com/package/prebuild) strzał!

## Jaki jest najlepszy sposób na śledzenie rozwoju Dat?

Śledź [@dat_project](https://twitter.com/dat_project) na Twitterze lub subskrybuj nasz [mailowy newsletter](https://tinyletter.com/datdata).

