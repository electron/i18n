---
title: Użyj funkcji V8 i Chromium w Electronie
author: jlord
date: '2016-01-07'
---

Budowanie aplikacji Electron oznacza, że musisz tylko utworzyć jedną ebazę kodową i projekt dla jednej przeglądarki, co jest dość przydatne. Ale ponieważ Electron pozostaje na bieżąco z [Node. s](http://nodejs.org) i [Chromium](https://www.chromium.org) w momencie wydania, możesz również korzystać z wspaniałych funkcji, z którymi wysyłają. W niektórych przypadkach eliminuje to zależności, które wcześniej musiałeś uwzględnić w aplikacji internetowej.

---

Istnieje wiele funkcji, a my omówimy kilka tutaj jako przykłady, ale jeśli jesteś zainteresowany poznaniem wszystkich funkcji, możesz mieć oko na [Google Chromium blog](http://blog.chromium.org) i [Node. s dzienniki zmian](https://nodejs.org/en/download/releases). Możesz zobaczyć, jakie wersje Node.js, Chromium i V8 Electron używają na [electronjs.org/#electron-version](https://electronjs.org/#electron-versions).

## Wsparcie ES6 poprzez V8

Electron łączy bibliotekę renderowania Chromium z Node.js. Te dwa mają ten sam silnik JavaScript, [V8](https://developers.google.com/v8). Wiele funkcji ECMAScript 2015 (ES6) jest już wbudowanych w V8, co oznacza, że możesz ich używać w swojej aplikacji Electron bez kompilatorów.

Poniżej znajduje się kilka przykładów, ale możesz również uzyskać klasy (w trybie ścisłym), zakres bloków, obietnice, wpisane tablice i wiele więcej. Sprawdź [tę listę](https://nodejs.org/en/docs/es6/) , aby uzyskać więcej informacji na temat funkcji ES6 w V8.

**Funkcje strzałki**

```js
findTime () => {
  console.log(nowa data())
}
```
**Interpolacja tekstów**

```js
var octocat = "Mona Lisa";
console.log(`Nazwa oktocat to ${octocat}`);
```

**New Target**

```js
Oktokat() => {
  jeśli (!new.target) rzuca "Not new";
  konsola. og("New Octocat");
}

// Rzuty
Octocat();
// Logs
new Octocat();
```

**Tablica zawiera**

```js
 // Zwraca wartość true
[1, 2].uje(2);
```

**Parametry odpoczynku**

```js
// Przedstawienie nieokreślonej liczby argumentów jako tablicy
(o, c, ...args) => {
  console.log(args.length)
}
```

## Funkcje chromu

Dzięki całej ciężkiej pracy Google i współtwórcy wprowadzeni do Chromium, kiedy budujesz aplikacje Electrona, możesz również używać fajnych rzeczy takich jak (ale nie tylko):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Pobierz strumieniowanie API](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Śledź razem z [blogiem Google Chromium](http://blog.chromium.org) , aby dowiedzieć się więcej o funkcjach jako nowych wersjach wysyłanych i ponownie, możesz sprawdzić wersję Chromium używaną przez Electron [tutaj](https://electronjs.org/#electron-versions).

## Czego jesteś podekscytowany?

Tweetuj do nas [@ElectronJS](https://twitter.com/electronjs) ze swoimi ulubionymi funkcjami wbudowanymi w V8 lub Chromium.

