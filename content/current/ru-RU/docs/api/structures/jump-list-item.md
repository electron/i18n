# Объект JumpListItem

* `type` String (optional) - One of the following:
  * `task` - задача запускает приложение с конкретными аргументами.
  * `separator` - может использоваться для разделения элементов в стандартной категории `Tasks`.
  * `file` - ссылка на файл откроет файл, используя приложение, которое создало список переходов, чтобы это работало приложение должно быть зарегистрировано как обработчик для типа файла (хотя он не должен быть обработчиком по умолчанию).
* `path` String (опционально) - путь к открытому файлу должен быть установлен только в том случае, если `type` является `file`.
* `program` String (опционально) - путь программы для выполнения, обычно вы должны указать `process.execPath`, который открывает текущую программу. Должно быть установлен, если `type` является `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (опционально) - абсолютный путь к иконке, отображаемой в списке переходов, которая может быть произвольным файлом ресурсов, который содержит значок (пр. `.ico`, `.exe`, `.dll`). Обычно Вы можете указать `process.execPath`, чтобы показать иконку программы.
* `iconIndex` Number (опционально) - индекс иконки в файле ресурсов. Если файл ресурса содержит несколько иконок, это значение можно использовать для указания индекса иконки, начиная с нуля, которая должна отображаться для этой задачи. Если файл ресурса содержит только одну иконку, это свойство должно быть установлено равным нулю.
* `workingDirectory` String (optional) - The working directory. Default is empty.
