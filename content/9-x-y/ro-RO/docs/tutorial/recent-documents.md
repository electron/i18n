# Documente recente (Windows & macOS)

Windows și macOS oferă acces la o listă de documente recente deschise de prin meniul JumpList, respectiv dock.

__JumpList:__

![JumpList Fișiere recente][1]

__Meniu dock aplicație:__

![Meniu andocare macOS][2]

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

## Note Windows

Pentru a putea utiliza această funcție pe Windows, aplicația dvs. trebuie să fie înregistrată ca gestionar al tipului de fișier al documentului, În caz contrar, fișierul nu va apărea în JumpList nici după ce l-ați adăugat. You can find everything on registering your application in [Application Registration][app-registration].

Când un utilizator apasă pe un fișier din lista JumpList, o nouă instanță a aplicației dvs. va fi începută cu calea fișierului adăugat ca argument în linia de comandă.

## Note macOS

Atunci când se solicită un fișier din meniul de documente recente, modulul `fişier deschis` eveniment din `app` va fi emis pentru acesta.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
