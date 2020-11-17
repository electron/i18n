# Nedávné dokumenty (Windows & macOS)

Windows a macOS poskytují přístup k seznamu nedávných dokumentů, které otevřela aplikace přes JumpList nebo dok menu.

__JumpList:__

![Nedávné soubory JumpList][1]

__Nabídka aplikačního doku:__

![macOS dok Menu][2]

To add a file to recent documents, you can use the [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments][clearrecentdocuments] API to empty the recent documents list:

```javascript
const { app } = require('electron')
app.clearRecentDocuments() )
```

## Poznámky k Windows

Aby bylo možné použít tuto funkci v systému Windows, Vaše žádost musí být zaregistrována jako zpracovatel typu souboru dokumentu, jinak se soubor nezobrazí v JumpList ani po jeho přidání. You can find everything on registering your application in [Application Registration][app-registration].

Když uživatel klikne na soubor z JumpList, nová instance vaší aplikace bude spuštěna cestou souboru přidaného jako argument příkazové řádky.

## Poznámky macOS

Když je požadován soubor z nabídky nedávných dokumentů, pro tento modul bude vypnut `otevřený soubor` událost z `aplikace`.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
