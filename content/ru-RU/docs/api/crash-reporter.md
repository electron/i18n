# crashReporter

> Отправляйте отчёты об ошибках на удалённый сервер.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ниже приведён пример автоматической отправки отчетов об ошибках на удаленный сервер:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://ваш-домен.рф/ссылка-для-отправки',
  uploadToServer: true
})
```

Чтобы настроить сервер для приёма и обработки отчётов об ошибках, вы можете использовать эти проекты:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Или используйте стороннее решение:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Отчеты о сбоях сохраняются локально в папке temp-каталога конкретного приложения. Отчеты для `productName:` `'YourName'` сохраняются в папку `YourName Crashes`, которая расположена во временной директории. Перед составлением отчета о сбоях вы можете изменить путь ко временной директории для вашего приложения, вызывая `app.setPath('temp', '/my/custom/temp')`.

## Методы

Модуль `crashReporter` имеет следующие методы:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String
  * `submitURL` String - URL, на который будет отправлен отчет POST-запросом.
  * `productName` String (опционально) - Значение по умолчанию - `app.name`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. Default is `true`.
  * `ignoreSystemCrashHandler` Boolean (опционально) - Значение по умолчанию - `false`.
  * `extra` Record<String, String> (optional) - An object you can define that will be sent along with the report. Только строковые свойства могут быть посланы корректно. Nested objects are not supported. When using Windows, the property names and values must be fewer than 64 characters.
  * `crashesDirectory` String (optional) - Directory to store the crash reports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

Вы должны обращаться к этому методу перед тем, как использовать другие вызовы, принадлежащие `crashReporter` и каждому процессу (main/renderer), с помощью которого вы хотите собирать отчеты о сбоях. Вы можете передавать различные параметры в вызов `crashReporter.start` при обращении из разных процессов.

**Примечание:** Дочерние процессы, создаваемые средствами модуля `child_process` не будут иметь доступ к модулям Electron. Поэтому, чтобы получить из них отчеты о сбоях, используйте `process.crashReporter.start`. Передайте те же параметры, что и выше наряду с дополнительным вызовом `crashesDirectory`, который должен указывать на временный каталог хранения отчетов о сбоях. Вы можете проверить это, вызвав `process.crash()`, чтобы аварийно завершить дочерний процесс.

**Примечание:** Если вам нужно послать дополнительные/обновленные `extra` параметры после вашего первого вызова `start`, вы можете вызвать `addExtraParameter` в системе macOS или вызвать `start` вновь с новыми/обновленными `extra` параметрами в системах Linux и Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. Если вы хотите включить отчеты о сбоях, инициализация `crashpad` из главного процесса с использованием `crashReporter.start` требуется вне зависимости, из какого процесса вы хотите собирать отчеты. После инициализации этим способом обработчик будет собирать сбои от всех процессов. Несмотря на это, вам все равно придется вызывать `crashReporter.start` из дочернего процесса или из процесса рендеринга, в противном случае отчеты о сбоях не будут иметь `companyName`, `productName` или любую другую `extra` информацию.

### `crashReporter.getLastCrashReport()`

Возвращает [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### `crashReporter.getUploadedReports()`

Возвращает [`CrashReport[]`](structures/crash-report.md):

Возвращает все загруженные отчеты. Каждый отчет содержит дату и ID.

### `crashReporter.getUploadToServer()`

Возвращает `Boolean` - Должны ли отчеты быть загружены на сервер. Устанавливается через метод `start` или `setUploadToServer`.

**Примечание:** Это АПИ можно вызвать только из главного процесса.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean *macOS* - Должны ли отчеты быть загружены на сервер.

Обычно это контролируется пользовательскими настройками. Эффекта не будет, если вызов был до `start`.

**Примечание:** Это АПИ можно вызвать только из главного процесса.

### `crashReporter.addExtraParameter(key, value)` *macOS* *Windows*

* `key` String - Параметр ключа должен содержать не более 64 символов.
* `value` String - Значение параметра должно быть не более 64 символов.

Установите дополнительный параметр, который будет отправлен с отчетом о сбое. Значения, указанные здесь, будут отправлены в дополнении к значениям, установленным через `extra` после того, как `start` был вызван. This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS* *Windows*

* `key` String - Параметр ключа должен содержать не более 64 символов.

Удалите дополнительный параметр из текущего набора параметров, чтобы он не отправлялся в отчете о сбое.

### `crashReporter.getParameters()`

Вызов для получения всех текущих параметров, передаваемых процессу по формированию отчета.

## Отчет о нагрузке

Процесс отчетов о сбоях отправит следующие данные в `submitURL` как `multipart/form-data` `POST`:

* `ver` String - Версия Electron.
* `platform` String - например, 'win32'.
* `process_type` String - например, 'renderer'.
* `guid` String - например, '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - Версия в `package.json`.
* `_productName` String - Имя продукта в `crashReporter` `options` объекте.
* `prod` String - Название базового продукта. В этом случае Electron.
* `_companyName` String - Имя компании в `crashReporter` `options` объекте.
* `upload_file_minidump` File - Отчет о сбое в формате `minidump`.
* Все свойства на уровне 1 объекта `extra` в объекте `crashReporter` `options`.