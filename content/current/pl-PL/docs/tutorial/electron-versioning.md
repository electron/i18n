# Wersjonowanie Electrona

> Szczegółowe spojrzenie na nasze zasady dotyczące wersjonowania i wdrażania.

Od wersji 2.0.0, Electron śledzi [semver](#semver). Poniższe polecenie zainstaluje najnowszą stabilną wersję Electron:

```sh
npm install --save-dev electron
```

Aby zaktualizować istniejący projekt aby użyć najnowszej stabilnej wersji:

```sh
npm install --save-dev electron@latest
```

## Wersja 1.x

Electron versions *< 2.0* did not conform to the [semver](https://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Wygodny dla programistów łączących funkcje, ale stwarza problemy dla programistów aplikacji klienckich. Cykle testów QA głównych aplikacji, takich jak Slack, Stride, Teams, Skype, VS Code, Atak, komputer biurkowy może być długotrwały, a stabilność jest bardzo pożądanym rezultatem. Istnieje wysokie ryzyko przyjęcia nowych funkcji podczas próby wchłonięcia poprawek błędów.

Oto przykład strategii 1.x:

![](../images/versioning-sketch-0.png)

Aplikacja stworzona z `1.8.1` nie może wziąć `1. .3` naprawia błąd bez absorbowania `1. .2` funkcja, lub poprzez wspieranie poprawki i utrzymywanie nowej linii wydania.

## Wersja 2.0 i poza nią

Poniżej przedstawiono kilka istotnych zmian w naszej strategii 1.x. Każda zmiana ma na celu zaspokojenie potrzeb i priorytetów programistów/opiekunów i twórców aplikacji.

1. Ścisłe użycie semestru
2. Wprowadzenie tagów `-beta`
3. Wprowadzenie [konwencjonalnych wiadomości zatwierdzenia](https://conventionalcommits.org/)
4. Dobrze zdefiniowane gałęzie stabilizacji
5. `główny` gałąź jest bezwersja; tylko gałęzie stabilizacji zawierają informacje o wersji

Omówimy szczegółowo jak działa rozgałęzianie gitów, jak działa znacznik npm, czego powinni oczekiwać deweloperzy i jak można wspierać zmiany w portach.

# semver

Począwszy od 2.0, Electron będzie śledził semestru.

Poniżej znajduje się tabela wyraźnie mapująca rodzaje zmian do odpowiadających im kategorii semver (np. poważny, drobny, łatwy).

| Większe przyrost wersji            | Drobne przyrost wersji           | Przyrost wersji             |
| ---------------------------------- | -------------------------------- | --------------------------- |
| Interfejs API Electrona            | Nieniszczące zmiany API Electron | Poprawki błędów Electron    |
| Node.js główne aktualizacje wersji | Aktualizacje wersji Node.js      | Aktualizacje wersji Node.js |
| Aktualizacje wersji Chromium       |                                  | stałe plastry chromowane    |

Zauważ, że większość aktualizacji Chromium będzie uważana za niszczącą. Naprawy które mogą być podparte będą prawdopodobnie wybierane jako plamy wiśni.

# Stabilizacja gałęzi

Oddziały stabilizujące to oddziały, które działają równolegle do mistrzowskiego, przyjmując tylko wierzchołkowe obiekty, które są związane z bezpieczeństwem lub stabilnością. Te gałęzie nigdy nie są scalane z powrotem do mistrza.

![](../images/versioning-sketch-1.png)

Od Electron 8, gałęzie stabilizacji są zawsze **główne** linie wersji, i nazwane na poniższy szablon `$MAJOR-x-y` e. . `8-x-y`.  Wcześniej używaliśmy linii wersji **minor** i nazwaliśmy je jako `$MAJOR-$MINOR-x` np. `2-0-x`

Zezwalamy na istnienie wielu gałęzi stabilizacji jednocześnie, i zamierzają przez cały czas wspierać co najmniej dwa równoległe elementy, w razie potrzeby wspierając poprawki zabezpieczeń. ![](../images/versioning-sketch-2.png)

Starsze linie nie będą obsługiwane przez GitHub, ale inne grupy mogą przejąć własność i wesprzeć stabilność i poprawki bezpieczeństwa. zniechęcamy do tego, ale zdajemy sobie sprawę, że ułatwia to życie wielu programistom aplikacji.

# Wersje beta i poprawki błędów

Deweloperzy chcą wiedzieć, które wydania są _bezpieczne_ do użycia. Nawet pozornie niewinne cechy mogą wprowadzać regresje w złożonych zastosowaniach. Jednocześnie zablokowanie w wersji stałej jest niebezpieczne, ponieważ ignorujesz poprawki zabezpieczeń i poprawki błędów, które mogły się pojawić od twojej wersji. Naszym celem jest dopuszczenie następujących standardowych zakresów semver w `package.json`:

* Użyj `~2.0.0` , aby przyznać tylko poprawki dotyczące stabilności lub bezpieczeństwa do wydania `2.0.0`.
* Użyj `^2.0.0` , aby przyznać nieprzerwaną _funkcjonalność_ , jak również poprawki zabezpieczeń i błędów.

Co ważne w drugim punkcie jest to, że aplikacje używające `^` powinny nadal być w stanie oczekiwać rozsądnego poziomu stabilności. Aby to osiągnąć, semver umożliwia _identyfikator przed wydaniem_ wskazywanie konkretnej wersji nie jest jeszcze _bezpieczny_ lub _stabilny_.

Bez względu na to, co wybierzesz, będziesz musiał okresowo podbić wersję w swoim `package.json` , ponieważ przełomowe zmiany są faktem życia Chromium.

Proces ten jest następujący:

1. Wszystkie nowe główne i mniejsze linie wydań zaczynają się od serii beta oznaczonej znacznikami przedwydania semver `beta.`, np. `2.0.0-beta.1`. Po pierwszej wersji beta kolejne wersje beta muszą spełniać wszystkie następujące warunki:
    1. Zmiana jest wstecznie kompatybilna z API (deprekacje są dozwolone)
    2. Ryzyko osiągnięcia naszego harmonogramu stabilności musi być niskie.
2. Jeśli dozwolone zmiany muszą być dokonane po wydaniu beta, są one stosowane i zwiększane znacznik prewydania . . `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. np. `2.0.0`. Po pierwszej stabilności, wszystkie zmiany muszą być zgodne z tyłem lub poprawkami zabezpieczeń.
4. Jeśli przyszłe poprawki błędów lub poprawki zabezpieczeń muszą być wykonane po wydaniu jest stabilne, zostały zastosowane, a wersja _patch_ jest zwiększona e. . `2.0.1`.

W szczególności oznacza to:

1. Dopuszczenie nieniszczących zmian API przed 3. tygodniem w cyklu beta jest w porządku, nawet jeśli zmiany te mogą powodować umiarkowane działania niepożądane
2. Przyznawanie zmian oznaczonych funkcją, które w inny sposób nie zmieniają istniejących ścieżek kodu, w większości punktów cyklu beta jest w porządku. Użytkownicy mogą wyraźnie włączyć te flagi w swoich aplikacjach.
3. Przyznanie funkcji dowolnego rodzaju po 3 tygodniach cyklu beta to 👎 bez bardzo dobrego powodu.

Dla każdego dużego i małego zderzaka należy spodziewać się czegoś takiego:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Przykładowy cykl życia na zdjęciach:

* Utworzona jest nowa gałąź wydania, która zawiera najnowszy zestaw funkcji. Jest on opublikowany jako `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* Naprawa błędu pojawia się w systemie nadrzędnym, który może być wspierany do gałęzi wydania. Plaster jest przyklejony, a nowa wersja beta jest opublikowana jako `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* beta jest uważana za _na ogół stabilną_ i jest publikowana ponownie jako niebeta poniżej `2.0.0`. ![](../images/versioning-sketch-5.png)
* Później zostanie ujawniony zerowy exploit, a naprawa jest stosowana do mistrza. Wspieramy poprawkę do linii `2-0-x` i wydajemy `2.0.1`. ![](../images/versioning-sketch-6.png)

Kilka przykładów jak różne zakresy semver będą odbierać nowe wersje:

![](../images/versioning-sketch-7.png)

# Brakujące funkcje: Alphas

Nasza strategia ma kilka kompromisów, które na razie uważamy za właściwe. Najważniejsze, że nowe funkcje w głównej mogą zająć trochę zanim osiągnie stabilną linię wydania. Jeśli chcesz natychmiast wypróbować nową funkcję, będziesz musiał sama zbudować Electron.

W przyszłości możemy wprowadzić jeden lub oba z poniższych elementów:

* uwalniania alfa, które mają ograniczenia stabilności luźnej w stosunku do wartości beta; na przykład dopuszczalne byłoby dopuszczenie nowych funkcji, podczas gdy kanał stabilności znajduje się w _alfa_

# Flagi funkcji

Flagi funkcji są powszechną praktyką w Chromie i są ugruntowane w ekosystemie rozwoju sieci. W kontekście Electron znacznik funkcji lub **miękka gałąź** musi mieć następujące właściwości:

* jest włączona/wyłączona w czasie pracy lub w czasie budowy; nie obsługujemy koncepcji flagi funkcji przeskalowanej na żądanie
* całkowicie segmentuje nowe i stare ścieżki kodu; refaktoring starego kodu do obsługi nowej funkcji _narusza_ kontrakt na flagę funkcji
* flagi funkcji zostaną ostatecznie usunięte po wydaniu funkcji

# Zatwierdzenia semantyczne

Staramy się zwiększyć przejrzystość na wszystkich szczeblach procesu aktualizacji i wydawania. Zaczynając od `2.0.0` będziemy wymagali pull requestów zgodnie z specyfikacją [Commity konwencjonalne](https://conventionalcommits.org/) , którą można podsumować w następujący sposób:

* Komendy, które spowodowałyby semer **główny** zderzak, muszą rozpocząć swoje ciało od `ZMIANY BREAKU:`.
* Komendy, które będą skutkować semerem **minor** bump muszą zaczynać się od `feat:`.
* Komendy, które spowodują naprężenie **patch** zrzut musi zaczynać się od `poprawki:`.

* Zezwalamy na zgniatanie commitów, pod warunkiem że ściskana wiadomość będzie zgodna z powyższym formatem wiadomości.
* Dopuszczalne jest, aby niektóre commity w pull request nie zawierały semantycznego przedrostka, tak długo, jak tytuł pull request zawiera sensowną semantyczną wiadomość.

# Wersja `mistrza`

- Oddział `główny` będzie zawsze zawierać następną główną wersję `X.0.0-nightly.DATE` w `package.json`
- Oddziały wydania nigdy nie są scalane z powrotem do mistrza
- Wydaj gałęzie __ zawierają poprawną wersję w ich `package.json`
- Natychmiast po przecięciu gałęzi uwalniającej dla głównego kapitana należy zrzucić do następnego głównego.  Tj. `mistrz` jest zawsze wersją jako następna teoretyczna gałąź wydania
