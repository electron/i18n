---
title: Dal nativo a JavaScript in Electron
author: codebytere
date: '2019-03-19'
---

Come le funzionalità di Electron's scritte in C++ o Objective-C arrivano a JavaScript in modo che siano disponibili per un utente finale?

---

## Sfondo

[Electron](https://electronjs.org) è una piattaforma JavaScript il cui scopo primario è quello di ridurre la barriera all'ingresso per gli sviluppatori di costruire robuste applicazioni desktop senza preoccuparsi di implementazioni specifiche per piattaforma. Tuttavia, al suo centro, Electron stesso ha ancora bisogno di funzionalità specifiche della piattaforma per essere scritto in un dato linguaggio di sistema.

In realtà, Electron gestisce il codice nativo per voi in modo da poter concentrarsi su una singola API JavaScript.

Ma come funziona? Come le funzionalità di Electron's scritte in C++ o Objective-C arrivano a JavaScript in modo che siano disponibili per un utente finale?

Per tracciare questo percorso, iniziamo con l'app [`` modulo](https://electronjs.org/docs/api/app).

Aprendo il file [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) nella nostra cartella `lib/` , troverai la seguente riga di codice verso l'alto:

```js
const binding = process.electronBinding('app')
```

Questa linea punta direttamente al meccanismo di Electron's per legare i suoi moduli C++/Objective-C a JavaScript per l'utilizzo da parte degli sviluppatori. Questa funzione è creata dall'intestazione e dal file di implementazione [](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) per la classe `ElectronBindings`.

## `process.electronBinding`

Questi file aggiungono la funzione `process.electronBinding` , che si comporta come Node.js’ `process.binding`. `process.binding` è un'implementazione di livello inferiore di Node. s [`require()`](https://nodejs.org/api/modules.html#modules_require_id) method, tranne che consente agli utenti di `richiedono` codice nativo invece di altro codice scritto in JS. Questa funzione personalizzata `process.electronBinding` conferisce la possibilità di caricare il codice nativo da Electron.

Quando un modulo JavaScript di primo livello (come l'app ``) richiede questo codice nativo, come viene determinato e impostato lo stato di quel codice nativo? Dove sono i metodi esposti fino a JavaScript? Che dire delle proprietà?

## `native_mate`

Attualmente, le risposte a questa domanda possono essere trovate in `native_mate`: un fork della libreria [`gin` di Chromium](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) che rende più facile i tipi di maresciallo tra C++ e JavaScript.

All'interno `native_mate/native_mate` c'è un file di intestazione e implementazione per `object_template_builder`. Questo è ciò che ci permette di formare moduli in codice nativo la cui forma è conforme a ciò che gli sviluppatori JavaScript si aspettano.

### `mate::ObjectTemplateBuilder`

Se guardiamo ogni modulo Electron come un `object`, diventa più facile capire perché vorremmo usare `object_template_builder` per costruirli. Questa classe è costruita in cima a una classe esposta da V8, che è il motore open source di Google ad alte prestazioni JavaScript e WebAssembling, scritto in C++. V8 implementa la specifica JavaScript (ECMAScript), in modo che le sue implementazioni native di funzionalità possano essere direttamente correlate alle implementazioni in JavaScript. Ad esempio, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) ci fornisce oggetti JavaScript senza una funzione di costruttore e un prototipo dedicati. Usa `Oggetto[.prototype]`, e in JavaScript sarebbe equivalente a [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Per vederlo in azione, guarda il file di implementazione per il modulo app, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). In basso è il seguente:

```cpp
mate::ObjectTemplateBuilder(isolate, prototipe->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

Nella riga precedente, `.SetMethod` è chiamato `mate::ObjectTemplateBuilder`. `. etMethod` può essere chiamato su qualsiasi istanza della classe `ObjectTemplateBuilder` per impostare i metodi sul [prototipo oggetto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) in JavaScript, con la seguente sintassi:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Questo è l'equivalente JavaScript di:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementation here
}
```

Questa classe contiene anche funzioni per impostare le proprietà su un modulo:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

o

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Queste sarebbero a loro volta le implementazioni JavaScript di [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

e

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

È possibile creare oggetti JavaScript formati con prototipi e proprietà come gli sviluppatori si aspettano, e più chiaramente ragione di funzioni e proprietà implementate a questo livello di sistema più basso!

La decisione circa dove implementare un dato metodo di modulo è di per sé un complesso e spesso non deterministico, che copriremo in un futuro post.
