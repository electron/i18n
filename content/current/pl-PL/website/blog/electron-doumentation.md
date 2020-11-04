---
title: Dokumentacja Electrona
author: jlord
date: '2015-06-04'
---

W tym tygodniu daliśmy Electronowi dokumentację domu [electronjs.org](https://electronjs.org). Możesz odwiedzić [/docs/latest](https://electronjs.org/docs/latest) aby uzyskać najnowszy zestaw dokumentów. Będziemy również utrzymywać wersje starszej dokumentacji, więc możesz odwiedzić [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) w celu uzyskania dokumentacji skorelowanej z wersją, której używasz.

---

Możesz odwiedzić [/docs](https://electronjs.org/docs) , aby zobaczyć, jakie wersje są dostępne lub [/docs/all](https://electronjs.org/docs/all) aby zobaczyć najnowszą wersję dokumentacji na jednej stronie (ładną dla `cmd` + `f` wyszukiwania).

Jeśli chcesz przyczynić się do zawartości dokumentów, możesz to zrobić w [repozytorium Electron](https://github.com/electron/electron/tree/master/docs), z którego pobierane są dokumentacje. Pobieramy je dla każdej drobnej wersji i dodajemy je do [repozytorium witryny Electron](http://github.com/electron/electronjs.org), który jest wykonany z [Jekyll](http://jekyllrb.com).

Jeśli jesteś zainteresowany dowiedzieć się więcej o tym, jak pobieramy dokumenty z jednego repozytorium do innego ciągle czytaj poniżej. W przeciwnym razie ciesz się [dokumentacją](https://electronjs.org/latest)!

## Bity techniczne

Przechowujemy dokumentację w repozytorium Electrona. Oznacza to, że [electron/electron](http://github.com/electron/electron) będzie zawsze mieć najnowszą wersję dokumentów. Kiedy nowe wersje Electron są wydane, duplikujemy je w repozytorium strony Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Aby pobrać dokumenty, uruchamiamy skrypt [](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) z interfejsem wiersza poleceń `script/docs vX.XX.` z lub bez opcji `--latest` (w zależności od tego, czy wersja, którą importujesz, jest najnowszą wersją). Nasz [skrypt do pobierania dokumentacji](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) używa kilku interesujących modułów węzła:

- [`nugget`](http://npmjs.com/nugget) aby [uzyskać zwalniacz](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) i zapisać go w katalogu tymczasowym.
- [`gunzip-can`](http://npmsjs.com/gunzip-maybe) to [rozpakuj piłkę smołową](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`smo-fs`](http://npmjs.com/tar-fs) dla [strumieniowania tylko katalogu `/docs`](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) z smoły i [filtrowania i przetwarzania plików](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (z pomocą [`through`](http://npmjs.com/through2)), aby dobrze działały z naszą stroną Jekyll (więcej niż poniżej).

[Testy](https://github.com/electron/electronjs.org/tree/gh-pages/spec) pomogą nam wiedzieć, że wszystkie kawałki i części wylądowały zgodnie z oczekiwaniami.

### Jekyll

Strona Electron jest stroną Jekyll i używamy funkcji [Kolekcje](http://jekyllrb.com/docs/collections/) dla dokumentów o takiej strukturze:

```bash
electron.atom.io
↑ _docs
    ¾ najnowsze
    <unk> <unk> v0.27.0
    <unk> <unk> <unk> v0.26.0
    <unk> <unk> so na
    <unk> <unk> so
```

#### Materiał przedni

Aby Jekyll mógł renderować każdą stronę, potrzebuje co najmniej pustej sprawy. Na wszystkich naszych stronach wykorzystamy sprawę frontową, więc podczas przesyłania strumieniowego katalogu `/docs` , który sprawdzamy, aby sprawdzić, czy plik jest `README. d` plik (w którym to przypadku otrzymuje jedną konfigurację sprawy) lub jeśli jest to inny plik z rozszerzeniem markdown (w którym to przypadku otrzymuje nieco inne sprawy).

Każda strona odbiera ten zestaw zmiennych dotyczących spraw głównych:

```yaml
---
wersja: v0.27.0
kategoria: samouczek
tytuł: 'Szybki start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`README. d` otrzymuje dodatkowy `permalink` , więc adres URL ma wspólny pierwiastek `indeksu. tml` zamiast nieskutecznego `/readme/`.

```yaml
permalink: /pl/docs/v0.27.0/index.html
```

#### Konfiguracja i przekierowania

W `_config witryny. ml` plik zmienna `latest_version` jest ustawiana za każdym razem, gdy flaga `--latest` jest używana podczas pobierania dokumentów. Dodajemy również listę wszystkich wersji, które zostały dodane do witryny, jak również permalink jaki chcielibyśmy dla całej kolekcji dokumentów.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
kolekcje:
    docs: {output: true, permalink: '/docs/:path/'}
```

Plik `najnowszy. d` w katalogu głównym naszej witryny jest pusty, z wyjątkiem tej strony głównej, która pozwala użytkownikom zobaczyć indeks (aka `README`) najnowszej wersji dokumentów odwiedzając ten adres URL, [elektron. tom.io/docs/latest](https://electronjs.org/docs/latest), zamiast używać konkretnego numeru najnowszej wersji (choć możesz to zrobić).

```yaml
---
permalink: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Układy

W szablonie układu `docs.html` używamy warunków do wyświetlania lub ukrywania informacji w nagłówku i breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Aby utworzyć stronę z dostępnymi wersjami, po prostu pętlę z listy w naszej konfiguracji pliku, `wersji. d`, w rootu witryny. Także nadajemy tej stronie permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Mam nadzieję, że podobały Ci się te części techniczne! Jeśli interesuje Cię więcej informacji na temat korzystania z Jekyll dla stron dokumentacji, sprawdź jak zespół dokumentacji GitHub publikuje [dokumentację GitHuba na Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

