---
title: Szukaj
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Witryna Electron ma nową wyszukiwarkę, która dostarcza natychmiastowe wyniki dla dokumentacji API, samouczków, pakietów npm związanych z elektronem i innych.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Zrzut ekranu w wyszukiwarce Electron">
  </a>
</figure>

---

Uczenie się nowej technologii lub ram takich jak Electron może być zastraszeniem. Po przejściu do fazy [szybkiego startu](https://github.com/electron/electron-quick-start) może być trudno poznać najlepsze praktyki, znajdź odpowiednie API lub odkryj narzędzia , które pomogą Ci zbudować aplikację marzeń. We want the Electron website to be a better tool for finding the resources you need to build apps faster and more easily.

Odwiedź dowolną stronę [electronjs.org](https://electronjs.org) i znajdziesz nowe dane wyszukiwania na górze strony.

## Wyszukiwarka

Kiedy po raz pierwszy ustawiamy dodanie wyszukiwarki do witryny, uruchomiliśmy naszą własną wyszukiwarkę za pomocą GraphQL jako zaplecza. GraphQL był przyjemny w pracy i wyszukiwarka była wydajna, ale szybko zdaliśmy sobie sprawę, że budowa wyszukiwarki nie jest błahym zadaniem. Sprawy takie jak wyszukiwanie wielosłowne i wykrywanie typografii wymagają dużo pracy aby się pogodzić. Zamiast ponownie wynaleźć koło, postanowiliśmy użyć istniejącego rozwiązania wyszukiwania: [Algolia](https://algolia.com).

Algolia jest hostowaną usługą wyszukiwania, która szybko stała się wybraną wyszukiwarką wśród popularnych projektów open source, takich jak React, Vue, Bootstrap, Yarn i [wiele innych](https://community.algolia.com/docsearch/).

Oto niektóre z funkcji, które sprawiły, że Algolia jest przydatna dla projektu Electrona:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) zapewnia wyniki w trakcie pisania, zazwyczaj w około 1 ms.
- [Tolerancja na Typo](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) oznacza, że nadal otrzymasz wyniki nawet gdy wpiszesz [`widnow`].
- [Zaawansowana składnia zapytania](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) umożliwia `"dokładnie cytowane mecze"` i `-wykluczenie`.
- [klienci API](https://www.algolia.com/doc/api-client/javascript/getting-started/) są otwartym źródłem i dobrze udokumentowane.
- [Analityka](https://www.algolia.com/doc/guides/analytics/analytics-overview/) powiedz nam, czego szukają najbardziej, jak również co szukają, ale nie znaleźli. Dzięki temu będziemy mogli zapoznać się z tym, jak można ulepszyć dokumentację Electrona.
- Algolia jest [darmowa dla projektów open source](https://www.algolia.com/for-open-source).

## API Docs

Czasami wiesz *co* chcesz osiągnąć, ale nie wiesz dokładnie *jak* to zrobić. Electron ma ponad 750 metod API, zdarzeń i właściwości. Żaden człowiek nie potrafi łatwo zapamiętać ich wszystkich, ale komputery są dobre w tych rzeczach. Korzystając z dokumentacji [JSON API Dokumentacji](https://electronjs.org/blog/api-docs-json-schema), zindeksowaliśmy wszystkie te dane w Algolii, i teraz możesz łatwo znaleźć dokładny API, którego szukasz.

Próbujesz zmienić rozmiar okna? Szukaj [`zmienić rozmiar`] i przeskocz prosto do metody, której potrzebujesz.

## Poradniki

Electron ma stale rozwijającą się kolekcję samouczków, które uzupełniają jego dokumentację API . Teraz możesz łatwiej znaleźć samouczki w danym temacie, bezpośrednio obok powiązanej dokumentacji API.

Szukasz najlepszych praktyk w zakresie bezpieczeństwa? Szukaj [`zabezpieczeń`].

## Pakiety npm

W rejestrze npm znajduje się ponad 700 000 pakietów i nie zawsze jest łatwe w znalezieniu tego, czego potrzebujesz. Aby ułatwić odkrycie tych modułów, utworzyliśmy [`electron-npm-pack`], kolekcja 3400+ modułów w rejestrze, które są budowane specjalnie do użytku z Electronem.

Ludzie w [Bibliotekach. o](https://libraries.io) utworzył [Rangę Źródłową](https://docs.libraries.io/overview.html#sourcerank), system oceny projektów oprogramowania oparty na kombinacji wskaźników, takich jak kod , społeczność, dokumentacja i użycie. Stworzyliśmy moduł [`sourceranks`] zawierający wynik każdego modułu w rejestrze npm, i wykorzystujemy te wyniki do sortowania wyników pakietu.

Chcesz alternatywy dla wbudowanych modułów IPC Electron? Szukaj [`is:package ipc`].

## Aplikacje korzystające z Electrona

[Łatwo indeksować dane z Algolia](https://github.com/electron/algolia-indices), , więc dodaliśmy listę istniejących aplikacji z [electron/apps](https://github.com/electron/apps).

Spróbuj wyszukać [`music`] lub [`homebrew`].

## Filtrowanie wyników

Jeśli wcześniej korzystałeś z wyszukiwania [kodu GitHub'a](https://github.com/search) , prawdopodobnie wiesz o swoich filtrach wartości kluczy rozdzielonych koloniami, takich jak `rozszerzenie:js` lub `użytkownik:defunkt`. Uważamy, że ta technika filtrowania jest dość potężna, więc dodaliśmy `to:` słowo kluczowe do wyszukiwania Electrona, które pozwala filtrować wyniki tylko jednego typu:

- [`is:api thumbnail`]
- [`jest:zabezpieczenie samouczka`]
- [`jest:pakiet ipc`]
- [`is:app graphql`]

## Nawigacja klawiatury

Ludzie uwielbiają skróty klawiaturowe! Nowe wyszukiwanie może być użyte bez użycia palców z klawiatury:

- <kbd>/</kbd> skupia wyszukiwanie na danych wejściowych
- <kbd>esc</kbd> skupia wyszukiwanie i usuwa je
- <kbd>dół</kbd> porusza się do następnego wyniku
- <kbd>w górę</kbd> przenosi się do poprzedniego wyniku lub do danych wejściowych wyszukiwania
- <kbd>enter</kbd> otwiera wynik

Otwarliśmy również moduł [](https://github.com/electron/search-with-your-keyboard/) , który umożliwia interakcję z klawiaturą. Jest przeznaczony do użytku z Algolią InstantSesearch ale jest uogólniony, aby włączyć kompatybilność z różnymi implementacjami wyszukiwania.

## Chcemy Twojej opinii

Jeśli napotkasz jakiekolwiek problemy z nowym narzędziem wyszukiwania, chcemy o tym usłyszeć!

Najlepszym sposobem na przesłanie opinii jest zgłoszenie problemu w serwisie GitHub w odpowiednim repozytorium:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) jest stroną Electron. Jeśli nie wiesz gdzie zgłosić problem, to Twój najlepszy zakład.
- [electron/algolia-indices](https://github.com/electron/algolia-indices) to miejsce, w którym wszystkie dane Electrona są kompilowane.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) sprawia, że interfejs wyszukiwania można nawigować za pomocą klawiatury.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) jest klientem po stronie przeglądarki, który umożliwia wyszukiwanie typu find-as-you.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) jest klientem Node.js do przesyłania danych na serwery Algolia.

## Dziękujemy

Specjalne podziękowania dla [Emily Jordan](https://github.com/echjordan) i [Vanessa Yuen](https://github.com/vanessayuenn) za budowanie nowych możliwości wyszukiwania, do [biblioteki. o](https://libraries.io) za dostarczenie [Wyniki Rankingu źródłowego](https://docs.libraries.io/overview.html#sourcerank) oraz zespołu w Algolii, aby pomóc nam zacząć. 🍹