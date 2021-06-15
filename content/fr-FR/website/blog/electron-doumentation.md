---
title: Documentation d'Electron
author: jlord
date: '2015-06-04'
---

Cette semaine, nous avons donné à la documentation d'Electron une maison sur [electronjs.org](https://electronjs.org). Vous pouvez visiter [/docs/latest](https://electronjs.org/docs/latest) pour la dernière série de documentations. Nous garderons également les versions des anciennes docs afin que vous puissiez visiter [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) pour les docs qui correspondent à la version que vous utilisez.

---

Vous pouvez visiter [/docs](https://electronjs.org/docs) pour voir quelles versions sont disponibles ou [/docs/all](https://electronjs.org/docs/all) pour voir la dernière version de docs sur une seule page (sympa pour `cmd` + `f` recherche).

Si vous souhaitez contribuer au contenu du répertoire docs, vous pouvez le faire en accédant au [dépôt Electron](https://github.com/electron/electron/tree/main/docs), où sont récupéré les documentation. Nous les récupérons pour chaque version mineure et les ajoutons au [dépôt du site Electron](http://github.com/electron/electronjs.org), qui est produit à l'aide de [Jekyll](http://jekyllrb.com).

Si vous souhaiter en savoir plus sur la façon dont nous extrayons les documents d'un dépôt vers un autre, continuez à lire ci-dessous. Sinon, profitez des [docs](https://electronjs.org/latest)!

## Les embouts techniques

Nous préservons la documentation dans le référentiel principal d'Electron tel quel. Cela signifie que [electron/electron](http://github.com/electron/electron) aura toujours la dernière version de la documentation. Lorsque de nouvelles versions d'Electron sont publiées, nous les dupliquons sur le dépôt du site web d'Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Pour récupérer la documentation nous exécutons un script [](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) avec une interface en ligne de commande de `script/docs vX.XX.` avec ou sans l'option `--latest` (selon que la version que vous importez est la dernière version). Notre [script de récupération de docs](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) utilise quelques modules de Node intéressants :

- [`nugget`](http://npmjs.com/nugget) pour [obtenir l'archive release](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) et l'enregistrer dans un répertoire temporaire.
- [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) à [dézippez l'archive](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) pour [streamer juste le dossier `/docs` ](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) depuis le tarball et [filtrer et traiter les fichiers](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (avec l'aide de [`through2`](http://npmjs.com/through2)) afin qu'ils fonctionne bien avec notre site Jekyll site (plus à ce sujet ci-dessous).

[Tests](https://github.com/electron/electronjs.org/tree/gh-pages/spec) nous aident à savoir que toutes les pièces débarquées comme prévu.

### Jekylle

Le site Web d'Electron est un site Jekyll et nous utilisons la fonctionnalité [Collections](http://jekyllrb.com/docs/collections/) pour la documentation avec une structure comme celle-ci :

```bash
electron.atom.io
<unk> ── _docs
    ── dernier
    ── v0.27.0
    ── v0.26.0
    ── ainsi
    <unk> ─ ainsi de suite
```

#### Marchandise avant

Pour que Jekyll rende chaque page, il faut au moins une première question vide. Nous allons utiliser la première question sur toutes nos pages, donc pendant que nous diffusons le répertoire `/docs` nous vérifions si un fichier est le `README. d` fichier (auquel cas il reçoit une configuration de la matière première) ou s'il s'agit d'un autre fichier avec une extension markdown (auquel cas il reçoit une matière frontale légèrement différente).

Chaque page reçoit cet ensemble de variables de la première matière:

```yaml
---
Version : v0.27.0
Catégorie : Tutoriel
title: 'Démarrage rapide'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

Le `README. d` obtient un `permalien supplémentaire` qui a une URL a une racine commune de `index. tml` plutôt qu'un maladroit `/readme/`.

```yaml
permalink: /fr_FR/docs/v0.27.0/index.html
```

#### Configuration et redirections

Dans la _configuration du site `. ml` fichier une variable `latest_version` est définie chaque fois que le drapeau `--latest` est utilisé lors de la récupération de la documentation. Nous ajoutons également une liste de toutes les versions qui ont été ajoutées au site ainsi que le permalien que nous aimerions pour toute la collection de documentation.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collections :
    docs : {output: true, permalink: '/docs/:path/'}
```

Le fichier `plus récent. d` dans la racine de notre site est vide sauf pour cette première question qui permet aux utilisateurs de voir l'index (aka `README`) de la dernière version de docs en visitant cette URL, [électron. tom.io/docs/latest](https://electronjs.org/docs/latest), plutôt que d'utiliser spécifiquement le numéro de version le plus récent (bien que vous puissiez le faire aussi).

```yaml
---
permalink: /fr_FR/docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Mises en page

Dans le modèle de mise en page `docs.html` , nous utilisons des conditions pour afficher ou masquer les informations dans l'en-tête et le fil d'ariane.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Pour créer une page affichant les versions disponibles, nous allons simplement parcourir la liste dans notre configuration sur un fichier, les `versions. d`, à la racine du site. Aussi nous donnons à cette page un permalien : `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

J'espère que vous avez apprécié ces bits techniques! Si vous désirez en savoir plus sur l'utilisation de Jekyll pour les sites de documentation, allez jeter un oeil sur comment l'équipe de docs de GitHub publie [la documentation de GitHub sur Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).
