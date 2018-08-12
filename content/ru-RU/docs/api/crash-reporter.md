# crashReporter

> Отправляйте отчёты об ошибках на удалённый сервер.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ниже приведён пример автоматической отправки отчетов об ошибках на удаленный сервер:

```javascript
const {crashReporter} = require('electron')

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

Отчеты о сбоях сохраняются в директории временных фалов приложения. Отчеты для `productName:` `'YourName'` сохраняются в папку `YourName Crashes`, которая расположена во временной директории. Перед составлением отчета о сбоях вы можете изменить путь ко временной директории для вашего приложения, вызывая `app.setPath('temp', '/my/custom/temp')`.

## Методы

Модуль `crashReporter` имеет следующие методы:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (опционально)
  * `submitURL` String - URL, на который будет отправлен отчет POST-запросом.
  * `productName` String (опционально) - Значение по умолчанию - `app.getName()`.
  * `uploadToServer` Boolean (опционально) - Должны ли отчеты быть загружены на сервер. Значение по умолчанию - `true`.
  * `ignoreSystemCrashHandler` Boolean (опционально) - Значение по умолчанию - `false`.
  * `extra` Object (опционально) - Объект, который вы можете задать, он будет отправлен вместе с отчетом. Только строковые свойства могут быть посланы корректно. Вложенные объекты не поддерживаются, длина значений и имен свойств должна быть менее чем 64 символа.
  * `crashesDirectory` String (опционально) -Папка для временного хранения отчетов об ошибках (используется только когда crashReporter запущен через `process.crashReporter.start`).

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

Возвращает дату и ID последнего отчета о сбое. Если ни одного отчета не было отослано или процесс создания отчетов не был запущен, вернет `null`.

### `crashReporter.getUploadedReports()`

Возвращает [`CrashReport[]`](structures/crash-report.md):

Возвращает все загруженные отчеты. Каждый отчет содержит дату и ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Возвращает `Boolean` - Должны ли отчеты быть загружены на сервер. Устанавливается через метод `start` или `setUploadToServer`.

**Примечание:** Это АПИ можно вызвать только из главного процесса.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Должны ли отчеты быть загружены на сервер.

Обычно это контролируется пользовательскими настройками. Эффекта не будет, если вызов был до `start`.

**Примечание:** Это АПИ можно вызвать только из главного процесса.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - Параметр ключа должен содержать не более 64 символов.
* `value` String - Значение параметра должно быть не более 64 символов.

Установите дополнительный параметр, который будет отправлен с отчетом о сбое. Значения, указанные здесь, будут отправлены в дополнении к значениям, установленным через `extra` после того, как `start` был вызван. Этот АПИ доступен только в macOS. Если вам требуется добавить/обновить дополнительные параметры в Linux и Windows после первого вызова `start`, вы можете вызвать `start` еще раз с уже обновленными `extra` параметрами.

### `crashReporter.removeExtraParameter(key)` *macOS*

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