# crashReporter

> Отправляйте отчёты об ошибках на удалённый сервер.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

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
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. По умолчанию - `true`.
  * `ignoreSystemCrashHandler` Boolean (опционально) - Значение по умолчанию - `false`.
  * `extra` Record<String, String> Object (опционально) - Объект, который вы можете задать, он будет отправлен вместе с отчетом. Только строковые свойства могут быть посланы корректно. Вложенные объекты не поддерживаются. При использовании Windows имена и значения свойств должны быть меньше 64 символов.
  * `crashesDirectory` String (опционально) -Папка для временного хранения отчетов об ошибках (используется только когда crashReporter запущен через `process.crashReporter.start`).

Вы должны обращаться к этому методу перед тем, как использовать другие вызовы, принадлежащие `crashReporter` и каждому процессу (main/renderer), с помощью которого вы хотите собирать отчеты о сбоях. Вы можете передавать различные параметры в вызов `crashReporter.start` при обращении из разных процессов.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Поэтому, чтобы получить из них отчеты о сбоях, используйте `process.crashReporter.start`. Передайте те же параметры, что и выше наряду с дополнительным вызовом `crashesDirectory`, который должен указывать на временный каталог хранения отчетов о сбоях. Вы можете проверить это, вызвав `process.crash()`, чтобы аварийно завершить дочерний процесс.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. Если вы хотите включить отчеты о сбоях, инициализация `crashpad` из главного процесса с использованием `crashReporter.start` требуется вне зависимости, из какого процесса вы хотите собирать отчеты. После инициализации этим способом обработчик будет собирать сбои от всех процессов. Несмотря на это, вам все равно придется вызывать `crashReporter.start` из дочернего процесса или из процесса рендеринга, в противном случае отчеты о сбоях не будут иметь `companyName`, `productName` или любую другую `extra` информацию.

### `crashReporter.getLastCrashReport()`

Возвращает [`CrashReport`](structures/crash-report.md):

Возвращает дату и ID последнего отчёта об ошибке. Будут возвращены только загруженные отчеты об ошибках; даже если отчет об ошибке присутствует на диске, он не будет возвращен до тех пор, пока он не будет загружен. Если нет загруженных отчетов, возвращается `null`.

### `crashReporter.getUploadedReports()`

Возвращает [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` String - Параметр ключа должен содержать не более 64 символов.
* `value` String - Значение параметра должно быть не более 64 символов.

Установите дополнительный параметр, который будет отправлен с отчетом о сбое. Значения, указанные здесь, будут отправлены в дополнении к значениям, установленным через `extra` после того, как `start` был вызван. Этот API доступен только в macOS и Windows. Если вам требуется добавить/обновить дополнительные параметры в Linux после первого вызова `start`, вы можете вызвать `start` еще раз с уже обновленными `extra` параметрами.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` String - Параметр ключа должен содержать не более 64 символов.

Удалите дополнительный параметр из текущего набора параметров, чтобы он не отправлялся в отчете о сбое.

### `crashReporter.getParameters()`

Вызов для получения всех текущих параметров, передаваемых процессу по формированию отчета.

### `crashReporter.getCrashesDirectory()`

Returns `String` - The directory where crashes are temporarily stored before being uploaded.

## Отчет о нагрузке

Процесс отчетов о сбоях отправит следующие данные в `submitURL` как `multipart/form-data` `POST`:

* `ver` String - Версия Electron.
* `platform` String - например, 'win32'.
* `process_type` String - например, 'renderer'.
* `guid` String - например, '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - Версия в `package.json`.
* `_productName` String - Имя продукта в `crashReporter` `options` объекте.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - Имя компании в `crashReporter` `options` объекте.
* `upload_file_minidump` File - Отчет о сбое в формате `minidump`.
* Все свойства на уровне 1 объекта `extra` в объекте `crashReporter` `options`.
