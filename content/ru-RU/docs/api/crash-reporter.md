# crashReporter

> Отправка отчёта об ошибке на удалённый сервер.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Пример автоматической отправки отчетов о сбоях на удаленный сервер:

```javascript
const {crashReporter} = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

Для установки сервера для приема и обработки отчетов о сбоях вы можете использовать следующие проекты:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Отчеты о сбоях сохраняются в директории временных фалов приложения. Отчеты для `productName:` `'YourName'` сохраняются в папку `YourName Crashes`, которая расположена во временной директории. Перед составлением отчета о сбоях вы можете изменить путь ко временной директории для вашего приложения, вызывая `app.setPath('temp', '/my/custom/temp')`.

## Методы

Модуль `crashReporter` имеет следующие методы:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (опционально)
  * `submitURL` String - URL, на который будет отправлен отчет POST-запросом.
  * `productName` String (опционально) - Значение по умолчанию - `app.getName()`.
  * `uploadToServer` Boolean (опционально) - Будет ли отправлен отчет на сервер? Значение по умолчанию - `true`.
  * `ignoreSystemCrashHandler` Boolean (опционально) - Значение по умолчанию - `false`.
  * `extra` Object (опционально) - Определив этот объект, вы сможете отправить его вместе с отчетом. Только строковые свойства могут быть посланы корректно. Вложенные объекты не поддерживаются, длина значений и имен свойств должна быть менее чем 64 символа.
  * `crashesDirectory` String (опционально) - Каталог временного хранения отчетов о сбоях (используется исключительно в ситуации, когда запущен процесс формирования отчетов через вызов `process.crashReporter.start`).

Вы должны обращаться к этому методу перед тем, как использовать другие вызовы, принадлежащие `crashReporter` и каждому процессу (main/renderer), с помощью которого вы хотите собирать отчеты о сбоях. Вы можете передавать различные параметры в вызов `crashReporter.start` при обращении из разных процессов.

**Примечание:** Дочерние процессы, создаваемые средствами модуля `child_process` не будут иметь доступ к модулям Electron. Поэтому, чтобы получить из них отчеты о сбоях, используйте `process.crashReporter.start`. Передайте те же параметры, что и выше наряду с дополнительным вызовом `crashesDirectory`, который должен указывать на временный каталог хранения отчетов о сбоях. Вы можете проверить это, вызвав `process.crash()`, чтобы аварийно завершить дочерний процесс.

**Примечание:** Чтобы получить отчеты о сбоях от дочернего процесса в Windows, вам также необходимо добавить этот дополнительный код. Это запустит процесс, который будет отслеживать и отправлять отчеты. Замените `submitURL`, `productName` и `crashesDirectory` подходящими значениями.

**Примечание:** Если вам нужно послать дополнительные/обновленные `extra` параметры после вашего первого вызова `start`, вы можете вызвать `addExtraParameter` в системе macOS или вызвать `start` вновь с новыми/обновленными `extra` параметрами в системах Linux и Windows.

```js
 const args = [
   `--reporter-url=${submitURL}`,
   `--application-name=${productName}`,
   `--crashes-directory=${crashesDirectory}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**Примечание:** В системе macOS Electron использует новый `crashpad` клиент для сбора сбоев и составления отчетов. Если вы хотите включить отчеты о сбоях, инициализация `crashpad` из главного процесса с использованием `crashReporter.start` требуется вне зависимости, из какого процесса вы хотите собирать отчеты. После инициализации этим способом обработчик будет собирать сбои от всех процессов. Несмотря на это, вам все равно придется вызывать `crashReporter.start` из дочернего процесса или из процесса рендеринга, в противном случае отчеты о сбоях не будут иметь `companyName`, `productName` или любую другую `extra` информацию.

### `crashReporter.getLastCrashReport()`

Возвращает [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. If no crash reports have been sent or the crash reporter has not been started, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

See all of the current parameters being passed to the crash reporter.

## Crash Report Payload

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.