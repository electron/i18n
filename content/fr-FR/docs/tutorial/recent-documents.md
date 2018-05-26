# Documents récents (Windows & macOS)

Windows et macOS permettent d’accéder facilement à la liste des documents récemment ouverts par l'application respectivement via JumpList ou dock menu.

**JumpList :**

![JumpList fichiers récents](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menu application du dock :**

![Dock de macOS](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Pour ajouter un fichier aux documents récents, vous pouvez utiliser l'API [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) :

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Et l'API [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) vous permet de vider la liste des documents récents :

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Remarques Windows

Pour pouvoir utiliser cette fonctionnalité sur Windows, votre application doit être enregistrée en tant que gestionnaire/responsable du type de fichier du document, sinon le fichier n’apparaîtra pas dans la JumpList même après l'avoir ajouté. Vous trouverez tout l'enregistrement de votre application dans [Enregistrement de l'application](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Lorsqu’un utilisateur clique sur un fichier à partir de la JumpList, cela démarre une nouvelle instance de votre application avec le chemin d’accès du fichier ajouté comme un argument de ligne de commande.

## Remarques macOS

Lorsqu’un fichier est demandé dans le menu documents récents, l’événement `open-file` du module `app` sera émit.