# 合并请求

* [依赖项](#dependencies)
* [设置您的本地环境](#setting-up-your-local-environment) 
  * [步骤1: 复制](#step-1-fork)
  * [步骤2: 构建](#step-2-build)
  * [步骤3: 分支](#step-3-branch)
* [进行更改](#making-changes) 
  * [步骤4: 编写代码](#step-4-code)
  * [步骤5: 提交更改](#step-5-commit) 
    * [提交代码说明的指导](#commit-message-guidelines)
  * [步骤6: 合并分支](#step-6-rebase)
  * [步骤7: 测试](#step-7-test)
  * [步骤8: 推送代码](#step-8-push)
  * [步骤9: 新建一个合并代码请求](#step-9-opening-the-pull-request)
  * [步骤10: 讨论和更新](#step-10-discuss-and-update) 
    * [批准和请求更改工作流程](#approval-and-request-changes-workflow)
  * [步骤11: 执行合并](#step-11-landing)
  * [持续集成测试](#continuous-integration-testing)

## 设置您的本地环境

### 步骤1: 复制

在 [GitHub](https://github.com/electron/electron) 上复制项目到你的账号并把项目克隆到本地。

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### 步骤2: 构建

根据您的操作系统, 项目构建步骤和依赖项稍有不同。 请参阅这些关于构建 Electron 项目的详细指南:

* [在 MacOS 上构建](https://electronjs.org/docs/development/build-instructions-osx)
* [在 Linux 上构建](https://electronjs.org/docs/development/build-instructions-linux)
* [在 Windows 上构建](https://electronjs.org/docs/development/build-instructions-windows)

一旦您在本地构建了项目, 就可以开始进行更改了!

### 步骤3: 分支

为了保持您的开发环境的组织, 创建本地分支来保存您的工作。 应该直接从 ` master ` 分支上创建您的分支。

```sh
$ git checkout -b my-branch -t upstream/master
```

## 进行更改

### 步骤4: 编写代码

大多数提交后被`electron/electron`仓库拒绝的合并代码请求都包括对 `atom/` 或 `brightray/` 文件夹中的 c/c++ 代码，`lib` 文件夹中的 JavaScript 代码， `docs/api/` 中的文档或在 `spec/` 文件夹中的测试代码的更改。

请确保都运行 ` npm run lint ` 在任何代码更改后, 以确保它们遵循项目的代码样式。

在项目的不同部分修改代码时, 有关最佳实践的更多信息, 请参见 [ 编码样式 ](https://electronjs.org/docs/development/coding-style)。

### 步骤5: 提交更改

建议将更改按逻辑分组在每个独立提交中。 其他贡献者可以从拆分多个提交中更容易的检查代码的改变。 合并请求没有限制提交的数量。

```sh
$ git add my/changed/files
$ git commit
```

请注意, 在最后执行合并代码时多个提交通常会被合并。

#### 提交代码说明的指导

A good commit message should describe what changed and why. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it should include at least one semantic commit message, though it's not necessary for all commits in the pull request to be semantic. Alternatively, you can **update your pull request title** to start with a semantic prefix.

Examples of commit messages with semantic prefixes:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux` 

Common prefixes:

    - fix: A bug fix
    - feat: A new feature
    - docs: Documentation changes
    - test: Adding missing tests or correcting existing tests
    - build: Changes that affect the build system
    - ci: Changes to our CI configuration files and scripts
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code (linting)
    

Other things to keep in mind when writing a commit message:

1. The first line should: 
  * 包含一个对代码改变的简短说明 (最好是50个字符或更少, 不超过72个字符)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2. Keep the second line blank.
3. 每行文字在72列处换行。

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### 步骤6: 合并分支

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### 步骤7: 测试

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and just want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### 步骤8: 推送代码

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### 步骤9: 新建一个合并代码请求

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### 步骤10: 讨论和更新

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### 批准和请求更改工作流程

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### 步骤11: 执行合并

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### 持续集成测试

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.