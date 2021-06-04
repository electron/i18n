---
title: Документация Electron
author: джлорд
date: '2015-06-04'
---

На этой неделе мы предоставили документацию Electron на [electronjs.org](https://electronjs.org). Вы можете посетить [/docs/latest](https://electronjs.org/docs/latest) для последнего набора документов. Мы также будем хранить версии старых документов, поэтому вы сможете посетить [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) для документации, которая соотносится с используемой версией.

---

Вы можете посетить [/docs](https://electronjs.org/docs) , чтобы увидеть, какие версии доступны или [/docs/all](https://electronjs.org/docs/all) для просмотра последней версии документации на одной странице (красиво для `cmd` + `f` поисков).

Если вы хотите внести свой вклад в наполнение документации, вы можете сделать это в [репозитории Electron](https://github.com/electron/electron/tree/main/docs), из которого загружены документы. Мы получаем их для каждого мелкого релиза и добавляем их в [репозиторий сайта Electron](http://github.com/electron/electronjs.org), который сделан с помощью [Jekyll](http://jekyllrb.com).

Если вы хотите узнать больше о том, как мы тянем документы из одного репозитория к другому продолжить чтение ниже. В противном случае, наслаждайтесь [документацией](https://electronjs.org/latest)!

## Технические биты

Мы сохраняем документацию в репозитории ядра Electron, как есть. Это означает, что [электрон/электрон](http://github.com/electron/electron) всегда будет иметь последнюю версию документа. После выхода новых версий Electron мы дублируем их в репозитории веб-сайта Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Для получения документации мы запустили [скрипт](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) с интерфейсом командной строки `script/docs vX.XX.` с параметром `--latest` или без него (в зависимости от того, является ли импортируемая вами версия последней версии). Наш скрипт [для получения документов](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) использует несколько интересных модулей узлов:

- [`nugget`](http://npmjs.com/nugget) за [получение архива релиза](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) и сохранение его во временную директорию.
- [`gunzip-возможно,`](http://npmsjs.com/gunzip-maybe) для [распаковать архив](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) for [streaming just the `/docs` directory](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) from the tarball and [filtering and processing the files](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (with the help of [`through2`](http://npmjs.com/through2)) so that they work nicely with our Jekyll site (more on that below).

[Тесты](https://github.com/electron/electronjs.org/tree/gh-pages/spec) помогают нам знать, что все биты и части попали, как ожидалось.

### Чекилль

Веб-сайт Electron является сайтом Jekyll и мы используем функцию [Collections](http://jekyllrb.com/docs/collections/) для документации со структурой так:

```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── so on
    └── so forth
```

#### Передняя субстанция

Для того чтобы Jekyll мог рендерить каждую страницу, ей понадобится по крайней мере пустое переднее дело. Мы собираемся использовать первый вопрос на всех наших страницах, так что пока мы потомим каталог `/docs` , мы проверяем, является ли файл `README. d` файл (в этом случае он получает одну переднюю конфигурацию вопроса) или любой другой файл с расширением markdown (в этом случае он получает немного другую переднюю информацию).

Каждая страница получает этот набор переменных передних вопросов:

```yaml
---
Версия: категория v0.27.0
: Учебник
заголовок: 'Быстрый старт'
source_url: 'https://github.com/electron/blob/master/docs/tutorial/quick-start.md'
---
```

ПРОГРАММА `. d` получает дополнительную `постоянную ссылку` , чтобы иметь общий корень `индекса. tml` вместо неудобного `/readme/`.

```yaml
permalink: /ru_RU/docs/v0.27.0/index.html
```

#### Конфигурация и перенаправления

В `сайте _config. ml` файл переменной `latest_version` устанавливается каждый раз при получении документов используется флаг `--latest`. Мы также добавляем список всех версий, которые были добавлены на сайт, а также постоянную ссылку для всей коллекции документации.

```yaml
latest_version: v0.27.0
Доступные_версии:
    - v0.27.0
коллекции:
    документы: {output: true, permalink: '/docs/:path/'}
```

Последний файл `. d` в корне нашего сайта пусто, за исключением этой первой материи, которая позволяет пользователям видеть индекс (aka `README`) последней версии документации, посетив эту ссылку, [электрон. tom.io/docs/latest](https://electronjs.org/docs/latest), а не использовать номер последней версии (хотя вы также можете это сделать).

```yaml
---
permalink: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Макеты

В шаблоне `docs.html` мы используем условные выражения для показа или скрытия информации в заголовке и цепочке.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Чтобы создать страницу, показывающую доступные версии, мы просто зацикливаемся через список в нашей конфигурации на файле, `версии. d`, в корне сайта. Также мы даем эту страницу постоянным: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Надеемся, что вам понравились эти технические биты! Если вы заинтересованы в дополнительной информации об использовании Jekyll для сайтов документации, посмотрите, как команда документации GitHub публикует документацию о [GitHub на Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).
