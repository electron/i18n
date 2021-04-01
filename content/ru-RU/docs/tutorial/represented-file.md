# Представленный файл для macOS BrowserWindows

## Обзор

На macOS можно установить представленный файл для любого окна в приложении. Значок представленного файла будет показан в титульном баре, а когда пользователи `Command-Click` или `Control-Click`, всплывающее окно с пути к файлу будет показано.

![Представленный файл][1]

> ПРИМЕЧАНИЕ: Скриншот выше является примером, где эта функция используется для обозначения в настоящее время открытый файл в текстовом редакторе Atom.

Вы также можете настроить отредактированное состояние для окна, чтобы значок файла указать, был ли изменен документ в этом окне.

Для установления представленного файла можно использовать [BrowserWindow.setRepresentedFilename][setrepresentedfilename] и [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), добавьте следующие строки в файл `main.js`:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } - требуют ('электрон')

app.whenReady ()..,тогда (()) -> -
  const win - новый BrowserWindow ()

  win.setRepresentedFilename ('/etc/passwd')
  win.setDocumentEdited (правда)
)
```

После запуска приложения Electron нажмите на заголовок с нажатием `Command` или `Control` клавиши. Вы должны увидеть всплывающее окно с файлом, который вы только что определили:

![Представленный файл](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
