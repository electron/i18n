---
title: От родного до JavaScript в Electron
author: codebytere
date: '2019-03-19'
---

Как функции Electron написаны на C++ или Objective-C и доступны для конечного пользователя?

---

## Справочная информация

[Electron](https://electronjs.org) является платформой JavaScript, основной целью которой является уменьшение барьера, позволяющего разработчикам создавать надежные настольные приложения, не беспокоясь о специфичных для платформы реализациях. Тем не менее, у себя в ядре Electron по-прежнему требуется специфическая для платформы функциональность для написания на соответствующем системном языке.

В действительности, Electron обрабатывает родной код для вас, чтобы сосредоточиться на одном Javascript API.

Как это работает? Как функции Electron написаны на C++ или Objective-C и доступны для конечного пользователя?

Чтобы проследить этот путь, давайте начнем с [`приложения` модуль](https://electronjs.org/docs/api/app).

Открывая [`приложения.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) в нашей папке `lib/` , вы найдете следующую строку кода в верхней части страницы:

```js
const binding = process.electronBinding('app')
```

Эта линия указывает непосредственно на механизм Electron для привязки его модулей C++/Objective-C к JavaScript для использования разработчиками. Эта функция создана заголовком и файлом реализации [](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) для класса `ElectronBindings`.

## `process.electronBinding`

Эти файлы добавляют функцию `process.electronBinding` , которая ведет себя как процесс `Node.js’`. `процесс.привязка` является низкоуровневой реализацией узла. s' [`require()`](https://nodejs.org/api/modules.html#modules_require_id) , за исключением случаев, когда пользователи `требуют` родного кода вместо другого кода, написанного в JS. Эта пользовательская функция `process.electronBinding` предоставляет возможность загрузить родной код из Electron.

Когда JavaScript модуль верхнего уровня (например, `приложение`) требует этот родной код, как определено и установлено состояние этого родного кода? Где методы, описанные в JavaScript? Как насчет свойств?

## `родный_родной`

At present, answers to this question can be found in `native_mate`:  a fork of Chromium's [`gin` library](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) that makes it easier to marshal types between C++ and JavaScript.

Внутри `native_mate/native_mate` есть заголовок и файл реализации для `object_template_builder`. Это позволяет нам формировать модули в родном коде, форма которых соответствует тому, что ожидают разработчики JavaScript.

### `mate::ObjectTemplateBuilder`

Если мы рассмотрим каждый модуль Electron как объект ``, становится проще увидеть, почему мы хотели бы использовать `object_template_builder` для их построения. Этот класс построен на вершине класса, выставленного V8, который является открытым исходным кодом высокопроизводительного JavaScript и WebAssembly движка написанного на С++. V8 реализует спецификацию JavaScript (ECMAScript), так что его родные реализации функциональности могут напрямую коррелироваться с реализациями в JavaScript. Например, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) дает нам JavaScript-объекты без специальной функции и прототипа. Он использует `Object[.prototype]`, и в JavaScript будет эквивалентно [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Чтобы увидеть это в действии, посмотрите в файл реализации модуля приложения, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). В нижней части - следующие:

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App:GetGPUInfo)
```

В вышеприведенной строке вызывается `.SetMethod` на `mate::ObjectTemplateBuilder`. `. etMethod` может быть вызван на любом экземпляре класса `ObjectTemplateBuilder` для установки методов на [Object prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) в JavaScript, с следующим синтаксисом:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Это эквивалент JavaScript:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // реализация здесь
}
```

Этот класс также содержит функции для установки свойств модуля:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

или

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Это, в свою очередь, будет JavaScript реализации [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

и

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

Можно создавать объекты JavaScript, сформированные с помощью прототипов и свойств, которых ожидают разработчики. и более очевидной причиной реализации функций и свойств на этом низком системном уровне!

Решение о том, где реализовать любой модульный метод, само по себе является сложным и часто недетерминированным, который мы рассмотрим в будущем посту.
