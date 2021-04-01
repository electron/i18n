---
title: Von nativ bis JavaScript in Electron
author: codebytere
date: '2019-03-19'
---

Wie kommen die in C++ oder Objective-C geschriebenen Funktionen von Electronic nach JavaScript, damit sie einem Endbenutzer zur Verfügung stehen?

---

## Hintergrund

[Electron](https://electronjs.org) ist eine JavaScript-Plattform, deren Hauptziel es ist, die Barriere für Entwickler zu verringern, um robuste Desktop-Apps zu bauen, ohne sich um plattformspezifische Implementierungen zu kümmern. Im Kern benötigt Electron selbst jedoch noch plattformspezifische Funktionalitäten in einer bestimmten Systemsprache.

In Wirklichkeit verarbeitet Electron den nativen Code für Sie, so dass Sie sich auf eine einzige JavaScript-API konzentrieren können.

Aber wie funktioniert das? Wie kommen die in C++ oder Objective-C geschriebenen Funktionen von Electronic nach JavaScript, damit sie einem Endbenutzer zur Verfügung stehen?

Um diesen Pfad zu verfolgen, beginnen wir mit dem [`Modul`](https://electronjs.org/docs/api/app).

Durch das Öffnen der [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) Datei in unserem `lib/` Verzeichnis finden Sie die folgende Zeile Code nach oben:

```js
const binden = process.electronBinding('app')
```

Diese Linie verweist direkt auf den Mechanismus von Electron, um seine C++/Objective-C-Module für Entwickler an JavaScript zu binden. Diese Funktion wird von der Kopf- und [Implementierungsdatei](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) für die `Elektronische Bindungen` Klasse erzeugt.

## `process.electronBinding`

Diese Dateien fügen die `-Funktion process.electronBinding` hinzu, die sich wie Node.js’ `process.binding` verhält. `process.bindung` ist eine tiefere Implementierung des Knotens. [`require()`](https://nodejs.org/api/modules.html#modules_require_id) Methode, ausgenommen erlaubt es Benutzern `nativen Code zu benötigen` anstelle von anderen in JS geschriebenen Code. Diese benutzerdefinierte Funktion `process.electronBinding` gibt die Möglichkeit, den nativen Code von Electron zu laden.

Wenn ein oberes JavaScript-Modul (wie `-App`) diesen nativen Code benötigt, wie wird der Zustand des nativen Codes bestimmt und gesetzt? Wo sind die Methoden bis JavaScript ausgesetzt? Was ist mit den Immobilien?

## `nativ_matt`

Zur Zeit Antworten auf diese Frage finden Sie in `native_mate`: eine Abzweigung von Chromium's [`gin` Bibliothek](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) , die es einfacher macht, Typen zwischen C++ und JavaScript zu marschieren.

In `native_mate/native_mate` gibt es einen Header und eine Implementierungsdatei für `object_template_builder`. Dies ist es, was uns erlaubt Module in nativen Code zu bilden, deren Form entspricht dem, was Entwickler erwarten würden.

### `mate::ObjectTemplateBuilder`

Wenn wir jedes Electron-Modul als `Objekt betrachten`, es wird einfacher zu sehen, warum wir `object_template_builder` verwenden wollen, um sie zu erstellen. Diese Klasse basiert auf einer Klasse von V8, die von der Open-Source-Hochleistungs-JavaScript- und WebAssembly-Engine von Google in C++ geschrieben wurde. V8 implementiert die JavaScript-(ECMAScript) Spezifikation, so dass seine native Funktionalität direkt mit Implementierungen in JavaScript korreliert werden kann. Zum Beispiel [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) gibt uns JavaScript-Objekte ohne dedizierte Konstruktorfunktion und Prototyp. Es verwendet `Objekt[.prototype]`, und in JavaScript entspricht [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Um dies in Aktion zu sehen, schauen Sie in die Implementierungsdatei für das App-Modul, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). Unten ist folgend:

```cpp
mate::ObjectTemplateBuilder(isolieren, Prototyp->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

In der obigen Zeile wird `.SetMethod` aufgerufen auf `mate::ObjectTemplateBuilder`. `. etMethod` kann in jeder Instanz der `ObjectTemplateBuilder` Klasse aufgerufen werden, um Methoden auf dem [Objektprototyp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) in JavaScript zu setzen, mit der folgenden Syntax:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Dies ist das JavaScript-Äquivalent für:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // Implementation hier
}
```

Diese Klasse enthält auch Funktionen, um Eigenschaften eines Moduls zu setzen:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

oder

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Dies wären wiederum die JavaScript-Implementierungen von [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

und

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

Es ist möglich, JavaScript-Objekte mit Prototypen und Eigenschaften zu erstellen, wie Entwickler sie erwarten, und deutlichere Vernunft über Funktionen und Eigenschaften, die auf dieser niedrigeren Systemebene implementiert sind!

Die Entscheidung, wo eine beliebige Modul-Methode zu implementieren ist selbst eine komplexe und oft nicht deterministische, die wir in einem zukünftigen Post abdecken.
