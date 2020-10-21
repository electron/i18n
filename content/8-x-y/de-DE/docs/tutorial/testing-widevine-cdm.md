# Widevine CDM testen

In Electron können Sie die Widevine CDM-Bibliothek verwenden, die mit dem Chrome-Browser ausgeliefert wird.

Widevine Content Entschlüsselungsmodule (CDMs) sind die Art und Weise, wie Streaming-Dienste Inhalte schützen, die HTML5-Videos zu Webbrowsern verwenden, ohne sich auf ein NPAPI-Plugin wie Flash oder Silverlight zu verlassen. Widevine Support ist eine alternative Lösung für Streaming-Dienste, die zur Wiedergabe von DRM-geschützten Videoinhalten derzeit auf Silverlight angewiesen sind. Webseiten können DRM-geschützte Videoinhalte in Firefox ohne NPAPI-Plugins anzeigen. Das Widevine CDM läuft in einer Open-Source CDM Sandbox und bietet eine bessere Benutzersicherheit als NPAPI Plugins.

#### Hinweis auf VMP

Ab [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), die folgenden Schritte sind möglicherweise nur einige der notwendigen Schritte zur Aktivierung von Widevine; Jede App auf oder nach dieser Version, die die Widevine CDM verwenden möchte, muss unter Umständen mit einer von [Widevine](https://www.widevine.com/) selbst erlangten Lizenz signiert werden.

Pro [Widevine](https://www.widevine.com/):

> Chrome 59 (und später) enthält Unterstützung für Verified Media Path (VMP). VMP bietet eine Methode zur Überprüfung der Echtheit einer Geräteplattform. Bei Browser- -Deployment wird ein zusätzliches Signal ausgesendet, um festzustellen, ob eine browserbasierte Implementierung zuverlässig und sicher ist.
> 
> Die Anleitung zur Proxy-Integration wurde mit Informationen über VMP und zur Lizenzausgabe aktualisiert.
> 
> Widevine empfiehlt unsere browserbasierte Integration (Hersteller und browserbasierte Anwendungen) um Unterstützung für VMP hinzuzufügen.

Um die Videowiedergabe mit dieser neuen Einschränkung zu aktivieren, [castLabs](https://castlabs.com/open-source/downstream/) hat eine [fork](https://github.com/castlabs/electron-releases) erstellt, die die notwendigen Änderungen implementiert hat, damit Widevine in einer Electron-Anwendung abgespielt werden kann, wenn die erforderlichen Lizenzen von widevine erhalten hat.

## Lade die Bibliothek

`chrome://components/` im Chrome-Browser öffnen, finde `Widevine Content Entschlüsselungsmodul` und stelle sicher, dass es aktuell ist dann können Sie die Bibliotheksdateien im Verzeichnis finden.

### In WIndows

Die Bibliotheksdatei `widevinecdm.dll` wird unter `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` Verzeichnis sein.

### On MacOS

Die Bibliotheksdatei `libwidevinecdm.dylib` befindet sich unter `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` Verzeichnis.

**Hinweis:** Stellen Sie sicher, dass die Chrome-Version von Electron größer oder ist als der Wert von `min_chrome_version` der Chrome-Komponente von Chrome ist. Der Wert kann im `manifest.json` unter `WidevineCdm` Verzeichnis gefunden werden.

## Nutzung der Bibliothek

Nach dem Abrufen der Bibliotheksdateien sollten Sie den Pfad zur Datei mit `--widevine-cdm-path` Befehlszeilenwechsel übergeben, und die Bibliotheksversion mit `--widevine-cdm-version` switch. Die Befehlszeilenschalter müssen übergeben werden, bevor das `fertige` Ereignis des `App` Moduls emittiert wird.

Beispielcode:

```javascript
const { app, BrowserWindow } = require('electron')

// Sie müssen das Verzeichnis übergeben, das hier die widevine Bibliothek enthält, es ist
// * `libwidevinecdm. ylib` auf macOS,
// * `widevinecdm.dll` unter Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Die Version des Plugins kann von der Seite `chrome://components` in Chrome erhalten werden.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Widevine CDM-Unterstützung überprüfen

Um zu überprüfen, ob widevine funktioniert, kannst du folgende Wege verwenden:

* Öffne https://shaka-player-demo.appspot.com/ und lade ein Manifest, das `Widevine` verwendet.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.
