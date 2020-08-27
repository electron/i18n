# Ostatnie dokumenty (Windows & macOS)

Windows i macOS umożliwiają dostęp do listy ostatnich dokumentów, którą można otworzyć za pomocą JumpList lub dock menu, odpowiednio od używanego systemu.

__JumpList:__

![Ostatnie pliki JumpList][1]

__Dock menu:__

![macOS Dock Menu][2]

Aby dodać plik do listy ostatnich dokumentów możesz użyć polecenia [app.addRecentDocument][addrecentdocument] znajdującego się w API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Możesz również użyć [app.clearRecentDocuments][clearrecentdocuments] aby wyczyścić listę:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows Notes

Aby móc skorzystać z tej funkcji w systemie Windows, twoja aplikacja musi być zarejestrowana jako moduł obsługi plików typu dokument, w przeciwnym wypadku plik nie pojawi się w JumpList nawet po ich dodaniu. Możesz znaleźć wszystko, po zarejestrowaniu swojej aplikacji w [Rejestracja Aplikacji][app-registration].

Kiedy użytkownik kliknie na plik z JumpList, nowa instancja twojej aplikacji wystartuje ze ścieżki pliku dodanej jako argument w wierszu polecenia.

## macOS Notes

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

Gdy żądany jest plik z listy ostatnich dokumentów (dock menu), emitowany jest event `open-file` z modułu `app`.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
