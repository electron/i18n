---
title: Folosește funcțiile V8 și Chromium în Electron
author: Jlord
date: '2016-01-07'
---

Construirea unei aplicații Electron înseamnă că trebuie doar să creezi un singur codebază și design pentru un singur browser, ceea ce este destul de util. Dar pentru că Electron rămâne la curent cu [Node. s](http://nodejs.org) și [Chromium](https://www.chromium.org) în timp ce se eliberează, poți folosi și caracteristicile grozave cu care navighează. În unele cazuri, acest lucru elimină dependențele pe care ar fi trebuit să le includeți anterior într-o aplicație web.

---

Sunt multe caracteristici şi vom prezenta aici câteva exemple, dar dacă ești interesat să afli despre toate caracteristicile, poți să fii atent pe blogul [Google Chromium](http://blog.chromium.org) și [Node. s changelogs](https://nodejs.org/en/download/releases). Poți vedea ce versiuni de Node.js, Chromium și V8 Electron folosesc la [electronjs.org/#electron-versiuni](https://electronjs.org/#electron-versions).

## Sprijin ES6 prin V8

Electron combină biblioteca Chromium cu Node.js. Cei doi au același motor JavaScript, [V8](https://developers.google.com/v8). Multe caracteristici ECMAScript 2015 (ES6) sunt deja incluse în V8, ceea ce înseamnă că le poți folosi în aplicația ta Electron fără niciun compilator.

Mai jos sunt câteva exemple, dar poți obține clase (în mod strict), blocări ale scopului, promisiuni, array-uri tastate și multe altele. Vezi [această listă](https://nodejs.org/en/docs/es6/) pentru mai multe informații despre funcțiile ES6 din V8.

**Funcţii săgeată**

```js
findTime () => {
  console.log(noua Date())
}
```
**Interpolare String**

```js
var octocat = "Mona Lisa";
console.log(`Numele caracatiţei este ${octocat}`);
```

**New Target**

```js
Octocat() => {
  dacă (!new.target) aruncați "Not new";
  consolă. Câine ("Caracatiță nouă");
}

// Arjii
Caracatiță();
// Loguri
o nouă Caracatiță();
```

**Array include**

```js
 // Returnează adevărat
[1, 2].includes(2);
```

**Parametri reci**

```js
// Reprezintă un număr nedefinit de argumente ca un array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Caracteristici Crom

Mulţumită muncii asidue pe care Google şi colaboratorii au depus-o în Chromium, când construiești aplicații Electron poți folosi, de asemenea, lucruri grozave ca (dar fără a te limita la):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Preia streaming API](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Urmăriți împreună cu blog-ul [Google Chromium](http://blog.chromium.org) pentru a afla despre caracteristici ca noua navă a versiunilor și din nou poți verifica versiunea de Chromium pe care Electron o folosește [aici](https://electronjs.org/#electron-versions).

## De ce ești entuziasmat?

Trimite-ne un tweet [@ElectronJS](https://twitter.com/electronjs) cu caracteristicile tale favorite integrate în V8 sau Chromium.

