---
title: Suchen
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Die Electron-Website hat eine neue Suchmaschine, die sofortige Ergebnisse für API-docs, Tutorials, Electron-bezogene npm Pakete und mehr liefert.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron Suche Screenshot">
  </a>
</figure>

---

Das Lernen einer neuen Technologie oder eines Rahmens wie Electron kann einschüchternd sein. Once you get past the [quick-start](https://github.com/electron/electron-quick-start) phase, it can be difficult to learn best practices, find the right APIs, or discover the tools that will help you build the app of your dreams. Wir wollen, dass die Electron-Website ein besseres Werkzeug ist, um die Ressourcen zu finden, die du brauchst, um Apps schneller und einfacher zu erstellen.

Besuche jede Seite auf [electronjs.org](https://electronjs.org) und du findest die neuen Sucheingaben oben auf der Seite.

## Die Suchmaschine

Als wir zum ersten Mal die Suche zur Webseite hinzufügen wollten, rollten wir unsere eigene Suchmaschine mit GraphQL als Backend. GraphQL hat Spaß bei der Arbeit gemacht und die Suchmaschine war leistungsfähig, aber wir haben schnell erkannt, dass der Aufbau einer Suchmaschine keine triviale Aufgabe ist. Dinge wie Mehrwort-Suche und Typoerkennung erfordern viel Arbeit, um richtig zu kommen. Anstatt das Rad neu zu erfinden, haben wir beschlossen, eine existierende Suchlösung zu verwenden: [Algolia](https://algolia.com).

Algolia ist ein gehosteter Suchdienst, der schnell zur Suchmaschine der Wahl unter den populären Open Source Projekten wie React, geworden ist Vue, Bootstrap, Yarn und [viele andere](https://community.algolia.com/docsearch/).

Hier sind einige der Merkmale, die Algolia zu einer guten Passform für das Electron-Projekt gemacht haben:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) liefert Ergebnisse während der Eingabe in der Regel in etwa 1ms.
- [Typo Toleranz](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) bedeutet, dass Sie immer noch Ergebnisse erhalten, auch wenn Sie [`Widget`].
- [Erweiterte Abfragesyntax](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) ermöglicht `"exakte Zitiert Übereinstimmungen"` und `-exclusive`.
- [API-Clients](https://www.algolia.com/doc/api-client/javascript/getting-started/) sind Open Source und gut dokumentiert.
- [Analytik](https://www.algolia.com/doc/guides/analytics/analytics-overview/) teilt uns mit, nach welchen Personen am meisten gesucht werden und was sie suchen, aber nicht finden. Dies gibt uns einen wertvollen Einblick in die Verbesserung der elektronischen Dokumentation.
- Algolia ist [kostenlos für Open-Source-Projekte](https://www.algolia.com/for-open-source).

## API Docs

Sometimes you know *what* you want to accomplish, but you don't know exactly *how* to do it. Electron hat über 750 API-Methoden, Events und Eigenschaften. Kein Mensch kann sich leicht an alle erinnern, aber Computer sind gut in dieser Sache. Unter Verwendung der [JSON API Dokumentation](https://electronjs.org/blog/api-docs-json-schema), indizierten wir alle diese Daten in der Algolia, und nun können Sie einfach die genaue API finden, die Sie suchen.

Versucht ein Fenster zu verändern? Suche nach [`Größe`] und springe direkt zur gewünschten Methode.

## Anleitungen

Electron verfügt über eine ständig wachsende Sammlung von Tutorials, die die API Dokumentation ergänzen. Jetzt können Sie leichter Tutorials zu einem bestimmten Thema finden, neben der zugehörigen API-Dokumentation.

Suchen Sie nach bewährten Sicherheitsmethoden? Search for [`security`][].

## npm Pakete

Es gibt jetzt über 700.000 Pakete in der npm Registry und es ist nicht immer leicht die benötigte Pakete zu finden. Um die Entdeckung dieser Module zu erleichtern: Wir haben [`Elektron-npm-Pakete`], eine Sammlung der 3400+ Module in der Registrierung, die speziell für den Einsatz mit Electron erstellt wurde.

Die Leute in [Bibliotheken. o](https://libraries.io) haben [SourceRank](https://docs.libraries.io/overview.html#sourcerank)erstellt , ein System zum Scoring von Software-Projekten basierend auf einer Kombination von Metriken wie Code, Community, Dokumentation und Nutzung. Wir haben ein [`Sourceranks`] Modul erstellt, das die Punktzahl jedes Moduls im npm Register beinhaltet. und wir verwenden diese Punktzahlen, um die Paketergebnisse zu sortieren.

Möchten Sie Alternativen zu den integrierten IPC-Modulen von Electrone? Suche nach [`ist:package ipc`].

## Electron-Anwendungen

Es ist [einfach Daten mit Algolia zu indizieren](https://github.com/electron/algolia-indices), also haben wir die vorhandene App-Liste von [electron/apps](https://github.com/electron/apps) hinzugefügt.

Versuchen Sie eine Suche nach [`Musik`] oder [`Homebrew`].

## Filter-Ergebnisse

Wenn Sie GitHub [Codesuche](https://github.com/search) zuvor verwendet haben Sie kennen wahrscheinlich die durch Doppelschlüssel getrennten Filter wie `extension:js` oder `user:defunkt`. Wir denken, dass diese Filtertechnik ziemlich mächtig ist, so haben wir ein `hinzugefügt:` Stichwort zur elektronischen Suche mit dem Sie Ergebnisse filtern können, um nur einen einzigen Typ anzuzeigen:

- [`is:api thumbnail`][]
- [`[<code>ist:tutoriale Sicherheit`]</code>][]
- [`[<code>ist:package ipc`]</code>][]
- [`[<code>ist:app graphql`]</code>][]

## Tastatur-Navigation

Die Leute lieben Tastaturkürzel! Die neue Suche kann verwendet werden, ohne die Finger von der Tastatur zu entfernen:

- <kbd>/</kbd> konzentriert die Sucheingabe
- <kbd>esc</kbd> fokussiert die Sucheingabe und löscht sie
- <kbd>runter</kbd> bewegt sich zum nächsten Ergebnis
- <kbd>nach oben</kbd> bewegt sich zum vorherigen Ergebnis oder der Sucheingabe
- <kbd>Enter</kbd> öffnet ein Ergebnis

Wir haben auch das [-Modul](https://github.com/electron/search-with-your-keyboard/) geöffnet, das diese Tastatur-Interaktion ermöglicht. Es wurde für die Verwendung mit Algolia InstantSearch, , aber es wird generalisiert, um die Kompatibilität mit verschiedenen Suchimplementierungen zu ermöglichen.

## Wir möchten Ihr Feedback

Wenn Sie Probleme mit dem neuen Suchwerkzeug haben, möchten wir davon hören!

Die beste Möglichkeit, Ihr Feedback einzureichen, ist ein Problem auf GitHub im entsprechenden Repository:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) ist die Electron-Website. Wenn Sie nicht wissen, wo Sie ein Problem abgeben sollen, dann setzen Sie das am besten.
- [elektronische /algolia-Indizes](https://github.com/electron/algolia-indices) sind wo alle durchsuchbaren Electron-Daten kompiliert werden.
- [Elektronik/Suche mit Ihrer Tastatur](https://github.com/electron/search-with-your-keyboard) macht die Suchschnittstelle per Tastatur navigierbar.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) ist der browserseitige Client, der find-as-you-type Suche ermöglicht.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) ist der Node.js Client zum Hochladen von Daten auf die Server der Algolia.

## Danke

Special thanks to [Emily Jordan](https://github.com/echjordan) and [Vanessa Yuen](https://github.com/vanessayuenn) for building these new search capabilities, to [Libraries.io][] for providing [SourceRank][] scores, and to the team at Algolia for helping us get started. 🍹

[`is:api thumbnail`]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`[&lt;code>ist:app graphql`]</code>]: https://electronjs.org/?query=is%3Aapp%20graphql
[`[&lt;code>ist:package ipc`]</code>]: https://electronjs.org/?query=is%3Apackage%20ipc
[`[&lt;code>ist:tutoriale Sicherheit`]</code>]: https://electronjs.org/?query=is%3Atutorial%20security
[`security`]: https://electronjs.org/?query=security
[Libraries.io]: https://libraries.io
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank