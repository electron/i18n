# Dark-Modus

## Übersicht

### Automatische Aktualisierung der systemeigenen Schnittstellen

"Native Schnittstellen" umfassen die Dateiauswahl, Fensterrahmen, Dialogfelder, Kontext- Menüs und vieles mehr - alles, wo die Benutzeroberfläche von Ihrem Betriebssystem stammt und nicht aus Ihrer App . Das Standardverhalten besteht darin, sich für diese automatische Thesen- aus dem Betriebssystem zu entscheiden.

### Automatische Aktualisierung Ihrer eigenen Schnittstellen

Wenn Ihre App über einen eigenen dunklen Modus verfügt, sollten Sie sie synchron mit einstellung des dunklen Modus ein- und ausschalten. Sie können dies tun, indem Sie die [Prefer-Color-Schema-][] CSS-Medienabfrage verwenden.

### Aktualisieren Sie manuell Ihre eigenen Schnittstellen

Wenn Sie manuell zwischen Hell-/Dunkel-Modi wechseln möchten, können Sie dies tun, indem Sie den gewünschten Modus in der [themeSource](../api/native-theme.md#nativethemethemesource) -Eigenschaft des `nativeTheme` -Moduls einstellen. Der Wert dieser Eigenschaft wird an den Renderer-Prozess weitergegeben. Alle CSS-Regeln im Zusammenhang mit `prefers-color-scheme` werden entsprechend aktualisiert.

## macOS-Einstellungen

In macOS 10.14 Mojave hat Apple einen neuen [systemweiten dunklen Modus ][system-wide-dark-mode] für alle Mac OS-Computer eingeführt. Wenn Ihre Electron-App einen dunklen Modus hat, können Sie sie dazu , die systemweite Einstellung des dunklen Modus mit [der `nativeTheme` api](../api/native-theme.md)zu befolgen.

In macOS 10.15 Catalina hat Apple eine neue Option für den "automatischen" Dunklen Modus für alle macOS-Computer eingeführt. Damit die `nativeTheme.shouldUseDarkColors` - und `Tray` -APIs in diesem Modus auf Catalina ordnungsgemäß funktionieren, müssen Sie Electron `>=7.0.0`verwenden oder `NSRequiresAquaSystemAppearance` in Ihrer `Info.plist` -Datei für ältere Versionen auf `false` einstellen. Sowohl [Electron Packager][electron-packager] als auch [Electron Forge][electron-forge] haben eine [`darwinDarkModeSupport` Option][packager-darwindarkmode-api] , um die `Info.plist` Änderungen während der App-Erstellungszeit zu automatisieren.

Wenn Sie sich abmelden möchten, während Sie Electron &gt; 8.0.0 verwenden, müssen Sie die `NSRequiresAquaSystemAppearance` -Taste in der datei `Info.plist` auf `true`. Bitte beachten Sie, dass Electron 8.0.0 und höher Sie aufgrund der Verwendung des macOS 10.14 SDK nicht dieser Theing abmelden können.

## Beispiel

Wir beginnen mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md) und fügen schrittweise Funktionen hinzu.

Lassen Sie uns zunächst unsere Benutzeroberfläche bearbeiten, damit Benutzer zwischen hellen und dunklen -Modi wechseln können.  Diese grundlegende Benutzeroberfläche enthält Schaltflächen zum Ändern der `nativeTheme.themeSource` Einstellung und ein Textelement, das angibt, welcher `themeSource` Wert ausgewählt ist. Standardmäßig folgt Electron der Einstellung des Modus für den dunklen Modus des Systems, sodass wir die Designquelle als "System" hartcodieren.

Fügen Sie der datei `index.html` die folgenden Zeilen hinzu:

```html
<! DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hallo Welt!</h1>
    <p>Aktuelle Themenquelle: <strong id="theme-source">System</strong></p>

    <button id="toggle-dark-mode">den Dunklen Modus umschalten</button>
    <button id="reset-to-system">auf Systemtheme</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>zurücksetzen
```

Fügen Sie als Nächstes [Ereignislistener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) hinzu, die auf `click` Ereignisse auf den Umschaltflächen lauschen. Da das `nativeTheme` -Modul nur im Hauptprozess verfügbar gemacht wird, müssen Sie den Rückruf jedes Listeners so einrichten, dass IPC Zum Senden von Nachrichten an und zum Behandeln von Antworten aus dem Main- -Prozess verwendet wird:

