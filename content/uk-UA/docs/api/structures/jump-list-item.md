# Об'єкт JumpListItem

* `type` String (опціонально) - Один з наступних: 
  * `task` - Завдання запустить додаток з конкретними параметрами.
  * `separator` - Може використовуватися для відокремлення елементів в стандартній категорії `Tasks`.
  * `file` - Посилання на файл відкриє файл через додаток, що створив список переходів, для цього додаток має бути зареєстрований як обробник для типу файлів (не обов'язково обробником за замовчуванням).
* `path` String (опціонально) - Шлях до файлу, має бути встановлений тільки якщо `type` `file`.
* `program` String (опціонально) - Шлях до програми, зазвичай потрібно вказати `process.execPath` який відкриває поточну програму. Має бути встановлений тільки якщо `type` `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.