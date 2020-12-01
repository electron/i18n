# Documente recente (Windows & macOS)

## Overview

Windows și macOS oferă acces la o listă de documente recente deschise de prin meniul JumpList, respectiv dock.

__JumpList:__

![JumpList Fișiere recente](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__Meniu dock aplicație:__

![Meniu andocare macOS](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Pentru a adăuga un fișier la documentele recente, trebuie să utilizați API-ul [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows).

## Exemplu

### Adăugați un element la documentele recente

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), adaugă următoarele linii în fișierul `main.js`:

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

După lansarea aplicației Electron, click dreapta pe pictograma aplicației. Ar trebui să vezi elementul pe care tocmai l-ai adăugat. În acest ghid, elementul este un fișier Markdown situat în rădăcina proiectului:

![Document recent](../images/recent-documents.png)

### Ștergeți lista de documente recente

Pentru a șterge lista de documente recente, trebuie să utilizați [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API în fișierul `main.js`:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Informaţii suplimentare

### Note Windows

Pentru a utiliza această caracteristică pe Windows, aplicația trebuie să fie înregistrată ca un gestionar al tipului de fișier al documentului, altfel fișierul nu va apărea în JumpList chiar și după ce l-ai adăugat. Poți găsi totul la înregistrarea aplicației în [Înregistrarea aplicației](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Când un utilizator apasă pe un fișier din lista JumpList, o nouă instanță a aplicației dvs. va fi începută cu calea fișierului adăugat ca argument în linia de comandă.

### Note macOS

#### Adăugați lista de documente recente în meniul aplicației

Puteți adăuga elemente de meniu pentru a accesa și șterge documentele recente prin adăugarea de a următorului cod snippet în template-ul meniului:

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

![element meniu documente recente macOS](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

Atunci când se solicită un fișier din meniul de documente recente, modulul `fişier deschis` eveniment din `app` va fi emis pentru acesta.
