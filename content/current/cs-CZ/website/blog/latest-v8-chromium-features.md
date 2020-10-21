---
title: Použít funkce V8 a Chromu v Electronu
author: jlord
date: '2016-01-07'
---

Vytváření Electron aplikace znamená, že stačí pouze vytvořit jednu kódovou databázi a návrh pro jeden prohlížeč. Ale protože Electron zůstává aktuální s [Node. s](http://nodejs.org) a [Chromiem](https://www.chromium.org) během svého vydání, můžete také využít skvělých funkcí, se kterými cestují. V některých případech to eliminuje závislosti, které jste dříve potřebovali k začlenění do webové aplikace.

---

Existuje mnoho funkcí a některé z nich zde jako příklad pokryjeme. ale pokud máte zájem učit se o všech funkcích, můžete sledovat [Google Chromium blog](http://blog.chromium.org) a [Node. s seznam změn](https://nodejs.org/en/download/releases). Můžete vidět, jaké verze Node.js, Chromium a V8 Electron používají na [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## ES6 Podpora prostřednictvím V8

Electron kombinuje Chromium knihovnu vykreslování s Node.js. Dva sdílejí stejný JavaScript engine, [V8](https://developers.google.com/v8). Mnoho funkcí ECMAScript 2015 (ES6) je již zabudováno do V8, což znamená, že je můžete použít ve vaší Electronové aplikaci bez kompilátorů.

Níže je několik příkladů, ale můžete také získat třídy (v přísném módu), blokování, sliby, zadaná pole a další. Podívejte se na [tento seznam](https://nodejs.org/en/docs/es6/) pro více informací o vlastnostech ES6 ve V8.

**Funkce šipky**

```js
findTime () => {
  console.log(new Date())
}
```
**Interpolace řetězců**

```js
var oktocat = "Mona Lisa";
console.log(`The octocat name is ${octocat}`);
```

**New Target**

```js
Oktocat() => {
  pokud (!new.target) hodí "Not new";
  konzola. og("New Oktocat");
}

// Šipky
Oktocat();
// Logs
nové Oktocat();
```

**Pole zahrnuje**

```js
 // vrací pravdu
[1, 2].includes(2);
```

**Parametry odpočinku**

```js
// Reprezentovat neurčitý počet argumentů jako pole
(o, c, ...args) => {
  console.log(args.length)
}
```

## Vlastnosti chromu

Díky veškeré tvrdé práci Google a přispěvatelů vložených do Chromia, když budujete Electron aplikace, můžete také použít skvělé věci jako (ale ne omezené):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Načíst API vysílání](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Follow along with the [Google Chromium blog](http://blog.chromium.org) to learn about features as new versions ship and again, you can check the version of Chromium that Electron uses [here](https://electronjs.org/#electron-versions).

## Co jste nadšeni?

Tweetujte k nám [@ElectronJS](https://twitter.com/electronjs) s vašimi oblíbenými funkcemi zabudovanými do V8 nebo Chromium.

