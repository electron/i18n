---
title: "Die neue internationalisierte Website von Electronic"
author: zeke
date: '2017-11-13'
---

Electron hat eine neue Webseite unter [electronjs.org](https://electronjs.org)! We've replaced our static Jekyll site with a Node.js webserver, giving us flexibility to internationalize the site and paving the way for more exciting new features.

---

## 🌍 Übersetzungen

Wir haben damit begonnen, die Webseite zu internationalisieren, mit dem Ziel, die Entwicklung der Electron-App für ein globales Publikum von Entwicklern zugänglich zu machen. Wir verwenden eine Lokalisierungsplattform namens [Crowdin](https://crowdin.com/project/electron) die mit GitHub integriert das Öffnen und Aktualisieren von Pull-Requests automatisch, da Inhalte in verschiedene Sprachen übersetzt werden.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav in vereinfachtem Chinesisch">
    <figcaption>Electronic Nav in Vereinfachtes Chinesisch</figcaption>
  </a>
</figure>

Obwohl wir bisher ruhig an dieser Anstrengung gearbeitet haben Über 75 Mitglieder der Electron-Community haben das Projekt bereits organisch entdeckt und sich dem Bemühen angeschlossen, die Webseite zu internationalisieren und die Dokumentation von Electronic in mehr als 20 Sprachen zu übersetzen. Wir sehen [täglich Beiträge](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) von Leuten auf der ganzen Welt mit Übersetzungen für Sprachen wie Französisch, Vietnamesisch, Indonesisch und Chinesisch.

Um Ihre Sprache zu wählen und Übersetzungsfortschritt zu sehen, besuchen Sie [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Aktuelle Zielsprachen auf Crowdin">
    <figcaption>laufende Übersetzungen auf Crowdin</figcaption>
  </a>
</figure>

Wenn Sie mehrsprachig sind und bei der Übersetzung der elektronischen Dokumentation und der Website helfen möchten, besuchen Sie das [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) Repo, oder springen Sie direkt in Übersetzung auf [Crowdin](https://crowdin.com/project/electron), wo Sie sich mit Ihrem GitHub-Konto anmelden können.

Derzeit sind 21 Sprachen für das Electron-Projekt auf Crowdin aktiviert. Das Hinzufügen von Unterstützung für weitere Sprachen ist einfach. Wenn du also an interessiert bist, aber deine Sprache nicht aufgelistet ist, [Lassen Sie uns wissen,](https://github.com/electron/electronjs.org/issues/new) und wir werden es aktivieren.

## Rohe übersetzte Docs

If you prefer to read documentation in raw markdown files, you can now do that in any language:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## App-Seiten

Ab heute kann jede Electron-App ganz einfach eine eigene Seite auf der Electron Seite haben. Für einige Beispiele schauen Sie sich [Etcher](https://electronjs.org/apps/etcher), [1Zwischenablage](https://electronjs.org/apps/1clipboard)an, oder [GraphQL Playground](https://electronjs.org/apps/graphql-playground), abgebildet hier auf der japanischen Version der Website:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

Es gibt einige unglaubliche Electron-Apps, aber sie sind nicht immer einfach zu finden, und nicht jeder Entwickler hat die Zeit oder die Ressourcen, eine richtige Website zu erstellen, um seine App zu vermarkten und zu vertreiben.

Nur eine [PNG-Symboldatei und eine kleine Anzahl von App-Metadaten verwenden](https://github.com/electron/electron-apps/blob/master/contributing.md), wir können viele Informationen über eine bestimmte App sammeln. Mit Hilfe der von GitHub erfassten Daten können App-Seiten nun Screenshots anzeigen, Download-Links, Versionen, Release-Notizen und READMEs für jede App, die ein öffentliches Repository besitzt. Verwenden einer Farbpalette, die von jedem App-Symbol extrahiert wurde, Wir können [fette und zugängliche Farben erzeugen](https://github.com/zeke/pick-a-good-color) , um jeder App-Seite eine visuelle Unterscheidung zu geben.

Die [Apps-Indexseite](https://electronjs.org/apps) enthält nun auch Kategorien und einen Schlüsselwortfilter, um interessante Apps wie [GraphQL GUIs](https://electronjs.org/apps?q=graphql) und [p2p Tools](https://electronjs.org/apps?q=graphql) zu finden.

Wenn Sie eine Electron-App haben, die Ihnen auf der Website vorgestellt werden soll, öffnen Sie eine -Pull-Anforderung im [Elektronik/Elektron-Apps](https://github.com/electron/electron-apps) Repository.

## Einzeilige Installation mit Homebrew

Der [Homebrew](https://brew.sh) Paketmanager für macOS hat einen Unterbefehl namens [Bark](https://caskroom.github.io) , der es einfach macht, Desktop-Apps mit einem einzigen Befehl in Ihrem Terminal zu installieren, wie `brauen Barren installieren atom`.

Wir haben mit dem Sammeln von Homebrew-Namen für populäre Electron-Apps begonnen und zeigen jetzt den Installationsbefehl (für macOS-Besucher) auf jeder App-Seite an, die einen Barrik:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Installationsoptionen zugeschnitten auf Ihre Plattform: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Um alle Apps mit Namen für Homebrew zu sehen, besuchen Sie [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Wenn Sie andere Apps mit Fässern kennen, die wir noch nicht indexiert haben, [fügen Sie diese bitte hinzu!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Eine neue Domain

Wir haben die Seite von electron.atom.io in eine neue Domäne verschoben: [electronjs.org](https://electronjs.org).

Das Electron-Projekt wurde in [Atom](https://atom.io), GitHub Open-Source-Texteditor auf Web-Technologien aufgebaut. Electron wurde ursprünglich `Atom-Shell` genannt. Atom war die erste App, die es verwendet hat aber es dauerte nicht lange, bis die Leute erkannten, dass diese magische Chrom + Knotenlaufzeit für verschiedene Anwendungen verwendet werden konnte. Wenn Unternehmen wie Microsoft und Slack begonnen haben, `Atom-Shell zu nutzen`, Es wurde klar, dass das Projekt einen neuen Namen braucht.

Und so wurde "Elektronik" geboren. In early 2016, GitHub assembled a new team to focus specifically on Electron development and maintenance, apart from Atom. In der Zeit seitdem wurde Electron von Tausenden von App-Entwicklern adoptiert, und ist jetzt von vielen großen Unternehmen abhängig, von denen viele von ihnen haben Electron Teams von ihre eigenen.

Die Unterstützung von GitHub Electron Projekten wie Atom und [GitHub Desktop](https://desktop.github.com) ist für unser Team immer noch eine Priorität aber durch die Umstellung auf eine neue Domäne wollen wir helfen, die technische Unterscheidung zwischen Atom und Electron zu klären.

## 🐢🚀 Node.js überall

Die vorherige Electron-Website wurde mit [Jekyll](https://jekyllrb.com), dem populären Ruby-basierten statischen Seitengenerator, gebaut. Jekyll ist ein großartiges Werkzeug um statische Webseiten zu erstellen, aber die Webseite hatte begonnen, sie zu übersteigen. Wir wollten mehr dynamische Fähigkeiten, wie richtige Umleitungen und dynamische Content-Rendering, also war ein [Node.js](https://nodejs.org) Server die offensichtliche Wahl.

Das Electron Ökosystem enthält Projekte mit Komponenten, die in vielen verschiedenen Programmiersprachen geschrieben sind, von Python über C++ bis Bash. Aber JavaScript ist grundlegenden für Electron, und es ist die Sprache, die in unserer Gemeinschaft am meisten verwendet wird.

Durch die Migration der Website von Ruby auf Node.js wollen wir die Barriere auf für Personen verringern, die an der Webseite mitwirken möchten.

## :High_Spannung: Einfachere Open-Source-Teilnahme

Wenn du [Knoten hast. s](https://nodejs.org) (8 oder höher) und [git](https://git-scm.org) auf Ihrem System installiert du kannst die Seite einfach lokal zum Laufen bringen:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Die neue Website wird auf Heroku gehostet. Wir verwenden Deployment Pipelines und die [Überprüfen von Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) Funktion, die automatisch eine laufende Kopie der App für jeden Pull Request erstellt. Dies macht es den Prüfern einfach, die tatsächlichen Effekte eines -Pull-Requests auf einer Live-Kopie der Website zu sehen.

## 🙏 Dank an Mitwirkende

Wir möchten uns bei allen Leuten auf der ganzen Welt bedanken, die ihre eigene Zeit und Energie zur Verbesserung von Electron beigetragen haben. Die Leidenschaft von der Open-Source-Community hat unermesslich geholfen, Electron zum Erfolg zu machen. Vielen Dank!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>