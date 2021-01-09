---
title: "TypeScript Unterstützung in Electron ankündigen"
author: zeke
date: '2017-06-01'
---

Das `electron` npm Paket enthält nun eine TypeScript Definitionsdatei, die detaillierte Anmerkungen zur gesamten Electron API enthält. Diese Anmerkungen können Ihre Electron-Entwicklung Erfahrung **verbessern, auch wenn Sie Vanilla JavaScript** schreiben. Nur `npm Elektron` installieren, um aktuelle Electron-Typen in Ihrem Projekt zu erhalten.

---

TypeScript ist eine von Microsoft erstellte Open-Source-Programmiersprache. Es ist ein Superset von JavaScript, der die Sprache erweitert, indem statische Typen unterstützt werden. Die TypeScript-Community ist in den letzten Jahren schnell gewachsen und TypeScript wurden in einer kürzlich durchgeführten Stack-Overflow-Entwicklerumfrage zu den [beliebtesten Programmiersprachen](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) gezählt.  TypeScript wird als "JavaScript mit Skalieren" beschrieben und Teams bei [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), und [Microsoft](https://github.com/Microsoft/vscode) verwenden sie allesamt um skalierbare Electron-Apps zu schreiben, die von Millionen von Personen verwendet werden.

TypeScript unterstützt viele der neueren Sprachfunktionen in JavaScript wie Klassen, Objektzerstörung, und async/warten, aber seine wirklich differenzierende Funktion ist **tippen Sie Anmerkungen**. Die Deklaration der von Ihrem Programm erwarteten Eingabe- und Ausgabe-Datentypen kann [Fehler reduzieren](https://slack.engineering/typescript-at-slack-a81307fa288d) durch helfen, Fehler beim Kompilieren zu finden und die Anmerkungen können auch als formelle Deklaration von [wie Ihr Programm funktioniert](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html) dienen.

Wenn Bibliotheken in Vanilla Javascript geschrieben werden, sind die Typen oft vage definiert als hintergründiger Gedanke beim Schreiben von Dokumentation. Funktionen können oft mehr Typen akzeptieren als dokumentiert, oder eine Funktion kann unsichtbare Einschränkungen haben, die nicht dokumentiert sind, was zu Laufzeitfehlern führen kann.

TypeScript löst dieses Problem mit **Definitionsdateien**. Eine TypeScript Definitionsdatei beschreibt alle Funktionen einer Bibliothek und ihre erwarteten Eingabe- und Ausgabetypen. Wenn Bibliotheksautoren eine TypeScript Definitionsdatei mit ihrer veröffentlichten Bibliothek bündeln, Verbraucher dieser Bibliothek können [die API direkt im Editor](https://code.visualstudio.com/docs/editor/intellisense) erkunden und sofort mit der Benutzung beginnen. oft ohne die Dokumentation der Bibliothek konsultieren zu müssen.

Viele beliebte Projekte wie [Winkel](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (und jetzt elektronisch! kompilieren Sie ihre eigene Definitionsdatei und bündeln Sie sie mit ihrem veröffentlichten npm-Paket. Für Projekte, die ihre eigene Definitionsdatei nicht bündeln, gibt es [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), ein Ökosystem von Drittanbietern mit verwalteten Definitionsdateien.

## Installation

Ab Version 1.6.10 enthält jede Version von Electron eine eigene TypeScript Definitionsdatei. Wenn Sie das `electron` Paket von npm installieren, wird die `electron.d.ts` Datei automatisch mit dem installierten Paket gebündelt.

The [safest way](https://electronjs.org/docs/tutorial/electron-versioning/) to install Electron is using an exact version number:

```sh
npm install electron --save-dev --save-exact
```

Oder wenn Sie [Garn verwenden](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

If you were already using third-party definitions like `@types/electron` and `@types/node`, you should remove them from your Electron project to prevent any collisions.

Die Definitionsdatei wird von unserer [strukturierten API-Dokumentation abgeleitet](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), damit es immer konsistent mit [Electronic API Dokumentation](https://electronjs.org/docs/api/) ist. Installieren Sie einfach `Elektron` und Sie erhalten immer eine TypeScript Definition, die auf dem neuesten Stand mit der von Ihnen verwendeten Version von Electron ist.

## Beispiel

Für eine Zusammenfassung der Installation und Verwendung der neuen TypeScript-Anmerkungen von Electrone: Schaue dir diese kurze Demo-Bildschirmaufnahme an: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Wenn Sie [Visual Studio Code](https://code.visualstudio.com/)verwenden, haben Sie bereits die TypeScript Unterstützung eingebaut. Es gibt auch von der Community gepflegte Plugins für [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), und [andere Editoren](https://www.typescriptlang.org/index.html#download-links).

Sobald Ihr Editor für TypeScript konfiguriert ist, sehen Sie mehr kontextbewusstes Verhalten wie Autovervollständigungsvorschläge, Inline-Methodenreferenz, Argumentüberprüfung und mehr.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Automatische Vervollständigung">
  <figcaption>Methode autcompletion</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Methodenreferenz">
  <figcaption>Verweis auf Inline-Methoden</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Argumentprüfung">
  <figcaption>Argumentprüfung</figcaption>
</figure>

## Erste Schritte mit TypeScript

Wenn du neu im TypeScript bist und mehr erfahren möchtest, dieses [Einführungsvideo von Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) bietet einen schönen Überblick darüber, warum die Sprache erstellt wurde, wie es funktioniert, wie man es benutzt und wo es liegt.

Es gibt auch ein [Handbuch](https://www.typescriptlang.org/docs/handbook/basic-types.html) und ein [Spielplatz](https://www.typescriptlang.org/play/index.html) auf der offiziellen TypeScript Webseite.

Da TypeScript ein Superset von JavaScript ist, ist Ihr vorhandener JavaScript-Code bereits gültiges TypeScript. Dies bedeutet, dass Sie schrittweise ein bestehendes JavaScript-Projekt zu TypeScript umstellen können und bei Bedarf neue Sprachfunktionen einspritzen können.

## Danke

Dieses Projekt wäre ohne die Hilfe der elektronischen Gemeinschaft der Open-Source-Betreuer nicht möglich gewesen. Danke an [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), und viele andere für ihre Bugfixes, Verbesserungen der Dokumentation, und technische Anleitung.

## Unterstützung

Wenn Probleme mit den neuen TypeScript-Definitionsdateien von Electrone auftreten, legen Sie bitte ein Problem in die [electron-typescript-Definitionen](https://github.com/electron/electron-typescript-definitions/issues) Repository ein.

Frohes TypeScripting!
