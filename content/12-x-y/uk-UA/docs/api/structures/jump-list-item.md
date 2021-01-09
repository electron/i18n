# Об'єкт JumpListItem

* `type` String (optional) - One of the following:
  * `task` - Завдання запустить додаток з конкретними параметрами.
  * `separator` - Може використовуватися для відокремлення елементів в стандартній категорії `Tasks`.
  * `file` - Посилання на файл відкриє файл через додаток, що створив список переходів, для цього додаток має бути зареєстрований як обробник для типу файлів (не обов'язково обробником за замовчуванням).
* `path` String (опціонально) - Шлях до файлу, має бути встановлений тільки якщо `type` `file`.
* `program` String (опціонально) - Шлях до програми, зазвичай потрібно вказати `process.execPath` який відкриває поточну програму. Має бути встановлений тільки якщо `type` `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (опціонально) - Абсолютний шлях до значка, що відображатиметься у списку переходів, може бути довільним ресурсом, що містить значок (наприклад, `.ico`, `.exe`, `.dll`). Зазвичай можна вказати `process.execPath`, щоб показати значок прогами.
* `iconIndex` Number (опціонально) - Індекс значка в ресурсі. Якщо ресурс містить декілька значків, це значення використовуватися для визначення індексу (починаючи з 0) значка для цього завдання. Якщо ресурс містить лише один значок, ця властивість має містити нуль.
* `workingDirectory` String (optional) - The working directory. Default is empty.
