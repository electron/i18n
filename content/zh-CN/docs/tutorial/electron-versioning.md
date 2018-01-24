# Electron 版本管理

> 详细查看我们的版本控制策略和实现。

从版本 2.0.0, Electron 遵循 [ semver ](#semver)。以下命令将安装 Electron 最新稳定的版本:

```sh
npm install --save-dev electron
```

现有项目更新到最新的稳定版本:

```sh
npm install --save-dev electron@latest
```

## 版本1.x

Electron版本 * < 2.0 * 不符合 [ semver ](http://semver.org) 规范。 主版本号对应于 end-user API 的变化。 次版本号对应于Chromium的主版本的发布 修订号对应于新功能和bug修复。 虽然方便开发人员合并功能，但却为面向客户端应用程序的开发人员带来了麻烦。 像Slack，Stride，Teams，Skype，VS Code，Atom和Desktop等主要应用程序的QA测试周期可能很长，稳定性是一个非常理想的结果。 尝试吸收错误修复时，采用新功能的风险很高。

以下是 1.x 策略的一个例子：

![](../images/versioning-sketch-0.png)

使用 `1.8.1`开发的应用程序无法吸收 `1.8.2 ` 的功能，或者通过反向移植修复和维护新的发行版，无法采用 `1.8.3`错误修复。

## 版本 2.0 和之后版本

下面列出的 1.x 策略有几个主要的变化。 每个更改都是为了满足开发人员/维护人员和应用程序开发人员的需求和优先级。

1. 严格使用 semver
2. 引入符合 semver 的 `-beta` 标签
3. 引入[常规提交消息](https://conventionalcommits.org/)
4. 明确定义的稳定分支
5. `master` 分支是无版本的; 只有稳定性分支包含版本信息

我们将详细介绍 git 分支是如何工作的，npm 标记是如何工作的，开发人员应该看到什么，以及如何能够支持更改。

# semver

从 2.0 开始，Electron 将遵循 semver。

下面是一个表格，明确地将变化的类型映射到它们对应的 semver 类别 (例如Major，Minor，Patch)。

* **Major 版本增量** 
    * Chromium 版本更新
    * node.js major 版本更新
    * Electron 突破性 API 变更
* **Minor 版本增量** 
    * node.js minor 版本更新
    * Electron 无突破性 API 变更
* **Patch 版本增量** 
    * node.js patch 版本更新
    * 修复相关的 chromium 补丁
    * electron bug 修复

请注意，大多数 chromium 更新将被视为突破性更新。 可以被回溯的修复可能会被修补为修补程序。

# 稳定分支

稳定分支是与主控并行运行的分支，仅接受与安全性或稳定性有关的最优提交。 这些分支从不合并回主分支。

![](../images/versioning-sketch-1.png)

稳定分支始终是 **major** 或 **minor** 版本, 并按照以下模板命名`$MAJOR-$MINOR-x`.例如 `2-0-x`.

我们允许同时存在多个稳定分支，并且打算在任何时候至少支持两个并行支持安全修复。 ![](../images/versioning-sketch-2.png)

GitHub不支持旧线路，但是其他分组可以自行获取所有权和返回稳定性和安全修复。 我们不鼓励这样做，但是认识到它使得许多应用程序开发人员的生活更轻松。

# 测试版和Bug修复

开发人员想知道哪个版本可以 *安全* 使用。 即使是简单的功能也会使应用程序变得复杂。 同时，锁定到一个固定的版本是很危险的，因为你忽略了自你的版本以来可能出现的安全补丁和错误修复。 我们的目标是在 `package.json ` 中允许以下标准的 semver 范围:

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a `-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. That release line admits no further features, and focuses only on security and stability. e.g. `2.0.0-beta.1`.
2. Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.

For each major and minor bump, you should expect too see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be pack-ported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# 缺少的功能: Alphas, 和 Nightly

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

* nightly builds off of master; these would allow folks to test new features quickly and give feedback
* alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# 功能标志

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

* is is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
* feature flags are eventually removed after the soft-branch is merged

We reconcile flagged code with our versioning strategy as follows:

1. we do not consider iterating on feature-flagged code in a stability branch; even judicious use of feature flags is not without risk
2. you may break API contracts in feature-flagged code without bumping the major version. Flagged code does not adhere to semver

# 语义提交

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* We allow squashing of commits, provided that the squashed message adheres the the above message format.

* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as a later commit in the same pull request contains a meaningful encompassing semantic message.

# 无版本的 `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Release branches are never merged back to master
* Release branches *do* contain the correct version in their `package.json`