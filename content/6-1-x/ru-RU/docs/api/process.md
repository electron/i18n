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
- `getProcessMemoryInfo() - Сведения о памяти процесса`
- `getSystemMemoryInfo()`
- `getSystemVersion() - Версия системы`
- `getCPUUsage()`
- `getIOCounters()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed - Запущена ли песочница`
- `тип`
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

### `process.defaultApp`

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

`Boolean` который управляет тем, будут ли предупреждения об устаревании выводиться в `stderr` или нет. Установка в `true` заглушит предупреждения об устаревании. Это свойство используется вместо флага командной строки `--no-deprecation`.

### `process.enablePromiseAPIs`

`Boolean`, управляет тем, выводятся ли уведомления об устаревании в `stderr`, когда прежние API, основанные на обратном вызове, преобразованные в Promises, вызывались с использованием обратных вызовов. Установка значения `true` включит предупреждения о устаревании.

### `process.resourcesPath`

`String`. Представляет из себя путь до каталога с ресурсами.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

`Boolean`, определяет, будут ли предупреждения об устаревании выдаваться как исключения. Установка значения `true` приведет к выдаче ошибок при устаревании. Это свойство используется вместо флага командной строки `--throw-deprecation`.

### `process.traceDeprecation`

`Boolean`, определяет, будут ли сообщения об устаревании выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека при устаревании. Это свойство вместо флага командной строки `--trace-deprecation`.

### `process.traceProcessWarnings`
`Boolean`, определяет, будут ли предупреждения процесса, выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека для предупреждений процесса (включая устаревания). Это свойство вместо флага командной строки `--trace-warnings`.

### `process.type`

`String`, представляющая тип текущего процесса, может быть `"browser"` (основной процесс), `"renderer"`, или `"worker"` (т.е. веб-работник).

### `process.versions.chrome`

`String`, представляющая строку версии Chrome.

### `process.versions.electron`

`String`, представляющая строку версии Electron.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

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

### `process.getProcessMemoryInfo()`

Возвращает `Promise<ProcessMemoryInfo>` - Разрешается с [ProcessMemoryInfo](structures/process-memory-info.md)

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium не предоставляет значение `residentSet` для macOS. Это связано с тем, что MacOS сжимает в памяти страницы, которые в последнее время не использовались. В результате значение размера резидентного набора не соответствует ожидаемому. `private` память является более репрезентативной для фактического использования перед сжатием памяти процесса в MacOS.

### `process.getSystemMemoryInfo()`

Возвращает `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Возвращает `String` - Версию операционной системы хоста.

Примеры:

| Platform | Версия              |
| -------- | ------------------- |
| macOS    | `10.13.6`           |
| Windows  | `10.0.17763`        |
| Linux    | `4.15.0-45-generic` |

**Примечание:** В отличие от `os.release()` он возвращает фактическую версию операционной системы, а не версию ядра на MacOS.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.
