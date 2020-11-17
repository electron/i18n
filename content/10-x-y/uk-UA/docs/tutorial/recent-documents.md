# Останні Документи (Windows & macOS)

Windows and macOS надають доступ до списку останніх документів, відкритих користувачем додаток через JumpList або нижнє меню, відповідно.

__JumpList:__

![Файли JumpList][1]

__Застосування меню док-станції:__

![меню macOS Dock][2]

To add a file to recent documents, you can use the [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments][clearrecentdocuments] API to empty the recent documents list:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Нотатки Windows

Щоб мати можливість використовувати цю функцію на Windows, ваша заявка повинна бути зареєстрована як обробник типу файлу документа, інакше файл не з'явиться в JumpList навіть після його додавання. You can find everything on registering your application in [Application Registration][app-registration].

Коли користувач натискає файл з JumpList, новий екземпляр вашого додатку буде запущений шляхом додавання до файлу в якості аргументу командного рядка.

## macOS нотатки

Коли файл запитано з останнього меню, модуль `відкритий файл` з `додатку` буде викликатися для нього.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
