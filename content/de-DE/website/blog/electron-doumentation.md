---
title: Electron-Dokumentation
author: jörn
date: '2015-06-04'
---

Diese Woche haben wir Electrons Dokumentation auf [electronjs.org](https://electronjs.org) zuhause gegeben. Du kannst [/docs/latest](https://electronjs.org/docs/latest) besuchen, um die neuesten Dokumente zu sehen. Wir werden auch Versionen älterer Ärzte behalten, also kannst du [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) für die Dokumentation besuchen, die mit der verwendeten Version übereinstimmt.

---

Sie können [/docs](https://electronjs.org/docs) besuchen, um zu sehen, welche Versionen verfügbar sind, oder [/docs/all](https://electronjs.org/docs/all) , um die aktuellste Version der Dokumentation auf einer Seite zu sehen (nett für `cmd` + `f` Suchen).

If you'd like to contribute to the docs content, you can do so in the [Electron repository](https://github.com/electron/electron/tree/main/docs), where the docs are fetched from. Wir holen sie für jede kleinere Version und fügen sie zum [Electron Site Repository](http://github.com/electron/electronjs.org), die mit [Jekyll](http://jekyllrb.com) gemacht wird.

Wenn Sie daran interessiert sind, mehr darüber zu erfahren, wie wir die Dokumentation von einem Repository zu einem anderen ziehen, weiter unten lesen. Sonst genieße die [Dokumentation](https://electronjs.org/latest)!

## Die technischen Bits

Wir behalten die Dokumentation im Electron-Kernrepository wie es ist. Das bedeutet, dass [electron/electron](http://github.com/electron/electron) immer die neueste Version der Docs hat. Wenn neue Versionen von Electron veröffentlicht werden, duplizieren wir sie auf dem Electron-Website-Repository, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Um die Dokumentation abzurufen, führen wir ein [-Skript](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) mit einer Kommandozeilenschnittstelle von `script/docs vX.XX.` mit oder ohne die Option `--latest` (je nachdem, ob die von Ihnen importierte Version die neueste Version ist). Unser [-Skript zum Abrufen von Dokumenten](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) verwendet ein paar interessante Knoten-Module:

- [`nugget`](http://npmjs.com/nugget) für [das den Release Tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) abrufen und in einem temporären Verzeichnis speichern.
- [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) to [entpacken Sie den Tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) für [Streaming nur das `/docs` Verzeichnis](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) aus dem Tarball und [Filtern und Verarbeiten der Dateien](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (mit Hilfe von [`durch2`](http://npmjs.com/through2)), damit sie gut mit unserer Jekyll Seite arbeiten (mehr auf der folgenden Seite).

[Tests](https://github.com/electron/electronjs.org/tree/gh-pages/spec) helfen uns zu wissen, dass alle Teile und Teile wie erwartet gelandet sind.

### Jekyll

Die Electron-Website ist eine Jekyll-Website und wir nutzen die [Sammlungen](http://jekyllrb.com/docs/collections/) Funktion für die Dokumentation mit einer solchen Struktur:

```bash
electron.atom.io
<unk> 本<unk> _docs
    <unk> 本<unk> <unk> neueste
    <unk> <unk> <unk> v0.27.0
    <unk> 本<unk> v0.26.0
    <unk> 本<unk> so auf
    <unk> 文<unk> so weiter
```

#### Frontmatter

Damit Jekyll jede Seite rendern kann, benötigt er mindestens leere Frontmaterialien. Wir nutzen Frontmatter auf allen unseren Seiten. Während wir also das `/docs` Verzeichnis ausstrecken, überprüfen wir, ob eine Datei das `README ist. d` Datei (in diesem Fall erhält sie eine Frontmaterialkonfiguration) oder wenn es sich um eine andere Datei mit einer Markdown-Endung handelt (in diesem Fall erhält sie etwas andere Frontmaterialien).

Jede Seite erhält diesen Satz von Front-Match-Variablen:

```yaml
---
Version: v0.27.0
Kategorie: Tutorial
Titel: 'Schnellstart'
source_url: 'https://github.com/electron/blob/master/docs/tutorial/quick-start.md'
---
```

Das `LÖSCHEN. d` erhält zusätzlich `permalink` , so dass eine URL eine gemeinsame Wurzel des `Index hat. tml` statt eines heiklen `/readme/`.

```yaml
permalink: /de_DE/docs/v0.27.0/index.html
```

#### Konfigurieren und Weiterleitungen

In der Seite `_config. ml` Datei eine Variable `latest_version` wird jedes Mal gesetzt, wenn das Flag `--latest` beim Abrufen von docs verwendet wird. Wir fügen auch eine Liste aller Versionen hinzu, die der Seite hinzugefügt wurden, sowie die Permalink, die wir für die gesamte Dokumentations-Sammlung wünschen.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
Sammlungen:
    docs: {output: true, permalink: '/docs/:path/'}
```

Die Datei `neuer. d` in unserem Site-Root ist leer außer dieser Frontmatter und erlaubt Benutzern den Index (alias `README`) der neuesten Version der Dokumentation zu sehen, indem Sie diese URL besuchen, [Elektron. tom.io/docs/latest](https://electronjs.org/docs/latest), anstatt die neueste Versionsnummer spezifisch zu verwenden (obwohl Sie das auch tun können).

```yaml
---
permalink: /docs/latest/
umleiten: /docs/{{ site.data.releases[0].version }}
---
```

#### Layouts

In der `docs.html` Layoutvorlage verwenden wir Bedingungen, um Informationen im Kopf- und Breadcrumb anzuzeigen oder zu verbergen.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Um eine Seite mit den verfügbaren Versionen zu erstellen, führen wir einfach eine Schleife durch die Liste in unserer Konfigurationsdatei `Versionen. d`, im Wurzelverzeichnis der Website. Außerdem geben wir dieser Seite einen Permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Hoffentlich haben Sie diese technischen Bits genossen! Wenn Sie an weiteren Informationen zur Verwendung von Jekyll für Dokumentationsseiten interessiert sind, schauen Sie sich an, wie GitHubs Dokumentations-Team [GitHubs Dokumentation auf Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github) veröffentlicht.
