---
title: Van native naar JavaScript in Electron
author: codebytere
date: '2019-03-19'
---

Hoe krijgen de functies van Electron in C++ of Doel-C in JavaScript zodat ze beschikbaar zijn voor een eindgebruiker?

---

## Achtergrond

[Electron](https://electronjs.org) is een JavaScript-platform dat als eerste doel heeft de toegangsdrempel voor ontwikkelaars te verlagen om robuuste desktopapps te bouwen zonder zich zorgen te maken over platformspecifieke implementaties. In de kern heeft Electron echter nog steeds behoefte aan platformspecifieke functionaliteit om in een bepaalde systeemtaal te worden geschreven.

In werkelijkheid behandelt Electron de oorspronkelijke code voor je zodat je je kunt focussen op één JavaScript-API.

Maar hoe werkt dat? Hoe krijgen de functies van Electron in C++ of Doel-C in JavaScript zodat ze beschikbaar zijn voor een eindgebruiker?

Om dit pad te traceren, laten we beginnen met de [`app` module](https://electronjs.org/docs/api/app).

Door het [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) bestand in onze `lib/` map te openen, vind je de volgende regel code naar boventoe:

```js
const binding = process.electronBinding('app')
```

Deze lijn verwijst rechtstreeks naar het mechanisme van Electron's voor het binden van de C++/Objective-C modules aan JavaScript voor gebruik door ontwikkelaars. Deze functie wordt gemaakt door de header en [implementatiebestand](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) voor de `ElectronBindings` class.

## `Binding process.elektronica`

Deze bestanden voegen de functie `process.electronBinding` toe, die zich gedraagt als Node.js' `process.binding`. `process.binding` is een lagere implementatie van Node. 's [`require()`](https://nodejs.org/api/modules.html#modules_require_id) methode. behalve dat het gebruikers toestaat om `gebruik te maken van` native code in plaats van andere code geschreven in JS. Deze aangepaste `process.electronBinding` functie geeft de mogelijkheid om eigen code van Electron te laden.

Wanneer een JavaScript module (zoals `app`) deze originele code nodig heeft, hoe wordt de status van die native code bepaald en ingesteld? Waar staan de methoden aan bloot aan JavaScript? Hoe zit het met de eigenschappen?

## `spijker_matrix`

Op dit moment. antwoorden op deze vraag kunnen worden gevonden in `native_mate`: een vork van Chromium's [`gin` library](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) dat het makkelijker maakt marshal types tussen C++ en JavaScript te vinden.

Binnen `native_mate/native_mate` is er een header en implementatie bestand voor `object_template_builder`. Dit is wat ons toestaat modules in native code te vormen waarvan de vorm overeenkomt met wat JavaScript ontwikkelaars zouden verwachten.

### `maat:ObjectTemplateBuilder`

Als we naar elke Electron module kijken als een `object`, het wordt makkelijker om te zien waarom we `object_template_builder` willen gebruiken om ze te maken. Deze klas is gebouwd op een klas die is blootgesteld aan V8, de open source JavaScript en de WebAssembly engine van Google die geschreven is in C++. V8 implementeert de JavaScript-specificatie (ECMAScript), zodat de oorspronkelijke functionaliteit implementaties direct kunnen worden gekoppeld aan implementaties in JavaScript. Bijvoorbeeld [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) geeft ons JavaScript-objecten zonder een specifieke constructorfunctie en prototype. Het maakt gebruik van `Object[.prototype]`, en in JavaScript zou het gelijkwaardig zijn aan [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Om dit in actie te zien, kijk naar het implementatiebestand voor de app module, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). Aan de onderkant staan de volgende:

```cpp
mate:ObjectTemplateBuilder(isolaat, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App:GetGPUInfo)
```

In de bovenstaande regel wordt `.SetMethod` aangeroepen op `mate::ObjectTemplateBuilder`. `. etMethod` kan worden aangeroepen op elk exemplaar van de `ObjectTemplateBuilder` klasse om methoden in te stellen op het [Object prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) in JavaScript, met de volgende syntaxis:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Dit is het JavaScript equivalent van:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementatie hier
}
```

Deze klas bevat ook functies om eigenschappen in te stellen op een module:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

or

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Dit zouden op zijn beurt de JavaScript implementaties van [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

en

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

Het is mogelijk om JavaScript-objecten te maken met prototypes en eigenschappen zoals ontwikkelaars ze verwachten, en meer duidelijk reden voor functies en eigenschappen geïmplementeerd op dit lagere systeemniveau!

De beslissing om een bepaalde module methode te implementeren is op zich een complex en veel-niet-deterministisch besluit, dat in een toekomstige post zal worden behandeld.
