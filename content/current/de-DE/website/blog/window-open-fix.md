---
title: BrowserView window.open() Schwachstelle Fix
author: ckerr
date: '2019-02-03'
---

Eine Code-Verwundbarkeit wurde entdeckt, die es dem Knoten ermöglicht, in Kind-Fenster wieder aktiviert zu werden.

---

Öffnen einer Browseransicht mit `Sandbox: true` oder `nativeWindowOpen: true` und `KnotenIntegration: false` führt zu einem WebContent, wo `Fenster. Stift` kann aufgerufen werden und das neu geöffnete Kinderfenster wird `Knotenintegration` aktiviert. Diese Verwundbarkeit betrifft alle unterstützten Versionen von Electron.

## Abmilderung

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für diese Verwundbarkeit enthalten: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4), und [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Wir ermutigen alle Electron-Entwickler, ihre Apps sofort auf die neueste stabile Version zu aktualisieren.

Wenn Sie aus irgendeinem Grund nicht in der Lage sind, Ihre Electron-Version zu aktualisieren, können Sie dieses Problem beheben, indem Sie alle untergeordneten Webinhalte deaktivieren:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Weitere Informationen

Diese Verwundbarkeit wurde von [PalmerAL](https://github.com/PalmerAL) gefunden und verantwortlich für das Electron-Projekt gemeldet.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Wenn Sie eine Verwundbarkeit in Electron melden möchten, schicken Sie eine E-Mail an security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
