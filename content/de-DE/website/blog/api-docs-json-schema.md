---
title: API von Electronic als strukturierte Daten
author: zeke
date: '2016-09-27'
---

Heute kündigen wir einige Verbesserungen der Dokumentation von Electronic an. Jede neue Version enthält jetzt eine [JSON-Datei](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) , die alle öffentlichen APIs von Electronic detailliert beschreibt. We created this file to enable developers to use Electron's API documentation in interesting new ways.

---

## Schema-Übersicht

Jede API ist ein Objekt mit Eigenschaften wie Name, Beschreibung, Typ, etc. Klassen wie `BrowserWindow` und `Menü` haben zusätzliche Eigenschaften, die ihre Instanzmethoden, Instanzeigenschaften, Instanzereignisse usw. beschreiben.

Hier ist ein Auszug aus dem Schema, das die `BrowserWindow` Klasse beschreibt:

```js
{
  Name: 'BrowserWindow',
  description: 'Browser-Fenster erstellen und steuern. ,
  Prozess: {
    main: true,
    renderer: false
  },
  Typ: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMethoden: [...],
  instanceMethoden: [...],
  Instanzeigenschaften: [...],
  Instanzereignisse: [...]
}
}
```

Und hier ist ein Beispiel für eine Methodenbeschreibung, in diesem Fall die `apis.BrowserWindow.instanceMethods.setMaximumSize` Instanz Methode:

```js
{
  Name: 'setMaximumSize',
  signatur: '(width, height)',
  Beschreibung: 'Setzt die maximale Größe des Fensters auf Breite und Höhe. ,
  Parameter: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Neue Daten verwenden

Um es Entwicklern einfacher zu machen, diese strukturierten Daten in ihren Projekten zu verwenden, haben wir [electron-docs-api](https://www.npmjs.com/package/electron-api-docs)erstellt ein kleines npm Paket, das automatisch veröffentlicht wird, wenn es ein neues Electron Release gibt.

```sh
npm electron-api-docs installieren --save
```

Zur sofortigen Genugtuung probieren Sie das Modul in Ihrer Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Wie die Daten gesammelt werden

Die elektronische API-Dokumentation hält sich an [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) und den [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), , damit der Inhalt programmatisch analysiert werden kann.

Der [electron-docs-linter](https://github.com/electron/electron-docs-linter) ist eine neue Entwicklungsabhängigkeit des `electron/electron` Projektarchivs. Es ist ein Kommandozeilenwerkzeug, das alle Markdown Dateien linkt und die Regeln der Styleguide erzwingt. Wenn Fehler gefunden werden, werden sie aufgelistet und der Prozess der Veröffentlichung wird beendet. Wenn die API-Dokumentation gültig ist, ist der `Elektron-json. pi` Datei wurde erstellt und [als Teil des Electron Release auf GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) hochgeladen.

## Standard Javascript und Standard Markdown

Anfang dieses Jahres wurde Electron's Codebase aktualisiert, um den [`Standard`](http://standardjs.com/) Linter für alle JavaScript zu verwenden. Der Standard README fasst die Argumentation hinter dieser Entscheidung zusammen:

> Standard-Stil zu übernehmen bedeutet, die Bedeutung von Code-Klarheit und Community-Konventionen höher als der persönliche Stil zu ordnen. Dies mag für 100 % der Projekte und Entwicklungskulturen keinen Sinn machen, allerdings kann Open Source ein feindlicher Ort für Neulinge sein. Die Erstellung klarer, automatisierter Projekterwartungen macht ein Projekt gesünder.

We also recently created [standard-markdown](https://github.com/zeke/standard-markdown) to verify that all the JavaScript code snippets in our documentation are valid and consistent with the style in the codebase itself.

Zusammen helfen uns diese Tools die kontinuierliche Integration (CI) zu nutzen, um automatisch Fehler in Pull-Requests zu finden. Dies reduziert die Belastung für Menschen, die Code Überprüfung durchführen, und gibt uns mehr Vertrauen in die Genauigkeit unserer Dokumentation.

### Eine Gemeinschaftsanstrengung

Die Dokumentation von Electronic verbessert sich ständig, und wir haben unsere großartige Open-Source-Community dafür zu danken. Seit dieser Schrift haben fast 300 Personen zu den Doktoren beigetragen.

Wir freuen uns zu sehen, was die Leute mit diesen neuen strukturierten Daten machen. Mögliche Verwendungen beinhalten:

- Verbesserungen an [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Eine [TypeScript Definitionsdatei](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) für die optimiertere Entwicklung von Electron in Projekten mit TypeScript.
- Durchsuchbare Offline-Dokumentation für Tools wie [Dash.app](https://kapeli.com/dash) und [devdocs.io](http://devdocs.io/)

