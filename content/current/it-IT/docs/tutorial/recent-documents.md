# Documenti recenti (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__JumpList:__

![File recenti JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__Menu dock applicazione:__

![macOS Menu dock](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Per aggiungere un file ai documenti recenti, puoi usare l'API [app.aggiungiDocumentoRecente](../api/app.md#appaddrecentdocumentpath-macos-windows):

```javascript
const { app } = richiedi('electron')
app.aggiungiDocumentoRecente('/Utenti/USERNAME/Desktop/lavoro.tipo')
```

E puoi usare l'API [app.eliminaDocumentiRecenti](../api/app.md#appclearrecentdocuments-macos-windows) per svuotare la lista documenti recenti:

```javascript
const { app } = richiedi('electron')
app.eliminaDocumentiRecenti()
```

## Note di Windows

Per poter usare questa funzione su Windows, la tua app deve essere registrata come gestore del tipo di file del documento, altrimenti il file non apparirà nella JumpList anche dopo averlo aggiunto. Puoi trovare tutto per registrare la tua app su [Registrazione Applicazione](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Quando un utente clicca su un file dalla JumpList, una nuova istanza della tua applicazione sarà avviata con il percorso del file aggiunto come un argomento linea di comando.

## note di macOS

### Adding the Recent Documents list to the application menu:

![macOS Recent Documents menu item](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

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

Quando viene richiesto un file dal menu dei documenti recenti, l'evento `apri-file` del modulo `app` sarà emesso per esso.
