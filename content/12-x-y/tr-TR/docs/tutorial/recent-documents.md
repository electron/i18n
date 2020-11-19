# Recent Documents (Windows & macOS)

## Genel Bakış

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__Görev Listesi:__

![Görev listesi Son Dosyalar listesi][1]

__Uygulama kesinti menüsü:__

![macOS Dock Menu][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Örnek

### Add an item to recent documents

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `main.js` file:

```javascript
const { app } = require('electron')

app.addRecentDocument('/kullanıcı/kullanıcıadı/Masaüstü/iş.tipi')
```

After launching the Electron application, right click the application icon. You should see the item you just added. In this guide, the item is a Markdown file located in the root of the project:

![Recent document](../images/recent-documents.png)

### Clear the list of recent documents

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Additional information

### Windows notları

To use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. Her şeyi bulabilirsiniz Başvurunuzun tescili hakkında [Application Registration][app-registration].

Bir kullanıcı Görev Listesi'nden bir dosyayı tıkladığında, uygulamanızın yeni bir örneği komut satırı argümanı olarak eklenen dosyanın yolu ile başlatılacaktır.

### macOS Notları

#### Add the Recent Documents list to the application menu

You can add menu items to access and clear recent documents by adding the following code snippet to your menu template:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS Recent Documents menu item][6]

Son belgeler menüsünden bir dosya istediğinde, `open-file` event of `app` modülü yayınlanacaktır.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
