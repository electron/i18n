# Обект JumpListItem

* `type` String (optional) - One of the following:
  * `task` - Задачата ще стартира приложение с конкретни аргументи.
  * `separator` - Може да бъде използвано за отделни елементи в категорията на стандартни `Tasks`.
  * `file` - Връзката на файл ще отвори файл с помощта на приложение, което е създало Jump списъка, за да работи приложението, то трябва да бъде регистрирано като манипулатор за типа на файла (въпреки че тя не е нужно да бъде манипулатора по подразбиране).
* `path` String (по избор) - Пътя на файла, за отваряне, трябва да се зададе само ако `type` `file`.
* `program` String (по избор) - Пътя на програмата, която трябва да се изпълни, обикновено трябва да укажете `process.execPath`, което отваря текущата програма. Трябва да се зададе само ако `type` е `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). Обикновено можете да укажете `process.execPath` да покаже иконата на програмата.
* `iconIndex` Number (по избор) - Индексът на иконата в ресурсния файл. Ако ресурсен файл съдържа няколко икони, тази стойност може да се използват за указване на 0-баиран индекс на иконата, която трябва да се показва за тази задача. Ако ресурсен файл съдържа само една икона, това свойство трябва да бъде равно на нула.
* `workingDirectory` String (optional) - The working directory. Default is empty.
