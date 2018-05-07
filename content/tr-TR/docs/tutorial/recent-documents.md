# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**Görev Listesi:**

![Görev listesi Son Dosyalar listesi](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Uygulama kesinti menüsü:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Yeni belgelere dosya eklemek için, [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/kullanıcı/kullanıcıadı/Masaüstü/iş.tipi')
```

Ve boşaltmak için [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API'sını kullanabilirsiniz son belgeler listesi:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows notları

Bu özelliği Windows'ta kullanabilmek için uygulamanızın belgenin dosya türünü bir işleyici olarak kaydetmesi gerekir, aksi halde dosya ekledikten sonra bile Görev listesi'nde görünmeyecektir. Her şeyi bulabilirsiniz Başvurunuzun tescili hakkında [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Bir kullanıcı Görev Listesi'nden bir dosyayı tıkladığında, uygulamanızın yeni bir örneği komut satırı argümanı olarak eklenen dosyanın yolu ile başlatılacaktır.

## macOS Notları

Son belgeler menüsünden bir dosya istediğinde, `open-file` event of `app` modülü yayınlanacaktır.