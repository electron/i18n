---
title: Документація Electron
author: молодший
date: '2015-06-04'
---

Цього тижня ми дали документацію Electron як додому на [electronjs.org](https://electronjs.org). Ви можете відвідати [/docs/latest](https://electronjs.org/docs/latest) для останнього набору документа. Ми будемо зберігати версії старих документацій теж, так що ви зможете відвідати [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) для документації, що корелює версію, яку ви використовуєте.

---

Ви можете відвідати [/docs](https://electronjs.org/docs) , щоб побачити які версії доступні або [/docs/all](https://electronjs.org/docs/all) щоб переглянути останню версію документації на одній сторінці (добре для `cmd` + `f` пошуки).

Якщо ви хочете зробити свій внесок в матеріал для документації, ви можете зробити це в [репозиторії Electron](https://github.com/electron/electron/tree/master/docs), звідки завантажуються документації. Ми отримуємо для кожного з дрібних релізів і додаємо їх до [сховища сайту Electron](http://github.com/electron/electronjs.org)що зроблено на [Jekyl](http://jekyllrb.com).

Якщо ви хочете дізнатися більше про те, як ми витягнемо документацію з одного репозиторію до іншого продовження читання нижче. Інакше, насолоджуйтесь [документацією](https://electronjs.org/latest)!

## Технічні біти

Ми зберігаємо документацію всередині базового сховища Electron як є. Це означає, що [електрон / електрон](http://github.com/electron/electron) завжди буде мати останню версію документів. Коли випускаються нові версії Electron, ми дублюємо їх на репозиторії веб-сайту Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Для отримання документації ми запускаємо [скрипт](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) з інтерфейсом командного рядка `script/docs vX.XX.` з або без `--останні` опції (в залежності від того, чи версія яку ви імпортуєте є останньою версією). Наш [скрипт для отримання документації](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) використовує кілька цікавих модулів Node:

- [`готувати`](http://npmjs.com/nugget) для [отримати tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) і зберегти його на тимчасову папку.
- [`гарматний zip-можливо`](http://npmsjs.com/gunzip-maybe) до [розпакувати tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) for [streaming just the `/docs` directory](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) from the tarball and [filtering and processing the files](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (with the help of [`through2`](http://npmjs.com/through2)) so that they work nicely with our Jekyll site (more on that below).

[Тести](https://github.com/electron/electronjs.org/tree/gh-pages/spec) допоможуть нам знати, що всі біти і шматочки зійшли належним чином.

### Джекиль

Веб-сайт Electron - це сайт Jekyl, і ми використовуємо [Колекції](http://jekyllrb.com/docs/collections/) для документації з такою структурою:

```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── so on
    └── so forth
```

#### Передня матерія

Для того, щоб Джекілл видав кожну сторінку, йому потрібно хоча б порожню передню матерію. Ми будемо використовувати головне питання на всіх наших сторінках, так що, поки ми транслюємо каталог `/docs` ми перевіримо, чи є файл `README. файл d` (в цьому випадку він отримує одну конфігурацію фронтальної речовини) або якщо будь-який інший файл з розширенням markdown (в цьому випадку він отримує трохи інше по суті).

Кожна сторінка отримує цей набір змінних фронт-матеріалів:

```yaml
---
версія: v0.27.0
категорія: Tutorial
title: 'Quick Start'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`README. d` отримує додаткову `постійну` так, щоб URL-адреса мала загальний корінь з `індексу. tml` замість незручних `/readme/`.

```yaml
постійне поширення: /docs/v0.27.0/index.html
```

#### Конфігурація і перенаправлення

На сайті `_config. ml` файл змінної `latest_version` це кожного разу, коли `--latest` прапорець використовується при отриманні документації. Ми також додали список усіх версій сайту, а також тих, що були додані на сайт, що не мають постійних дій, хотіли б у кожній із цих документах.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
колекцій:
    docs: {output: true, permalink: '/docs/:path/'}
```

Файл `останній файл. d` у корені нашого сайту порожній, за винятком цього переднього матеріалу, який дозволяє користувачам бачити індекс (aka `README`) від останньої версії документації, відвідавши цей URL, [електрон. tom.io/docs/latest](https://electronjs.org/docs/latest), а не використовуючи останній номер версії спеціально (хоча ви можете це зробити).

```yaml
---
постійне запит: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Розмітка

У макеті `docs.html` ми використовуємо умови для того, щоб показати або приховати інформацію в заголовку і breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Щоб створити сторінку, що показує версії, які доступні, ми просто цикляємо через список у файлі з нашою конфігурацією, `версіями. d`, у корені сайту. Також ми надаємо цій сторінці постійне посилання: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Сподіваюся, вам сподобалися ці технічні біти! If you're interested in more information on using Jekyll for documentation sites, checkout how GitHub's docs team publishes [GitHub's docs on Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).

