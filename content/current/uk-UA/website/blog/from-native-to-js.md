---
title: Від рідного до JavaScript в Electron
author: codebytere
date: '2019-03-19'
---

Як функції Electron діляться на C++ або Objective-C дістатись до JavaScript, щоб мати доступ до кінцевого користувача?

---

## Фон

[Electron](https://electronjs.org) - це платформа JavaScript, основною метою якої є зниження бар'єру на вхід для розробників для створення надійних настільних застосунків, не турбуючись про реалізації, які специфічні для платформи. Проте, по своїй основі, сам Electron все ще потребує функціонал, який специфічний для платформа, щоб бути записаний на заданому мові.

В реальності Electron обробляє вихідний код для вас, щоб ви могли зосередитися на одному JavaScript API.

Як же це працює? Як функції Electron діляться на C++ або Objective-C дістатись до JavaScript, щоб мати доступ до кінцевого користувача?

Щоб простежити цей шлях, давайте почнемо з модуля [``](https://electronjs.org/docs/api/app).

Відкривши файл [`<code>`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) в каталозі `lib/` , ви знайдете наступний рядок коду у верхній частині:

```js
const binding = process.electronBinding('app')
```

Цей рядок безпосередньо вказує механізм Electron для зв'язування модулів C++/Objective-C в JavaScript для використання розробниками. Ця функція створена заголовком і [реалізаційний файл](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) для `ElectronBindings` класу.

## `процесо.electronBinding`

These files add the `process.electronBinding` function, which behaves like Node.js’ `process.binding`. `process.binding` - це низькорівнева реалізація Node. 's [`require()`](https://nodejs.org/api/modules.html#modules_require_id) метод, крім цього дозволяє користувачам `вимагати` нативних кодів замість іншого коду, написаного в JS. Функція `process.electronBinding` надає можливість завантажити нативний код з Electron.

Коли модуль JavaScript найвищого рівня (наприклад, `додаток`) вимагає цей рідний код, як стан цього нативного коду визначений і встановлений? Де методи звертаються до JavaScript? А як щодо властивостей?

## `нативний_мат`

В даний час, відповіді на це питання можна знайти в `native_mate`: форк Chromium [`gin` бібліотеці](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) що спрощує між C++ і JavaScript.

Всередині `native_mate/native_mate` існує файл заголовка та реалізація `object_template_builder`. Саме це дозволяє нам формувати модулі у власному коді, форма якого відповідає тому, чого очікували б розробники JavaScript.

### `матриця:ObjectTemplateder`

Якщо ми подивимося на кожен модуль Electron як на `об’єкт`, стає легше зрозуміти, чому ми хочемо використати `object_template_builder`. Цей клас побудований на найкращих класах, з яким повідомляється V8, з відкритим вихідним кодом JavaScript та WebAssembly Engine, написаний в С++. V8 реалізує специфікації JavaScript (ECMAScript) для того, щоб його реалізація могла бути напряму збігу з реалізацією з JavaScript. Наприклад, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) дає нам JavaScript об'єкти без визначеної функції конструктора і прототипу. Він використовує об'єкт `[.prototype]`, і в JavaScript буде рівним [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

To see this in action, look to the implementation file for the app module, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). В нижній частині - наступне:

```cpp
mate:ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App:GetGPUInfo)
```

У наведеному вище рядку, `.SetMethod` викликається на `товари:ObjectTemplateBuilder`. `. etMethod` можна викликати в будь-якому екземплярі класу `ObjectTemplateBuilder` для встановлення методів на [Object prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) в JavaScript, з наступним синтаксисом:

```cpp
.SetMethod("method_name", &функція_to_bind)
```

Це еквівалент JavaScript:

```js
функція App{}
App.prototype.getGPUInfo = function () {
  // Реалізація тут
}
```

У цьому класі також містяться функції, які встановлюють властивості модуля:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

чи

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Це в свою чергу буде реалізація JavaScript з [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
функція {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

і

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

Можна створити об'єкти JavaScript, сформовані з прототипами та властивостями, як очікують розробники, і більш зрозумілі причини функцій і властивостей, реалізованих на нижчому системному рівні!

Рішення щодо реалізації будь-якого модуля є самим складним і недетермінованим, яке ми розглянемо в майбутньому пості.
