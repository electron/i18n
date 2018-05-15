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
4. Well-defined stabilization branches
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

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# ベータリリースとバグ修正

Developers want to know which releases are *safe* to use. Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

- Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
- Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a `-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. That release line admits no further features, and focuses only on security and stability. e.g. `2.0.0-beta.1`.
2. Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

- A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas, and Nightly

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

- nightly builds off of master; these would allow folks to test new features quickly and give feedback
- alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
- feature flags are eventually removed after the soft-branch is merged

We reconcile flagged code with our versioning strategy as follows:

1. we do not consider iterating on feature-flagged code in a stability branch; even judicious use of feature flags is not without risk
2. you may break API contracts in feature-flagged code without bumping the major version. Flagged code does not adhere to semver

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

- Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
- Commits that would result in a semver **minor** bump must start with `feat:`.
- Commits that would result in a semver **patch** bump must start with `fix:`.

- We allow squashing of commits, provided that the squashed message adheres the the above message format.

- It is acceptable for some commits in a pull request to not include a semantic prefix, as long as a later commit in the same pull request contains a meaningful encompassing semantic message.

# Versionless `master`

- The `master` branch will always contain `0.0.0-dev` in its `package.json`
- Release branches are never merged back to master
- Release branches *do* contain the correct version in their `package.json`