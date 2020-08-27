# Documents récents (Windows & macOS)

Windows et macOS permettent d’accéder facilement à la liste des documents récemment ouverts par l'application respectivement via JumpList ou dock menu.

__JumpList :__

![JumpList fichiers récents][1]

__Menu application du dock :__

![Dock de macOS][2]

Pour ajouter un fichier aux documents récents, vous pouvez utiliser l'API [app.addRecentDocument][addrecentdocument] :

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Et l'API [app.clearRecentDocuments][clearrecentdocuments] vous permet de vider la liste des documents récents :

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Remarques Windows

Pour pouvoir utiliser cette fonctionnalité sur Windows, votre application doit être enregistrée en tant que gestionnaire/responsable du type de fichier du document, sinon le fichier n’apparaîtra pas dans la JumpList même après l'avoir ajouté. Vous trouverez tout l'enregistrement de votre application dans [Enregistrement de l'application][app-registration].

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, cela démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

## Remarques macOS

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

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement `open-file` du module `app` sera émit.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
