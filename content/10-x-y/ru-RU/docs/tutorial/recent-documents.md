# Недавние документы (Windows & macOS)

Windows и macOS предоставляют легкий доступ к списку последних документов открытых приложением через JumpList или dock меню, соответственно.

__JumpList:__

![JumpList Recent Files][1]

__Dock меню приложения:__

![macOS Dock Menu][2]

Чтобы добавить файл в недавние документы, можно использовать [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

И вы можете использовать [app.clearRecentDocuments][clearrecentdocuments] API, чтобы очистить список последних документов:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows примечания

In order to be able to use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. Вы можете найти все о регистрации вашего приложения в [Application Registration][app-registration].

Когда пользователь щелкает файл из JumpList, новый экземпляр приложения будет запущен с добавленного пути файла, как аргумент командной строки.

## macOS примечания

When a file is requested from the recent documents menu, the `open-file` event of `app` module will be emitted for it.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
