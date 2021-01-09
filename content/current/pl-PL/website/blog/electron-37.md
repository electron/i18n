---
title: Co nowego w Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` zostało ostatnio [opublikowanych](https://github.com/electron/electron/releases) i zawiera duże ulepszenie z Chrome 47 do Chrome 49, a także kilka nowych podstawowych API. Ta najnowsza wersja zawiera wszystkie nowe funkcje wysłane w [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) i [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Obejmuje to niestandardowe właściwości CSS, zwiększone wsparcie [ES6](http://www.ecma-international.org/ecma-262/6.0/) , ulepszenia `Klawiatura` `Obiecaj` ulepszenia, i wiele innych nowych funkcji dostępnych w Twojej aplikacji Electron.

---

## Co nowego

### CSS Custom Properties

Jeśli używałeś wcześniej przetworzonych języków, takich jak Sass i Less, prawdopodobnie znasz *zmienne*, które pozwalają na zdefiniowanie wartości wielokrotnego użytku dla takich rzeczy jak schematy kolorów i układy. Zmienne pomagają zachować arkusze stylów DRY i bardziej konserwowalne.

Własne właściwości CSS są podobne do wstępnie przetworzonych zmiennych w tym sensie, że są one wielokrotnego użytku, ale mają również wyjątkową jakość, która sprawia, że są one jeszcze bardziej potężne i elastyczne: **mogą być manipulowane przy użyciu JavaScript**. Ta subtelna, ale potężna funkcja pozwala na dynamiczne zmiany interfejsów wizualnych, jednocześnie korzystając z [sprzętowego przyśpieszenia CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), i zmniejszone powielanie kodu pomiędzy Twoim głównym kodem i arkuszami stylów.

Aby uzyskać więcej informacji o niestandardowych właściwościach CSS, zobacz [artykuł MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) i [Google Chrome demo](https://googlechrome.github.io/samples/css-custom-properties/).

#### Zmienne CSS w akcji

Przechodźmy przez prosty przykład zmiennej, która może być ulepszona na żywo w Twojej aplikacji.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

Wartość zmiennej można pobrać i zmienić bezpośrednio w JavaScript:

```js
// Pobierz wartość zmiennej ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Ustaw wartość zmiennej na 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Wartości zmiennej mogą być również edytowane z sekcji **Style** narzędzi do tworzenia szybkich informacji zwrotnych i ulepszeń:

![Właściwości CSS w zakładce Style](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Właściwość

Chrome 48 dodał nową właściwość `kodu` dostępną na zdarzeniach `KeyEvent` które będą klawiszem fizycznym naciśniętym niezależnie od układu klawiatury systemu operacyjnego.

Powinno to sprawić, że implementacja skrótów klawiaturowych w Twojej aplikacji Electron będzie bardziej precyzyjna i spójna we wszystkich maszynach i konfiguracjach.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} was pressed.`)
})
```

Sprawdź [ten przykład](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) , aby zobaczyć go w akcji.

### Zdarzenia Odrzucenia Obiektów

Chrome 49 dodał dwa nowe `okno` , które pozwala na otrzymanie powiadomień, gdy odrzucone [Obiekt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) nie zostanie obsłużony.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise was unhandledled', event.promise, event.reason)
})

okno. ddEventListener('rejectionhandled', function (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

Sprawdź [ten przykład](https://googlechrome.github.io/samples/promise-rejection-events/index.html) , aby zobaczyć go w akcji.

### Aktualizacje ES2015 w V8

Wersja V8 obecnie w Electron zawiera [91 % ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Oto kilka interesujących dodatków, których możesz użyć poza polem - bez flagi lub kompilatorów:

#### Domyślne parametry

```js
mnożnik funkcji (x, y = 1) {
  return x * y
}

mnożnik(5) // 5
```

#### Destructuring assignment

Chrome 49 dodał [destrukturyzację przypisania](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) , aby ułatwić przypisywanie zmiennych i parametrów funkcji.

To sprawia, że Electron wymaga czystszego i bardziej kompaktowego przypisania teraz:

##### Proces przeglądarki wymaga

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Proces renderowania wymaga

```js
const {dialog, Tray} = require('electron').remote
```

##### Inne przykłady

```js
// Destrukturyzacja tablicy i pominięcie drugiego elementu
konst [pierwsze, , last] = findAll()

// Destrukturyzacja parametrów funkcji
whois({displayName: displayName, fullName: {firstName: name}}){
  consolle. og(`${displayName} to ${name}`)
}

let user = {
  displayName: "jdoe",
  Pełna nazwa: {
      imię: "John",
      Nazwisko: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destrukturyzacja obiektu
let {name, avatar} = getUser()
```

## Nowe API Electron

Poniżej znajduje się kilka nowych API Electrona, możesz zobaczyć każde nowe API w notatkach o wydaniu [wydań Electrona](https://github.com/electron/electron/releases).

#### `pokaż` i `ukryj` wydarzenia na `BrowserWindow`

Te wydarzenia są emitowane, gdy okno jest wyświetlane lub ukryte.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
. n('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `szablon platformy` w `aplikacji` dla `OS X`

To wydarzenie jest emitowane, gdy motyw [Ciemny tryb](https://discussions.apple.com/thread/6661740) systemu jest przełączony.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platforma motyw zmieniony). W trybie ciemnym? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` dla `OS X`

Ta metoda zwraca `tru` jeśli system jest w trybie ciemnym i `false` w przeciwnym razie.

#### `przewiń -touch-start` i `przewiń -touch-end` zdarzenia do BrowserWindow dla `OS X`

Zdarzenia te są emitowane po rozpoczęciu lub zakończeniu fazy zdarzenia koła przewijania.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

