---
title: Utilizzare le caratteristiche V8 e cromo in Electron
author: jlord
date: '2016-01-07'
---

Costruire un'applicazione Electron significa che è solo necessario creare un codebase e design per un browser, che è abbastanza utile. Ma perché Electron rimane aggiornato con [Node. s](http://nodejs.org) e [Chromium](https://www.chromium.org) mentre rilasciano, si arriva anche a fare uso delle grandi caratteristiche con cui spediscono. In alcuni casi questo elimina le dipendenze che potresti aver bisogno in precedenza di includere in una web app.

---

Ci sono molte caratteristiche e ne copriremo alcune qui ad esempio, ma se sei interessato a conoscere tutte le funzionalità puoi tenere d'occhio il blog [Google Chromium](http://blog.chromium.org) e [Node. s changelogs](https://nodejs.org/en/download/releases). Puoi vedere quali versioni di Node.js, Chromium e V8 Electron usano su [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## Sostegno ES6 tramite V8

Electron combina la libreria di rendering di Chromium con Node.js. I due condividono lo stesso motore JavaScript, [V8](https://developers.google.com/v8). Molte funzionalità ECMAScript 2015 (ES6) sono già integrate in V8 e ciò significa che è possibile utilizzarle nell'applicazione Electron senza alcun compilatore.

Di seguito sono riportati alcuni esempi, ma è anche possibile ottenere classi (in modalità rigorosa), ambito di blocco, promesse, array tipizzati e altro ancora. Dai un'occhiata a [questa lista](https://nodejs.org/en/docs/es6/) per maggiori informazioni sulle funzionalità di ES6 in V8.

**Funzioni Freccia**

```js
findTime () => {
  console.log(new Date())
}
```
**Interpolazione Stringa**

```js
var octocat = "Mona Lisa";
console.log(`Il nome dell'octocat è ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console. og("New Octocat");
}

// Lancia
Octocat();
// Logs
new Octocat();
```

**Array Include**

```js
 // Restituisce true
[1, 2].includes(2);
```

**Parametri Di Riposo**

```js
// Rappresenta il numero indefinito di argomenti come array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Caratteristiche Di Cromo

Grazie a tutto il duro lavoro di Google e collaboratori messi in Chromium, quando si costruiscono applicazioni Electron è anche possibile utilizzare cose interessanti come (ma non limitato a):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Recupera Streaming Api](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Segui con il blog [Google Chromium](http://blog.chromium.org) per conoscere le caratteristiche come le nuove versioni spediscono e ancora, è possibile controllare la versione di Chromium che Electron utilizza [qui](https://electronjs.org/#electron-versions).

## Di cosa siete emozionati?

Tweet to us [@ElectronJS](https://twitter.com/electronjs) with your favorite features built in V8 or Chromium.

