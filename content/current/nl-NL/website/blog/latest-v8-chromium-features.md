---
title: Gebruik V8 en Chromium functies in Electron
author: jlord
date: '2016-01-07'
---

Het maken van een Electron applicatie betekent dat je maar één codebase en ontwerp voor één browser hoeft te maken, wat heel handig is. Maar omdat Electron up to date blijft met [Node. s](http://nodejs.org) en [Chromium](https://www.chromium.org) terwijl ze vrijkomen, kun je ook gebruik maken van de geweldige functies waarmee ze schip. In sommige gevallen elimineert dit eventueel afhankelijkheden die u eerder nodig had om op te nemen in een webapp.

---

Er zijn veel functies en wij zullen er hier enkele als voorbeelden uitlichten, maar als je geïnteresseerd bent in het leren over alle functies, kun je de [Google Chromium blog](http://blog.chromium.org) en [Node in de gaten houden. s changelogs](https://nodejs.org/en/download/releases). Je kunt zien welke versies van Node.js, Chromium en V8 Electron gebruiken op [electronjs.org/#electron-version](https://electronjs.org/#electron-versions).

## ES6 ondersteuning via V8

Electron combineert Chromium's rendering library met Node.js. De twee delen dezelfde JavaScript-engine, [V8](https://developers.google.com/v8). Veel ECMAScript 2015 (ES6) functies zijn al ingebouwd in V8, wat betekent dat u ze in uw Electron applicatie kunt gebruiken zonder compilers.

Hieronder staan enkele voorbeelden, maar je kunt ook klassen (in strikte modus), blok toepassingsgebied, beloften, getypte arrays en meer. Bekijk [deze lijst](https://nodejs.org/en/docs/es6/) voor meer informatie over de ES6 functies in V8.

**Pijl functies**

```js
findTime () => {
  console.log(new Date())
}
```
**String interpolatie**

```js
var octocat = "Mona Lisa";
console.log(`De naam van de octocat's is ${octocat}`);
```

**New Target**

```js
Oktober () => {
  als (!new.target) "Niet nieuw";
  console. og("New Oktocat");
}

// Geld
Oktokens ();
// Logs
new Oktocat();
```

**Array bevat**

```js
 // Retourneert waar
[1, 2].includes(2);
```

**Rust parameters**

```js
// Vertegenwoordigt het onbepaalde aantal argumenten als een array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Chromium functies

Dankzij al het harde werk dat Google en bijdragers in Chrome hebben gestoken, wanneer je Electron apps maakt, kun je ook coole dingen gebruiken (zoals (maar niet beperkt to):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Ophalen API Streaming](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Volg samen met de [Google Chromium blog](http://blog.chromium.org) om meer te weten te komen over functies als nieuwe versies schip en opnieuw. je kunt de versie van Chromium controleren die Electron [hier gebruikt](https://electronjs.org/#electron-versions).

## Waar ben je enthousiast over?

Tweet tegen ons [@ElectronJS](https://twitter.com/electronjs) met je favoriete functies ingebouwd in V8 of Chromium.