* Wenn auf die Schaltfläche "Dunkler Modus umschalten" geklickt wird, senden wir die `dark-mode:toggle` Nachricht (Ereignis), um den Hauptprozess anzuweisen, eine Design- -Änderung auszulösen, und die Bezeichnung "Aktuelle Theme-Quelle" in der Benutzeroberfläche basierend auf der Antwort vom Hauptprozess zu aktualisieren.
* Wenn auf die Schaltfläche "Reset to System Theme" geklickt wird, senden wir die `dark-mode:system` Nachricht (Ereignis), um den Hauptprozess anzuweisen, das System Farbschema zu verwenden, und die Bezeichnung "Aktuelle Theme-Quelle" auf `System`zu aktualisieren.

Um Listener und Handler hinzuzufügen, fügen Sie der datei `renderer.js` die folgenden Zeilen hinzu:

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => '
  const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
')

document.getElementById('reset-to-system').addEventListener('click', async () => '
  warten ipcRenderer.invoke('dark-mode:system')
  document.getElementById('theme-source').innerHTML = 'System'
))
```

Wenn Sie Ihren Code an dieser Stelle ausführen, werden Sie sehen, dass Ihre Schaltflächen noch nichts tun, und Ihr Hauptprozess wird einen Fehler wie diesen ausgeben, wenn Sie auf Ihre Schaltflächen klicken: `Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` Dies wird erwartet – wir haben noch keinen `nativeTheme` Code berührt.

Nachdem wir nun die Verkabelung des IPC von der Seite des Renderers entfernt sind, besteht der nächste Schritt darin, die `main.js` -Datei zu aktualisieren, um Ereignisse aus dem Renderer-Prozess zu behandeln.

Je nach empfangendem Ereignis aktualisieren wir die [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) -Eigenschaft, um das gewünschte Design auf die systemeigenen UI-Elemente (z. B. Kontextmenüs) anzuwenden und das bevorzugte Farbschema an den Renderer- -Prozess weiterzuleiten:

* Nach Erhalt `dark-mode:toggle`überprüfen wir, ob das dunkle Design derzeit aktiv , indem wir die `nativeTheme.shouldUseDarkColors` -Eigenschaft verwenden, und legen die `themeSource` auf das entgegengesetzte Design fest.
* Nach Erhalt `dark-mode:system`setzen wir die `themeSource` auf `system`zurück.

```javascript
const - app, BrowserWindow, ipcMain, nativeTheme - = require('electron')

-Funktion createWindow () -
  const win = neues BrowserWindow('
    Breite: 800,
    Höhe: 600,
    webPreferences: {
      nodeIntegration: true
    }
  ')

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => '
    if (nativeTheme.shouldUseDarkColors) -
      nativeTheme.themeSource = 'light'
    ' else '
      nativeTheme.themeSource = 'dark'
    '
    return nativeThe me.shouldUseDarkColors


  ipcMain.handle('dark-mode:system', () => '
    nativeTheme.themeSource = 'system'
  '
'

app.whenReady().then(createWindow)

app.on('window-all-closed', () =>
  if (process.platform !== 'darwin')

  


app.on('activate' , () =>
  wenn (BrowserWindow.getAllWindows().length ===0) -
    createWindow()

.
```

Der letzte Schritt besteht darin, ein wenig Styling hinzuzufügen, um den dunklen Modus für die Webparts der Benutzeroberfläche zu aktivieren, indem sie das [`prefers-color-scheme`][prefer-color-scheme] CSS- -Attribut s. Der Wert von `prefers-color-scheme` folgt Ihrer `nativeTheme.themeSource` Einstellung.

Erstellen Sie eine `styles.css` Datei, und fügen Sie die folgenden Zeilen hinzu:

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (bevorzugt-Farbschema: dunkel) -
  Körper - Hintergrund: #333; Farbe: weiß;
-

@media (bevorzugt-Farbschema: Licht) -
  Körper - Hintergrund: #ddd; Farbe: schwarz;

```

Nach dem Starten der Electron-Anwendung können Sie den Modus ändern oder das -Design auf Systemstandard zurücksetzen, indem Sie auf entsprechende Schaltflächen klicken:

![Dark-Modus](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[Prefer-Color-Schema-]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
