# Electron 版號規則

> 我們的版號訂定策略和實作細節。

Electron 從 2.0.0 版開始遵照 [semver](#semver)。以下指令將安裝 Electron 最新的穩定版:

```sh
npm install --save-dev electron
```

將現有專案更新成最新的穩定版:

```sh
npm install --save-dev electron@latest
```

## 1.x 版

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. 這樣雖然對開發人員合併新功能很方便，但對寫應用程式供一般用戶使用的開發人員卻會造成不少困擾。 Slack, Stride, Teams, Skype, VS Code, Atom 及 Desktop 這些主流應用程式的 QA 測試可能曠日廢時，才能維持住高穩定性。 要同時套用新功能並取得錯誤修正的風險很高。

這是個 1.x 版定版策略的例子:

![](../images/versioning-sketch-0.png)

以 `1.8.1` 開發的應用程式無法直接套 `1.8.3` 版的錯誤修正，而略過 `1.8.2` 新增的功能，除非自己維護一組分隻，當中只套用特定的修正。

## 2.0 版之後

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. 嚴格使用 semver
2. 使用 semver 相容的 `-beta` 標籤
3. Introduction of [conventional commit messages](https://conventionalcommits.org/)
4. Well-defined stabilization branches
5. The `master` branch is versionless; only stabilization branches contain version information

We will cover in detail how git branching works, how npm tagging works, what developers should expect to see, and how one can backport changes.

# semver

Electron 從 2.0 版開始遵照 semver。

Below is a table explicitly mapping types of changes to their corresponding category of semver (e.g. Major, Minor, Patch).

| Major Version Increments      | Minor Version Increments          | Patch Version Increments      |
| ----------------------------- | --------------------------------- | ----------------------------- |
| Electron breaking API changes | Electron non-breaking API changes | Electron bug fixes            |
| Node.js major version updates | Node.js minor version updates     | Node.js patch version updates |
| Chromium version updates      |                                   | fix-related chromium patches  |

Note that most chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# 穩定分支

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Beta 版及 Bug 修正

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

# 缺少功能: Alpha 版及持續建構版

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

- nightly builds off of master; these would allow folks to test new features quickly and give feedback
- alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# 功能標記

功能標記是 Chromium 中常見的作法，也已經在網頁開發生態圈中根深蒂固。 In the context of Electron, a feature flag or **soft branch** must have the following properties:

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

# 無關版號的 `master`

- The `master` branch will always contain `0.0.0-dev` in its `package.json`
- Release branches are never merged back to master
- Release branches *do* contain the correct version in their `package.json`