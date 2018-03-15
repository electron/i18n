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
  * [步骤9: 新建一个合并代码请求](#step-8-opening-the-pull-request)
  * [步骤10: 讨论和更新](#step-9-discuss-and-update) 
    * [批准和请求更改工作流程](#approval-and-request-changes-workflow)
  * [步骤11: 执行合并](#step-10-landing)
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

Once you've built the project locally, you're ready to start making changes!

### 步骤3: 分支

To keep your development environment organized, create local branches to hold your work. These should be branched directly off of the `master` branch.

```sh
$ git checkout -b my-branch -t upstream/master
```

## 进行更改

### 步骤4: 编写代码

Most pull requests opened against the `electron/electron` repository include changes to either the C/C++ code in the `atom/` or `brightray/` folders, the JavaScript code in the `lib/` folder, the documentation in `docs/api/` or tests in the `spec/` folder.

Please be sure to run `npm run lint` from time to time on any code changes to ensure that they follow the project's code style.

See [coding style](https://electronjs.org/docs/development/coding-style) for more information about best practice when modifying code in different parts of the project.

### 步骤5: 提交更改

It is recommended to keep your changes grouped logically within individual commits. Many contributors find it easier to review changes that are split across multiple commits. There is no limit to the number of commits in a pull request.

```sh
$ git add my/changed/files
$ git commit
```

Note that multiple commits often get squashed when they are landed.

#### 提交代码说明的指导

A good commit message should describe what changed and why.

1. The first line should:
  
  * contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
    
    示例
  
  * `updated osx build documentation for new sdk`
  
  * `fixed typos in atom_api_menu.h`

2. Keep the second line blank.

3. Wrap all other lines at 72 columns.

See [this article](https://chris.beams.io/posts/git-commit/) for more examples of how to write good git commit messages.

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

### Step 10: Discuss and update

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