# Modalità Scura

## Overview

### Aggiorna automaticamente le interfacce native

Le "interfacce native" includono il selettore del file, il bordo della finestra, le finestre di dialogo, i menu di contesto e altro - tutto ciò da cui proviene l'UI dal tuo sistema operativo e non dalla tua app. Il comportamento preferito è di aderire in questo tema automatico dall'OS.

### Aggiorna automaticamente le tue interfacce

Se la tua app ha la propria modalità scura, dovresti attivarla o disattivarla in sincronizzazione con l'impostazione della modalità scura del sistema. Puoi farlo usando la query multimediale del CSS [prefer-color-scheme][].

### Aggiorna manualmente le tue interfacce

Se vuoi passare manualmente tra le modalità chiara/scura, puoi farlo impostando la modalità desiderata nella proprietà [themeSource](https://www.electronjs.org/docs/api/native-theme#nativethemethemesource) del modulo `nativeTheme`. Il valore di questa proprietà sarà propagato al tuo processo del Renderer. Ogni regola del CSS correlata a `prefers-color-scheme` sarà di conseguenza aggiornata.

## impostazioni di macOS

In macOS 10.14 Mojave, Apple ha introdotto una nuova [modalità scura system-wide][system-wide-dark-mode] per tutti i computer macOS. Se la tua app di Electron ha una modalità scura, puoi fargli seguire la modalità scura del system-wide usando [l'api `nativeTheme`](../api/native-theme.md).

In macOS 10.15 Catalina, Apple ha introdotto una nuova opzione della modalità scura "automatica" per tutti i computer di macOS. Perché le API `nativeTheme.shouldUseDarkColors` e `Tray` funzionino correttamente in questa modalità su Catalina, dovrai usare Electron `>=7.0.0`, o impostare `NSRequiresAquaSystemAppearence` a `false` nel tuo file `Info.plist` per le versioni più vecchie. Sia [Electron Packager][electron-packager] che [Electron Forge][electron-forge] hanno un'[opzione `darwinDarkModeSupport`][packager-darwindarkmode-api] per automatizzare le modifiche di `info.plist` durante il tempo di costruzione dell'app.

Se desideri uscire mentre usi Electron &gt; 8.0.0, devi impostare la chiave `NSRequiresAquaSystemAppearence` nel file `Info.plist` a `true`. Sei pregato di notare che Electron 8.0.0 e superiori non consentiranno di uscire da questo tema, a causa dell'uso della SDK 10.14 di macOS.

## Esempio

Inizieremo con un'applicazione funzionante dalla [Guida Rapida Iniziale](quick-start.md) ed aggiungere gradualmente le funzionalità.

Prima, modifichiamo la nostra interfaccia così che gli utenti possano passare tra le modalità chiara e scura.  Quest'UI di base contiene pulsanti per modificare l'impostazione di `nativeTheme.themeSource` ed un elemento di testo indicante quale valore di `themeSource` è selezionato. Di default, Electron segue la preferenza della modalità scura del sistema, quindi dovremo fissare la sorgente del tema a "Sistema".

Aggiungi le seguenti linee al file `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ciao Mondo!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Ciao Mondo!</h1>
    <p>Sorgente del tema corrente: <strong id="theme-source">Sistema</strong></p>

    <button id="toggle-dark-mode">Attiva Modalità Scura</button>
    <button id="reset-to-system">Ripristina al Tema di Sistema</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

Poi, aggiungi gli [ascoltatori dell'evento](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) che ascoltano gli eventi di `click` sui pulsanti di attivazione. Poiché il modulo `nativeTheme` è esposto solo nel processo Principale, devi configurare ogni richiamo dell'ascoltatore per usare IPC per inviare i messaggi e gestire le risposte dal processo Principale:

* quando il pulsante "Attiva Modalità Scura" viene cliccato, inviamo il messaggio (evento) `dark-mode:toggle` per dire al processo Principale di innescare una modifica del tema e aggiornare l'etichetta "Sorgente del Tema Corrente" nell'UI basata sulla risposta dal processo Principale.
* quando il pulsante "Ripristina al Tema di Sistema" viene cliccato, inviamo il messaggio (evento) `dark-mode:system` per dire al processo Principale di usare lo schema di colori del sistema, e aggiornare l'etichetta "Sorgente del Tema Corrente" a `Sistema`.

Per aggiungere gli ascoltatori e gestori, aggiungi le linee seguenti al file `renderer.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await ipcRenderer.invoke('dark-mode:system')
  document.getElementById('theme-source').innerHTML = 'System'
})
```

Se esegui il tuo codice a questo punto, vedrai che i tuoi pulsanti non fanno ancora nulla, e il tuo processo Principale produrrà un errore come questo quando clicchi suoi tuoi pulsanti: `Si è verificato un errore nel gestore per 'dark-mode:toggle': Nessun gestore registrato per 'dark-mode:toggle'` Questo è revisto - non abbiamo ancora toccato alcun codice di `nativeTheme` ancora.

Ora che abbiamo finito di cablare l'IPC dal lato del Renderer, il prossimo passaggio è di caricare il file `main.js` per gestire gli eventi dal processo del Renderer.

In base all'evento ricevuto, aggiorniamo la proprietà [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) per applicare il tema desiderato sugli elementi dell'UI nativa del sistema (es. menu di contesto) e propagare lo schema del colore preferito al processo del Renderer:

* Dopo aver ricevuto `dark-mode:toggle`, controlliamo se il tema scuro è correntemente attivo usando la proprietà `nativeTheme.shouldUseDarkColors` e impostare `themeSource` al tema opposto.
* Dopo aver ricevuto `dark-mode:system`, ripristiniamo `themeSource` al `system`.

```js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSouce = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

Il passaggio finale è di aggiungere un po' di stile per abilitare la modalità scura per le parti web dell'UI sfruttando l'attributo di CSS [`prefers-color-scheme`][prefer-color-scheme]. Il valore di `prefers-color-scheme` seguirà la tua impostazione di `nativeTheme.themeSource`.

Crea un file di `styles.css` ed aggiungi le linee seguenti:

```css
@media (prefers-color-scheme: dark) {
  body { background:  #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background:  #ddd; color: black; }
}
```

Dopo il lancio dell'applicazione di Electron, puoi modificare le modalità o ripristinare il tema al predefinito del sistema cliccando i pulsanti corrispondenti:

![Modalità Scura](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
