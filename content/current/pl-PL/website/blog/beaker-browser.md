---
title: 'Projekt Tygodnia: Przeglądarka Beakera'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

W tym tygodniu dołączyliśmy do [Paula Frazee](http://pfrazee.github.io/), twórca z [Przeglądarki Beakera](https://beakerbrowser.com/). Beaker jest eksperymentalną przeglądarką internetową peer-to-peer, która używa protokołu Dat do hostowania stron z urządzeń użytkowników.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Czym jest Beaker i dlaczego go utworzyłeś?

Beaker to przeglądarka uczestnicząca. To przeglądarka dla hakerów innych.

Sieć jest zamknięta. Jeśli chcesz wpłynąć na działanie mediów społecznościowych, musisz pracować na Facebooku lub Twitterze. Do wyszukania, Google. Kontrola leży w gestii przedsiębiorstw, a nie samych użytkowników.

Z Beaker mamy nowy protokół internetowy: [Zdecentralizowany Transport Archiwów](https://datprotocol.com). "Dane." Tworzy strony na żądanie, za darmo, a następnie udostępnia je z urządzenia. Serwery nie są wymagane. To jest nasza innowacja.

![Protokoły zlewni](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Kiedy odwiedzasz stronę Dat w Beaker, pobierasz pliki. Witryna jest twoja, na zawsze. Możesz go zapisać, rozwikłać, zmodyfikować i udostępnić nową wersję za darmo. To wszystko open source.

Więc o tym właśnie chodzi: tworzymy przeglądarkę dla stron open source. Chcemy, aby był to zestaw narzędzi do hakowania społecznego.

## Kto powinien używać Beakera?

Hakery. Modyfikacje. Typy kreatywne. Ludzie, którzy lubią tankować.

## Jak utworzyć nowy projekt, który używa danych?

Mamy [narzędzie wiersza poleceń o nazwie bkr](https://github.com/beakerbrowser/bkr) , takie jak git + npm. Oto tworzenie witryny:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Witaj, świat!" > index.html
$ bkr publikuj
```

Oto rozwidlenie strony:

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Mój fork nie ma znaczenia dla poprzedniego indeksu. tml!" > index.html
$ bkr publikacja
```

Strony te są następnie hostowane z Twojej przeglądarki. To trochę jak BitTorrent; udostępniasz strony w siatce P2P.

Jeśli chcesz GUI, mamy kilka podstawowych narzędzi wbudowanych w przeglądarkę, ale przepychamy te narzędzia do użytkownika. To wszystko będzie aplikacjami użytkownika, które można modyfikować.

## Dlaczego zdecydowałeś się budować Beaker na Electron?

Było to oczywiste dla tego projektu. Jeśli sam rozwidliłbym Chrome, pisałbym teraz C+++! Nikt tego nie chce zrobić. Znam stos internetowy i mogę z nim szybko pracować. To nie ma mózgu.

Prawda jest taka, że nie jestem pewien, czy mogę to zrobić bez Electrona. To wspaniały kawałek oprogramowania.

## Jakie wyzwania stoją przed tobą podczas budowy Beakera?

Połowa z nich wpada na narzędzia i ukrywa się, jak bardzo mogę sobie porzucić.

Sama przeglądarka była dość łatwa. Electron jest praktycznie zestawem narzędzi do tworzenia przeglądarek. ...Z wyjątkiem kart przeglądarki; to zajęło mi zawsze prawo. W końcu złamałem się i nauczyłem się robić SVG. To znacznie lepiej szukać, ale zanim to zrobiłem, zajęło to 3 lub 4 iteracje.

## W jakich obszarach należy ulepszyć Electron?

Byłoby naprawdę świetne, gdybym mógł dokować narzędzia devtoolów wewnątrz widoku internetowego.

## Co nadchodzi w Beakerze?

Zabezpiecz nazwy DNS dla witryn Dat. Społecznie konfigurowalny schemat URL, zwany ["schematem aplikacji".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Więcej Dat API.

## Dla ludzi, którzy mogą być zainteresowani udziałem w projekcie, w jakich obszarach Beaker potrzebuje pomocy?

Mamy wiele otwartych spraw. Nie bój się pingować mnie. #beakerbrowser na Freenode. Trzymamy stronę [dla współtwórców](https://beakerbrowser.com/docs/team.html) a my do niej dodamy. A jeśli odwiedzisz Austin, kupię ci piwo.

## Jakiekolwiek wskazówki dla Electrona, które mogą być przydatne dla innych programistów?

1. Użyj narzędzia do budowy, które tam się znajduje. Nie chcesz wpadać na swoje własne rozwiązania, ufaj mnie. Użyj electron-builder. Użyj płyty kotłowej.
2. Jeśli potrzebujesz otworzyć problem w repozytorium Electrona, przejdź do dodatkowej mily, aby ułatwić jego odtworzenie. Otrzymasz odpowiedź znacznie szybciej, a zespół będzie ją wdzięczny. Jeszcze lepiej, spróbuj naprawić to sam. Doskonale interesujące jest widzenie wstawek.
3. Przeczytaj przez wszystkie przewodniki i zaawansowane dokumenty co najmniej raz.
4. Nie buduj przeglądarki, jest to rynek nasycony.

