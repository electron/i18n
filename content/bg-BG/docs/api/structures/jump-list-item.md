# Обект JumpListItem

* `тип` String (по избор) - Едно от следните: 
  * `task` - Задачата ще стартира приложение с конкретни аргументи.
  * `separator` - Може да бъде използвано за отделни елементи в категорията на стандартни `Tasks`.
  * `file` - Връзката на файл ще отвори файл с помощта на приложение, което е създало Jump списъка, за да работи приложението, то трябва да бъде регистрирано като манипулатор за типа на файла (въпреки че тя не е нужно да бъде манипулатора по подразбиране).
* `path` String (по избор) - Пътя на файла, за отваряне, трябва да се зададе само ако `type` `file`.
* `program` String (по избор) - Пътя на програмата, която трябва да се изпълни, обикновено трябва да укажете `process.execPath`, което отваря текущата програма. Трябва да се зададе само ако `type` е `task`.
* `args` String (по избор) - Аргументите на командния ред, когато `програмата` се изпълнява. Трябва да се зададе само ако `type` е `task`.
* `title` String (по избор) - Текстът който се показва за елемент в списъка за прескачане (Jump list). Трябва да се зададе само ако `type` е `task`.
* `description` String (по избор) - Описание на задачата (показва се в подсказка). Трябва да се зададе само ако `type` е `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.