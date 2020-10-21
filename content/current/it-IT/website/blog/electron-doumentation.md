---
title: Documentazione di Electron
author: jlord
date: '2015-06-04'
---

Questa settimana abbiamo dato alla documentazione di Electron's una casa su [electronjs.org](https://electronjs.org). Puoi visitare [/docs/latest](https://electronjs.org/docs/latest) per l'ultima serie di documenti. Manterremo anche le versioni dei documenti più vecchi, quindi puoi visitare [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) per i documenti che sono correlati alla versione che stai utilizzando.

---

Puoi visitare [/docs](https://electronjs.org/docs) per vedere quali versioni sono disponibili o [/docs/all](https://electronjs.org/docs/all) per vedere l'ultima versione dei documenti tutti su una pagina (bello per `cmd` + `f` di ricerca).

Se vuoi contribuire al contenuto dei documenti, puoi farlo nel [repository Electron](https://github.com/electron/electron/tree/master/docs), da cui vengono recuperati i documenti. Li recuperiamo per ogni rilascio minore e li aggiungiamo al [repository del sito Electron](http://github.com/electron/electronjs.org), che è realizzato con [Jekyll](http://jekyllrb.com).

Se sei interessato a saperne di più su come tirare i documenti da un repository ad un altro continuare a leggere qui sotto. Altrimenti, goditi i [documenti](https://electronjs.org/latest)!

## I Bit Tecnici

Stiamo conservando la documentazione all'interno del repository centrale di Electron. Ciò significa che [electron/electron](http://github.com/electron/electron) avrà sempre l'ultima versione dei documenti. Quando vengono rilasciate nuove versioni di Electron, le dupliciamo sul repository del sito web di Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Per recuperare i documenti eseguiamo uno [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) con un'interfaccia a riga di comando di `script/docs vX.XX.` con o senza l'opzione `--latest` (a seconda che la versione che stai importando sia l'ultima versione). Il nostro script [per il recupero dei documenti](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) utilizza alcuni interessanti moduli Node:

- [`nugget`](http://npmjs.com/nugget) per [ottenere il release tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) e salvarlo in una directory temporanea.
- [`gunzip-forse`](http://npmsjs.com/gunzip-maybe) per [decomprimere il tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) for [streaming just the `/docs` directory](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) from the tarball and [filtering and processing the files](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (con l'aiuto di [`through2`](http://npmjs.com/through2)) in modo che funzionino bene con il nostro sito Jekyll (più in basso).

[Tests](https://github.com/electron/electronjs.org/tree/gh-pages/spec) help us know that all the bit and pieces landed as expected.

### Jekyll

Il sito web Electron è un sito Jekyll e utilizziamo la funzione [Collections](http://jekyllrb.com/docs/collections/) per i documenti con una struttura come questa:

```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── so on
    └── so forth
```

#### Materia frontale

Per Jekyll per renderizzare ogni pagina ha bisogno di almeno la materia anteriore vuota. Stiamo per fare uso della questione frontale su tutte le nostre pagine, quindi mentre stiamo scaricando la directory `/docs` che controlliamo per vedere se un file è il `README. d` file (nel qual caso riceve una configurazione della materia anteriore) o se si tratta di un altro file con un'estensione di markdown (nel qual caso riceve una questione anteriore leggermente diversa).

Ogni pagina riceve questo insieme di variabili di materia anteriore:

```yaml
---
version: v0.27.0
category: Tutorial
title: 'Quick Start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

La `README. d` ottiene un ulteriore `permalink` in modo che abbia un URL ha una radice comune dell'indice `. tml` piuttosto che un goffo `/readme/`.

```yaml
permalink: /docs/v0.27.0/index.html
```

#### Configurazione e reindirizzamento

Nel sito `_config. ml` file una variabile `latest_version` è impostata ogni volta che viene utilizzato il `--latest` flag durante il recupero dei documenti. Aggiungiamo anche un elenco di tutte le versioni che sono state aggiunte al sito così come il permalink che vorremmo per l'intera collezione di documenti.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collections:
    docs: {output: true, permalink: '/docs/:path/'}
```

Il file `più recente. d` nella nostra radice del sito è vuota, tranne che per questa questione frontale che permette agli utenti di vedere l'indice (aka `README`) dell'ultima versione dei documenti visitando questo URL, [elettrone. tom.io/docs/latest](https://electronjs.org/docs/latest), piuttosto che usare specificamente il numero di versione più recente (anche se puoi farlo).

```yaml
---
permalink: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Layout

Nel modello di layout `docs.html` utilizziamo le condizioni per mostrare o nascondere le informazioni nell'intestazione e nel breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Per creare una pagina che mostri le versioni disponibili basta passare in rassegna la lista nella nostra configurazione su un file, `versioni. d`, nella radice del sito. Inoltre diamo a questa pagina un permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Spero che ti siano piaciuti questi bit tecnici! Se sei interessato a maggiori informazioni sull'utilizzo di Jekyll per i siti di documentazione, controlla come il team docs di GitHub pubblica [i documenti di GitHub su Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

