# Electron 版本管理

> 详细查看我们的版本控制策略和实现。

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

现有项目更新到最新的稳定版本:

```sh
npm install --save-dev electron@latest
```

## 版本1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. 虽然方便开发人员合并功能，但却为面向客户端应用程序的开发人员带来了麻烦。 像Slack，Stride，Teams，Skype，VS Code，Atom和Desktop等主要应用程序的QA测试周期可能很长，稳定性是一个非常理想的结果。 尝试吸收错误修复时，采用新功能的风险很高。

以下是 1.x 策略的一个例子：

![](../images/versioning-sketch-0.png)

使用 `1.8.1`开发的应用程序无法吸收 `1.8.2 ` 的功能，或者通过反向移植修复和维护新的发行版，无法采用 `1.8.3`错误修复。

## 版本 2.0 和之后版本

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. 严格使用 semver
2. 引入符合 semver 的 `-beta` 标签
3. 引入[常规提交消息](https://conventionalcommits.org/)
4. 明确定义的稳定分支
5. `master`分支没有版本信息，只有稳定分支会包含版本信息。

我们将详细介绍 git 分支是如何工作的，npm 标记是如何工作的，开发人员应该看到什么，以及如何能够支持更改。

# semver

从 2.0 开始，Electron 将遵循 semver。

下面是一个表格，明确地将变化的类型映射到它们对应的 semver 类别 (例如Major，Minor，Patch)。

| Major 版本增量          | Minor 版本增量           | Patch 版本增量         |
| ------------------- | -------------------- | ------------------ |
| Electron 突破性 API 变更 | Electron 无突破性 API 变更 | Electron bug 修复    |
| Node.js 重大版本更新      | Node.js 次要版本更新       | Node.js patch 版本更新 |
| Chromium 版本更新       |                      | 修复相关的 chromium 补丁  |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# 稳定分支

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Since Electron 8, stabilization branches are always **major** version lines, and named against the following template `$MAJOR-x-y` e.g. `8-x-y`.  Prior to that we used **minor** version lines and named them as `$MAJOR-$MINOR-x` e.g. `2-0-x`

我们允许同时存在多个稳定分支，并且打算在任何时候至少支持两个并行支持安全修复。 ![](../images/versioning-sketch-2.png)

GitHub不支持旧线路，但是其他分组可以自行获取所有权和返回稳定性和安全修复。 我们不鼓励这样做，但是认识到它使得许多应用程序开发人员的生活更轻松。

# 测试版和Bug修复

开发人员想知道哪个版本可以 _安全_ 使用。 即使是简单的功能也会使应用程序变得复杂。 同时，锁定到一个固定的版本是很危险的，因为你忽略了自你的版本以来可能出现的安全补丁和错误修复。 我们的目标是在 `package.json ` 中允许以下标准的 semver 范围:

* 使用 ` ~ 2.0. 0 ` 只接受您的 ` 2.0.0 ` 版本的稳定性或安全性相关的修复程序。
* 使用 ` ^ 2.0. 0 ` 可允许不破坏性的 _ 合理稳定 _ 功能以及安全性和 bug 修复。

第二点重要的是使用 `^` 的应用程序仍然能够期望合理的稳定性水平。 To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

无论你选择什么，你将定期不得不在 `package.json` 中打破版本，因为突破性变更是 Chromium 的一个常态。

过程如下:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. 更改是落后的 API 兼容 (允许废弃)
    2. 实现我们稳定的时间表的危险必须是低的。
2. 如果允许更改需要在释放测试版之后进行，则使用并增加预放标签，例如`2.0.0-beta.2`。
3. 如果特定的beta版本_通常被认为_是稳定的，那么它将作为稳定版本被重新发布，只改变版本信息。例如.0。 例如 `2.0.0-beta.1`. 在第一个稳定之后，所有的变化都必须落后兼容的 bug 或安全修复。
4. 如果未来错误修复或安全补丁一旦发布稳定，它们将被应用，并且 _补丁_ 版本被增量 ，例如 `2.0.1`。

特别地，上述步骤意味着：

1. 在测试周期的第3周前允许不打破的 API 更改非常好，即使这些变化有可能造成适度的副影响
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

对于每个主要和次要的颠覆，你都应该像以下示例一样进行操作：

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

图片中的生命周期示例:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* 测试版被认为是 _ 一般稳定 _ 的, 它在 ` 2.0.0 ` 下作为非 beta 版本再次被发布。 ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

几个不同的 semver 范围将如何接收新版本的示例:

![](../images/versioning-sketch-7.png)

# 缺失的特性: alpha版本
我们的战略有几次权衡，我们现在认为这是适当的。 最重要的是, 新的主分支特性可能需要一段时间才能作为稳定版发布。 如果你想立即尝试一个新的特性, 你必须自己编译Electron 。

作为未来的考虑, 我们可以介绍以下一种或两种情况:

* 具有松散稳定性限制的 alpha 释放版; 例如, 当稳定通道在 _ alpha _ 中时, 允许接纳新特性

# 功能标志
功能标志是 Chromium 的一种常见的做法, 在网络开发生态系统中得到了很好的确立。 在 Electron 环境中, 功能标志或 ** 软分支 ** 必须具有以下属性:

* 是在运行时或生成时启用/禁用的。我们不支持请求作用域功能标志的概念
* 它完全细分新的和旧的代码路径; 重构旧代码以允许新功能 _ 违反 _ 功能标志内容
* 在合并功能后, 功能标志最终将被删除

# 提交语义

我们力求在更新和发布过程的各个层面提高清晰度。 从 ` 2.0.0 ` 开始, 我们将要求遵循 [ 常规提交 ](https://conventionalcommits.org/) 规范的拉请求, 可以概括如下:

* 会导致 semver **major** 版本改变的提交必须以`BREAKING CHANGE:`开头。
* 提交会导致 semver **minor** 必须以 `feat:` 开头。
* 提交会导致 semver ** patch ** 必须以 ` fix:` 开头。

* 我们允许合并提交，只要合并提交的消息符合上述消息格式。
* 只要pull request里包含有意义的总结性的版本语义消息，即使它其中的某些提交消息不包含版本语义前缀也是可以接受的

# 打了版本的 `主分支`

- The `master` 分支将始终在其 `package.json` 中包含 `0.0.0-dev`.
- Release 分支永远不会合并回 master 分支
- 发布分支 _在_ 其`package.json ` 中包含正确的版本
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
