# Documents récents (Windows & macOS)

## Vue d'ensemble

Windows et macOS permettent d’accéder facilement à la liste des documents récemment ouverts par l'application respectivement via JumpList ou dock menu.

__JumpList :__

![JumpList fichiers récents][1]

__Menu application du dock :__

![Dock de macOS][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Exemple

### Ajouter un élément aux documents récents

Commencer avec une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), ajoutez les lignes suivantes au fichier `main.js`:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Après avoir lancé l'application Electron, faites un clic droit sur l'icône de l'application. Vous devriez voir l'article que vous venez d'ajouter. Dans ce guide, l'élément est un fichier Markdown situé à la racine du projet :

![Document récent](../images/recent-documents.png)

### Effacer la liste des documents récents

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Informations complémentaires

### Remarques Windows

Pour utiliser cette fonctionnalité sur Windows, votre application doit être enregistrée en tant que gestionnaire du type de fichier du document, sinon le fichier n'apparaîtra pas dans JumpList même après l'avoir ajouté. Vous trouverez tout l'enregistrement de votre application dans [Enregistrement de l'application][app-registration].

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, cela démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

### Remarques macOS

#### Ajouter la liste Documents récents au menu de l'application

Vous pouvez ajouter des éléments de menu pour accéder et effacer les documents récents en ajoutant le snippet suivant à votre modèle de menu:

```json
{
  "sous-menu":[
    {
      "label":"Ouvrir récent",
      "rôle":"documents récents",
      "sous-menu":[
        {
          "label":"Effacer les récents",
          "rôle":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![Élément de menu Documents récents macOS][6]

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement `open-file` du module `app` sera émit.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
