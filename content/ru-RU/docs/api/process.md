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
* `сборкой Mac App Storek_5e0f8f303ca208.83687570mas - Является ли сборкой Mac App Store`
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
* `totalPhysicalSize` Integer - Заданный размер
* `totalAvailableSize` Integer - Доступный размер кучи
* `usedHeapSize` Integer - Память, используемая данными приложения
* `heapSizeLimit` Integer - Абсолютный предел, который куча не может превышать
* `mallocedMemory` Integer - Текущий объем памяти, полученный через malloc
* `peakMallocedMemory` Integer - Пиковый объем памяти, полученный через malloc
* `doesZapGarbage` Boolean - Включена ли опция --zap_code_space

Возвращает объект со статистикой кучи V8. Обратите внимание, что вся статистика отображается в Килобайтах.

### `process.getBlinkMemoryInfo()`

Возвращает `Object`:

* `allocated` Integer - Размер всех выделенных объектов в Килобайтах.
* `marked` Integer - Размер всех отмеченных объектов в Килобайтах.
* `total` Integer - Всего выделено места в Килобайтах.

Возвращает объект с информацией о памяти Blink. Он может быть полезен для отладки проблем с памятью, связанной с рендерингом / DOM. Обратите внимание, что все значения указываются в килобайтах.

### `process.getProcessMemoryInfo()`

Возвращает `Promise<ProcessMemoryInfo>` - Разрешается с [ProcessMemoryInfo](structures/process-memory-info.md)

Возвращает объект, содержащий статистику использования памяти о текущем процессе. Заметьте, что вся статистика представлена в Килобайтах. Это API необходимо вызывать только после готовности приложения.

Chromium не предоставляет значение `residentSet` для macOS. Это связано с тем, что MacOS сжимает в памяти страницы, которые в последнее время не использовались. В результате значение размера резидентного набора не соответствует ожидаемому. `private` память является более репрезентативной для фактического использования перед сжатием памяти процесса в MacOS.

### `process.getSystemMemoryInfo()`

Возвращает `Object`:

* `total` Integer - Общий объем физической памяти в килобайтах, доступный системе.
* `free` Integer - Общий объем памяти, не используемый приложениями или дисковым кэшем.
* `swapTotal` Integer *Windows* *Linux* - Общий объем памяти подкачки в килобайтах, доступной системе.
* `swapFree` Integer *Windows* *Linux* - Свободный объем памяти подкачки в килобайтах, доступный системе.

Возвращает объект, дающий статистику использования памяти по всей системе. Обратите внимание, что вся статистика выдается в килобайтах.

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

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Устанавливает мягкое ограничение дескрипторов файлов до `maxDescriptors` или жесткое ограничение операционной системы, в зависимости от того, какое значение ниже для текущего процесса.