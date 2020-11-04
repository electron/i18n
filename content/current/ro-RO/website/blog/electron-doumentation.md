---
title: Documentație Electron
author: Jlord
date: '2015-06-04'
---

Săptămâna aceasta am oferit documentaţia lui Electron o casă pe [electronjs.org](https://electronjs.org). Puteți vizita [/documente/ultima](https://electronjs.org/docs/latest) pentru cel mai recent set de documente. Vom păstra versiunile de documente mai vechi, de asemenea, așa că puteți vizita [/documente/vX.XX.X](https://electronjs.org/docs/v0.26.0) pentru documentele care se corelează cu versiunea pe care o folosiți.

---

Puteți vizita [/docs](https://electronjs.org/docs) pentru a vedea ce versiuni sunt disponibile sau [/documente/toate/](https://electronjs.org/docs/all) pentru a vedea ultima versiune de documente toate pe o singură pagină (pe un loc pentru `cmd` + `f` căutări).

Dacă doriţi să contribuiţi la conţinutul documentelor, puteți face acest lucru în [Depozitul Electron](https://github.com/electron/electron/tree/master/docs), de unde sunt preluate documentele. Le luăm pentru fiecare versiune minoră și le adăugăm în [depozitul site-ului Electron](http://github.com/electron/electronjs.org), care este făcut cu [Jekyll](http://jekyllrb.com).

Dacă sunteți interesat să aflați mai multe despre cum tragem documentele dintr-un depozit în altul continuând să citească mai jos. Altfel, bucură-te de [documentele](https://electronjs.org/latest)!

## Biți tehnici

Păstrăm documentația în depozitul de bază Electron cum este. Asta înseamnă că [electron/electron](http://github.com/electron/electron) va avea întotdeauna cea mai recentă versiune de documente. Când noi versiuni de Electron sunt lansate, le duplicăm pe site-ul Electron , [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Pentru a prelua documentele vom rula un [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) cu o interfață de linie de comandă de `script/docs vX.XX.` cu sau fără opțiunea `--ultimul` (în funcție de dacă versiunea pe care o imporți este ultima versiune). Scriptul nostru [pentru preluarea documentelor](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) foloseşte câteva module node interesante:

- [`nugget`](http://npmjs.com/nugget) pentru [obținerea tarbului de lansare](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) și salvarea lui într-un director temporar.
- [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) to [unzip the tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) pentru [streaming doar directorul `/docs`](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) din tarball şi [filtrarea şi procesarea fişierelor](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (cu ajutorul a [`prin 2`](http://npmjs.com/through2)) astfel încât acestea să funcţioneze frumos cu site-ul nostru Jekyll (mai multe pe acesta de mai jos).

[Testele](https://github.com/electron/electronjs.org/tree/gh-pages/spec) ne ajută să știm că toate bițile și piesele au fost debarcate conform așteptărilor.

### Ecran

Site-ul Electron este un site Jekyll și folosim funcția [Colecții](http://jekyllrb.com/docs/collections/) pentru documentele cu o structură ca aceasta:

```bash
electron.atom.io
<unk> ● ─ _docs
    Ribavirin ─ cele mai recente
    • ─ v0.27.0
    <unk> ─ v0.26.0
    <unk> US, deci pe
    <unk> ─ așa mai departe
```

#### Materie frontală

Pentru ca Jekyll să redea fiecare pagină, are nevoie de cel puţin materia goală. Vom folosi materia frontală pe toate paginile noastre, astfel încât în timp ce transmitem folderul `/docs` pe care îl verificăm pentru a vedea dacă un fișier este `README. d` fișier (în cazul în care primește o configurație a materiei din față) sau dacă este orice alt fișier cu o extensie markdown (în care primește o problemă ușor diferită în față).

Fiecare pagină primește acest set de variabile de materie frontală:

```yaml
---
versiunea: v0.27.0
categorie: Tutorial
titlu: 'Quick Start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`README. d` primește un `permalink` în plus pentru ca adresa URL să aibă o rădăcină comună de `index. tml` în loc de un ciudat `/readme/`.

```yaml
permalink: /ro_RO/docs/v0.27.0/index.html
```

#### Config și Redirecționări

În secțiunea `_config a site-ului. ml` fișier o variabilă `latest_version` este setată de fiecare dată când se folosește `--last` steag la preluarea documentelor. De asemenea, adăugăm o listă cu toate versiunile care au fost adăugate pe site, precum și permalink pe care ni le-am dori pentru întreaga colecție de documente.

```yaml
latest_versiune: v0.27.0
available_versions:
    - v0.27.0
colecții:
    documente: {output: true, permalink: '/docs/:path/'}
```

Fișierul `este cel mai recent. d` în rădăcina site-ului nostru este goală, cu excepția acestei materii din față, care permite utilizatorilor să vadă indexul (aka `README`) celei mai recente versiuni de documente vizitând acest URL, [electron. tom.io/documente/ultimul](https://electronjs.org/docs/latest), mai degrabă decât să folosești cel mai recent număr de versiune specific (chiar dacă poți face și asta).

```yaml
---
permalink: /documente/latest/
redirecționare_to: /documente/{{ site.data.releases[0].version }}
---
```

#### Aranjări

În șablonul de layout `docs.html` vom folosi condiții pentru a afișa sau ascunde informații în antet și breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Pentru a crea o pagină care să afișeze versiunile disponibile, noi doar facem o buclă prin listă în configurația noastră a unui fișier, `versiuni. d`, în rădăcina site-ului. Dăm această pagină un permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Sperăm că ți-a plăcut acești biți tehnici! Dacă sunteți interesat de mai multe informații despre utilizarea Jekyll pentru site-urile de documentație, finalizați comanda cum echipa de documente GitHub publică [documentele GitHub pe Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

