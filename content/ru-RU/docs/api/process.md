# process

> Расширения для обработки объекта.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

Объект Electron `process` является расширенной версией объекта [Node.js `process`](https://nodejs.org/api/process.html). Он добавляет следующие события, свойства и методы:

## Песочница

В песочнице графический объект `process` содержит только подмножество API:

- `crash() - Падение`
- `hang() - Зависание`
- `getCreationTime() - Время создания`
- `getHeapStatistics() - Статистика кучи (распределяемой памяти)`
- `getBlinkMemoryInfo() - Информация о памяти Blink`
- `getProcessMemoryInfo() - Сведения о памяти процесса`
- `getSystemMemoryInfo() - Информация о системной памяти`
- `getSystemVersion() - Версия системы`
- `getCPUUsage() - Использование процессора`
- `getIOCounters() - Счетчики IO`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed - Запущена ли песочница`
- `type`
- `версия`
- `versions - Список с версиями и их зависимостями`
- `mas - Является ли сборкой Mac App Store`
- `windowsStore - Является ли приложением Windows Store (appx)`

## События

### Событие: 'loaded'

Срабатывает, когда Electron загрузил свой скрипт внутренней инициализации и начинает загружать веб-страницу или основной скрипт.

Это событие может использоваться preload скриптом, чтобы вернуть удаленные Node global symbols в глобальную область видимости, когда node integration выключен:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Свойства

### `process.defaultApp` _Только чтение_

А `Boolean`. Когда приложение запущено, передаваемое в качестве параметра приложению по умолчанию, свойство `true` в основном процессе, в противном случае оно `undefined`.

### `process.isMainFrame` _Только чтение_

В `Boolean` `true` , когда текущий контекст рендерера является "основным" кадра. Если вы хотите идентификатор текущего кадра, вы должны использовать `webFrame.routingId`.

### `process.mas` _Только чтение_

А `Boolean`. Для сборки Mac App Store это свойство `true`, для других построений `undefined`.

### `process.noAsar`

Приложение `Boolean` которое контролирует поддержку ASAR внутри приложения. Установка этого `true` отключит поддержку `asar` архивов в встроенных модулях узла.

### `process.noDeprecation`

`Boolean` который управляет тем, будут ли предупреждения об устаревании выводиться в `stderr` или нет. Установка в `true` заглушит предупреждения об устаревании. Это свойство используется вместо флага командной строки `--no-deprecation`.

### `process.resourcesPath` _Только чтение_

`String`. Представляет из себя путь до каталога с ресурсами.

### `process.sandboxed` _Только чтение_

А `Boolean`. Когда процесс рендеринга находится в песочнице, это свойство является `true`, противном случае это `undefined`.

### `process.throwDeprecation`

`Boolean`, определяет, будут ли предупреждения об устаревании выдаваться как исключения. Установка значения `true` приведет к выдаче ошибок при устаревании. Это свойство используется вместо флага командной строки `--throw-deprecation`.

### `process.traceDeprecation`

`Boolean`, определяет, будут ли сообщения об устаревании выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека при устаревании. Это свойство вместо флага командной строки `--trace-deprecation`.

### `process.traceProcessWarnings`

`Boolean`, определяет, будут ли предупреждения процесса, выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека для предупреждений процесса (включая устаревания). Это свойство вместо флага командной строки `--trace-warnings`.

### `process.type` _Только чтение_

Одним `String` , представляющим тип текущего процесса, может быть:

* `browser` - Основной процесс
* `renderer` - Процесс рендерера
* `worker` - В веб-работник

### `process.versions.chrome` _Только чтение_

`String`, представляющая строку версии Chrome.

### `process.versions.electron` _Только чтение_

`String`, представляющая строку версии Electron.

### `process.windowsStore` _Только чтение_

А `Boolean`. Если приложение работает как приложение Магазина Windows (appx), это свойство `true`, в противном случае оно `undefined`.

## Методы

Объект `process` имеет следующие методы:

### `process.crash()`

Вызывает сбой основного потока текущего процесса.

### `process.getCreationTime()`

Возвращает `Number | null` - Количество миллисекунд с начала эпохи, или `null`, если информация недоступна

Указывает время создания приложения. Время представлено как количество миллисекунд с начала эпохи. Он возвращается нулевой, если он не в состоянии получить время создания процесса.

### `process.getCPUUsage()`

Возвращает [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

Возвращает [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Возвращает `Object`:

* `totalHeapSize` Integer - Память, выделенная для кучи
* `totalHeapSizeExecutable` Integer - Память для исполняемого файла
* `totalPhysicalSize` Integer - Заданный размер
* `totalAvailableSize` Integer - Доступный размер кучи
* `usedHeapSize` Integer - Память, используемая данными приложения
* `heapSizeLimit` Integer - Абсолютный предел, который куча не может превышать
* `mallocedMemory` Integer - Текущий объем памяти, полученный через malloc
* `peakMallocedMemory` Integer - Пиковый объем памяти, полученный через malloc
* `doesZapGarbage` Boolean - Включена ли опция --zap_code_space

Возвращает объект со статистикой кучи V8. Обратите внимание, что вся статистика предоставляется ​​в Килобайтах.

### `process.getBlinkMemoryInfo()`

Возвращает `Object`:

* `allocated` Integer - Размер всех выделенных объектов в Килобайтах.
* `marked` Integer - Размер всех отмеченных объектов в Килобайтах.
* `total` Integer - Всего выделено места в Килобайтах.

Возвращает объект с информацией о памяти Blink. Это может быть полезно для отладки рендеринга / DOM связанных с вопросами памяти. Обратите внимание, что все значения сообщаются в Kilobytes.

### `process.getProcessMemoryInfo()`

Возвращает `Promise<ProcessMemoryInfo>` - Разрешается с [ProcessMemoryInfo](structures/process-memory-info.md)

Возвращает объект, дать статистику использования памяти о текущем процессе. Отметим что все статистические данные сообщаются в Kilobytes. Этот api следует вызть после того как app готов.

Chromium не предоставляет значение `residentSet` для macOS. Это связано с тем, что MacOS сжимает в памяти страницы, которые в последнее время не использовались. В результате значение размера резидентного набора не соответствует ожидаемому. `private` память является более репрезентативной для фактического использования перед сжатием памяти процесса в MacOS.

### `process.getSystemMemoryInfo()`

Возвращает `Object`:

* `total` Integer - Общий объем физической памяти в килобайтах, доступный системе.
* `free` Integer - Общий объем памяти, не используемый приложениями или дисковым кэшем.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Возвращает объект, дать статистику использования памяти обо всей системе. Отметим что все статистические данные сообщаются в Kilobytes.

### `process.getSystemVersion()`

Возвращает `String` - Версию операционной системы хоста.

Пример:

```js
const version = process.getSystemVersion()
console.log(version)
// В macOS -> '10.13.6'
// В Windows -> '10.0.17763'
// В Linux -> '4.15.0-45-generic'
```

**Примечание:** В отличие от `os.release()` он возвращает фактическую версию операционной системы, а не версию ядра на MacOS.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Путь к выходному файлу.

Возвращает `Boolean`, который указывает успешно ли создан снимок.

Делает снимок кучи V8 и сохраняет его в `filePath`.

### `process.hang()`

Вызывает зависание основного потока текущего процесса.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Устанавливает мягкое ограничение дескрипторов файлов до `maxDescriptors` или жесткое ограничение операционной системы, в зависимости от того, какое значение ниже для текущего процесса.
