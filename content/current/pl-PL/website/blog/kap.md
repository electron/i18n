---
title: 'Projekt Tygodnia: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '2017-01-31'
---

Społeczność Electrona szybko rośnie, a ludzie tworzą potężne nowe aplikacje i narzędzia w zaskakującym tempie. Aby uczcić ten kreatywny impuls i informować społeczność o niektórych z tych nowych projektów, zdecydowaliśmy się rozpocząć tygodniową serię blogów zawierającą godne uwagi projekty związane z Electronem.

---

Ten post jest pierwszym z serii i funkcje [Kap](https://getkap.co/), otwarto-źródłową aplikację do nagrywania ekranu zbudowaną przez [Wulkano](https://wulkano.com/), geodistrybutowany zespół projektantów i programistów.

[![Kap Screencast](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Co to jest Kap?

[Kap to rejestrator ekranu open source](https://getkap.co) zbudowany przede wszystkim dla projektantów i programistów do łatwego przechwytywania ich pracy. Ludzie używają tego, aby dzielić się animowanymi prototypami, dokumentować błędy, tworzyć głupie GIFy i wszystko między nimi.

Widzieliśmy, jak ludzie w każdym wieku i tła używają ich w ustawieniach edukacyjnych, ekranach, samouczkach... lista trwa dalej. Nawet aby tworzyć zasoby produkcyjne! Jesteśmy całkowicie wysadzeni przez to, jak dobrze otrzymaliśmy nasz niewielki projekt poboczny.

## Dlaczego go zbudowałeś?

To bardzo dobre pytanie, nie jest takie jak brak rejestratorów ekranu! Uważaliśmy, że alternatywy były zbyt skomplikowane, zbyt kosztowne lub zbyt ograniczone. Nic nie czuło się *po prostu* na nasze codzienne potrzeby. Uważamy również, że jest to świetne, gdy narzędzia, których używamy do wykonywania naszej pracy, są otwartym oprogramowaniem, w ten sposób każdy może pomóc w ich kształtowaniu. [Budynek Kap w końcu był tak samo w tym, co nie zrobiliśmy](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). To wszystko w szczegółach, gromadzenie niewielkich ulepszeń, które stały się zarysem narzędzia, z którego chcieliśmy skorzystać.

Jednak i być może najważniejsze, Kap stał się dla nas miejscem, aby pozostawić nasze obawy w drzwiach i po prostu bawić się budować coś dla siebie i dla ludzi takich, jak my. Jest to tak ważne, aby stworzyć środowisko, w którym po prostu dotrzesz do siebie, wypróbuj nowe cienki i ciesz się swoim tworzeniem. Brak wymogów, brak nacisku, brak oczekiwań. Czy projektanci i deweloperzy powinni wziąć udział w projektach? Dlaczego, tak. Tak, powinny.

## Dlaczego zdecydowałeś się budować Kap na Electron?

Było wiele powodów:

* Technologia internetowa
* Większość drużyn to twórcy stron internetowych
* Jesteśmy inwestowani w JavaScript
* Otwiera drzwi dla większej liczby ludzi do wniesienia wkładu
* Sam Electron jest otwartym oprogramowaniem
* Moc i łatwe do utrzymania moduły `node_modules`
* Możliwości międzyplatformowe

Uważamy, że przyszłość aplikacji jest w przeglądarce, ale nie jesteśmy jeszcze w tym miejscu. Electron jest ważnym krokiem w drodze do tej przyszłości. To nie tylko sprawia, że same aplikacje stają się bardziej dostępne, ale także kod, z którym są zbudowane. Interesujące myślenie wyobraża sobie przyszłość, w której system operacyjny jest przeglądarką, a zakładki są głównie aplikacjami Electron.

Dodatkowo, będąc głównie twórcami stron internetowych, jesteśmy wielkimi fanami izomorficznego charakteru JavaScript, w ten sposób możesz uruchomić JS na kliencie, serwerze i teraz na komputerze. Dzięki technologiom internetowym (HTML, CSS i JS), wiele rzeczy jest znacznie prostszych niż natywne: Szybsze prototypowanie, mniej kodu, flexbox > auto-layout (macOS/iOS).

## Jakie wyzwania stoją przed tobą podczas budowy Kapsu?

Korzystanie z zasobów Electron jest dostępne do nagrywania ekranu, które stanowiło największe wyzwanie. Po prostu nie byli wystarczająco wydajni, aby spełnić nasze wymagania i sprawili, że projekt okaże się porażką w naszych oczach. Chociaż nie ma żadnej winy samego Electrona, nadal istnieje przepaść między natywnym rozwojem a budowaniem aplikacji stacjonarnych z wykorzystaniem technologii internetowej.

Spędziliśmy mnóstwo czasu próbując pracować wokół słabej wydajności `getUserMedia` API - problem pochodzący z Chromium. Jednym z naszych głównych celów, kiedy zamierzamy stworzyć Kapa, było zbudowanie całej aplikacji przy użyciu technologii internetowej. Po próbie wszystkiego, co mogliśmy zrobić (minimalnym wymogiem jest 30 FPS na ekranie Retina), ostatecznie musieliśmy znaleźć inne rozwiązanie.

## Widzę kod Swift w repozytorium. O co to chodzi?

Będąc zmuszony szukać alternatyw dla `getUserMedia`, rozpoczęliśmy eksperymentowanie z `ffmpeg`. Oprócz tego, że jest to jedno z najlepszych narzędzi do konwersji dźwięku i wideo, posiada on funkcję nagrywania ekranu w prawie każdym systemie operacyjnym, i byliśmy w stanie nagrywać wideo z chippy spełniające nasz minimalny wymóg 30 FPS na ekranie Retina. Problem? Wydajność to ":weary:", użycie procesora przebiegało haywire. Wróciliśmy więc do tablicy rysunkowej, dyskutowaliśmy o naszych możliwościach i zdawaliśmy sobie sprawę, że musimy osiągnąć kompromis. Dzięki temu [Aperture](https://github.com/wulkano/aperture), nasza biblioteka nagrywania ekranu dla macOS napisana w Swift.

## W jakich obszarach należy ulepszyć Electron?

Wszyscy wiemy, że aplikacje Electron mogą mieć coś do użycia w pamięci RAM, ale znów to naprawdę to jest Chromium. Jest to część tego, jak działa i naprawdę zależy od tego, co działasz, na przykład Kap i Hyper zazwyczaj używają mniej niż 100 MB pamięci.

Jednym z największych ulepszeń, jakie widzimy, jest obciążenie użytkowe, w szczególności to, jak Electron dystrybuuje Chromium. Jednym z pomysłów byłoby posiadanie współdzielonego rdzenia Electrona i sprawdzenie czy instalatorzy aplikacji są już obecni w systemie.

Tworzenie międzyplatformowych aplikacji Electron może być lepszym doświadczeniem. W tej chwili istnieje zbyt wiele niespójności, specyficznych dla platformy API i brakujących funkcji pomiędzy platformami, co sprawia, że Twoja baza kodowa jest ścierana z instrukcjami if-w przeciwnym razie. Na przykład vibrancy jest obsługiwana tylko na macOS, auto-updater działa inaczej na macOS i Windows, a nawet nie jest obsługiwany na Linux. Przejrzystość jest trafieniem lub przegapieniem na Linuksie, zazwyczaj brakuje.

Łatwiej byłoby również nazywać natywnymi interfejsami API. Electron posiada bardzo dobry zestaw API, ale czasami potrzebujesz funkcjonalności, której nie zapewni. Stworzenie natywnego dodatku Node.js jest opcją, ale praca jest bolesna. Najlepiej byłoby, gdyby Electron prowadził statek z dobrym interfejsem API [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) , jak [`szybkie połączenie`](https://github.com/cmake-js/fastcall). To umożliwiłoby nam zapisanie części Swift w JavaScript.

## Jakie są twoje ulubione rzeczy o Electron?

Naszą ulubioną rzeczą jest łatwy fakt, że każdy, kto posiada wiedzę na temat tworzenia sieci, może budować i przyczyniać się do tworzenia wieloplatformowych rdzennych doświadczeń. Nie wspominając o łatwości i radości rozwoju na tym obszarze, doskonałej dokumentacji i dobrze prosperującego ekosystemu.

Z perspektywy front-end budowanie Kap nie odczuło się inaczej niż tworzenie prostej strony internetowej za pomocą interfejsu API przeglądarki. Electron doskonale wykonuje zadanie polegające na tym, by rozwój aplikacji był podobny (zasadniczo identyczny) do rozwoju sieci. Tak proste jest, że nie ma potrzeby tworzenia ram ani podobnych, aby nam pomóc, po prostu czyste i modułowe JS i CSS.

Jesteśmy również ogromnymi kibicami zespołu, który buduje, ich poświęcenie i wsparcie oraz utrzymywana przez nich aktywna i przyjazna społeczność. Uściski dla Ciebie wszystkich!

## Co nadchodzi w Kapsu?

Kolejnym krokiem dla nas jest sprawdzenie aplikacji w przygotowaniach do naszej wersji 2.0. kamień milowy, który zawiera przekreślenie React oprócz wsparcia dla wtyczek, umożliwiając programistom rozszerzenie funkcjonalności Kap! Zapraszamy wszystkich do obserwowania projektu i udziału w naszym [repozytorium GitHub](https://github.com/wulkano/kap). Słuchamy i chcemy usłyszeć od tak wielu z Państwa, jak to możliwe, [daj nam znać, jak możemy sprawić, że Kap będzie najlepszym narzędziem dla Ciebie](https://wulkano.typeform.com/to/BIvJKz)!

## Czym jest Wulkano?

[Wulkano](https://wulkano.com) to studio projektowe i cyfrowe kolektywne, zespół technologii zdalnych, którzy uwielbiają pracować wspólnie zarówno nad giganami, jak i naszymi własnymi projektami. Jesteśmy rozproszoną, ale ciasną grupą ludzi z różnych miejsc i środowisk, dzielącą się wiedzą, pomysłami, doświadczeniami, ale co najważniejsze, głupie GIFy i memy w naszym wirtualnym biurze (które dzieje się czarno z Electron!).

## Jakiekolwiek wskazówki dla Electrona, które mogą być przydatne dla innych programistów?

Wykorzystaj i weź udział w fantastycznej społeczności [](https://discuss.atom.io/c/electron), sprawdź [Awesome Electron](https://github.com/sindresorhus/awesome-electron), spójrz na [przykłady](https://github.com/electron/electron-api-demos) i wykorzystaj wspaniałe dokumenty [](https://electronjs.org/docs/)!

