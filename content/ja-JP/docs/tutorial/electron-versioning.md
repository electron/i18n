# Electronのバージョン管理

> バージョン管理ポリシーと実装の詳細をご覧ください。

バージョン2.0.0以降、Electron は [semver](#semver) に従います。 以下のコマンドは、最新の安定した Electron のビルドをインストールします。

```sh
npm install --save-dev electron
```

既存のプロジェクトを最新の安定版を使用するように更新するには、以下のようにします。

```sh
npm install --save-dev electron@latest
```

## Version 1.x

Electron バージョン *< 2.0* は、[semver](http://semver.org) 仕様に準拠していません。メジャーバージョンはエンドユーザ API の変更に対応し、マイナーバージョンは Chromium メジャーリリースに対応し、パッチバージョンは新機能およびバグ修正に対応していました。 機能を統合する開発者にとっては便利ですが、クライアント向けアプリケーションの開発者には問題が生じます。 Slack、Stride、Teams、Skype、VS Code、Atom、Desktop などのメジャーなアプリの QA テストサイクルは時間がかかることがあり、安定性においては非常に望ましい結果を出します。 これは、バグ修正を吸収しようとする一方で、新しい機能を採用することに高いリスクがあります。

1.x の方針の例を以下に示します。

![](../images/versioning-sketch-0.png)

`1.8.1` を使用して開発されたアプリケーションは、`1.8.2` の機能を取り入れるか、修正をバックポートし、新しいリリースラインをメンテナンスすることなしに、`1.8.3` のバグ修正をとることもできません。

## Version 2.0 以降

上に概説されている 1.x の方針から、いくつかの大きな変更があります。 各変更は、開発者/管理者とアプリ開発者のニーズと優先順位を満たすためのものです。

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

ほとんどの Chromium の更新は互換性を破るとみなされることに注意してください。 バックポート可能な修正は、パッチとして cherry-pick される可能性が高いです。

# 安定ブランチ

安定ブランチは、セキュリティまたは安定性に関連する cherry-pick されたコミットのみを取り入れて、master と並行して実行されるブランチです。 これらのブランチはマスターに戻されることはありません。

![](../images/versioning-sketch-1.png)

安定ブランチは、常に **major** または **minor** のバージョンラインのいずれかであり、次のテンプレート `$MAJOR-$MINOR-x` に対して `2-0-x` のように命名されます。

複数の安定化ブランチを同時に存在させることができます。また、必要に応じてセキュリティ修正を後方移植しながら、少なくとも2つのサポートを常に並行してサポートする予定です。 ![](../images/versioning-sketch-2.png)

それより古いものは GitHub ではサポートされませんが、他のグループは所有権を持って、自分自身で安定性とセキュリティの修正をバックポートできます。 これはお勧めできませんが、多くのアプリ開発者にとってライフが楽になると認識しています。

# ベータリリースとバグ修正

開発者はどのリリースが *安全* に使用できるかを知りたいものです。 一見無害な機能でさえ、複雑なアプリケーションに後退をもたらすことがあります。 同時に、あなたのバージョンから出るセキュリティパッチとバグ修正の可能性を無視しているので、固定バージョンへのロックは危険です。 私たちの目標は、`package.json` で以下のように標準的な semver 範囲を許可することです。

- `~2.0.0` を使用すると、`2.0.0` リリースに対する安定性またはセキュリティ関連の修正のみを認めます。
- `^2.0.0` を使用すると、セキュリティとバグ修正だけでなく、破壊的でない *かなり安定した* 機能も認めます。

2つ目の点に関して重要なことは、`^` を使用しているアプリはまだ妥当なレベルの安定性を期待できることです。 これを達成するために、semver の *プレリリース識別子* を特定のバージョンがまだ *安全* でも *安定* でもないことを示すことを可能にします。

どれを選択しても、破壊的な変更は Chromium が寿命である事実であるため、定期的に `package.json` 内のバージョンを更新する必要があります。

プロセスは以下の通りです。

1. すべての新しいメジャーリリースとマイナーリリースのものは、次のように、semver プレリリースタグで示されるベータ系列で始まります。 `beta.N`, 例 `2.0.0-beta.1`。最初のベータ版の後、その後のベータ版リリースは以下のすべての条件を満たす必要があります。 
    1. 変更は API に後方互換性がある (非推奨は構いません)
    2. 安定版のスケジュールを守るリスクが低くなければならない。
2. リリースがベータ版になった後に許可された変更を加える必要がある場合は、それらが適用され、例として `2.0.0-beta.2` のようにプレリリースタグが増分されます。
3. 特定のベータリリースが *一般的に安定している* と見なされている場合、バージョン情報のみを変更して、安定したビルドとして再リリースされます。 例として、`2.0.0` のようになります。 最初の安定版以降は、すべての変更は後方互換性のあるバグまたはセキュリティ修正でなければなりません。
4. リリースが安定した後に将来のバグ修正やセキュリティパッチを作成する必要がある場合は、それらを適用して、例として `2.0.1` のように、*patch* のバージョンを増やします。

具体的に言うと、以下が上記の意味です。

1. たとえそれらの変更が中程度の副作用を引き起こす可能性があるとしても、ベータサイクルの早い段階で非破壊的な API の変更を承認することは問題ありません。
2. ベータサイクルのほとんどの時点で、既存のコードパスを変更しない、機能フラグの変更を認めることは問題ありません。 ユーザーは自分のアプリでこれらのフラグを明示的に有効にできます。
3. Admitting features of any sort very late in the beta cycle is 

メジャーとマイナーのバージョン上げのそれぞれにおいて、以下のようなものが見えるはずです。

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

以下は絵に描いたライフサイクルの例です。

- 最新の一連の機能を含む新しいリリースブランチが作成されます。`2.0-beta 1` として公開されます。 ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

- alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
- feature flags are eventually removed after the feature is released

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

- Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
- Commits that would result in a semver **minor** bump must start with `feat:`.
- Commits that would result in a semver **patch** bump must start with `fix:`.

- We allow squashing of commits, provided that the squashed message adheres the the above message format.

- It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versioned `master`

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- Release branches are never merged back to master
- Release branches *do* contain the correct version in their `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major. I.e. `master` is always versioned as the next theoretical release branch