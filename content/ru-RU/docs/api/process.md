# process

> Расширения для обработки объекта.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

Объект Electron `process` является расширенной версией объекта [Node.js `process`](https://nodejs.org/api/process.html). Он добавляет следующие события, свойства и методы:

## Песочница

В песочнице графический объект `process` содержит только подмножество API:

* `crash() - Падение`
* `hang() - Зависание`
* `getCreationTime() - Время создания`
* `getHeapStatistics() - Статистика кучи (распределяемой памяти)`
* `getBlinkMemoryInfo() - Информация о памяти Blink`
* `getProcessMemoryInfo() - Сведения о памяти процесса`
* `getSystemMemoryInfo() - Информация о системной памяти`
* `getSystemVersion() - Версия системы`
* `getCPUUsage() - Использование процессора`
* `getIOCounters() - Счетчики IO`
* `uptime()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed - Запущена ли песочница`
* `contextIsolated`
* `тип`
* `версия`
* `versions - Список с версиями и их зависимостями`
* `mas - Является ли сборкой Mac App Store`
* `windowsStore - Является ли приложением Windows Store (appx)`
* `contextId`

## События

### Событие: 'loaded'

Срабатывает, когда Electron загрузил свой скрипт внутренней инициализации и начинает загружать веб-страницу или основной скрипт.

## Свойства

### `process.defaultApp` _Только чтение_

А `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame` _Только чтение_

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas` _Только чтение_

А `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

`Boolean`. Контролирует будут ли неодобряющие предупреждения выводиться в `stderr`. Установка в `true` заглушит неодобряющие предупреждения. Это свойство используется вместо флага командной строки `--no-deprecation`.

### `process.resourcesPath` _Только чтение_

`String`. Представляет из себя путь до каталога с ресурсами.

### `process.sandboxed` _Только чтение_

А `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.contextIsolated` _Только чтение_

A `Boolean` that indicates whether the current renderer context has `contextIsolation` enabled. It is `undefined` in the main process.

### `process.throwDeprecation`

`Boolean`, определяет, будут ли предупреждения об устаревании выдаваться как исключения. Установка значения `true` приведет к выдаче ошибок при устаревании. Это свойство используется вместо флага командной строки `--throw-deprecation`.

### `process.traceDeprecation`

`Boolean`, определяет, будут ли сообщения об устаревании выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека при устаревании. Это свойство вместо флага командной строки `--trace-deprecation`.

### `process.traceProcessWarnings`

`Boolean`, определяет, будут ли предупреждения процесса, выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека для предупреждений процесса (включая устаревания). Это свойство вместо флага командной строки `--trace-warnings`.

### `process.type` _Только чтение_

A `String` representing the current process's type, can be:

* `browser` - The main process
* `renderer` - A renderer process
* `worker` - In a web worker

### `process.versions.chrome` _Только чтение_

`String`, представляющая строку версии Chrome.

### `process.versions.electron` _Только чтение_

`String`, представляющая строку версии Electron.

### `process.windowsStore` _Только чтение_

А `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

### `process.contextId` _Только чтение_

A `String` (optional) representing a globally unique ID of the current JavaScript context. Each frame has its own JavaScript context. When contextIsolation is enabled, the isolated world also has a separate JavaScript context. This property is only available in the renderer process.

## Методы

Объект `process` имеет следующие методы:

### `process.crash()`

Вызывает сбой основного потока текущего процесса.

### `process.getCreationTime()`

Возвращает `Number | null` - Количество миллисекунд с начала эпохи, или `null`, если информация недоступна

Indicates the creation time of the application. Время представлено как количество миллисекунд с начала эпохи. It returns null if it is unable to get the process creation time.

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

Returns an object with V8 heap statistics. Обратите внимание, что вся статистика предоставляется ​​в Килобайтах.

### `process.getBlinkMemoryInfo()`

Возвращает `Object`:

* `allocated` Integer - Размер всех выделенных объектов в Килобайтах.
* `marked` Integer - Размер всех отмеченных объектов в Килобайтах.
* `total` Integer - Всего выделено места в Килобайтах.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Возвращает `Promise<ProcessMemoryInfo>` - Разрешается с [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium не предоставляет значение `residentSet` для macOS. Это связано с тем, что MacOS сжимает в памяти страницы, которые в последнее время не использовались. В результате значение размера резидентного набора не соответствует ожидаемому. `private` память является более репрезентативной для фактического использования перед сжатием памяти процесса в MacOS.

### `process.getSystemMemoryInfo()`

Возвращает `Object`:

* `total` Integer - Общий объем физической памяти в килобайтах, доступный системе.
* `free` Integer - Общий объем памяти, не используемый приложениями или дисковым кэшем.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

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
