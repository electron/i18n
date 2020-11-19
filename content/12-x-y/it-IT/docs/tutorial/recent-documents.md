# Documenti recenti (Windows & macOS)

## Overview

Windows e macOS forniscono l'accesso a un elenco di documenti recenti aperti da l'applicazione tramite JumpList o dock menu, rispettivamente.

__JumpList:__

![File recenti JumpList][1]

__Menu dock applicazione:__

![macOS Menu dock][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Esempio

### Aggiunge un elemento ai documenti recenti

A partire da un'applicazione funzionante dalla [Guida rapida](quick-start.md), aggiungi le seguenti righe al file `main.js`:

```javascript
const { app } = richiedi('electron')

app.aggiungiDocumentoRecente('/Utenti/USERNAME/Desktop/lavoro.tipo')
```

Dopo aver lanciato l'applicazione Electron, fare clic con il tasto destro sull'icona dell'applicazione. Dovresti vedere l'articolo che hai appena aggiunto. In questa guida, l'elemento è un file Markdown situato nella radice del progetto:

![Documento recente](../images/recent-documents.png)

### Cancella l'elenco dei documenti recenti

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = richiedi('electron')

app.eliminaDocumentiRecenti()
```

## Informazioni supplementari

### Note di Windows

Per utilizzare questa funzione su Windows, l'applicazione deve essere registrata come un gestore del tipo di file del documento, altrimenti il file non apparirà in JumpList anche dopo averlo aggiunto. Puoi trovare tutto per registrare la tua app su [Registrazione Applicazione][app-registration].

Quando un utente clicca su un file dalla JumpList, una nuova istanza della tua applicazione sarà avviata con il percorso del file aggiunto come un argomento linea di comando.

### note di macOS

#### Aggiungi l'elenco dei documenti recenti al menu dell'applicazione

È possibile aggiungere voci di menu per accedere e cancellare documenti recenti aggiungendo la seguente snippet di codice al tuo modello di menu:

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

![voce del menu macOS Documenti recenti][6]

Quando viene richiesto un file dal menu dei documenti recenti, l'evento `apri-file` del modulo `app` sarà emesso per esso.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
