# Offscreen Rendering

## Übersicht

Mit dem Offscreen-Rendering können Sie den Inhalt eines `BrowserWindow` in einer Bitmap abrufen, sodass er an einer beliebigen Stelle gerendert werden kann, z. B. auf Textur in einer 3D-Szene. Das Offscreen-Rendering in Electron verwendet einen ähnlichen Ansatz wie das [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) Projekt.

*Hinweise*:

* Es gibt zwei Rendermodi, die verwendet werden können (siehe Abschnitt unten), und nur der schmutzige Bereich an das `paint` -Ereignis übergeben wird, um effizienter zu sein.
* Sie können das Rendering anhalten/fortsetzen sowie die Bildrate festlegen.
* Die maximale Bildrate beträgt 240, da höhere Werte nur Die Leistung Verluste ohne Vorteile bringen.
* Wenn auf einer Webseite nichts passiert, werden keine Frames generiert.
* Ein Offscreen-Fenster wird immer als [Frameless Window](../api/frameless-window.md)erstellt.

### Render Modi

#### GPU Beschleunigung

GPU beschleunigtes Rendering bedeutet, dass der Grafikprozessor für die Bildgenerierung verwendet wird. Aufgrund , dass der Frame von der GPU kopiert werden muss, die mehr Ressourcen benötigt, daher ist dieser Modus langsamer als das Softwareausgabegerät. Der Vorteil dieses Modus ist, dass WebGL und 3D CSS-Animationen unterstützt werden.

#### Software Ausgabegerät

Dieser Modus verwendet ein Softwareausgabegerät zum Rendern in der CPU, sodass der Frame -Generierung viel schneller ist. Daher wird dieser Modus dem GPU- beschleunigten Modus vorgezogen.

Um diesen Modus zu aktivieren, muss die GPU-Beschleunigung durch Aufrufen der [`app.disableHardwareAcceleration()`][disablehardwareacceleration] -API deaktiviert werden.

## Beispiel

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), fügen Sie folgende Zeilen in die `main.js` Datei ein:

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()



app.whenReady().then() => -
  win = neue BrowserWindow(' webPreferences: { offscreen: true } ')

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => -
    fs.writeFileSync('ex.png', image.toPNG())
  )
  win.webContents.setFrameRate(60)
)
```

Navigieren Sie nach dem Starten der Electron-Anwendung zum Arbeitsordner Ihrer Anwendung.

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
