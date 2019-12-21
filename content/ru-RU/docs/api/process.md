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
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed - Запущена ли песочница`
* `тип`
* `версия`
* `versions - Список с версиями и их зависимостями`
* `сборкой Mac App Storek_5dfe7eb46da016.47907193mas - Является ли сборкой Mac App Store`
* `windowsStore - Является ли приложением Windows Store (appx)`

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

### `process.defaultApp` *Только чтение*

`Boolean`. Когда app запущено, будучи переданным в качестве параметра в default app, это свойство принимает значение `true` в main process, иначе `undefined`.

### `process.isMainFrame` *Только чтение*

`Boolean`, `true`, когда текущий рендерер является рендерером основного "main" фрейма. Если вам нужен идентификатор текущего фрейма, используйте `webFrame.routingId`.

### `process.mas` *Только чтение*

`Boolean`. Для Mac App Store сборки это свойство `true`, для остальных сборок `undefined`.

### `process.noAsar`

`Boolean`. Управляет поддержкой ASAR внутри вашего приложения. Установка данного параметра в `true` отключит поддержку архивов `asar` во встроенных модулях Node.

### `process.noDeprecation`

`Boolean` который управляет тем, будут ли предупреждения об устаревании выводиться в `stderr` или нет. Установка в `true` заглушит предупреждения об устаревании. Это свойство используется вместо флага командной строки `--no-deprecation`.

### `process.enablePromiseAPIs`

`Boolean`, управляет тем, выводятся ли уведомления об устаревании в `stderr`, когда прежние API, основанные на обратном вызове, преобразованные в Promises, вызывались с использованием обратных вызовов. Установка значения `true` включит предупреждения о устаревании.

### `process.resourcesPath` *Только чтение*

`String`. Представляет из себя путь до каталога с ресурсами.

### `process.sandboxed` *Только чтение*

`Boolean`. Когда renderer process добавлен в sandbox это свойство принимает значение `true`, иначе `undefined`.

### `process.throwDeprecation`

`Boolean`, определяет, будут ли предупреждения об устаревании выдаваться как исключения. Установка значения `true` приведет к выдаче ошибок при устаревании. Это свойство используется вместо флага командной строки `--throw-deprecation`.

### `process.traceDeprecation`

`Boolean`, определяет, будут ли сообщения об устаревании выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека при устаревании. Это свойство вместо флага командной строки `--trace-deprecation`.

### `process.traceProcessWarnings`

`Boolean`, определяет, будут ли предупреждения процесса, выдаваемые в `stderr`, включать трассировку стека. Установка значения `true` напечатает трассировку стека для предупреждений процесса (включая устаревания). Это свойство вместо флага командной строки `--trace-warnings`.

### `process.type` *Только чтение*

`String`, представляющая тип текущего процесса, может быть `"browser"` (основной процесс), `"renderer"`, или `"worker"` (т.е. веб-работник).

### `process.versions.chrome` *Только чтение*

`String`, представляющая строку версии Chrome.

### `process.versions.electron` *Только чтение*

`String`, представляющая строку версии Electron.

### `process.windowsStore` *Только чтение*

`Boolean`. Когда приложение запущено как приложение Windows Store (appx), это свойство принимает значение `true`, иначе `undefined`.

## Методы

Объект `process` имеет следующие методы:

### `process.crash()`

Вызывает сбой основного потока текущего процесса.

### `process.getCreationTime()`

Возвращает `Number | null` - Количество миллисекунд с начала эпохи, или `null`, если информация недоступна

Показывает время создания приложения. Время представлено как количество миллисекунд с начала эпохи. Возвращает null, если не получается получить время создания процесса.

### `process.getCPUUsage()`

Возвращает [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Возвращает [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Возвращает `Object`:

* `totalHeapSize` Integer - Память, выделенная для кучи
* `totalHeapSizeExecutable` Integer - Память для исполняемого файла
* `totalPhysicalSize` Integer - Доступный размер
* `totalAvailableSize` Integer - Доступный размер кучи
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Возвращает объект со статистикой кучи V8. Обратите внимание, что вся статистика отображается в Килобайтах.

### `process.getBlinkMemoryInfo()`

Возвращает `Object`:

* `allocated` Integer - Размер всех выделенных объектов в Килобайтах.
* `marked` Integer - Размер всех отмеченных объектов в Килобайтах.
* `total` Integer - Всего выделено места в Килобайтах.

Returns an object with Blink memory information. It can be useful for debugging rendering / DOM related memory issues. Note that all values are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Возвращает `Promise<ProcessMemoryInfo>` - Разрешается с [ProcessMemoryInfo](structures/process-memory-info.md)

Возвращает объект, содержащий статистику использования памяти о текущем процессе. Заметьте, что вся статистика представлена в Килобайтах. Это API необходимо вызывать только после готовности приложения.

Chromium не предоставляет значение `residentSet` для macOS. Это связано с тем, что MacOS сжимает в памяти страницы, которые в последнее время не использовались. В результате значение размера резидентного набора не соответствует ожидаемому. `private` память является более репрезентативной для фактического использования перед сжатием памяти процесса в MacOS.

### `process.getSystemMemoryInfo()`

Возвращает `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

Пример:

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.