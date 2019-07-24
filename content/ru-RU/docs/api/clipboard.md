# clipboard

> Выполняет копирование и вставку в буфер обмена системы.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

На Linux, в контексте графического процесса зависит от модуля [`remote`](remote.md), соответственно не доступен, когда этот модуль отключен.

Следующий пример показывает, как записать строку в буфер обмена:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки')
```

На Linux также есть `selection` буфер обмена. Чтобы им воспользоваться, Вам нужно передать `selection` в каждый метод:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки', 'selection)
console.log(clipboard.readText('selection'))
```

## Методы

Модуль `clipboard` имеет следующие методы:

**Примечание:** Экспериментальные API помечены как таковые и могут быть удалены в будущем.

### `clipboard.readText([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` — содержимое буфера обмена в виде обычного текста.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `text` в буфер обмена, как обычный текст.

### `clipboard.readHTML([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` - содержимое буфера обмена в виде разметки.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `markup` в буфер обмена.

### `clipboard.readImage([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает [`NativeImage`](native-image.md) - содержимое изображения в буфере обмена.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `image` в буфер обмена.

### `clipboard.readRTF([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` - содержимое в буфере обмена в виде RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `text` в буфер обмена как RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Возвращает `Object`:

* `title` String
* `url` String

Возвращает объект, содержащий ключи `title` и `url`, представляющие закладку в буфере обмена. Значения `title` и `url` будут пустыми строками, когда закладки недоступны.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `title` и `url` в буфер обмена, как закладку.

**Примечание:** Большинство приложений на Windows не поддерживают размещение закладок в них, так что Вы можете использовать `clipboard.write`, чтобы записать и закладку и резервный текст в буфер обмена.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Домашняя страница Electron'
})
```

### `clipboard.readFindText()` *macOS*

Возвращает `String` - текст в буфере обмена. Этот метод использует синхронный IPC, когда вызывается в графическом процессе. Закэшированное значение перечитывается из буфера обмена, всякий раз, когда приложение активировано.

### `clipboard.writeFindText(text)` *macOS*

* `text` String

Записывает `text` в буфер обмена, как простой текст. Этот метод использует синхронный IPC, когда вызывается в графическом процессе.

### `clipboard.clear([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Очищает содержимое буфера обмена.

### `clipboard.availableFormats([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String[]` - массив поддерживаемых форматов для `type` буфера обмена.

### `clipboard.has(format[, type])` *Экспериментально*

* `format` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `Boolean` - поддерживает ли буфер обмена указанный `format`.

```javascript
const { clipboard } = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Экспериментально*

* `format` String

Возвращает `String` - читает тип `format` из буфера обмена.

### `clipboard.readBuffer(format)` *Экспериментально*

* `format` String

Возвращает `Buffer` - читает тип `format` из буфера обмена.

### `clipboard.writeBuffer(format, buffer[, type])` *Экспериментально*

* `format` String
* `buffer` Buffer
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `buffer` в буфер обмена, как `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (опционально)
  * `html` String (опционально)
  * `image` [NativeImage](native-image.md) (опционально)
  * `rtf` String (опционально)
  * `bookmark` String (опционально) - заголовок ссылки на `text`.
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'тест', html: '<b>тест</b>' })
```

Записывает `data` в буфер обмена.