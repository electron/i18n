# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__Görev Listesi:__

![Görev listesi Son Dosyalar listesi][1]

__Uygulama kesinti menüsü:__

![macOS Dock Menu][2]

Yeni belgelere dosya eklemek için, [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/kullanıcı/kullanıcıadı/Masaüstü/iş.tipi')
```

Ve boşaltmak için [app.clearRecentDocuments][clearrecentdocuments] API'sını kullanabilirsiniz son belgeler listesi:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows notları

Bu özelliği Windows'ta kullanabilmek için uygulamanızın belgenin dosya türünü bir işleyici olarak kaydetmesi gerekir, aksi halde dosya ekledikten sonra bile Görev listesi'nde görünmeyecektir. Her şeyi bulabilirsiniz Başvurunuzun tescili hakkında [Application Registration][app-registration].

Bir kullanıcı Görev Listesi'nden bir dosyayı tıkladığında, uygulamanızın yeni bir örneği komut satırı argümanı olarak eklenen dosyanın yolu ile başlatılacaktır.

## macOS Notları

### Adding the Recent Documents list to the application menu:

![macOS Recent Documents menu item][6]

You can add menu items to access and clear recent documents by adding the following code snippet to your menu's template.

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

Son belgeler menüsünden bir dosya istediğinde, `open-file` event of `app` modülü yayınlanacaktır.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
