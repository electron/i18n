---
title: De la nativ la JavaScript în Electron
author: codebytere
date: '2019-03-19'
---

Cum pot caracteristicile Electron scrise în C++ sau Obiectiv C să ajungă la JavaScript astfel încât să fie disponibile pentru un utilizator final?

---

## Context

[Electron](https://electronjs.org) este o platformă JavaScript al cărei scop principal este acela de a reduce bariera de intrare pentru dezvoltatori pentru a construi aplicații desktop robuste fără să se îngrijoreze despre implementări specifice platformei. Cu toate acestea, în centrul său, Electron însuși are nevoie în continuare de funcționalitate specifică platformei pentru a fi scris într-un limbaj de sistem dat.

În realitate, Electron se ocupă de codul nativ pentru tine astfel încât să te poți concentra pe un singur API JavaScript.

Cum funcţionează totuşi acest lucru? Cum pot caracteristicile Electron scrise în C++ sau Obiectiv C să ajungă la JavaScript astfel încât să fie disponibile pentru un utilizator final?

Pentru a urmări această cale, hai să începem cu modulul [`al aplicației`](https://electronjs.org/docs/api/app).

Prin deschiderea fișierului [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) în interiorul directorului `lib/` , vei găsi următoarea linie de cod spre vârf:

```js
const legare = process.electronBinding('app')
```

Această linie arată direct la mecanismul Electron pentru legarea modulelor C++/obiective-C la JavaScript pentru a fi utilizate de către dezvoltatori. Această funcţie este creată de antet şi [fişierul de implementare](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) pentru clasa `ElectronBindings`.

## `proces.electronBining`

Aceste fișiere adaugă funcția `process.electronBinding` care se comportă ca procesul `Node.jss`. `process.binding` este o implementare de nivel inferior a nodului. s' [`require()`](https://nodejs.org/api/modules.html#modules_require_id) method, excepție permite utilizatorilor să `solicite` cod nativ în loc de alt cod scris în JS. Această funcţie `de process.electronBinding` personalizată conferă abilitatea de a încărca codul nativ de la Electron.

Când un modul JavaScript de nivel superior (cum este `app`) necesită acest cod nativ, cum este determinat şi setat starea acelui cod nativ? Unde sunt metodele expuse la JavaScript? Cum rămâne cu proprietățile?

## `mat nativ`

În prezent, răspunsurile la această întrebare pot fi găsite în `native_mate`: o furcă a chromium-ului [`gin` librărie](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) care ușurează mărșăluirea tipurilor între C++ și JavaScript.

În `native_mate/native_mate` există un antet și un fișier de implementare pentru `object_template_builder`. Asta ne permite să formăm module în codul nativ a căror formă se conformează cu ceea ce ar aștepta dezvoltatorii JavaScript.

### `egal::ObjectTemplateBuilder`

Dacă ne uităm la fiecare modul Electron ca la un `obiect`, devine mai uşor de văzut de ce am dori să folosim `object_template_builder` pentru a le construi. Această clasă este construită pe o clasă expusă de V8, care este motorul Google cu sursă deschisă de înaltă performanță JavaScript și WebAssing, scris în C++. V8 implementează specificațiile JavaScript (ECMAScript), astfel încât implementările sale funcționale native pot fi corelate direct cu implementările în JavaScript. De exemplu, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) ne oferă obiecte JavaScript fără o funcție specifică de constructor și prototip. Folosește `Obiject[.prototype]`, și în JavaScript ar fi echivalent cu [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Pentru a vedea acest lucru în acțiune, caută fișierul de implementare pentru modulul de aplicații, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). În partea de jos se află următoarele:

```cpp
mate::ObjectTemplateBuilder(izolat, prototip->PrototypeTemplate())
    .SetMethod("getGPUInfo", &Aplicație::GetGPUInfo)
```

În linia de mai sus, `.SetMethod` este apelat pe `pereche: :ObjectTemplateBuilder`. `. etMethod` poate fi apelat la orice instanță a clasei `ObjectTemplateBuilder` pentru a seta metode pe [prototipul obiectului](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) în JavaScript, cu următoarea sintaxă:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Acesta este echivalentul JavaScript de:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementare aici
}
```

Această clasă conține de asemenea funcții pentru a seta proprietăți pe un modul:

```cpp
.SetProperty("property_name", &getter_func_to_bind)
```

sau

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Acestea ar fi, la rândul lor, implementarea JavaScript a [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

şi

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myPropertyValue
  }
})
```

Este posibil să creați obiecte JavaScript formate cu prototipuri și proprietăți așa cum dezvoltatorii le așteaptă, și mai clar motiv pentru funcțiile și proprietățile implementate la acest nivel inferior al sistemului!

Decizia de a implementa orice metodă de modul dată este ea însăşi una complexă şi adesea non-deterministică, pe care o vom prezenta într-o postare viitoare.
