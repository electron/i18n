---
title: 'Інтернали Electron&#58; Слабкі посилання'
author: zcbenz
date: '2016-09-20'
---

Як мова із збиранням сміття, JavaScript звільняє користувачів від управління ресурсами вручну. Але, оскільки хости Electron цього середовища, це має бути дуже ретельне уникнення пам'яті і ресурсів току.

У цьому повідомленні введено поняття слабких посилань і як вони використовуються для керування ресурсами в Electron.

---

## Слабкі посилання

В JavaScript, коли ви призначаєте об'єкт до змінної, ви додаєте посилання на об’єкт. Поки є посилання на об’єкт, він завжди зберігається в пам'яті. Як тільки всі посилання на об’єкт відсутні, тобто немає. змінних вже не зберігають об’єкт, JavaScript движок повторює пам'ять про наступний збір непотрібних даних.

Слабке посилання це посилання на об'єкт, який дозволяє вам отримати об’єкт без ефекту чи буде це несміття зібране чи ні. Ви також отримаєте повідомлення про збирання предмета непотрібного предмету. Це стає можливим керувати ресурсами з JavaScript.

Використання класу `NativeImage` в Electron в якості прикладу, кожен раз, коли ви викликаєте `рідне зображення. reate()` API, `NativeImage` екземпляр повернений і він зберігає дані зображення в С++. Як тільки ви закінчите з екземпляром і JavaScript движок (V8) збереже об'єкт, код в С++ буде , що викликається, щоб звільнити дані зображення в пам'яті, тож немає необхідності керувати користувачами вручну.

Інший приклад це [проблема зникнення вікна](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), які візуально вказують, як вікно збирається на сміття, коли всі посилання на нього більше немає.

## Тестування слабких посилань в Electron

Неможливо безпосередньо перевірити слабкі посилання на JavaScript, оскільки у мові немає способу призначити слабкі посилання. Єдиний API в JavaScript з слабкими посиланнями є [Слабка карта](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), але оскільки це створює лише ключі, які роблять зі слабким посиланням, неможливо знати, коли об'єкт був зібраний на сміття .

У версіях Electron перед v0.37.8, ви можете використовувати внутрішній `v8Util. etDestructor` API для перевірки слабких посилань який додає слабке посилання до переданого об'єкта і викликає зворотний виклик, коли об'єкт збирає непотрібне число:

```javascript
// Код можна запустити тільки на Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, function () {
  console.log('Об'єкт is garbage collected')
})

// Видаліть всі посилання на об’єкт.
об'єкт = невизначений
// Вручну запускає GC.
gc()
// Консолі друкує "object збирані сміття".
```

Зверніть увагу, що вам потрібно запустити Electron з командою `--js-flags="--expose_gc"` перемкнутися до викриття внутрішньої `gc` функції.

The API was removed in later versions because V8 actually does not allow running JavaScript code in the destructor and in later versions doing so would cause random crashes.

## Слабкі посилання на `віддалений` модуль

Крім управління власними ресурсами з C++, Electron також потребує слабких посилань на керування ресурсами JavaScript. Приклад - це модуль Electron's `remote` , це
Віддалений виклик на [ Дистанційний виклик](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) модуль , що дозволяє використовувати об'єкти в основному процесі рендерингу.</p> 

Один ключовий виклик з `віддаленим` модулем - це уникнути витоку пам'яті. Коли користувачі отримати віддалений об'єкт в процесі рендеру, модуль `віддалений` повинен гарантувати, що об’єкт продовжує жити в головному процесі, до тих пір, поки не в процесі рендерингу не зникне. Additionally, it also has to make sure the object can be garbage collected when there are no longer any reference to it in renderer processes.

Наприклад, без належної реалізації, наступний код призведе до швидкого витоку пам'яті :



```javascript
const {remote} = require('electron')

for (let i = 0; я < 10000; +i) {
  remote.nativeImage.createEmpty()
}
```


Керування ресурсами у `віддаленому модулі` є простим. Кожен раз, коли об'єкт запитаний, повідомлення надсилається головному процесу, і Electron зберігатиме об’єкт на карті і присвоїть для нього ідентифікатор, потім відправити ID назад на процес рендера. У процесі рендеру, модуль `дистанційного` отримає ID і завершить його проксі-об’єктом, а коли проксі-об'єкт не має сміття зібрані, повідомлення буде надіслано до основного процесу звільнення об’єкта.

Для використання `remote.require` API як приклад, спрощена реалізація виглядає приблизно :



```javascript
remote.require = function (name) {
  // напиши основний процес, щоб повернути метадані модуля.
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // Створити проксі-об'єкт.
  const object = metaToValue(meta)
  // Скажіть основний процес, щоб звільнити об’єкт, коли проксі-об’єкт сміття
  // зібрано.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  повернути об'єкт

```


В головному процесі:



```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Додайте посилання на об’єкт.
  map[+id] = об'єкт
  // Перетворіть об’єкт в метадані.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```




## Карти зі слабкими значеннями

З попередньою простою реалізацією, кожен дзвінок з `віддаленого` модуля поверне новий віддалений об'єкт з основного процесу, і кожен віддалений об'єкт представляє посилання на об'єкт в головному процесі.

Такий дизайн сам по собі чудовий, але проблема полягає в тому, що коли виникне багато викликів до отримати той же об'єкт, будуть створені кілька об'єктів проксі-сервера і для складних об'єктів, які можуть дати величезний тиск на використання пам'яті та непотрібну частину колекції.

Наприклад, наступний код:



```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; +i) {
  remote.getCurrentWindow()
}
```


It first uses a lot of memory creating proxy objects and then occupies the CPU (Central Processing Unit) for garbage collecting them and sending IPC messages.

Очевидна оптимізація - кешувати віддалені об’єкти: коли вже існує віддалений об'єкт з таким же ID, попередній віддалений об'єкт буде повернений замість створення нового.

Це не можливо з API в ядрі JavaScript. Використання звичайної карти для кешування об'єктів не дає V8 непотрібному збиранню об'єктів, хоча клас [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) може використовувати лише об'єкти як слабкі ключі.

To solve this, a map type with values as weak references is added, which is perfect for caching objects with IDs. Тепер `remote.require` виглядає приблизно :



```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Скажіть головному процесу, щоб повернути мета-дані модуля.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```


Зверніть увагу, що `remoteObjectCache` зберігає об'єкти як слабкі посилання, тому тут не потрібно видаляти ключ при збиранні об'єкта.



## Рідний код

Для людей, які зацікавлені у кодуванні C++ слабких посилань у Electron, можна знайти у наступних файлах:

`setDestructor` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`моніторинг об'єкту`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API:

* [`ключова_точна мапа.год`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`середня карта`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

