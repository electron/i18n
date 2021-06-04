---
title: Electron ドキュメント
author: jlord
date: '2015-06-04'
---

今週、[electronjs.org](https://electronjs.org) にて Electron のドキュメントを掲載しました。 [/docs/latest](https://electronjs.org/docs/latest) に最新のドキュメントがあります。 古いバージョンのドキュメントも保持します。[/docs/vX.XX.XX.X](https://electronjs.org/docs/v0.26.0) にアクセスすれば、使用バージョンに関するドキュメントも確認できます。

---

[/docs](https://electronjs.org/docs) で利用可能なバージョンを確認するか、 [/docs/all](https://electronjs.org/docs/all) で最新バージョンのドキュメントを 1 ページに表示できます ( `cmd` + `f` 検索しやすい) 。

ドキュメントの内容に貢献したい方は、ドキュメントの取得元である [Electron リポジトリ](https://github.com/electron/electron/tree/main/docs) でどうぞ。 マイナーリリースのたびに取得して [Jekyll](http://jekyllrb.com) で作られた [Electron サイトリポジトリ](http://github.com/electron/electronjs.org) へ追加します。

どのようにリポジトリから他のリポジトリへドキュメントを移動しているかについて興味があれば、続きを読んでください。 そうでない場合は、 [ドキュメント](https://electronjs.org/latest) をお楽しみください!

## 技術的な小話

私たちは Electron コアリポジトリ内のドキュメントをそのまま保存しています。 これは [electron/electron](http://github.com/electron/electron) が常に最新版のドキュメントを持つことを意味します。 新しいバージョンの Electron がリリースされるとき、 Electron Web サイトリポジトリ [electron/electronjs.org](http://github.com/electron/electronjs.org) へ複製します。

### script/docs

ドキュメントを取得するために、 [スクリプト](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) を、 `script/docs vX.XX.X` のコマンドラインインターフェースで、 `--latest` オプション付き及び無しで (取得しようとしているバージョンが最新かどうかによる) 実行します。 私たちの [ドキュメントを取得するスクリプト](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) はいくつかのおもしろい Node モジュールを使用します:

- [リリースの tarball を取得](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) して一時ディレクトリへ保存するための [`nugget`](http://npmjs.com/nugget) 。
- [tarball を展開](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95) するための [`gunzip-maybe`](http://npmsjs.com/gunzip-maybe) 。
- 私たちの Jekyll サイトで動作するよう、 tarball から [`/docs` ディレクトリを ストリーミング](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) して ( [`through2`](http://npmjs.com/through2) の助けを借りずに) [ファイルを絞り込み・処理](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) するための [`tar-fs`](http://npmjs.com/tar-fs) (詳細は下にあります) 。

すべて正常に行われたかどうかを [テスト](https://github.com/electron/electronjs.org/tree/gh-pages/spec) が私たちに教えてくれます。

### Jekyll

Electron の Web サイトは Jekyll サイトであり、以下のような構成のドキュメントに [Collections](http://jekyllrb.com/docs/collections/) 機能を使っています:

```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── 続く
    └── さらに続く
```

#### フロントマター

Jekyll が各ページをレンダリングするには、少なくとも空のフロントマターが必要です。 すべてのページでフロントマターを利用するため、 `/docs` ディレクトリからストリーミングしている間、ファイルが `README.md` ファイルである (この場合は特定のフロントマター構成を取得します) か、 Markdown の拡張子を持つ他のファイルである (この場合は少し異なるフロントマターを取得します) かを確認します。

各ページは、次のようなフロントマター変数を取得します:

```yaml
---
version: v0.27.0
category: Tutorial
title: 'クイックスタート'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`README.md</0> では、 <code>/readme/` とせずに、 `index.html</0> の共通なルートを持つ URL を追加の <code>permalink` として設定します。

```yaml
permalink: /docs/v0.27.0/index.html
```

#### 構成とリダイレクト

サイトの `_config.yml` 内の `latest_version` 変数は、ドキュメントの取得時に `--latest` フラグが使われるたびに設定されます。 また、サイトに追加されたすべてのバージョンのリストと、ドキュメントコレクション全体に必要なパーマリンクも追加します。

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collections:
    docs: {output: true, permalink: '/docs/:path/'}
```

サイトのルートにある `latest.md` はこのフロントマターを除いて空です。これによって、ユーザはバージョンを指定することなく、ドキュメントの最新バージョンのインデックス (`README` とも言う) を この URL: [electron.atom.io/docs/latest](https://electronjs.org/docs/latest) から参照することができます (バージョンを指定することもできます) 。

```yaml
---
permalink: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### レイアウト

`docs.html` のレイアウトテンプレートでは、条件によって情報をヘッダやパンくずリストに表示または非表示しています。

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

利用可能なバージョンを示すページを作成するために、サイトのルートにある `versions.md` に記されたリストをループします。 また、このページに `/docs/` のパーマリンクを与えます。

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

これらの技術的な小話を楽しんでいただけたことを願います! ドキュメントサイトで Jekyll を使用することについての詳しい情報に興味がありましたら、 GitHub ドキュメントチームがどのように公開しているか [GitHub's docs on Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github) をご覧ください。
