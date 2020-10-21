---
title: Dokumentace Electronu
author: jlord
date: '2015-06-04'
---

Tento týden jsme dokumentaci Electronu dali domů na [electronjs.org](https://electronjs.org). Můžete navštívit [/docs/latest](https://electronjs.org/docs/latest) pro nejnovější soubor dokumentů. Také si ponecháme verze starších dokumentů, takže můžete navštívit [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) dokumentů, které odpovídají verzi, kterou používáte.

---

Můžete navštívit [/docs](https://electronjs.org/docs) , abyste zjistili, jaké verze jsou k dispozici nebo [/docs/all](https://electronjs.org/docs/all) , abyste viděli nejnovější verzi dokumentace na jedné stránce (pěkná pro vyhledávání `cmd` + `f`.).

Pokud chcete přispět k obsahu dokumentace, můžete tak učinit v [Electron repozitáři](https://github.com/electron/electron/tree/master/docs), odkud jsou dokumenty načteny. Načítáme je pro každý menší vydání a přidáváme je do [úložiště stránek Electronu](http://github.com/electron/electronjs.org), která je vytvořena s [Jekyll](http://jekyllrb.com).

Pokud máte zájem dozvědět se více o tom, jak stahujeme dokumenty z jednoho repozitáře do jiného, pokračujte ve čtení níže. Jinak si vychutnejte [dokumentace](https://electronjs.org/latest)!

## Technické základny

Uchováváme dokumentaci v jádru Electronu tak, jak je. To znamená, že [elektron/elektronický](http://github.com/electron/electron) bude mít vždy nejnovější verzi dokumentů. Když jsou vydány nové verze Electronu, duplikujeme je na webových stránkách Electronu, [elektronick/elektronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Pro načtení dokumentace spouštíme [skript](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) s rozhraním příkazové řádky `script/docs vX.XX.` s nebo bez možnosti `--latest` (v závislosti na tom, zda je importovaná verze nejnovější verze). Náš [skript pro načítání dokumentace](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) používá několik zajímavých modulů uzlu:

- [`nugget`](http://npmjs.com/nugget) pro [získání release tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) a uložení do dočasného adresáře.
- [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) to [rozbalit tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) pro [streamování pouze adresáře `/docs`](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) z tarbalu a [filtrování a zpracování souborů](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (s pomocí [`through 2`](http://npmjs.com/through2)), aby fungovaly hezky s naší stránkou Jekyll (více na níže uvedené stránce).

[Testy](https://github.com/electron/electronjs.org/tree/gh-pages/spec) nám pomáhají vědět, že všechny kousky a kusy vyložené podle očekávání.

### Jekyll

Electron webové stránky jsou stránky Jekyll a používáme funkci [kolekcí](http://jekyllrb.com/docs/collections/) pro dokumenty se strukturou, jako je tento:

```bash
electron.atom.io
<unk> š.--_docs
    <unk> ý-ý-poslední
    <unk> ý-v0.27.0
    <unk> ý-v0.26.0
    <unk> ý-takhle na
    <unk> ý-tak dále.
```

#### Přední část

Aby Jekyll vykreslil každou stránku, potřebuje alespoň prázdné titulní předměty. Použijeme fronty na všech našich stránkách, takže zatímco vysíláme adresář `/docs` , zjistíme, zda je soubor `ČÍTAČ. d` soubor (v tom případě obdrží jednu přední složku) nebo jiný soubor s příponou markdown (v tom případě obdrží mírně odlišnou přední část).

Každá stránka obdrží tuto sadu předních proměnných:

```yaml
---
verze: v0.27.0
category: Tutorial
title: 'Quick Start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`ČTĚ. d` získává další `trvalý odkaz` , takže URL má běžnou kořenovou složku indexu `. tml` namísto nepříjemné `/readme/`.

```yaml
trvalý odkaz: /docs/v0.27.0/index.html
```

#### Konfigurace a přesměrování

Na webu `_config. ml` soubor proměnná `latest_version` je nastavena pokaždé, když je při načítání dokumentace použit znak `--latest`. Přidáváme také seznam všech verzí, které byly přidány na stránku, stejně jako trvalý odkaz jako pro celou kolekci dokumentů.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collections:
    docs: {output: true, permalink: '/docs/:path/'}
```

Soubor `později. d` v kořenovém adresáři našich stránek je prázdné kromě této fronty, která uživatelům umožňuje vidět index (aka `README`z nejnovější verze dokumentace navštívením této URL, [elektron. tom.io/docs/latest](https://electronjs.org/docs/latest), namísto použití čísla nejnovější verze konkrétně (i když to můžete udělat).

```yaml
---
permalink: /cs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Rozvržení

V šabloně `docs.html` použijeme podmínky pro zobrazení nebo skrytí informací v záhlaví a drobečku.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Chcete-li vytvořit stránku zobrazující dostupnou verzi, stačí provést smyčku přes seznam v našem konfiguračním souboru, `verzí. d`v kořenovém adresáři webu. Také dáme této stránce trvalý odkaz: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Doufáme, že se vám tyto technické bity líbily! Pokud máte zájem o více informací o používání Jekyll pro stránky dokumentace, podívejte se, jak GitHubův dokovací tým publikuje [Dokumenty GitHubu na Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

