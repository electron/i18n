# JumpListItem Объект

* `type` String (опиционально) - Одно из следующего: 
  * `task` - Задача запускает приложение с конкретными аргументами.
  * `separator` - Может использоваться для разделения элементов в стандартной категории `Tasks`.
  * `file` - Ссылка на файл откроет файл, используя приложение, которое создало Jump List, для этого приложение должно быть зарегистрировано как обработчик для типа файла (хотя он не должен быть обработчиком по умолчанию).
* `path` String (опиционально) - Путь к открытому файлу должен быть установлен только в том случае, если `type` является `file`.
* `program` String (опиционально) - Путь программы для выполнения, обычно вы должны указать `process.execPath`, который открывает текущую программу. Должно быть установлен, если `type` является `task`.
* `args` String (опиционально) - Аргументы командной строки, когда выполняется `program`. Должен быть установлен, если `type` является `task`.
* `title` String (опиционально) - Текст, который будет отображаться для элемента в Jump List. Должен быть установлен, если `type` является `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.