# Nedávné dokumenty (Windows & macOS)

## Přehled

Windows a macOS poskytují přístup k seznamu nedávných dokumentů, které otevřela aplikace přes JumpList nebo dok menu.

__JumpList:__

![Nedávné soubory JumpList][1]

__Nabídka aplikačního doku:__

![macOS dok Menu][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Ukázka

### Přidat položku k nedávným dokumentům

Začíná funkční aplikací z [Rychlý startovací průvodce](quick-start.md), přidejte následující řádky do souboru `main.js`:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Po spuštění Electron aplikace klikněte pravým tlačítkem myši na ikonu aplikace. Měl bys vidět předmět, který jsi právě přidal. V této příručce je položka Markdown soubor umístěný v kořenovém adresáři projektu:

![Nedávný dokument](../images/recent-documents.png)

### Vymazat seznam nedávných dokumentů

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments() )
```

## Další informace

### Poznámky k Windows

Chcete-li použít tuto funkci v systému Windows, musí být vaše aplikace zaregistrována jako zpracovatel typu souboru dokumentu, jinak se soubor nezobrazí v JumpList ani po jeho přidání. You can find everything on registering your application in [Application Registration][app-registration].

Když uživatel klikne na soubor z JumpList, nová instance vaší aplikace bude spuštěna cestou souboru přidaného jako argument příkazové řádky.

### Poznámky macOS

#### Přidat seznam nedávných dokumentů do menu aplikace

Položky nabídky můžete přidat pro přístup a vymazání nedávných dokumentů přidáním snippetu kódu do vaší šablony nabídky:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"Nedávné dokumenty",
      "submenu":[
        {
          "label":"Vyčistit poslední zobrazení",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![položka nabídky nedávných dokumentů macOS][6]

Když je požadován soubor z nabídky nedávných dokumentů, pro tento modul bude vypnut `otevřený soubor` událost z `aplikace`.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
