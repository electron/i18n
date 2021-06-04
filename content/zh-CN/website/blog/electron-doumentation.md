---
title: Electron 文档
author: 吉尔福德
date: '2015-06-04'
---

本周我们在 [electronjs.org](https://electronjs.org) 上给了Electron的文档。 您可以访问 [/docs/最新的](https://electronjs.org/docs/latest) 文档。 我们也会保存旧文档的版本，因此您可以访问 [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) 获取与您使用的版本相关的文档。

---

您可以访问 [/docs](https://electronjs.org/docs) 查看哪些版本可用，或 [/docs/all](https://electronjs.org/docs/all) 在一个页面查看最新版本的文档( `cmd` + `f` 搜索)。

如果您想要为文档内容做出贡献， 您可以在 [Electron 仓库](https://github.com/electron/electron/tree/main/docs)中获取文档。 我们为每次次发布获取它们，并将它们添加到 [Electron 站点资源库](http://github.com/electron/electronjs.org)， 由 [Jekyll](http://jekyllrb.com) 编写。

如果你有兴趣了解更多关于我们如何从一个仓库将文档拉到另一个仓库的信息，继续阅读下文。 否则，享受 [文档](https://electronjs.org/latest)！

## 技术位

我们将在 Electron 核心仓库中保存文档。 这意味着 [electron/electron](http://github.com/electron/electron) 将永远拥有最新版本的文档。 当发布新版本的 Electron 时，我们会在 Electron 网站存储库上复制这些版本， [electron/electronjs.org](http://github.com/electron/electronjs.org)。

### script/docs

To fetch the docs we run a [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) with a command line interface of `script/docs vX.XX.X` with or without the `--latest` option (depending on if the version you're importing is the latest version). 获取文档</a> 的

脚本使用一些有趣的节点模块：</p> 

- [`nugget`](http://npmjs.com/nugget) 用于 [获得释放的tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) 并将其保存到临时目录。
- [`gunzip-moube`](http://npmsjs.com/gunzip-maybe) to [unzip tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) 用于 [串流仅支持 `/docs` 目录](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) 来自tarball和 [过滤和处理文件](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (由 [`through 2`](http://npmjs.com/through2)提供帮助)，使它们能够与我们的 Jekyll 网站 (在下面有更多信息)。

[测试](https://github.com/electron/electronjs.org/tree/gh-pages/spec) 帮助我们知道所有的比特和碎片都是按预期着陆的。



### Jekyll

Electron网站是一个Jekyll网站，我们正在为像这样的结构的文档使用 [收藏](http://jekyllrb.com/docs/collections/) 功能：



```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── so on
    └── so forth
```




#### 前页附属资料

若要让Jekyll呈现每个页面它至少需要空的前体。 我们将使用我们所有页面上的前事项，因此我们正在流出 `/docs` 目录，我们要检查的文件是否是 `README 。 d` 文件(在这种情况下，它收到一个前事项配置)，或者如果它是具有Markdown 扩展的任何其他文件(在这种情况下，它收到略有不同的前事项)。

每个页面都会收到这组前缀变量：



```yaml
----
版本: v0.27.0
类别: 教程
title: 'Quick Start'
source_url: 'https://github.com/electron/blob/master/docs/tutorial/Quoot.md'
 - -
```


`回馈。 d` 获取额外的 `永久链接` 以使URL 具有一个 `索引的共同根。 tml` 而不是尴尬 `/readme/`。



```yaml
permalink: /zh_CN/docs/v0.27.0/index.html
```




#### 配置和重定向

在网站的 `_config. ml` 文件一个变量 `最新版本` 每次在获取文档时设置 `--latest` 标记。 我们还添加了一个已添加到网站的所有版本以及我们想要加入整个文档集合的永久链接列表。



```yaml
最新版本: v0.27.0
可用版本:
    - v0.27.0
收藏:
    文档: {output: true: permalink: '/docs/:path/'}
```


文件 `最晚。 d除了这个前端事项外，我们网站根目录中的` 是空的，这个前端事项允许用户查看最新版本文档的索引(aka `README`)。 [电子化。 tom.io/docs/最新版本](https://electronjs.org/docs/latest), 而不是具体使用最新版本号 (尽管你也可以这样做)。



```yaml
---
永久链接: /docs/latest/
重定向: /docs/{{ site.data.releases[0].version }}
-
```




#### 布局

在 `docs.html` 布局模板中，我们使用条件在标题和面包屑中显示或隐藏信息。



```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```


为了创建一个页面来显示可用的版本，我们只需在我们配置文件的列表中循环 `版本。 d`, 在网站的根目录中。 我们也给这个页面一个永久链接： `/docs/`



```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```


希望你喜欢这些技术比特！ 如果您有兴趣了解更多关于使用 Jekyll 文档网站的信息，请检查GitHub的文档团队如何在 Jekyll 上发布 [GitHub的文档](https://github.com/blog/1939-how-github-uses-github-to-document-github)。
