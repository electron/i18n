# Electronのバージョン管理

> バージョン管理ポリシーと実装の詳細をご覧ください。

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

既存のプロジェクトを最新の安定版を使用するように更新するには、以下のようにします。

```sh
npm install --save-dev electron@latest
```

## Version 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. 機能を統合する開発者にとっては便利ですが、クライアント向けアプリケーションの開発者には問題が生じます。 Slack、Stride、Teams、Skype、VS Code、Atom、Desktop などのメジャーなアプリの QA テストサイクルは時間がかかることがあり、安定性においては非常に望ましい結果を出します。 これは、バグ修正を吸収しようとする一方で、新しい機能を採用することに高いリスクがあります。

1.x の方針の例を以下に示します。

![](../images/versioning-sketch-0.png)

`1.8.1` を使用して開発されたアプリケーションは、`1.8.2` の機能を取り入れるか、修正をバックポートし、新しいリリースラインをメンテナンスすることなしに、`1.8.3` のバグ修正をとることもできません。

## Version 2.0 以降

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. semver の厳格な使用
2. semver 準拠の `-beta` タグの導入
3. [conventional commit messages](https://conventionalcommits.org/) の導入
4. しっかり定義された安定ブランチ
5. `master` ブランチにはバージョンがなく、安定ブランチのみがバージョン情報を含みます。

git のブランチ動作の仕組み、npm のタグ付けの仕組み、開発者が期待するべきこと、変更をバックポートする方法について詳しく説明します。

# semver

2.0 以降から、Electron は semver に従います。

以下は、変更のタイプを対応する semver のカテゴリ (メジャー、マイナー、パッチなど) に明示的に割り当てる表です。

| メジャーバージョンの単位            | マイナーバージョンの単位              | パッチバージョンの単位         |
| ----------------------- | ------------------------- | ------------------- |
| 互換性を破る Electron API の変更 | 互換性を破らない Electron API の変更 | Electron のバグ修正      |
| Node.js のメジャーバージョン更新    | Node.js のマイナーバージョン更新      | Node.js のパッチバージョン更新 |
| Chromium のバージョン更新       |                           | Chromium パッチの修正関連   |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# 安定ブランチ

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

複数の安定化ブランチを同時に存在させることができます。また、必要に応じてセキュリティ修正を後方移植しながら、少なくとも2つのサポートを常に並行してサポートする予定です。 ![](../images/versioning-sketch-2.png)

それより古いものは GitHub ではサポートされませんが、他のグループは所有権を持って、自分自身で安定性とセキュリティの修正をバックポートできます。 これはお勧めできませんが、多くのアプリ開発者にとってライフが楽になると認識しています。

# ベータリリースとバグ修正

Developers want to know which releases are _safe_ to use. 一見無害な機能でさえ、複雑なアプリケーションに後退をもたらすことがあります。 同時に、あなたのバージョンから出るセキュリティパッチとバグ修正の可能性を無視しているので、固定バージョンへのロックは危険です。 私たちの目標は、`package.json` で以下のように標準的な semver 範囲を許可することです。

* `~2.0.0` を使用すると、`2.0.0` リリースに対する安定性またはセキュリティ関連の修正のみを認めます。
* Use `^2.0.0` to admit non-breaking _reasonably stable_ feature work as well as security and bug fixes.

2つ目の点に関して重要なことは、`^` を使用しているアプリはまだ妥当なレベルの安定性を期待できることです。 To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

どれを選択しても、破壊的な変更は Chromium が寿命である事実であるため、定期的に `package.json` 内のバージョンを更新する必要があります。

プロセスは以下の通りです。

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. 変更は API に後方互換性がある (非推奨は構いません)
    2. 安定版のスケジュールを守るリスクが低くなければならない。
2. リリースがベータ版になった後に許可された変更を加える必要がある場合は、それらが適用され、例として `2.0.0-beta.2` のようにプレリリースタグが増分されます。
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. 例として、`2.0.0` のようになります。 最初の安定版以降は、すべての変更は後方互換性のあるバグまたはセキュリティ修正でなければなりません。
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.

具体的に言うと、以下が上記の意味です。

1. たとえそれらの変更が中程度の副作用を引き起こす可能性があるとしても、ベータサイクルの 3 週間前の段階で非破壊的な API の変更を承認することは問題ありません。
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

メジャーとマイナーのバージョン上げのそれぞれにおいて、以下のようなものが見えるはずです。

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

以下は絵に描いたライフサイクルの例です。

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered _generally stable_ and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

以下は、さまざまな semver 範囲の新しいリリースの拾い方のいくつかの例です。

![](../images/versioning-sketch-7.png)

# 失なわれた機能: アルファ
私たちの戦略にはいくつかのトレードオフがありますが、今のところそれは適切だと感じています。 最も重要なことは、master の新機能が安定したリリースラインに到達するまでにはしばらく時間がかかることです。 すぐに新しい機能を試したい場合は、自分で Electron をビルドする必要があります。

今後の検討事項として、以下のうちの一方または両方を紹介する可能性があります。

* alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in _alpha_

# 機能フラグ
機能フラグは Chromium で一般的な方法であり、Web 開発エコシステムではよく確立されています。 In the context of Electron, a feature flag or **soft branch** must have the following properties:

* 実行時またはビルド時に有効/無効になるもの。リクエストスコープ付き機能フラグの概念はサポートしていない
* it completely segments new and old code paths; refactoring old code to support a new feature _violates_ the feature-flag contract
* 機能のリリース後、機能フラグは最終的に削除される

# セマンティックなコミット

私達は更新およびリリースプロセスのすべてのレベルで明快さを増すよう努めます。 `2.0.0` 以降、プルリクエストは [従来のコミット](https://conventionalcommits.org/) の仕様に準拠する必要があります。これは以下のようにまとめることができます。

* Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* squash されたメッセージも上記のメッセージフォーマットを遵守するという条件で、我々はコミットの squash を許します。
* プルリクエストのタイトルが意味のある包括的なセマンティックメッセージを含むのであれば、プルリクエストにおけるいくつかのコミットがセマンティックプレフィックスを含まないことは許容できます。

# バージョン付けされた `master`

- `master` ブランチは、常に `package.json` に次のメジャーバージョンの `X.0.0-nightly.DATE` を含みます。
- リリースブランチが master にマージし戻されることはありません。
- Release branches _do_ contain the correct version in their `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
