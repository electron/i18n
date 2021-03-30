---
title: WebPreferences Schwachstelle beheben
author: ckerr
date: '2018-08-22'
---

Eine Verwundbarkeit für die entfernte Codeausführung wurde entdeckt, die Apps betrifft, die verschachtelte Unterfenster in Electron-Versionen öffnen können (3. .0-beta.6, 2.0.7, 1.8.7 und 1.7.15). This vulnerability has been assigned the CVE identifier [CVE-2018-15685][].

---

## Betroffene Plattformen

Sie sind betroffen, wenn:

1. Sie binden _beliebige_ Remote-Benutzerinhalte ein, sogar in einer Sandbox
2. Du akzeptierst Benutzereingaben mit allen XSS-Verwundbarkeiten

_Details_

Sie sind betroffen, wenn irgendein Benutzercode in einem `iframe` läuft / einen `iframe` erstellen kann. Angesichts der Möglichkeit einer XSS-Verwundbarkeit kann davon ausgegangen werden, dass die meisten Apps für diesen Fall verwundbar sind.

Sie sind auch betroffen, wenn Sie eines Ihrer Fenster mit dem `nativeWindowOpen: true` oder `Sandbox öffnen: true` Option.  Obwohl diese Verwundbarkeit auch eine XSS-Verwundbarkeit in Ihrer App erfordert, sollten Sie dennoch eine der folgenden Abmilderungen anwenden, wenn Sie eine dieser Optionen verwenden.

## Abmilderung

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für diese Verwundbarkeit enthalten: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)und [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Wir fordern alle Electron-Entwickler dringend auf, ihre Apps auf die neueste stabile Version zu aktualisieren.

Wenn Sie aus irgendeinem Grund nicht in der Lage sind, Ihre Electron-Version zu aktualisieren, können Sie Ihre App durch Decken anrufendes `Ereignis schützen. reventDefault()` im `new-window` Event für alle  `webContents`'. Wenn Sie nicht `window.open` oder irgendwelche Unterfenster verwenden, dann ist dies auch eine gültige Abschwächung für Ihre App.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Wenn Sie sich auf die Fähigkeit Ihrer Kinderfenster verlassen, Enkelfenster herzustellen, dann ist die Verwendung des folgenden Codes in deinem Fenster auf der obersten Ebene:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (event, url, frameName, disposition, options) => {
      if (!options. ebPreferences) {
        Optionen. ebPreferences = {}
      }
      Objekt. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options. ebContents)
      }
    })
  }
  Handle (topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Dieser Code wird manuell erzwingen, dass die Fenster der obersten Ebene `webPreferences` manuell auf alle untergeordneten Fenster unendlich tief angewendet werden.

## Weitere Informationen

Diese Verwundbarkeit wurde von [Matt Austin](https://twitter.com/mattaustin) von [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685) gefunden und verantwortlich für das Electron-Projekt gemeldet.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Wenn Sie eine Verwundbarkeit in Electron melden möchten, schicken Sie eine E-Mail an security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
[CVE-2018-15685]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685
