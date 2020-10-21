---
title: Electron documentatie
author: jlord
date: '2015-06-04'
---

Deze week hebben we Electron's documentatie een huis gegeven over [electronjs.org](https://electronjs.org). U kunt [/docs/latest](https://electronjs.org/docs/latest) voor de laatste documentengroep bezoeken. We houden ook versies van oudere documenten bij, dus je kunt [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) bezoeken voor de documenten die correleeren met de versie die je gebruikt.

---

Je kunt [/docs](https://electronjs.org/docs) bezoeken om te zien welke versies beschikbaar zijn of [/docs/all](https://electronjs.org/docs/all) om de laatste versie van documenten op één pagina te bekijken (leuk voor `cmd` + `f` zoeken).

Als je bij wilt dragen aan de inhoud van de documenten je kunt dit doen in de [Electron repository](https://github.com/electron/electron/tree/master/docs), waar de documenten worden opgehaald. We halen ze op voor elke kleine release en voegen ze toe aan de [Electron site repository](http://github.com/electron/electronjs.org), die gemaakt is met [Jekyll](http://jekyllrb.com).

Als je geïnteresseerd bent in meer informatie over hoe we de documenten van de ene repository naar de andere trekken ga je hieronder verder met lezen. Anders geniet u van de [documenten](https://electronjs.org/latest)!

## De Technische Bits

We houden de documentatie in de kern van de Electron bewaard. Dit betekent dat [electron/electron](http://github.com/electron/electron) altijd de nieuwste versie van de documentatie heeft. Wanneer nieuwe versies van Electron worden vrijgegeven, dupliceren we deze via de Electron website repository, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Om de documenten op te halen voeren we een [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) uit met een opdrachtregelinterface van `script/docs vX.XX.` met of zonder de optie `--nieuwste` (afhankelijk van of de versie die je importeert de nieuwste versie is). Ons [script voor het ophalen van documenten](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) maakt gebruik van een paar interessante Node modules:

- [`nugget`](http://npmjs.com/nugget) voor [het krijgen van de release tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) en het opslaan in een tijdelijke map.
- [`pistool misschien`](http://npmsjs.com/gunzip-maybe) om [de tarball uit te pakken](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) for [streaming just the `/docs` directory](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) from the tarball and [filtering and processing the files](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (with the help of [`through2`](http://npmjs.com/through2)) so that they work nicely with our Jekyll site (more on that below).

[Test](https://github.com/electron/electronjs.org/tree/gh-pages/spec) helpt ons te weten dat alle stukken en stukken geland zijn zoals verwacht.

### Jekll

De Electron website is een Jekyll site en we maken gebruik van de [Collections](http://jekyllrb.com/docs/collections/) functie voor documenten met een structuur als deze:

```bash
electron.atom.io
A 
 ・・Would docs
    26, last
    26, 26, latest v0.27.0, 0
    γρv0.26.0
    credentials that so so on
    seconds forth forth forth about
```

#### Voorzijde punt

Om elke pagina weer te geven heeft Jekyll minstens een lege front-matter nodig. We gaan gebruik maken van de voorste zaak op al onze pagina's, dus terwijl we de map `/docs` uitstreamen om te controleren of een bestand de `README is. d` bestand (in dat geval het één front-matter configuratie ontvangt) of als het een ander bestand met een markdown extensie is (in dat geval ontvangt het iets andere front-issue dan de voorkant).

Elke pagina ontvangt deze set van variabelen:

```yaml
---
version: v0.27.0
category: Tutorial
title: 'Quick Start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

De `LEADME. d` krijgt een extra `permalink` zodat die een URL heeft een veel voorkomende basis van `index. tml` in plaats van een lastige `/readme/`.

```yaml
permalink: /nl_NL/docs/v0.27.0/index.html
```

#### Configuratie en doorverwijzingen

In de site's `_config. ml` bestand een variabele `latest_version` is ingesteld elke keer dat de `--latest` vlag wordt gebruikt bij het ophalen van documenten. We voegen ook een lijst toe met alle versies die aan de site zijn toegevoegd en de permalink die we graag voor de volledige documentenverzameling zouden willen hebben.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collecties:
    docs: {output: true, permalink: '/docs/:path/'}
```

Het bestand `recente. d` in onze site root is leeg behalve deze front kwestie, waarmee gebruikers de index (aka `README`) van de nieuwste documentenversie kunnen zien door deze URL te bezoeken, [electron. tom.io/docs/latest](https://electronjs.org/docs/latest), in plaats van het laatste versienummer specifiek te gebruiken (maar dat kunt u ook doen).

```yaml
---
permalink: /nl_NL/docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Lay-outs

In de `docs.html` lay-outsjabloon gebruiken we voorwaarden om informatie te tonen of verbergen in de header en breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Om een pagina aan te maken die de beschikbare versies laat zien, kunnen we gewoon de lijst doorlopen in onze configuratie op een bestand, `versies. d`, in de root van de site. Ook geven we deze pagina een permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Hopelijk heeft u van deze technische beetjes gehouden! Als u geïnteresseerd bent in meer informatie over het gebruik van Jekyll voor documentatiewebsites, bekijk dan hoe GitHub's documententeam publiceert [GitHub's documenten op Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

