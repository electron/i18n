---
title: V8 und Chromium Funktionen in Electron verwenden
author: jörn
date: '2016-01-07'
---

Das Erstellen einer Electron-Anwendung bedeutet, dass Sie nur eine Codebase und ein Design für einen Browser erstellen müssen, was ziemlich praktisch ist. Aber weil Electron mit [Knoten auf dem Laufenden bleibt. s](http://nodejs.org) und [Chromium](https://www.chromium.org) während sie freigeben, nutzen Sie auch die großartigen Funktionen, mit denen sie verschiffen. In einigen Fällen werden Abhängigkeiten beseitigt, die Sie zuvor vielleicht in eine Web-App einbinden mussten.

---

Es gibt viele Funktionen und wir werden einige hier als Beispiele behandeln, aber wenn Sie daran interessiert sind, über alle Funktionen zu erfahren, können Sie den [Google Chromium Blog](http://blog.chromium.org) und [Knoten im Auge behalten. s Changelogs](https://nodejs.org/en/download/releases). Sie können unter [electronjs.org/#electron-Versionen](https://electronjs.org/#electron-versions) sehen, welche Versionen von Node.js, Chromium und V8 Electron verwenden.

## ES6 Unterstützung durch V8

Electron kombiniert Chromiums Rendering-Bibliothek mit Node.js. Die beiden teilen die gleiche JavaScript-Engine, [V8](https://developers.google.com/v8). Viele Funktionen von ECMAScript 2015 (ES6) sind bereits in V8 integriert, was bedeutet, dass Sie sie in Ihrer Electron-Anwendung ohne Compiler verwenden können.

Unten finden Sie ein paar Beispiele, aber Sie können auch Klassen (im strikten Modus), Blockskopie, Versprechungen, getippte Arrays und vieles mehr. Siehe [diese Liste](https://nodejs.org/en/docs/es6/) für weitere Informationen zu ES6-Funktionen in V8.

**Pfeilfunktionen**

```js
findTime () => {
  console.log(new Date())
}
```
**String-Interpolation**

```js
var octocat = "Mona Lisa";
console.log(`Der Name der octocat ist ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console. og("Neuer Oktober");
}

// Wurfe
Oktokat();
// Protokolle
neue Oktokat();
```

**Array beinhaltet**

```js
 // Gibt true
[1, 2].includes(2);
```

**Erholungsparameter**

```js
// Zeigt unbestimmte Anzahl von Argumenten als Array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Chromium-Funktionen

Dank der harten Arbeit von Google und seinen Mitwirkenden in Chromium, wenn du Electron-Apps baust, kannst du auch coole Dinge wie (aber nicht beschränkt auf):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [API Streaming abrufen](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Folgen Sie zusammen mit dem [Google Chromium Blog](http://blog.chromium.org) um mehr über Funktionen als neue Versionen zu erfahren Sie können die Version von Chromium, die von Electron verwendet [hier](https://electronjs.org/#electron-versions) überprüfen.

## Wovon sind Sie begeistert?

Tweet Sie bei uns [@ElectronJS](https://twitter.com/electronjs) mit Ihren bevorzugten Funktionen, die in V8 oder Chromium integriert sind.

