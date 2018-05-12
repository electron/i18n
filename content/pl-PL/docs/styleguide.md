# Poradnik Formatowania Dokumentacji Electron

To są wytyczne do pisania dokumentacji Electron.

## Tytuły

* Każda strona musi zawierać pojedynczy `#`-poziomowy tytuł u góry.
* Rozdziały na tej samej stronie muszą mieć `##`-poziomowe tytuły.
* Podrozdziały muszą zwiększyć swą liczbę `#` w tytule zgodnie z głębokością zagnieżdżenia.
* Wszystkie słowa w tytule strony muszą być z wielkiej litery, poza spójnikami, takimi jak "i" oraz "z".
* Tylko pierwsze słowo tytułu rozdziału musi być z wielkiej litery.

Używając `Quick Start` jako przykładu:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

Istnieją wyjątki od tej reguły dla odwołań do API.

## Reguły Markdown

* Używaj `sh` zamiast `cmd` w code blocks (z powodu podświetlacza składni).
* Linie powinny być zawinięte na 80 kolumnie.
* Nie zagnieżdżaj więcej niż 2 poziomy listy. (we względu na moduł renderujący markdown).
* Wszystkie bloki kodu `js` i `javascript` są-lintowane z [standard-markdown](http://npm.im/standard-markdown).

## Wybieranie słów

* Używaj "will" zamiast "would" kiedy opisujesz wyniki.
* Preferuj "in the ___ process" poand "on".

## Odwołania API

Poniższe reguły zaliczają się tylko dla dokumentacji API.

### Tytuł strony

Każda strona musi używać nazwę obiektu zwracaną przez `require('electron')` jako tytuł, jak na przykład `BrowserWindow`, `autoUpdater`, oraz `session`.

Pod tytułem strony musi być jedno liniowy komentarz rozpoczynający się `>`.

Używając `session` jako przykład:

```markdown
# session

> Zarządzaj sesjami przeglądarki, ciasteczkami, cache, ustawieniami proxy, itd.
```

### Metody i zdarzenia modułu

Metody i zdarzenia modułu, który nie jest klasą muszą być wypisane pod `## metody` oraz `## zdarzenia`.

Używając `autoUpdater` jako przykładu:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Klasy

* Klasy API lub klasy które są częścią modułu muszą być wymienione pod rozdziałem `## Class: TheClassName`.
* Jedna strona może mieć wiele klas.
* Konstruktorzy muszą być wymienieni z`###`-tytułami poziomów.
* [Statyczne metody](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)muszą być wymienione pod`###Rozdziałem statycznych metod`.
* [Metody instancji](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) muszą być wymienione pod`###Rozdziałem metod instancji`.
* Wszystkie metody które mają wartość zwrotną muszą zacząć swój opis z "Zwrotami" `[TYPE]` - Przywróć opis" 
  * Jeśli metoda przywróci `obiekt`, to jego struktura może być specyfikowana używając dwukropka następującego po nowej linii, gdzie znajduje się niezamówiona lista wartości w tym samym stylu jak funkcje parametrów.
* Wydarzenia instancji muszą być wymienione pod `### Rozdział wydarzeń instancji `.
* Właściwości instancji muszą być wymienione pod `### Właściwości instancji` rozdział. 
  * Właściwości instancji muszą zaczynać się z "[Typ właściwości] ..."

Używając `Sesji` i <->Ciasteczek</code>klas jako przykład:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Metody

Rozdział "Metody" musi zachować podaną niżej formę:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Tytuł może być `###` lub `####` poziomowy zależnie od tego, czy jest to metoda modułu czy klasy.

Dla modułów, `objectName` jest nazwą modułu. Dla klas, to musi być nazwa wystąpienia klasy oraz nie może być taka sama jak nazwa modułu.

Na przykład, metody `sesji`klasy pod `sesją` modułu muszą używać `sesji`jako `Nazwa obiektu`.

Opcjonalne argumenty są notowane w nawiasach `[]` otoczonych opcjonalnymi argumentami zarówno jak wymagane przecinki jeśli opcjonalny argument następuje następuje przed następnym:

```sh
wymagane[. opcjonalnie]
```

Poniżej metoda jest bardziej szczegółowa na każdym argumencie. Typ argumentu jest notowany przez każdy z powszechnych typów:

* [`Ciąg tekstu`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Numer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Obiekt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Tablica`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Logiczny typ danych`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Lub wybrany tryp jak Electrony [`ZawartośćWitryny`](api/web-contents.md)

Jeśli argument lub metoda są unikalne dla poszczególnych platform, te platformy są oznaczone używając nieograniczonego miejsca wymieniając następujący typ danych używając kursywy. Values can be `macOS`, `Windows` or `Linux`.

```markdown
` ożywiony` Boolean (opcjonalnie) _macOS_ _Windows_ -Ożywić rzecz.
```

`Szyk` typ argumentów musi specyfikować co mają zawierać elementy szyku w poniższym opisie.

Opis dla `Funkcji`typ argumentów powinien wyjaśnić jak powinno się to nazywać oraz wymienić typy parametrów które będą do tego podane.

### Zdarzenia

Rozdział wydarzeń musi byc w następującej formie:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Tytuł może być `###` lub `###` poziomowy zależnie od tego, czy jest to metoda modułu czy klasy.

Argumenty wydarzenia muszą przestrzegać tych samych zasad co metody.

### Właściwości

Rozdział własności musi być w podanej formie:

```markdown
### session.defaultSession

...
```

Tytuł może być `###` lub `####`- poziomowy zależnie od tego, czy jest to metoda modułu czy klasy.

## Tłumaczenia dokumentacji

Zobacz [electron/i18n](https://github.com/electron/i18n#readme)