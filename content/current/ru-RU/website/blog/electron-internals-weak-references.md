---
title: 'Слабые ссылки на Electron Internals&#58;'
author: zcbenz
date: '2016-09-20'
---

As a language with garbage collection, JavaScript frees users from managing resources manually. Но так как Electron размещает эту среду, она должна быть очень осторожна, чтобы избежать утечки памяти и ресурсов.

Этот пост вводит понятие слабых ссылок и того, как они используются для управления ресурсами в Electron.

---

## Слабые рекомендации

В JavaScript, всякий раз, когда вы назначаете объект переменной, вы добавляете ссылку на объект. До тех пор, пока есть ссылка на объект, он будет всегда храниться в памяти. Как только все ссылки на объект исчезли, т.е. больше не хранят переменные объекта, движок JavaScript перезагрузит память в следующей сборке мусора.

Слабая ссылка — это ссылка на объект, который позволяет вам получить объект без эффекта, будет ли он собран или нет. Вы также получите уведомления , когда объект собран мусором. Затем становится возможным управлять ресурсами с JavaScript.

Используя класс `NativeImage` в Electron в качестве примера, каждый раз при вызове `родного изображения. reate()` API, возвращается экземпляр `NativeImage` и он сохраняет данные изображения в C++. Once you are done with the instance and the JavaScript engine (V8) has garbage collected the object, code in C++ will be called to free the image data in memory, so there is no need for users manage this manually.

Another example is [the window disappearing problem](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), which visually shows how the window is garbage collected when all the references to it are gone.

## Тестирование слабых ссылок в Electron

Не существует способа напрямую тестировать слабые ссылки в JavaScript на необработанный JavaScript, так как у языка нет способа назначать слабые ссылки. Единственный API в JavaScript, связанный со слабыми ссылками - [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), Но поскольку он только создает слабые ключи ссылок, невозможно знать, когда был собран объект мусора.

В версиях Electron до версии 0.37.8, вы можете использовать внутренний `v8Util. etDestructor` API для проверки слабых ссылок, добавляет слабые ссылки на передаваемый объект и вызывает обратный вызов, когда объект собран в мусоре:

```javascript
// Код ниже может быть запущен только на Electron < v0.37.8.
v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, function () {
  console.log('Объект собран в мусоре')
})

// Удалить все ссылки на объект.
object = undefined
// Ручной запуск GC.
gc()
// Консоль печатает "Объект собран мусором".
```

Note that you have to start Electron with the `--js-flags="--expose_gc"` command switch to expose the internal `gc` function.

API был удален в более поздних версиях, потому что V8 на самом деле не позволяет запустить код JavaScript в деструкторе, а в более поздних версиях это вызовет случайных сбоев.

## Слабые ссылки в удаленном модуле ``

Помимо управления родными ресурсами с помощью C++, Electron также нуждается в слабых ссылках для управления JavaScript-ресурсами. Примером является `удаленный` модуль Electron, который является [модуль Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) , который позволяет использовать объекты в основном процессе из процессов визуализации.

One key challenge with the `remote` module is to avoid memory leaks. Когда пользователи приобретают удаленный объект в процессе визуализации, `удаленный модуль` должен гарантировать, что объект продолжает жить в основном процессе до тех пор, пока ссылки в процессе рендерера не будут удалены. Кроме того, он также должен удостовериться, что объект может быть собран в случае отсутствия ссылки на него в процессах визуализации.

For example, without proper implementation, following code would cause memory leaks quickly:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

Управление ресурсами в удаленном модуле `` просто. Каждый раз, когда запрашивается объект , сообщение отправляется главному процессу, и Electron будет хранить объект на карте и назначать для него идентификатор, затем отправить ID обратно в процесс рендерера . In the renderer process, the `remote` module will receive the ID and wrap it with a proxy object and when the proxy object is garbage collected, a message will be sent to the main process to free the object.

Using `remote.require` API as an example, a simplified implementation looks like this:

```javascript
remote.require = function (name) {
  // Расскажите главному процессу о возврате метаданных модуля.
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // Создание прокси объекта.
  const object = metaToValue(meta)
  // Рассказать главному процессу об освобождении объекта, когда прокси объект является мусором
  // собрано.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

В основном процессе:

```javascript
const карта = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Добавить ссылку на объект.
  map[++id] = объект
  // Преобразование объекта в метаданные.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```

## Карты со слабыми значениями

With the previous simple implementation, every call in the `remote` module will return a new remote object from the main process, and each remote object represents a reference to the object in the main process.

Сам дизайн хороший, но проблема заключается в том, что получает один и тот же объект несколько вызовов, несколько прокси объектов будут создаваться и для сложных объектов, что может усилить огромное давление на использование памяти и мусор коллекции.

Например, следующий код:

```javascript
const {remote} = require('electron')

для (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Сначала он использует много памяти, создавая прокси объекты, а затем занимает процессора (Центральная обработка единицы) для сбора мусора и отправки IPC сообщений.

Очевидной оптимизацией является кэширование удаленных объектов: когда уже есть удалённый объект с тем же ID, предыдущий удаленный объект будет возвращен вместо создания нового.

Это невозможно с API в ядре JavaScript. Используя обычную карту для кэширования объектов не позволит V8 собирать объекты, в то время как класс [Слабая карта](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) может использовать объекты только как слабые ключи.

Чтобы решить эту проблему, добавляется тип карты со значениями по мере слабых ссылок, что идеально подходит для кэширования объектов с идентификаторами. Теперь `удален.require` выглядит как так:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Расскажите главному процессу возврата метаданных модуля.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Note that the `remoteObjectCache` stores objects as weak references, so there is no need to delete the key when the object is garbage collected.

## Родной код

Для людей, заинтересованных в C++ слабых ссылок в Electron, его можно найти в следующих файлах:

`setDestructor` API:

* [`объект life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`объект life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API:

* [`key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

