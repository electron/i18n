---
title: "Die neue internationalisierte Website von Electronic"
author: zeke
date: '2017-11-13'
---

Electron has a new website at [electronjs.org][]! We've replaced our static Jekyll site with a Node.js webserver, giving us flexibility to internationalize the site and paving the way for more exciting new features.

---

## 🌍 Übersetzungen

Wir haben damit begonnen, die Webseite zu internationalisieren, mit dem Ziel, die Entwicklung der Electron-App für ein globales Publikum von Entwicklern zugänglich zu machen. We're using a localization platform called [Crowdin][] that integrates with GitHub, opening and updating pull requests automatically as content is translated into different languages.

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

If you're multilingual and interested in helping translate Electron's docs and website, visit the [electron/electron-i18n][] repo, or jump right into translating on [Crowdin][], where you can sign in using your GitHub account.

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

Using just a [PNG icon file and a small amount of app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md), we're able to collect a lot of information about a given app. Using data collected from GitHub, app pages can now display screenshots, download links, versions, release notes, and READMEs for every app that has a public repository. Verwenden einer Farbpalette, die von jedem App-Symbol extrahiert wurde, Wir können [fette und zugängliche Farben erzeugen](https://github.com/zeke/pick-a-good-color) , um jeder App-Seite eine visuelle Unterscheidung zu geben.

Die [Apps-Indexseite](https://electronjs.org/apps) enthält nun auch Kategorien und einen Schlüsselwortfilter, um interessante Apps wie [GraphQL GUIs](https://electronjs.org/apps?q=graphql) und [p2p Tools](https://electronjs.org/apps?q=graphql) zu finden.

If you've got an Electron app that you'd like featured on the site, open a pull request on the [electron/electron-apps][] repository.

## Einzeilige Installation mit Homebrew

The [Homebrew][] package manager for macOS has a subcommand called [cask][] that makes it easy to install desktop apps using a single command in your terminal, like `brew cask install atom`.

Wir haben mit dem Sammeln von Homebrew-Namen für populäre Electron-Apps begonnen und zeigen jetzt den Installationsbefehl (für macOS-Besucher) auf jeder App-Seite an, die einen Barrik:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Installationsoptionen zugeschnitten auf Ihre Plattform: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Um alle Apps mit Namen für Homebrew zu sehen, besuchen Sie [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Wenn Sie andere Apps mit Fässern kennen, die wir noch nicht indexiert haben, [fügen Sie diese bitte hinzu!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Eine neue Domain

We've moved the site from electron.atom.io to a new domain: [electronjs.org][].

The Electron project was born inside [Atom][], GitHub's open-source text editor built on web technologies. Electron wurde ursprünglich `Atom-Shell` genannt. Atom war die erste App, die es verwendet hat aber es dauerte nicht lange, bis die Leute erkannten, dass diese magische Chrom + Knotenlaufzeit für verschiedene Anwendungen verwendet werden konnte. Wenn Unternehmen wie Microsoft und Slack begonnen haben, `Atom-Shell zu nutzen`, Es wurde klar, dass das Projekt einen neuen Namen braucht.

Und so wurde "Elektronik" geboren. In early 2016, GitHub assembled a new team to focus specifically on Electron development and maintenance, apart from Atom. In der Zeit seitdem wurde Electron von Tausenden von App-Entwicklern adoptiert, und ist jetzt von vielen großen Unternehmen abhängig, von denen viele von ihnen haben Electron Teams von ihre eigenen.

Supporting GitHub's Electron projects like Atom and [GitHub Desktop][] is still a priority for our team, but by moving to a new domain we hope to help clarify the technical distinction between Atom and Electron.

## 🐢🚀 Node.js überall

The previous Electron website was built with [Jekyll][], the popular Ruby-based static site generator. Jekyll ist ein großartiges Werkzeug um statische Webseiten zu erstellen, aber die Webseite hatte begonnen, sie zu übersteigen. We wanted more dynamic capabilities like proper redirects and dynamic content rendering, so a [Node.js][] server was the obvious choice.

Das Electron Ökosystem enthält Projekte mit Komponenten, die in vielen verschiedenen Programmiersprachen geschrieben sind, von Python über C++ bis Bash. Aber JavaScript ist grundlegenden für Electron, und es ist die Sprache, die in unserer Gemeinschaft am meisten verwendet wird.

Durch die Migration der Website von Ruby auf Node.js wollen wir die Barriere auf für Personen verringern, die an der Webseite mitwirken möchten.

## :High_Spannung: Einfachere Open-Source-Teilnahme

If you've got [Node.js][] (8 or higher) and [git](https://git-scm.org) installed on your system, you can easily get the site running locally:

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
[Atom]: https://atom.io
[cask]: https://caskroom.github.io
[Crowdin]: https://crowdin.com/project/electron
[electron/electron-apps]: https://github.com/electron/electron-apps
[electron/electron-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[GitHub Desktop]: https://desktop.github.com
[Homebrew]: https://brew.sh
[Jekyll]: https://jekyllrb.com
[Node.js]: https://nodejs.org