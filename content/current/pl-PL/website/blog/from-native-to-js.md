---
title: Z natywnego do JavaScript w Electron
author: codebytere
date: '2019-03-19'
---

Jak funkcje Electron napisane w C++ lub Objective-C dostają się do JavaScriptu, aby były dostępne dla użytkownika końcowego?

---

## Kontekst

[Electron](https://electronjs.org) jest platformą JavaScript, której głównym celem jest zmniejszenie bariery wejścia dla deweloperów w tworzeniu solidnych aplikacji stacjonarnych bez obaw o implementacje specyficzne dla platformy. Jednak w samym rdzeniu Electron nadal potrzebuje funkcji specyficznych dla danej platformy do pisania w danym języku systemu.

W rzeczywistości Electron obsługuje dla Ciebie natywny kod, dzięki czemu możesz skupić się na pojedynczym API JavaScript.

Jak to jednak działa? Jak funkcje Electron napisane w C++ lub Objective-C dostają się do JavaScriptu, aby były dostępne dla użytkownika końcowego?

Aby śledzić tę ścieżkę, zacznijmy od modułu [`app`](https://electronjs.org/docs/api/app).

Otwierając plik [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) wewnątrz naszego katalogu `lib/` , znajdziesz następującą linię kodu w kierunku góry:

```js
const binding = process.electronBinding('app')
```

Ta linia wskazuje bezpośrednio na mechanizm Electrona do łączenia modułów C++/Cel-C z JavaScript do użytku przez programistów. Ta funkcja jest tworzona przez nagłówek i [plik implementacji](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) dla klasy `ElectronBindings`.

## `Proces.electronBinding`

Te pliki dodają funkcję `process.electronBinding` , która zachowuje się jak proces `Node.js.binding`. `proces.binding` jest niższym poziomem implementacji Node. [`require()`](https://nodejs.org/api/modules.html#modules_require_id) method, z wyjątkiem tego, że pozwala użytkownikom `wymaga kodu natywnego` zamiast innego kodu napisanego w JS. Ta niestandardowa funkcja `process.electronBinding` daje możliwość załadowania kodu natywnego z Electron.

Kiedy moduł JavaScript najwyższego poziomu (jak `aplikacja`) wymaga tego natywnego kodu, w jaki sposób określa się i ustawia stan tego natywnego kodu? Gdzie są metody narażone na działanie JavaScript? Co z właściwościami?

## `natywny_ojciec`

At present, answers to this question can be found in `native_mate`:  a fork of Chromium's [`gin` library](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) that makes it easier to marshal types between C++ and JavaScript.

Wewnątrz `native_mate/native_mate` jest plik nagłówka i implementacji dla `object_template_builder`. To właśnie pozwala nam tworzyć moduły w kodzie natywnym, których kształt odpowiada oczekiwaniom programistów JavaScript.

### `matka: ObjectTemplateBuilder`

Jeśli spojrzymy na każdy moduł Electron jako na obiekt ``, łatwiej jest zobaczyć, dlaczego chcielibyśmy użyć `object_template_builder` do ich konstrukcji. Ta klasa jest zbudowana w oparciu o klasę wystawioną przez V8, która jest wysoce wydajnym silnikiem JavaScript i WebAssembly Google napisanym w C++. V8 implementuje specyfikację JavaScript (ECMAScript), więc jego natywne implementacje funkcjonalności mogą być bezpośrednio skorelowane z implementacjami w JavaScript. Na przykład [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) daje nam obiekty JavaScript bez dedykowanej funkcji konstruktora i prototypu. Używa `Object[.prototype]`, a w JavaScript będzie równoważny [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Aby zobaczyć to w akcji, sprawdź plik implementacyjny modułu aplikacji, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). Na dole znajdują się następujące elementy:

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->prototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

W powyższej linii `.SetMethod` jest wywołany `znajomy::ObjectTemplateBuilder`. `. etMethod` może być wywołany na dowolnej instancji klasy `ObjectTemplateBuilder` aby ustawić metody na [prototypie obiektów](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) w JavaScript, z następującą składnią:

```cpp
Metoda ustawień ("method_name", &function_to_bind)
```

Jest to ekwiwalent JavaScript:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementacja tutaj
}
```

Ta klasa zawiera również funkcje do ustawiania właściwości w module:

```cpp
.Właściwość ustawienia("property_name", &getter_function_to_bind)
```

lub

```cpp
.Właściwość ustawienia("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

To z kolei będzie implementacja JavaScript [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
funkcja App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

i

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

Możliwe jest tworzenie obiektów JavaScript utworzonych z prototypami i własnościami, jak ich oczekują deweloperzy, i wyraźniej powód funkcji i właściwości wdrożonych na tym niższym poziomie systemowym!

Decyzja o tym, gdzie wdrożyć jakąkolwiek metodę modułową jest sama w sobie złożoną i często niedeterministyczną, którą zajmiemy się przyszłym postem.
