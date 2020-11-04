---
title: Webview-Schwachstelle beheben
author: ckerr
date: '2018-03-21'
---

Eine Verwundbarkeit wurde entdeckt, die es erlaubt, die Node.js-Integration in einigen Electron-Anwendungen, die sie deaktivieren, wieder zu aktivieren. Diese Verwundbarkeit wurde der CVE-Kennung [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136) zugewiesen.

---

## Betroffene Anwendungen

Eine Anwendung ist betroffen, wenn *alle* des Folgenden wahr sind:

 1. Läuft mit Electron 1.7, 1.8 oder einem 2.0.0-Beta
 2. Ermöglicht die Ausführung von beliebigem entferntem Code
 3. Deaktiviert die Node.js Integration
 4. `WebviewTag nicht explizit deklariert: false` in den WebPreferences
 5. Aktiviert die Option `nativeWindowOption` nicht
 6. `Neues Fenster` nicht abfangen und `event.newGuest` manuell überschreiben ohne das angegebene Options-Tag zu verwenden

Obwohl dies anscheinend eine Minderheit von Electron-Anwendungen ist, empfehlen wir die Aktualisierung aller Anwendungen als Vorsichtsmaßnahme.

## Abmilderung

This vulnerability is fixed in today's [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4), and [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) releases.

Entwickler, die nicht in der Lage sind, die Electron-Version ihrer Anwendung zu aktualisieren, können die Verwundbarkeit mit dem folgenden Code mildern:

```js
app.on('web-contents-created', (Event, Win) => {
  gewinnen. n('new-window', (Event, newURL, frameName, Disposition,
                        Optionen, additionalFeatures) => {
    if (! ptions. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    Optionen. ebPreferences.webviewTag = falsch;
    options.webPreferences löschen. reload;
  })
})

// und *IF* Sie verwenden überhaupt keine WebViews,
// Sie möchten vielleicht auch
app. n('web-contents-created', (event, win) => {
  gewinnen. n('will-attach-webview', (Event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Weitere Informationen

Diese Verwundbarkeit wurde von Brendan Scarvell von [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/) gefunden und verantwortungsvoll gegenüber dem Electron-Projekt gemeldet.

Um mehr über Best Practices für die Sicherheit Ihrer Electron-Apps zu erfahren, lesen Sie unsere [-Sicherheitshinweise](https://electronjs.org/docs/tutorial/security).

Um eine Verwundbarkeit in Electron zu melden, senden Sie bitte eine E-Mail an security@electronjs.org.

Bitte nehmen Sie an unserer [-E-Mail-Liste](https://groups.google.com/forum/#!forum/electronjs) teil, um Updates über Veröffentlichungen und Sicherheitsaktualisierungen zu erhalten.

